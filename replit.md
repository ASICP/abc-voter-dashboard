# ABC Beacon - Voter Dashboard

## Overview
ABC Beacon is a governance hub application for voting on research proposals using conviction voting. Users can connect their crypto wallet to signal support for high-impact research proposals using their $ABC tokens.

## Project Architecture
- **Framework**: Next.js 16.1.4 with TypeScript
- **Frontend**: React 19.2.3 with TailwindCSS
- **Web3**: RainbowKit for wallet connection, Wagmi for Ethereum interactions, Viem for blockchain utilities
- **State Management**: TanStack React Query

## Project Structure
```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable React components
├── data/         # Static data and configuration
└── features/     # Feature-specific modules
```

## Running the Application
The development server runs on port 5000:
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Key Features
- Active Proposals display with voting progress
- Wallet connection via RainbowKit
- Conviction voting system
- Governance Hub, Bounties, Verifier, and Analytics sections

## Recent Changes
- Initial project setup for Replit environment (January 2026)
