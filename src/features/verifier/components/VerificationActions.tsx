'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './VerificationActions.module.css';

export const VerificationActions = () => {
    const [timeLeft, setTimeLeft] = useState('14:32:10');

    // Simple countdown simulation logic mock
    useEffect(() => {
        // In a real app, calculate from a target Date
        const timer = setInterval(() => {
            // Just mock ticking for UI feel
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <GlassCard className={styles.panel}>
            <div className={styles.panelHeader}>⚖️ Verification Actions</div>

            <div className={styles.timer}>
                <div className={styles.timerLabel}>Time Remaining</div>
                <div className={styles.timerValue}>{timeLeft}</div>
            </div>

            <div className={styles.progressSection}>
                <div className={styles.progressLabel}>Consensus Progress</div>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill}></div>
                </div>
                <div className={styles.progressText}>2 of 5 verifiers have voted</div>
            </div>

            <div className={styles.actionButtons}>
                <button className={`${styles.btn} ${styles.btnApprove}`} onClick={() => alert('Verification Approved!')}>
                    <span>✓</span>
                    <span>APPROVE & RELEASE FUNDS</span>
                </button>
                <button className={`${styles.btn} ${styles.btnReject}`} onClick={() => alert('Verification Rejected')}>
                    <span>✗</span>
                    <span>REJECT SUBMISSION</span>
                </button>
            </div>

            <div className={styles.rewardInfo}>
                <div className={styles.rewardLabel}>Your Verification Fee</div>
                <div className={styles.rewardValue}>
                    100 ABC
                    <span className={styles.rewardUsd}>($10.00)</span>
                </div>
            </div>

            <div className={styles.infoText}>
                Requires majority approval (3/5 votes)<br />
                Your vote is final and recorded on-chain
            </div>
        </GlassCard>
    );
};
