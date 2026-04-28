'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    category: 'SaaS Platform',
    description: 'A real-time analytics platform with 3D data visualizations, processing over 1M events per day across distributed microservices.',
    longDesc: 'Built a comprehensive analytics platform from the ground up, featuring real-time streaming with WebSockets, custom 3D chart library built on Three.js, and a Go + Kafka backend capable of ingesting 1M+ events per day. Implemented role-based access control, white-labeling, and an embeddable widget system.',
    image: '🌌',
    gradient: 'from-blue-600/20 to-purple-600/20',
    accent: '#00d4ff',
    tech: ['Next.js', 'Three.js', 'Go', 'Kafka', 'PostgreSQL', 'Redis'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['1M+ events/day', '< 50ms latency', '99.9% uptime'],
  },
  {
    id: 2,
    title: 'Prisma NFT Marketplace',
    category: 'Web3 / DeFi',
    description: 'Decentralized NFT marketplace with gasless minting, fractional ownership, and AI-powered artwork generation.',
    longDesc: 'Designed and built a full-featured NFT marketplace on Ethereum & Polygon with EIP-712 meta-transactions for gasless UX, Chainlink VRF for provably fair randomness, and IPFS/Filecoin for decentralized storage. Integrated Stable Diffusion API for AI artwork generation at mint time.',
    image: '💎',
    gradient: 'from-purple-600/20 to-pink-600/20',
    accent: '#7c3aed',
    tech: ['React', 'Solidity', 'Hardhat', 'Ethers.js', 'IPFS', 'Stable Diffusion'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['$2M+ volume', '15K+ NFTs minted', '8K+ users'],
  },
  {
    id: 3,
    title: 'Vortex Game Engine',
    category: '3D Engine / WebGL',
    description: 'Browser-based 3D game engine with ECS architecture, custom physics, real-time multiplayer and a visual scripting system.',
    longDesc: 'Developed a WebGL2 game engine from scratch, featuring an Entity-Component-System architecture, custom physics engine using XPBD constraint solving, real-time multiplayer via WebRTC data channels, and a node-based visual scripting system inspired by Unreal\'s Blueprints.',
    image: '🎮',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    accent: '#06b6d4',
    tech: ['TypeScript', 'WebGL2', 'WebRTC', 'WASM', 'Rust', 'WebWorkers'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['60fps on mobile', '< 5ms physics', '100+ downloads'],
  },
  {
    id: 4,
    title: 'Synthwave OS',
    category: 'Creative / Interactive',
    description: 'An immersive web-based virtual OS experience with retro-futuristic aesthetics, music visualizer, and interactive terminal.',
    longDesc: 'A love letter to retro computing and synthwave culture, Synthwave OS is a fully interactive web-based operating system simulation featuring a window manager, audio reactive music visualizer built with Web Audio API, interactive filesystem, and a working BASIC interpreter.',
    image: '🌆',
    gradient: 'from-pink-600/20 to-orange-600/20',
    accent: '#ec4899',
    tech: ['Vanilla JS', 'WebAudio API', 'CSS Houdini', 'Canvas 2D', 'Tone.js'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['Awwwards Honorable Mention', '50K+ visitors', 'Featured on Hacker News'],
  },
  {
    id: 5,
    title: 'Atlas AI',
    category: 'AI / ML Platform',
    description: 'Collaborative AI workspace with real-time code generation, multi-model routing, and team knowledge graph.',
    longDesc: 'Built Atlas AI as a collaborative platform for AI-augmented development. Features include intelligent model routing across GPT-4, Claude, and Llama, real-time collaborative editing with CRDTs, a persistent vector knowledge graph, and an automated code review pipeline that integrates with GitHub Actions.',
    image: '🤖',
    gradient: 'from-green-600/20 to-teal-600/20',
    accent: '#10b981',
    tech: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'React', 'CRDTs'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['10K+ users', '$180K ARR', 'SOC2 Compliant'],
  },
  {
    id: 6,
    title: 'Terrain Generator',
    category: 'Graphics / Tool',
    description: 'Procedural 3D terrain generator using GPU compute shaders, real-time erosion simulation, and one-click export.',
    longDesc: 'A browser-based procedural terrain generation tool leveraging WebGPU compute shaders for real-time erosion simulation. Features Perlin/Simplex noise layers, hydraulic erosion, biome generation based on temperature/humidity, and export to glTF, OBJ, and heightmap PNG for use in Unity/Unreal.',
    image: '🏔️',
    gradient: 'from-amber-600/20 to-green-600/20',
    accent: '#f59e0b',
    tech: ['WebGPU', 'WGSL', 'TypeScript', 'Three.js', 'GLSL'],
    links: { live: 'https://example.com', github: 'https://github.com' },
    metrics: ['Real-time 4K', 'GPU-accelerated', 'ProductHunt #2'],
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

