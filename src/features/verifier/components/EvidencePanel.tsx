import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './EvidencePanel.module.css';

export const EvidencePanel = () => {
    return (
        <GlassCard className={styles.panel}>
            <div className={styles.panelHeader}>📋 Evidence Review</div>

            <div className={styles.bountyTitle}>Bounty #124: Adversarial Robustness Test Suite</div>

            <div className={styles.metadata}>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Submitted by:</span>
                    <span className={styles.metaValue}>0x71C7...9A2</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Submitter Authority:</span>
                    <span className={styles.metaValue}>1,400 (Gold Tier)</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Bounty Amount:</span>
                    <span className={styles.metaValue}>10,000 ABC ($1,000)</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Submission Date:</span>
                    <span className={styles.metaValue}>Dec 8, 2025 18:30 UTC</span>
                </div>
            </div>

            <div className={styles.codePreview}>
                <span className={styles.comment}># adversarial_robustness_test.py</span><br />
                <span className={styles.keyword}>import</span> torch<br />
                <span className={styles.keyword}>import</span> numpy <span className={styles.keyword}>as</span> np<br /><br />

                <span className={styles.keyword}>class</span> <span className={styles.function}>AdversarialTester</span>:<br />
                &nbsp;&nbsp;<span className={styles.keyword}>def</span> <span className={styles.function}>__init__</span>(self, model, epsilon=0.1):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;self.model = model<br />
                &nbsp;&nbsp;&nbsp;&nbsp;self.epsilon = epsilon<br /><br />

                &nbsp;&nbsp;<span className={styles.keyword}>def</span> <span className={styles.function}>fgsm_attack</span>(self, image, label):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.comment}># Fast Gradient Sign Method</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;image.requires_grad = True<br />
                &nbsp;&nbsp;&nbsp;&nbsp;output = self.model(image)<br />
                ...
            </div>

            <div className={styles.ipfsHash}>
                <strong>IPFS Hash:</strong> QmXy7K4pL9vN2mR8sT6uW1xY3zA5bC7dE9fG0hI2jK4lM6nO8pQ
            </div>

            <div className={styles.infoText}>
                ✓ Deliverables include: Source code, test suite, documentation, benchmark results
            </div>
        </GlassCard>
    );
};
