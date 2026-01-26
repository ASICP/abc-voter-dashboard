'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './ProposalCard.module.css';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// --- CONTRACT CONFIG ---
const CORE_ADDRESS = '0xD2d09c9dE385f1B86B13c0e78fAa7A5Ff919e67D' as `0x${string}`;
const CORE_ABI = [
    { name: 'voteOnBounty', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'bountyId', type: 'uint256' }, { name: 'support', type: 'bool' }], outputs: [] }
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
    // Voting Logic
    const { writeContract: writeVote, data: voteHash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: voteHash });

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

            {/* Action */}
            {actionButton || (
                <button
                    className={styles.voteButton}
                    onClick={handleVote}
                    disabled={isPending || isConfirming || isSuccess}
                    style={{
                        background: isSuccess ? '#10b981' : undefined,
                        cursor: (isPending || isConfirming || isSuccess) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isPending ? 'Check Wallet...' :
                        isConfirming ? 'Voting...' :
                            isSuccess ? 'Voted!' : 'Vote with Conviction'}
                </button>
            )}

            {isSuccess && (
                <div style={{ fontSize: '10px', marginTop: '10px', color: 'var(--muted)', textAlign: 'center' }}>
                    Hash: {voteHash?.slice(0, 10)}...
                </div>
            )}

        </GlassCard>
    );
};
