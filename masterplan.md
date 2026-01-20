# ABC Commons App - Masterplan

## 1. App Overview
The **ABC Commons App** is the user interface for the Aligned Beacon Commons (ABC) Protocol. It is a decentralized application (dApp) that enables the global community to govern, fund, and verify AI alignment research.

**Core Value Proposition:**
- **For Voters:** A transparent, data-driven interface to allocate funding to the most promising AI safety experiments.
- **For Researchers:** A streamlined portal to propose bounties, submit work, and get paid instantly upon verification.
- **For Verifiers:** A dashboard to review code/research and earn reputation + fees.
-   **For Voters:** A transparent, data-driven interface to allocate funding to the most promising AI safety experiments.
-   **For Researchers:** A streamlined portal to propose bounties, submit work, and get paid instantly upon verification.
-   **For Verifiers:** A dashboard to review code/research and earn reputation + fees.

## 2. Strategic Priorities
1.  **Decision Clarity for Voters:** The app must not just allow voting, but *guide* it. We will implement "Decision Support" features:
    -   **Authority Scores:** Visualizing the reputation of proposers and verifiers.
    -   **Strategic Tiers:** Categorizing bounties (e.g., "Seed", "Growth", "Moonshot") to help voters balance risk.
    -   **Recency & Urgency:** Highlighting active bounties nearing deadlines.
2.  **Radical Transparency:** Every action (vote, funding, verification) must be traceable on-chain but presented in a human-readable format.
3.  **Premium Aesthetic:** A "Futuristic Dark Neon" design that signals high-tech, serious research, and modern Web3 capabilities.

## 3. Core Functions (Frontend)
The application must deliver these five critical capabilities:
1.  **Proposal Display:** A comprehensive feed of active, past, and pending proposals. Each card must show:
    -   Details (Title, Description, Budget).
    -   Discussion links.
    -   Current voting status (Passing/Failing) with progress bars.
2.  **Voting Interface:** A seamless flow for users to:
    -   Connect wallet.
    -   Stake/Spend $ABC tokens to vote "Yes" or "No".
    -   Visualize the weight of their vote via Quadratic/Conviction mechanics.
3.  **Proposal Creation:** A wizard for $ABC holders to:
    -   Submit new research ideas.
    -   Define deliverables and budget.
    -   Post the required stake to prevent spam.
4.  **Token Balance & Voting Power:**
    -   Always-visible display of user's $ABC balance.
    -   Calculation of "Effective Voting Power" based on lock-up periods or conviction multipliers.
5.  **Outcome Display:**
    -   Clear visual indicators for Passed vs. Failed proposals.
    -   Historical archive of results for transparency.

## 4. Technical Architecture

### Stack
-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Styling:** Vanilla CSS (CSS Modules)
    -   *Design Tokens:* CSS Variables for easy theming (Neon Cyan, Deep Slate, Glassmorphism).
    -   *No Tailwind* (per project constraints, focused on custom premium design using standard CSS Modules).
-   **Blockchain Interaction:**
    -   **Wagmi / Viem:** For contract hooks and interaction.
    -   **RainbowKit:** For wallet connection.
    -   **Network:** Base (Coinbase L2).
-   **Data & Storage:**
    -   **IPFS:** For proposal text and research PDFs.
    -   **The Graph / Indexer:** For querying ProposalCreated, VoteCast, and BountyClaimed events to build the feed.

## 4. Design System: "Neon Glass"
-   **Background:** Deep gradients (`#0f172a` to `#1e293b`).
-   **Cards:** Glassmorphism with blur filters (`backdrop-filter: blur(10px)`) and subtle borders.
-   **Accents:**
    -   *Primary:* Neon Emerald (`#10b981`) for success/approval.
    -   *Secondary:* Electric Purple (`#c084fc`) for governance/voting.
    -   *Alert:* Neon Red (`#ef4444`) for deadlines/rejections.
-   **Typography:** 'Inter' or 'Outfit' (Google Fonts) - clean, modern sans-serif.

## 5. Development Phases

### Phase 1: Foundation & Design System
-   [ ] Initialize Next.js project with TypeScript.
-   [ ] Configure `layout.tsx` with `RainbowKitProvider` and Wagmi config (Base chain).
-   [ ] Create global CSS variables (colors, spacing, shadows).
-   [ ] Build core layout components:
    -   `Navbar` (Wallet Connect, Navigation).
    -   `GlassCard` (Reusable container).
    -   `PageHeader` (Gradient text titles).

### Phase 2: Governance Hub (Voting & Decision Support)
-   **Goal:** Allow ABC holders to vote intelligently.
-   [ ] **Proposal Feed:**
    -   Fetch proposals from smart contract/indexer.
    -   **Feature:** "Smart Sort" - rank by Authority Score, Recency, or "Hot" (active voting).
-   [ ] **Proposal Detail View:**
    -   Render IPFS content (Markdown).
    -   **Decision Support Modules:**
        -   *Authority Badge:* Display proposer's "Meridian Authority Score" (Bronze to Diamond tiers).
        -   *Tier Indicator:* Show project size/risk profile.
        -   *Timeline:* Visual countdown to voting deadline.
    -   **Integration:**
        -   Fetch Authority Scores from Meridian Protocol contracts (shared ecosystem).
-   [ ] **Voting Interface:**
    -   Quadratic Voting slider (if applicable) or simple Conviction Voting input.
    -   Transaction signing integration.

### Phase 3: Researcher Workspace
-   **Goal:** Enable proposal creation and work submission.
-   [ ] **Create Proposal Form:**
    -   Multi-step wizard (Details -> Budget -> Stake).
    -   IPFS Upload integration for specs.
-   [ ] **My Bounties Dashboard:**
    -   Track status of owned proposals.
    -   "Submit Work" flow (Upload PDF/Code -> IPFS -> Chain).

### Phase 4: Verifier Dashboard (Implementation of Mockup)
-   **Goal:** The specific "Verifier Dashboard" from the mockup.
-   [ ] Port `verifier-dashboard-mockup.html` to React components.
-   [ ] Implement specific sub-components:
    -   `EvidencePanel` (Code/PDF viewer).
    -   `VerificationTimer` (Countdown).
    -   `ConsensusBar` (Progress of other verifiers).
    -   `ActionButtons` (Approve/Reject with contract calls).
-   [ ] **Logic:**
    -   Read `VerificationPool` contract state.
    -   Check if user is selected verifier.

### Phase 5: Analytics & Impact (Strategic Research Prioritization)
-   **Goal:** High-level view for strategy.
-   [ ] **Impact Dashboard:**
    -   Charts showing funds distributed by "Research Category" (e.g., Interpretability vs. Control).
    -   "Safety Impact Score" visualization vs. Cost (Efficiency metric).
-   [ ] **Observer View:** Real-time feed of network activity (votes, submissions).

## 6. Directory Structure
```
/app
  /components     # Shared UI components (GlassCard, Button, etc.)
  /features       # Feature-specific components
    /governance   # Voting, Lists, Authority Badges
    /researcher   # Forms, Uploads
    /verifier     # Evidence review, Consensus
  /hooks          # Custom Wagmi hooks
  /lib            # Utils, formatters, IPFS helpers
  /styles         # Global CSS and modules
```
