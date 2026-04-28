'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useMouseParallax';

const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    color: '#00d4ff',
    icon: '🖥️',
    skills: [
      { name: 'React / Next.js', level: 98 },
      { name: 'TypeScript', level: 95 },
      { name: 'Three.js / R3F', level: 90 },
      { name: 'Framer Motion', level: 92 },
      { name: 'Tailwind CSS', level: 96 },
      { name: 'WebGL / GLSL', level: 80 },
    ],
  },
  {
    name: 'Backend',
    color: '#7c3aed',
    icon: '⚙️',
    skills: [
      { name: 'Node.js / Bun', level: 95 },
      { name: 'Python / FastAPI', level: 88 },
      { name: 'Go', level: 82 },
      { name: 'PostgreSQL', level: 90 },
      { name: 'Redis', level: 85 },
      { name: 'Kafka', level: 78 },
    ],
  },
  {
    name: 'Web3',
    color: '#ec4899',
    icon: '⛓️',
    skills: [
      { name: 'Solidity', level: 88 },
      { name: 'Ethers.js / Viem', level: 92 },
      { name: 'Hardhat / Foundry', level: 85 },
      { name: 'IPFS / Filecoin', level: 80 },
      { name: 'The Graph', level: 75 },
      { name: 'LayerZero', level: 70 },
    ],
  },
  {
    name: 'DevOps / Cloud',
    color: '#10b981',
    icon: '☁️',
    skills: [
      { name: 'Docker / K8s', level: 85 },
      { name: 'AWS / GCP', level: 82 },
      { name: 'Terraform', level: 75 },
      { name: 'CI/CD (GitHub Actions)', level: 92 },
      { name: 'Vercel / Cloudflare', level: 95 },
      { name: 'Prometheus / Grafana', level: 78 },
    ],
  },
];

const TECH_ICONS = [
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { name: 'Three.js', icon: '🎯', color: '#ffffff' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'Python', icon: '🐍', color: '#f7c948' },
  { name: 'Go', icon: '🐹', color: '#00acd7' },
  { name: 'Rust', icon: '🦀', color: '#ff4d00' },
  { name: 'Docker', icon: '🐳', color: '#2496ed' },
  { name: 'AWS', icon: '☁️', color: '#ff9900' },
  { name: 'Solidity', icon: '💎', color: '#627eea' },
  { name: 'GraphQL', icon: '◈', color: '#e535ab' },
];

function SkillBar({ name, level, color, index }) {
  const [ref, inView] = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <span
          className="text-xs text-white/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {name}
        </span>
        <span
          className="text-xs"
          style={{ color, fontFamily: 'var(--font-mono)' }}
        >
          {level}%
        </span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.9, ease: 'easeOut' }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCategory({ category, index }) {
  const [ref, inView] = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      style={{
        boxShadow: `0 0 40px ${category.color}08`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
        >
          {category.icon}
        </div>
        <div>
          <h3
            className="text-base font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {category.name}
          </h3>
          <p
            className="text-xs"
            style={{ color: category.color, fontFamily: 'var(--font-mono)' }}
          >
            {category.skills.length} technologies
          </p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-3">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TechIcon({ tech, index, total }) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 38; // percentage
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 + 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="w-12 h-12 rounded-xl glass border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          boxShadow: `0 0 20px ${tech.color}20`,
        }}
      >
        <span className="text-lg">{tech.icon}</span>
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        <span
          className="text-xs text-white/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/8 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            className="text-xs text-neon-blue/60 tracking-widest uppercase mb-2 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            03 / Skills
          </span>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Technical{' '}
            <span className="shimmer-text">Arsenal</span>
          </h2>
          <p
            className="text-base text-white/40 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Technologies I wield to build high-performance products from concept to production.
          </p>
        </motion.div>

        {/* Orbit visualization + text */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          {/* Tech orbit circle */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-80 h-80">
              {/* Orbit rings */}
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-neon-blue/10"
                  style={{
                    width: `${i * 80}%`,
                    height: `${i * 80}%`,
                    top: `${(100 - i * 80) / 2}%`,
                    left: `${(100 - i * 80) / 2}%`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 * i, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl glass border border-neon-blue/30 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>

              {/* Tech icons */}
              {TECH_ICONS.map((tech, i) => (
                <TechIcon key={tech.name} tech={tech} index={i} total={TECH_ICONS.length} />
              ))}
            </div>
          </div>

          {/* Summary text */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Polyglot by choice,{' '}
                <span className="text-neon-blue">expert by obsession</span>
              </h3>
              <p
                className="text-white/50 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                I believe great engineers understand the full spectrum of the stack. Whether
                it&apos;s optimizing a React render cycle, writing a memory-safe Rust library, 
                or deploying a gas-optimized smart contract — I&apos;m at home in each layer.
              </p>
            </div>

            {/* Achievement badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🏆', text: 'Awwwards SOTD', sub: 'Creative Development' },
                { icon: '⭐', text: '500+ GitHub Stars', sub: 'Open Source' },
                { icon: '📚', text: 'Published Author', sub: 'Web3 Dev Magazine' },
                { icon: '🎤', text: 'Conference Speaker', sub: 'React Summit 2024' },
              ].map(({ icon, text, sub }) => (
                <div
                  key={text}
                  className="p-4 rounded-xl glass border border-white/5 hover:border-neon-blue/20 transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p
                      className="text-sm font-medium text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {text}
                    </p>
                    <p
                      className="text-xs text-white/30"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill categories grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {SKILL_CATEGORIES.map((category, i) => (
            <SkillCategory key={category.name} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
