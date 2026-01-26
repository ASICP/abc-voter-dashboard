'use client';

import { useReadContracts } from 'wagmi';
import { formatEther } from 'viem';
import { ProposalCard } from './ProposalCard';

// HARDCODE ADDRESS for stability
const CORE_ADDRESS = '0xD2d09c9dE385f1B86B13c0e78fAa7A5Ff919e67D' as `0x${string}`;

const CORE_ABI = [
    {
        name: 'bounties',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: '', type: 'uint256' }],
        outputs: [
            { name: 'id', type: 'uint256' },
            { name: 'proposer', type: 'address' },
            { name: 'ipfsHash', type: 'string' },
            { name: 'amount', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
            { name: 'state', type: 'uint8' }, // 0=Draft, 1=Active, 2=Claimed...
            { name: 'claimedBy', type: 'address' }
        ]
    }
] as const;

export function LiveProposalList() {
    // We assume IDs 0, 1, 2 exist for this test.
    // In production, we would query the "nextBountyId" to know how many to fetch.
    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: CORE_ADDRESS, abi: CORE_ABI, functionName: 'bounties', args: [BigInt(0)] },
            { address: CORE_ADDRESS, abi: CORE_ABI, functionName: 'bounties', args: [BigInt(1)] },
            { address: CORE_ADDRESS, abi: CORE_ABI, functionName: 'bounties', args: [BigInt(2)] },
        ]
    });

    if (isLoading) return <div style={{ color: 'var(--muted)', textAlign: 'center' }}>Loading On-Chain Proposals...</div>;

    // Filter out null/error results or empty bounties
    const validProposals = data?.filter(r => r.status === 'success' && r.result).map((r, index) => {
        const p = r.result as any;

        // If amount is 0, it likely doesn't exist
        if (p[3] === BigInt(0)) return null;

        const formattedAmount = formatEther(p[3]);
        const proposerAddr = p[1] as string;

        // Mapped to ProposalCard Interface
        return {
            id: index.toString(),
            title: `Bounty #${index}`, // Placeholder Title
            description: `IPFS Hash: ${p[2].substring(0, 20)}...`,

            // Nested Proposer Object
            proposer: {
                name: `${proposerAddr.substring(0, 6)}...${proposerAddr.substring(38)}`,
                avatar: '🧙‍♂️',
                authorityScore: 100, // Placeholder
                authorityTier: 'Gold' as const
            },

            tags: ["Research", "Sepolia"],

            // Nested Metrics Object
            metrics: {
                budget: `${parseFloat(formattedAmount).toLocaleString()} ABC`,
                daysRemaining: 30
            },

            // Nested Votes Object
            votes: {
                count: 0,
                passing: false,
                percentage: 0
            }
        };
    }).filter(Boolean) || [];

    if (validProposals.length === 0) {
        return <div style={{ color: 'var(--muted)', textAlign: 'center' }}>No Active Proposals Found.</div>;
    }

    return (
        <>
            {validProposals.map((prop: any) => (
                <ProposalCard key={prop.id} {...prop} />
            ))}
        </>
    );
}
