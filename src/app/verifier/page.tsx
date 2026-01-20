'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EvidencePanel } from '@/features/verifier/components/EvidencePanel';
import { VerificationActions } from '@/features/verifier/components/VerificationActions';
import { GlassCard } from '@/components/ui/GlassCard';

export default function VerifierDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Abc2026!') {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container-width" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
                <GlassCard style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>Verifier Access</h2>
                    <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
                        Restricted to High-Reputation Verifiers.
                    </p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="password"
                            placeholder="Enter Access Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                background: 'rgba(15,23,42,0.5)',
                                color: 'white',
                                fontSize: '16px'
                            }}
                        />
                        {error && <div style={{ color: 'var(--alert)', fontSize: '12px' }}>Invalid Access Code</div>}
                        <button
                            type="submit"
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'linear-gradient(135deg, var(--gold) 0%, #d97706 100%)',
                                color: '#0f172a',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                    <div style={{ marginTop: '20px' }}>
                        <Link href="/" style={{ color: 'var(--muted)', fontSize: '12px' }}>
                            ← Return to Hub
                        </Link>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="container-width" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px' }}>
                    ← Back to Hub
                </Link>
            </div>

            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Verifier Dashboard</h1>
                    <p style={{ color: 'var(--muted)' }}>Review submitted evidence and vote on fund release.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--gold) 0%, #d97706 100%)', color: '#0f172a', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, display: 'inline-block', marginBottom: '5px' }}>
                        PLATINUM VERIFIER
                    </div>
                    <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>
                        Authority Score: 2,378
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <EvidencePanel />
                <VerificationActions />
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                ABC Beacon Protocol • Verifiers are subject to slashing for bad faith actions.
            </div>
        </div>
    );
}
