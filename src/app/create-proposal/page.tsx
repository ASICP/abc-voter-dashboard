'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// --- CONTRACT CONFIG ---
const CORE_ADDRESS = process.env.NEXT_PUBLIC_COMMONS_CORE_ADDRESS as `0x${string}`;
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ABC_TOKEN_ADDRESS as `0x${string}`;

// Minimal ABIs
const TOKEN_ABI = [
    { name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }] },
    { name: 'allowance', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] }
] as const;

const CORE_ABI = [
    { name: 'proposeBounty', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'ipfsHash', type: 'string' }, { name: 'amount', type: 'uint256' }], outputs: [] }
] as const;

// Consts
const REQUIRED_STAKE = parseEther("5000"); // 5,000 ABC

export default function CreateProposal() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const [step, setStep] = useState(1);
    const [debugLog, setDebugLog] = useState<string[]>([]);

    const addLog = (msg: string) => setDebugLog(prev => [...prev, `${new Date().toISOString().split('T')[1].split('.')[0]} ${msg}`]);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        budget: '5000',
        deadline: '30',
        deliverables: ''
    });

    // Transaction State
    const { writeContract: writeApprove, data: approveHash, isPending: isApprovePending, error: approveError } = useWriteContract();
    const { writeContract: writePropose, data: proposeHash, isPending: isProposePending, error: proposeError } = useWriteContract();

    // Read Allowance
    const { data: allowance, refetch: refetchAllowance, error: readError } = useReadContract({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: address ? [address, CORE_ADDRESS] : undefined,
    });

    // Wait for Tx Receipts
    const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
    const { isLoading: isProposing, isSuccess: isProposed } = useWaitForTransactionReceipt({ hash: proposeHash });

    // Refresh allowance after approval
    useEffect(() => {
        if (!isApproving && approveHash) {
            addLog("Approval Configured! Refetching allowance...");
            refetchAllowance();
        }
    }, [isApproving, approveHash, refetchAllowance]);

    useEffect(() => {
        if (readError) addLog(`Read Error: ${readError.message}`);
        if (approveError) addLog(`Approve Error: ${approveError.message}`);
        if (proposeError) addLog(`Propose Error: ${proposeError.message}`);
    }, [readError, approveError, proposeError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const hasEnoughAllowance = allowance ? allowance >= REQUIRED_STAKE : false;

    // Handlers
    const handleApprove = () => {
        addLog(`Approve Clicked. Chain: ${chainId}`);
        addLog(`Token: ${TOKEN_ADDRESS}, Core: ${CORE_ADDRESS}`);

        try {
            writeApprove({
                address: TOKEN_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'approve',
                args: [CORE_ADDRESS, REQUIRED_STAKE],
            });
            addLog("Approve tx sent to wallet...");
        } catch (e: any) {
            addLog(`Catch Error: ${e.message}`);
        }
    };

    const handleSubmit = () => {
        const dummyIpfsHash = `QmFakeHashForTest_${Date.now()}`;
        addLog(`Submit Clicked. Chain: ${chainId}`);

        writePropose({
            address: CORE_ADDRESS,
            abi: CORE_ABI,
            functionName: 'proposeBounty',
            args: [dummyIpfsHash, parseEther(formData.budget)],
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    // --- RENDER ---

    if (isProposed) {
        return (
            <div className="container-width" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <GlassCard>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🗳️</div>
                    <h1 style={{ color: '#10b981' }}>Proposal Live for Voting!</h1>
                    <p style={{ color: 'var(--muted)', margin: '20px 0' }}>
                        Your 5,000 ABC stake is locked. The community can now vote on your proposal.
                    </p>
                    <div style={{ wordBreak: 'break-all', fontSize: '12px', color: 'var(--muted)', background: '#111', padding: '10px', borderRadius: '8px' }}>
                        Tx: {proposeHash}
                    </div>
                    <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`} style={{ marginTop: '30px', display: 'inline-block' }}>
                        Back to Governance Hub
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px' }}>← Back to Hub</Link>
            </div>

            {/* DEBUG CONSOLE */}
            <div style={{ background: '#000', color: '#0f0', padding: '10px', fontSize: '10px', fontFamily: 'monospace', marginBottom: '10px', borderRadius: '5px', maxHeight: '100px', overflowY: 'auto' }}>
                <div>DEBUG CONSOLE (Chain: {chainId})</div>
                {debugLog.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            <div className={styles.header}>
                <div className={`text-gradient-primary ${styles.title}`}>Create Governance Proposal</div>
            </div>

            <div className={styles.steps}>
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`${styles.step} ${step === s ? styles.active : ''} ${step > s ? styles.completed : ''}`}>
                        <div className={styles.stepNumber}>{s}</div>
                        <div className={styles.stepLabel}>
                            {s === 1 ? 'Details' : s === 2 ? 'Logistics' : 'Review & Stake'}
                        </div>
                    </div>
                ))}
            </div>

            <GlassCard className={styles.formCard}>

                {step === 1 && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Proposal Title</label>
                            <input name="title" className={styles.input} placeholder="Research Title" value={formData.title} onChange={handleChange} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Abstract / Description</label>
                            <textarea
                                name="description"
                                className={styles.textarea}
                                placeholder="Describe the research problem..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{ minHeight: '100px' }}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Tags (comma separated)</label>
                            <input
                                name="tags"
                                className={styles.input}
                                placeholder="Security, Interpretability, Control..."
                                value={formData.tags}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Upload Specification (PDF/Markdown)</label>
                            <div style={{ border: '1px dashed var(--border)', padding: '20px', textAlign: 'center', borderRadius: '8px', color: 'var(--muted)' }}>
                                Drag & drop files or <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>browse</span>
                                <br /><span style={{ fontSize: '12px' }}>Will be pinned to IPFS (Simulated)</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={nextStep} className={`${styles.btn} ${styles.btnPrimary}`}>Next: Logistics</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Requested Budget ($ABC)</label>
                            <input name="budget" type="number" className={styles.input} value={formData.budget} onChange={handleChange} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Est. Duration (Days)</label>
                            <input
                                name="deadline"
                                type="number"
                                className={styles.input}
                                placeholder="30"
                                value={formData.deadline}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Key Deliverables</label>
                            <textarea
                                name="deliverables"
                                className={styles.textarea}
                                placeholder="- GitHub Repository&#10;- arXiv Paper&#10;- Docker Container"
                                value={formData.deliverables}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button onClick={prevStep} className={`${styles.btn} ${styles.btnSecondary}`}>Back</button>
                            <button onClick={nextStep} className={`${styles.btn} ${styles.btnPrimary}`}>Next: Review & Stake</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.formSection}>
                        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Summary Review</h3>

                        <div>
                            <div className={styles.summaryKey}>About</div>
                            <div className={styles.summaryValue}>{formData.title}</div>
                        </div>

                        <div>
                            <div className={styles.summaryKey}>Budget & Timeline</div>
                            <div className={styles.summaryValue}>{formData.budget} ABC • {formData.deadline} Days</div>
                        </div>

                        <div className={styles.stakeBox}>
                            <div>Required Stake</div>
                            <div className={styles.stakeAmount}>5,000 ABC</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                {allowance !== undefined ? `Current Allowance: ${formatEther(allowance)} ABC` : 'Reading Config...'}
                            </div>
                        </div>

                        {proposeError && (
                            <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px' }}>
                                Error: {proposeError.message.slice(0, 100)}...
                            </div>
                        )}
                        {approveError && (
                            <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px' }}>
                                Approve Error: {approveError.message.slice(0, 100)}...
                            </div>
                        )}

                        <div className={styles.actions}>
                            <button onClick={prevStep} className={`${styles.btn} ${styles.btnSecondary}`}>Back</button>

                            {!hasEnoughAllowance ? (
                                <button
                                    onClick={handleApprove}
                                    disabled={isApprovePending || isApproving}
                                    className={`${styles.btn} ${styles.btnPrimary}`}
                                >
                                    {isApprovePending || isApproving ? 'Approving...' : 'Approve 5,000 ABC'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isProposePending || isProposing}
                                    className={`${styles.btn} ${styles.btnPrimary}`}
                                    style={{ background: '#10b981', borderColor: '#10b981' }}
                                >
                                    {isProposePending || isProposing ? 'Submitting...' : 'Sign & Submit Proposal'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
