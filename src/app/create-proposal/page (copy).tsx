'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function CreateProposal() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        budget: '',
        deadline: '',
        deliverables: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className={styles.container}>
            <div style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px' }}>
                    ← Back to Hub
                </Link>
            </div>

            <div className={styles.header}>
                <div className={`text-gradient-primary ${styles.title}`}>
                    Create Governance Proposal
                </div>
                <div className={styles.subtitle}>
                    Submit a new research bounty or grant request to the ABC Beacon.
                </div>
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
                            <input
                                name="title"
                                className={styles.input}
                                placeholder="e.g., Automated Red-Teaming for LLMs"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Abstract / Description</label>
                            <textarea
                                name="description"
                                className={styles.textarea}
                                placeholder="Describe the research problem, methodology, and expected impact..."
                                value={formData.description}
                                onChange={handleChange}
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
                                <br /><span style={{ fontSize: '12px' }}>Will be pinned to IPFS</span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Requested Budget ($ABC)</label>
                            <input
                                name="budget"
                                type="number"
                                className={styles.input}
                                placeholder="5000"
                                value={formData.budget}
                                onChange={handleChange}
                            />
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
                            <div>Required Anti-Spam Stake</div>
                            <div className={styles.stakeAmount}>500 ABC</div>
                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                                Refunded if proposal passes quorum. Burned if marked as spam.
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    {step > 1 ? (
                        <button onClick={prevStep} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Back
                        </button>
                    ) : <div></div>} {/* Spacer */}

                    {step < 3 ? (
                        <button onClick={nextStep} className={`${styles.btn} ${styles.btnPrimary}`}>
                            Next Step
                        </button>
                    ) : (
                        <button className={`${styles.btn} ${styles.btnPrimary}`}>
                            Sign & Submit Proposal
                        </button>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
