'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useMouseParallax';

const AboutCanvas = dynamic(() => import('@/components/three/AboutCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin" />
    </div>
  ),
});

const stats = [
  { number: '5+', label: 'Years in Web3' },
  { number: '30+', label: 'DApps Shipped' },
  { number: '10+', label: 'Protocols Built' },
  { number: '∞', label: 'Contracts Integrated' },
];

const highlights = [
  { icon: '⚡', title: 'Gas-Optimized UIs', desc: 'Sub-100ms wallet interactions, optimized contract calls, and 95+ Lighthouse scores.' },
  { icon: '🎨', title: 'Security First', desc: 'Building interfaces that make complex blockchain interactions feel effortless.' },
  { icon: '🔗', title: 'Protocol Integration', desc: 'From smart contract events to pixel-perfect UIs — I bridge on-chain and off-chain.' },
  { icon: '🌐', title: 'Security First', desc: 'Audited patterns, secure wallet flows, and battle-tested DeFi components.' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

export default function AboutSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-start mb-16"
        >
          <motion.span
            variants={item}
            className="text-xs text-neon-blue/60 tracking-widest uppercase mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            01 / About
          </motion.span>
          <motion.h2
            variants={item}
            className="text-5xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About{' '}
            <span className="shimmer-text">Me</span>
          </motion.h2>
          <motion.div variants={item} className="mt-4 section-divider w-full max-w-xs" />
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — 3D Canvas */}
          <motion.div
            variants={item}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden gradient-border"
          >
            <div className="absolute inset-0 bg-dark-800/60 backdrop-blur-sm" />
            <AboutCanvas />
            {/* Skill labels overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
              {['React', 'Node.js', 'Three.js', 'TypeScript', 'Python', 'Web3'].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-md glass border border-white/10 text-white/50"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            <motion.div variants={item}>
              <p
                className="text-xl text-white/80 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                I&apos;m a{' '}
                <span className="text-neon-blue font-medium">Web3 frontend developer</span> and{' '}
                <span className="text-neon-purple font-medium">DeFi interface specialist</span> based in
                the blockchain, obsessed with building digital experiences that live at the
                intersection of design and engineering.
              </p>
              <p
                className="text-base text-white/50 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                With 5+ years crafting products at startups and agencies, I bring together
                deep technical expertise and an eye for aesthetics to ship products that users
                genuinely love. Currently exploring the frontier of real-time 3D web, generative AI
                interfaces, and decentralized applications.
              </p>
            </motion.div>

            {/* Highlight cards */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={item}
                  className="p-4 rounded-xl glass border border-white/5 hover:border-neon-blue/20 transition-all duration-300 group"
                >
                  <span className="text-2xl mb-2 block">{icon}</span>
                  <h4
                    className="text-sm font-semibold text-white mb-1 group-hover:text-neon-blue transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {title}
                  </h4>
                  <p
                    className="text-xs text-white/40 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-4 gap-4 pt-2">
              {stats.map(({ number, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <span
                    className="text-2xl md:text-3xl font-black neon-text-blue"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {number}
                  </span>
                  <span
                    className="text-xs text-white/30 mt-1 leading-tight"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
