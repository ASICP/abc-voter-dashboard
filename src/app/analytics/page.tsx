'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './page.module.css';

export default function Analytics() {
    return (
        <div className="container-width" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px' }}>
                    ← Back to Hub
                </Link>
            </div>

            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Strategic Impact Dashboard</h1>
                <p style={{ color: 'var(--muted)' }}>Tracking capital allocation efficiency and real-time network health.</p>
            </header>

            <div className={styles.grid}>
                {/* Funds by Category */}
                <GlassCard>
                    <div className={styles.sectionHeader}>
                        <h3 style={{ fontSize: '18px' }}>Funds Distributed by Category</h3>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Last 30 Days</span>
                    </div>

                    <div className={styles.chartContainer}>
                        {[
                            { label: 'Interpretability', value: '450k', height: '80%', color: 'primary' },
                            { label: 'Control', value: '280k', height: '50%', color: 'secondary' },
                            { label: 'Governance', value: '120k', height: '25%', color: 'alert' },
                            { label: 'Red Teaming', value: '600k', height: '95%', color: 'primary' },
                        ].map((item, i) => (
                            <div key={i} className={styles.barGroup}>
                                <div className={styles.barValue}>{item.value}</div>
                                <div className={`${styles.bar} ${styles[item.color]}`} style={{ height: item.height }}></div>
                                <div className={styles.barLabel}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Efficiency Scatter */}
                <GlassCard>
                    <div className={styles.sectionHeader}>
                        <h3 style={{ fontSize: '18px' }}>Impact Efficiency</h3>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Impact Score vs. Cost</span>
                    </div>

                    <div className={styles.chartContainer} style={{ alignItems: 'center' }}>
                        <div className={styles.scatterContainer}>
                            <div className={styles.axisLabel} style={{ top: 0, left: 10 }}>Impact Score</div>
                            <div className={styles.axisLabel} style={{ bottom: 10, right: 0 }}>Cost ($)</div>

                            {/* Mock Data Points */}
                            {[
                                { x: '20%', y: '30%', size: 10, label: 'Grant #102' },
                                { x: '40%', y: '80%', size: 15, label: 'Grant #145' },
                                { x: '70%', y: '60%', size: 20, label: 'Grant #099' },
                                { x: '85%', y: '90%', size: 25, label: 'Grant #124 (High Impact)' },
                                { x: '90%', y: '20%', size: 8, label: 'Grant #110' },
                            ].map((point, i) => (
                                <div
                                    key={i}
                                    className={styles.dot}
                                    style={{ left: point.x, bottom: point.y, width: point.size, height: point.size }}
                                >
                                    <div className={styles.dotLabel}>{point.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Live Feed */}
            <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--foreground)' }}>Live Network Activity</h2>
            <div className={styles.liveFeed}>
                {[
                    { type: 'vote', msg: '0x88...2F voted YES on "Sparse Autoencoders"', time: '2 mins ago', conv: '100 ABC' },
                    { type: 'proposal', msg: 'New Proposal: "Scalable Oversight Protocol" submitted by Dr. P. Christiano', time: '15 mins ago', conv: '' },
                    { type: 'vote', msg: '0x12...9A voted NO on "Agentic Benchmarks"', time: '42 mins ago', conv: '50 ABC' },
                    { type: 'vote', msg: '0x71...9A voted YES on "Adversarial Robustness"', time: '1 hour ago', conv: '1.2k ABC' },
                ].map((item, i) => (
                    <div key={i} className={`${styles.feedItem} ${styles[item.type]}`}>
                        <div className={styles.feedTime}>{item.time}</div>
                        <div style={{ flex: 1 }}>{item.msg}</div>
                        {item.conv && <div style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>{item.conv}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
