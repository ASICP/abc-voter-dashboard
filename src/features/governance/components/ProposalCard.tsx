'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './ProposalCard.module.css';

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
    title,
    description,
    proposer,
    tags,
    metrics,
    votes,
    actionButton
}) => {
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
                    onClick={() => alert("Voting functionality will require a smart contract transaction signature.")}
                >
                    Vote with Conviction
                </button>
            )}

        </GlassCard>
    );
};
