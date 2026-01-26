'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './ProposalCard.module.css';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';

// --- CONTRACT CONFIG ---
const CORE_ADDRESS = '0xD2d09c9dE385f1B86B13c0e78fAa7A5Ff919e67D' as `0x${string}`;
const CORE_ABI = [
    { name: 'voteOnBounty', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'bountyId', type: 'uint256' }, { name: 'support', type: 'bool' }], outputs: [] },
    { name: 'bountyVotes', type: 'function', stateMutability: 'view', inputs: [{ name: '', type: 'uint256' }, { name: '', type: 'address' }], outputs: [{ name: 'support', type: 'bool' }, { name: 'weight', type: 'uint256' }, { name: 'timestamp', type: 'uint256' }] }
] as const;

export interface ProposalProps {
    id: string;
    title: string;
    description: string;
    proposer: {
        name: string;
        avatar: string;
        authorityScore: number;
        authorityTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
    };
    tags: string[];
    metrics: {
        budget: string;
        daysRemaining: number;
    };
    votes: {
        count: number;
        passing: boolean;
        percentage: number;
    };
    actionButton?: React.ReactNode;
}

export const ProposalCard: React.FC<ProposalProps> = ({
    id,
    title,
    description,
    proposer,
    tags,
    metrics,
    votes,
    actionButton
}) => {
    const { address } = useAccount();

    // Check if User Voted
    const { data: voteData, isLoading: isReadingVote } = useReadContract({
        address: CORE_ADDRESS,
        abi: CORE_ABI,
        functionName: 'bountyVotes',
        args: [BigInt(id), address || '0x0000000000000000000000000000000000000000'],
        query: {
            enabled: !!address, // Only fetch if wallet connected
        }
    });

    const hasVoted = voteData && voteData[1] > BigInt(0); // weight > 0 means they voted

    // Voting Transaction Logic
    const { writeContract: writeVote, data: voteHash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: voteHash });

    // Derived State: Did they just vote in this session?
    const justVoted = isSuccess;

    const handleVote = () => {
        writeVote({
            address: CORE_ADDRESS,
            abi: CORE_ABI,
            functionName: 'voteOnBounty',
            args: [BigInt(id), true], // Always vote YES for V1
        });
    };

    const isGoldTier = ['Gold', 'Platinum', 'Diamond'].includes(proposer.authorityTier);
    const badgeClass = isGoldTier ? '' : styles.silver;
    const scoreClass = isGoldTier ? '' : styles.silver;

    return (
        <GlassCard interactive padding="md" className={styles.wrapper}>
            {/* Tier Badge */}
            <div className={`${styles.badgeTop} ${badgeClass}`}>
                {proposer.authorityTier} Tier Authority
            </div>

            {/* Proposer Info */}
            <div className={styles.cardHeader}>
                <div className={styles.proposerInfo}>
                    <div className={styles.avatar}>{proposer.avatar}</div>
                    <div className={styles.proposerMeta}>
                        <span className={styles.proposerName}>{proposer.name}</span>
                        <span className={`${styles.authScore} ${scoreClass}`}>
                            Auth: {proposer.authorityScore.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>

            <div className={styles.tags}>
                {tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                ))}
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
                <div className={styles.metric}>
                    <span className={styles.metricValue}>{metrics.budget}</span>
                    <span className={styles.metricLabel}>Request</span>
                </div>
                <div className={styles.metric}>
                    <span className={styles.metricValue}>{metrics.daysRemaining} Days</span>
                    <span className={styles.metricLabel}>Remaining</span>
                </div>
            </div>

            {/* Vote Progress */}
            <div className={styles.voteProgress}>
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${votes.percentage}%` }}
                    />
                </div>
                <div className={styles.voteStats}>
                    <span>{votes.count.toLocaleString()} Votes</span>
                    <span className={votes.passing ? styles.passing : styles.failing}>
                        {votes.passing ? 'Passing' : 'Failing'} ({votes.percentage}%)
                    </span>
                </div>
            </div>

            {/* Action Area */}
            {actionButton ? actionButton : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                    {/* Primary Button */}
                    <button
                        className={styles.voteButton}
                        onClick={handleVote}
                        disabled={isPending || isConfirming || hasVoted || justVoted}
                        style={{
                            background: (hasVoted || justVoted) ? '#10b981' : undefined,
                            cursor: (isPending || isConfirming || hasVoted || justVoted) ? 'not-allowed' : 'pointer',
                            opacity: (hasVoted || justVoted) ? 1.0 : undefined
                        }}
                    >
                        {isPending ? 'Check Wallet...' :
                            isConfirming ? 'Voting...' :
                                (hasVoted || justVoted) ? 'You Voted ✅' : 'Vote with Conviction'}
                    </button>

                    {/* Receipt Link */}
                    {(hasVoted || justVoted) && (
                        <a
                            href={`https://sepolia.etherscan.io/address/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '11px',
                                color: 'var(--muted)',
                                textAlign: 'center',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            View Receipt on Etherscan ↗
                        </a>
                    )}
                </div>
            )}

        </GlassCard>
    );
};
