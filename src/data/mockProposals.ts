import { ProposalProps } from '@/features/governance/components/ProposalCard';

export const MOCK_PROPOSALS: ProposalProps[] = [
    {
        id: '124',
        title: 'Adversarial Robustness Framework v2',
        description: 'A comprehensive testing suite for LLM adversarial attacks, building on the initial ABC grant #42. Focus on automated red-teaming pipelines for open source models.',
        proposer: {
            name: 'Dr. Sarah Chen',
            avatar: 'SC',
            authorityScore: 2378,
            authorityTier: 'Gold'
        },
        tags: ['Security', 'SOTA', 'Red Teaming'],
        metrics: {
            budget: '15,000 ABC',
            daysRemaining: 2
        },
        votes: {
            count: 428,
            passing: true,
            percentage: 85
        }
    },
    {
        id: '125',
        title: 'Sparse Autoencoders for Vision Models',
        description: 'Applying recent interpretability breakthroughs in SAEs to computer vision models to detect deception in image generation. Seeking seed funding for initial experiments.',
        proposer: {
            name: 'James Doe',
            avatar: 'JD',
            authorityScore: 890,
            authorityTier: 'Silver'
        },
        tags: ['Interpretability', 'Experimental'],
        metrics: {
            budget: '5,000 ABC',
            daysRemaining: 5
        },
        votes: {
            count: 120,
            passing: false,
            percentage: 45
        }
    },
    {
        id: '126',
        title: 'Agentic Control Benchmarks',
        description: 'Defining a new standard for measuring "loss of control" in multi-agent RL environments. Metadata standard proposal for universal adoption.',
        proposer: {
            name: 'Max Planck Inst. Team',
            avatar: 'MX',
            authorityScore: 1200,
            authorityTier: 'Silver'
        },
        tags: ['Control', 'Standards'],
        metrics: {
            budget: '8,000 ABC',
            daysRemaining: 6
        },
        votes: {
            count: 15,
            passing: false,
            percentage: 12
        }
    }
];
