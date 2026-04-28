'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ progress }) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= progress) {
          clearInterval(timer);
          return prev;
        }
        return Math.min(prev + 2, progress);
      });
    }, 20);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-neon-blue/10"
                style={{ width: `${i * 200}px`, height: `${i * 200}px` }}
                animate={{ rotate: 360, scale: [1, 1.02, 1] }}
                transition={{
                  rotate: { duration: 8 * i, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="w-20 h-20 rounded-2xl glass gradient-border flex items-center justify-center">
                <span
                  className="text-3xl font-bold neon-text-blue"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  AC
                </span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-neon-blue/10 blur-xl animate-glow-pulse" />
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p
                className="text-sm tracking-[0.3em] text-neon-blue/70 uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Initializing Experience
              </p>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              className="w-64 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {/* Track */}
              <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full relative"
                  style={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Glowing head */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-neon-blue" />
                </motion.div>
              </div>

              {/* Progress percentage */}
              <div className="flex justify-between mt-3">
                <span
                  className="text-xs text-white/30"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Loading assets
                </span>
                <span
                  className="text-xs text-neon-blue/80 tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {displayProgress}%
                </span>
              </div>
            </motion.div>

            {/* Scanning line effect */}
            <motion.div
              className="absolute w-64 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent"
              animate={{ y: [-40, 40, -40] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Corner decorations */}
          {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8`}>
              <div className="w-full h-[2px] bg-neon-blue/30" />
              <div className="h-full w-[2px] bg-neon-blue/30" />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
