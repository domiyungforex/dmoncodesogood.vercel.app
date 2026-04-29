'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Aurum DeFi Dashboard',
    category: 'DeFi Analytics',
    description: 'A real-time DeFi analytics dashboard tracking $10M+ TVL across 8 protocols with live yield farming data and impermanent loss calculators.',
    longDesc: 'Built a comprehensive DeFi analytics platform from the ground up, featuring real-time on-chain data streaming via WebSockets, custom 3D vault visualization built on Three.js, and a Node.js backend indexing events from 8 protocols. Implemented wallet-based auth, portfolio tracking, and yield comparison tools.',
    image: '🌌',
    gradient: 'from-blue-600/20 to-purple-600/20',
    accent: '#00d4ff',
    tech: ['Next.js', 'Three.js', 'Go', 'Kafka', 'PostgreSQL', 'Redis'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['1M+ events/day', '< 50ms latency', '99.9% uptime'],
  },
  {
    id: 2,
    title: 'Nexus NFT Marketplace',
    category: 'NFT / Web3',
    description: 'Decentralized NFT marketplace with gasless minting, collection launches, and royalty enforcement across Ethereum and Polygon.',
    longDesc: 'Designed and built a full-featured NFT marketplace on Ethereum & Polygon with EIP-712 meta-transactions for gasless UX, collection launchpad with timed drops, and IPFS for decentralized storage. Integrated OpenSea SDK for cross-platform listings and built a custom royalty splitter contract.',
    image: '💎',
    gradient: 'from-purple-600/20 to-pink-600/20',
    accent: '#7c3aed',
    tech: ['React', 'Solidity', 'Hardhat', 'Ethers.js', 'IPFS', 'Stable Diffusion'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['$2M+ volume', '15K+ NFTs minted', '8K+ users'],
  },
  {
    id: 3,
    title: 'Staking Vault Protocol',
    category: 'DeFi / Staking',
    description: 'Multi-chain staking vault with auto-compounding rewards, lock periods, and governance token integration.',
    longDesc: 'Built a multi-chain staking vault protocol supporting Ethereum, Polygon, and Arbitrum with auto-compounding reward mechanisms, flexible lock periods, and governance token integration. Implemented secure contract patterns including reentrancy guards, time-weighted reward calculations, and emergency pause functionality. The protocol reached $5M+ TVL within the first month.',
    image: '🎮',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    accent: '#06b6d4',
    tech: ['Solidity', 'Hardhat', 'Ethers.js', 'Next.js', 'TheGraph', 'OpenZeppelin'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['$5M+ TVL', '8% avg APY', '3 chains'],
  },
  {
    id: 4,
    title: 'Token Launchpad',
    category: 'Web3 / Launchpad',
    description: 'A token launchpad platform with fair launch mechanics, vesting schedules, and liquidity locking for new crypto projects.',
    longDesc: 'Developed a fair-launch token platform with anti-bot mechanisms, linear vesting schedules, and automatic liquidity locking. Features include whitelist management, tiered allocation systems, real-time raise tracking, and post-launch analytics dashboard. Integrated with Uniswap V3 for instant DEX listing and liquidity provisioning.',
    image: '🌆',
    gradient: 'from-pink-600/20 to-orange-600/20',
    accent: '#ec4899',
    tech: ['Solidity', 'React', 'TypeScript', 'Uniswap V3 SDK', 'IPFS', 'ethers.js'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['$12M+ raised', '25+ launches', '100% liquidity locked'],
  },
  {
    id: 5,
    title: 'Cross-Chain Bridge UI',
    category: 'Web3 / Bridge',
    description: 'Cross-chain bridge interface supporting 12 networks with real-time transfer status and gas optimization.',
    longDesc: 'Designed a cross-chain bridge interface supporting 12 EVM and non-EVM networks with real-time transfer status, gas estimation, and MEV protection. Built with a focus on UX — abstracting complex bridging logic into a single-click experience. Integrated LayerZero and Wormhole messaging protocols for secure cross-chain asset transfers.',
    image: '🤖',
    gradient: 'from-green-600/20 to-teal-600/20',
    accent: '#10b981',
    tech: ['Next.js', 'TypeScript', 'LayerZero', 'Wormhole', 'Ethers.js', 'TailwindCSS'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['12 networks', '$50M+ bridged', '< 3 min avg'],
  },
  {
    id: 6,
    title: 'DAO Governance Portal',
    category: 'Web3 / DAO',
    description: 'DAO governance portal with proposal creation, delegation, voting, and treasury management for decentralized communities.',
    longDesc: 'A full-featured DAO governance portal supporting proposal creation with rich text and executable code, vote delegation with power tracking, quadratic voting options, treasury management with multi-sig integration, and delegate discovery with reputation scores.',
    image: '🏔️',
    gradient: 'from-amber-600/20 to-green-600/20',
    accent: '#f59e0b',
    tech: ['Solidity', 'Next.js', 'Snapshot', 'Safe SDK', 'TheGraph', 'TypeScript'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['25K+ voters', '$20M+ treasury', '200+ proposals'],
  },
];

const STORAGE_KEY = 'portfolio-projects-v1';

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load projects from localStorage:', err);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      } catch (err) {
        console.error('Failed to save projects to localStorage:', err);
      }
    }
  }, [projects, isLoaded]);

  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: Date.now(),
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    setProjects(DEFAULT_PROJECTS);
  }, []);

  const getProjectById = useCallback(
    (id) => projects.find((p) => p.id === id),
    [projects]
  );

  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        categories,
        isLoaded,
        addProject,
        updateProject,
        deleteProject,
        resetToDefault,
        getProjectById,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}

