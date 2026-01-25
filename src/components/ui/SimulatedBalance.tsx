'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

// Simplified ABI for balanceOf
const TOKEN_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  }
] as const;

export function SimulatedBalance() {
  const { address, isConnected } = useAccount();

  const { data: balance } = useReadContract({
    address: process.env.NEXT_PUBLIC_ABC_TOKEN_ADDRESS as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  if (!isConnected || !balance) return null;

  // Calculate directly during render
  const tokens = parseFloat(formatUnits(balance, 18));
  // Simulate $0.50 price (as requested)
  const value = tokens * 0.50;

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end',
      marginRight: '15px'
    }}>
      <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>
        Est. Portfolio Value
      </span>
      <span style={{ 
        color: '#10b981', // Emerald Green 
        fontWeight: 700,
        fontSize: '14px'
      }}>
        {formattedValue}
      </span>
    </div>
  );
}