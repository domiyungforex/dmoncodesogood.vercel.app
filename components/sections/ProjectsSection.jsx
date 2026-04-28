'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useMouseParallax';

const PROJECTS = [
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

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ borderColor: project.accent + '30' }}
      >
        {/* Header */}
        <div
          className={`relative h-40 rounded-t-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <span className="text-7xl filter drop-shadow-lg">{project.image}</span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <span
                className="text-xs mb-1 block"
                style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
              >
                {project.category}
              </span>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs rounded-lg glass border border-white/10 text-white/60 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                GitHub →
              </a>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs rounded-lg font-medium text-dark-900"
                style={{
                  background: project.accent,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Live Demo →
              </a>
            </div>
          </div>

          <p
            className="text-white/60 leading-relaxed mb-6 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {project.longDesc}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m) => (
              <div
                key={m}
                className="px-3 py-2 rounded-xl text-center"
                style={{ background: project.accent + '10', border: `1px solid ${project.accent}20` }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <p
              className="text-xs text-white/30 uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full glass border border-white/10 text-white/60"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? `0 0 40px ${project.accent}25, 0 20px 60px rgba(0,0,0,0.5)` : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      data-hoverable="true"
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${project.accent}40, transparent, ${project.accent}20)`,
          padding: '1px',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card */}
      <div className="relative glass h-full p-6 flex flex-col rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{project.image}</span>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: project.accent + '15',
              color: project.accent,
              border: `1px solid ${project.accent}30`,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-white/50 leading-relaxed flex-1 mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-md text-white/40 border border-white/5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="px-2 py-0.5 text-xs rounded-md text-white/30 border border-white/5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span
            className="text-xs text-white/30 group-hover:text-white/60 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Click to explore →
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? project.accent : 'transparent',
              border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.accent}08 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView(0.1);

  const categories = ['All', 'SaaS Platform', 'Web3 / DeFi', '3D Engine / WebGL', 'AI / ML Platform', 'Creative / Interactive', 'Graphics / Tool'];

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-800" />
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span
              className="text-xs text-neon-blue/60 tracking-widest uppercase mb-2 block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              02 / Projects
            </span>
            <h2
              className="text-5xl md:text-6xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Selected{' '}
              <span className="shimmer-text">Work</span>
            </h2>
            <p
              className="text-base text-white/40 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A curated selection of projects spanning performance engineering, creative development, and applied research.
            </p>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2"
          >
            {['All', 'SaaS Platform', 'Web3 / DeFi', 'AI / ML Platform', 'Creative / Interactive'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs rounded-full border transition-all duration-300 whitespace-nowrap ${
                  filter === cat
                    ? 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue'
                    : 'glass border-white/10 text-white/40 hover:text-white hover:border-white/20'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
