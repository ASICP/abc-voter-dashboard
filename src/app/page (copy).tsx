import Link from "next/link";
import styles from "./page.module.css";
import { ProposalCard } from "@/features/governance/components/ProposalCard";
import { MOCK_PROPOSALS } from "@/data/mockProposals";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="container-width">
      <header className={styles.header}>
        <div className="text-gradient-primary" style={{ fontSize: '24px', fontWeight: 700 }}>
          ABC Beacon
        </div>
        <nav style={{ display: 'flex', gap: '30px' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>Governance Hub</Link>
          <Link href="/my-bounties" style={{ color: 'var(--muted)', fontWeight: 500 }}>My Bounties</Link>
          <Link href="/verifier" style={{ color: 'var(--muted)', fontWeight: 500 }}>Verifier</Link>
          <Link href="/analytics" style={{ color: 'var(--muted)', fontWeight: 500 }}>Analytics</Link>
        </nav>
        <div className={styles.walletConnector}>
          <ConnectButton showBalance={true} />
        </div>
      </header>

      <main>
        <div className={styles.discoveryBar}>
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>Active Proposals</h1>
            <p style={{ color: 'var(--muted)' }}>Use your $ABC to signal conviction on high-impact research.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/create-proposal" className={`${styles.filterBtn} ${styles.primaryBtn}`}>
              + Create Proposal
            </Link>
          </div>
        </div>

        <div className={styles.discoveryBar}>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
            <button className={styles.filterBtn}>🔥 Hot</button>
            <button className={styles.filterBtn}>💎 High Authority</button>
          </div>
        </div>

        <div className={styles.grid}>
          {MOCK_PROPOSALS.map((proposal) => (
            <ProposalCard key={proposal.id} {...proposal} />
          ))}
        </div>
      </main>
    </div>
  );
}
