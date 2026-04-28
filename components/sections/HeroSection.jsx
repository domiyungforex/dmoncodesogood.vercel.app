'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-dark-900" />,
});

const TYPED_STRINGS = [
  'immersive digital experiences.',
  'performant web applications.',
  'creative 3D interfaces.',
  'full-stack solutions.',
];

function TypedText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = TYPED_STRINGS[index];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPED_STRINGS.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, index]);

  return (
    <span className="neon-text-blue typing-cursor" style={{ fontFamily: 'var(--font-mono)' }}>
      {displayed}
    </span>
  );
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.8,
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export default function HeroSection() {
  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-dark-900">
      {/* 3D Canvas - fullscreen background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-dark-900/30 to-dark-900/80" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-dark-900 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Status badge */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-green/20">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span
              className="text-xs text-white/60 tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Available for work
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-4xl">
          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-white/50 mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AKINYELE{' '}
            <span className="shimmer-text">DOMINION</span>
          </motion.h1>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-3xl text-white/70 mt-4 font-light max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            I build{' '}
            <TypedText />
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          custom={5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          {/* Primary CTA */}
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-xl overflow-hidden"
            data-hoverable="true"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-90 group-hover:opacity-100 transition-opacity" />
            {/* Shimmer sweep */}
            <div className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <span
              className="relative text-sm font-semibold text-white tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View My Work
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 rounded-xl glass border border-white/10 hover:border-neon-blue/40 transition-all duration-300"
            data-hoverable="true"
          >
            <span
              className="text-sm font-semibold text-white/70 group-hover:text-white tracking-wider uppercase transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Get In Touch
            </span>
          </button>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          custom={6}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {['React', 'Next.js', 'Three.js', 'Node.js', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full glass border border-white/5 text-white/40"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        data-hoverable="true"
      >
        <span
          className="text-xs text-white/30 tracking-widest uppercase group-hover:text-white/60 transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-neon-blue" />
        </motion.div>
      </motion.button>

      {/* Corner HUD elements */}
      <div className="absolute top-24 left-6 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col gap-1"
        >
          {['Full-Stack Dev', 'Creative Coder', 'UI/UX Enthusiast'].map((tag, i) => (
            <span
              key={tag}
              className="text-xs text-white/20 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-neon-blue/40">{'// '}</span>
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-24 right-6 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col items-end gap-1"
        >
          <span className="text-xs text-white/20" style={{ fontFamily: 'var(--font-mono)' }}>
            5+ years experience
          </span>
          <span className="text-xs text-white/20" style={{ fontFamily: 'var(--font-mono)' }}>
            30+ projects shipped
          </span>
          <span className="text-xs text-white/20" style={{ fontFamily: 'var(--font-mono)' }}>
            10+ clients served
          </span>
        </motion.div>
      </div>
    </section>
  );
}
