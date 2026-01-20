'use client';

import Link from "next/link";
import styles from "./page.module.css";
import { ProposalCard } from "@/features/governance/components/ProposalCard";
import { MOCK_PROPOSALS } from "@/data/mockProposals";

// Mocking 'My Proposals' by just taking the first one
const MY_PROPOSALS = [MOCK_PROPOSALS[0]];

export default function MyBounties() {
    return (
        <div className="container-width" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px' }}>
                    ← Back to Hub
                </Link>
            </div>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Researcher Workspace</h1>
                    <p style={{ color: 'var(--muted)' }}>Manage your active bounties and submissions.</p>
                </div>
                <Link href="/create-proposal" className={styles.primaryBtn}>
                    + Create New Proposal
                </Link>
            </header>

            <section style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--primary)' }}>My Active Bounties</h2>
                <div className={styles.grid}>
                    {MY_PROPOSALS.map((proposal) => (
                        <ProposalCard
                            key={proposal.id}
                            {...proposal}
                            actionButton={
                                <button style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)',
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}>
                                    Manage & Submit Work
                                </button>
                            }
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--muted)' }}>Drafts</h2>
                <div style={{
                    border: '1px dashed var(--border)',
                    borderRadius: '16px',
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--muted)'
                }}>
                    No drafts in progress.
                </div>
            </section>
        </div>
    );
}
