'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/20 flex items-center justify-center">
              <span
                className="text-xs font-bold text-neon-blue"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                0x
              </span>
            </div>
            <span
              className="text-xs font-bold tracking-widest text-white/40 uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              DMON CODE SO GOOD
            </span>
          </div>

          {/* Copyright */}
          <p
            className="text-xs text-white/25 text-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            &copy; {new Date().getFullYear()} 0x_zynex. Built for Web3 &mdash; DMON CODE SO GOOD
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs text-white/30 hover:text-neon-blue transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
            data-hoverable="true"
          >
            Back to top
            <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

