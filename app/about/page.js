'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-dark-900 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-neon-blue transition-colors mb-8"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              
              <h1
                className="text-5xl md:text-7xl font-black text-white mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                About{' '}
                <span className="shimmer-text">Me</span>
              </h1>
              <p
                className="text-base md:text-lg text-white/40 max-w-2xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Full-stack developer and creative technologist building immersive digital experiences.
              </p>
            </motion.div>
          </div>
        </section>

        <AboutSection />

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-dark-800" />
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Want to see what I can <span className="text-neon-blue">build</span>?
              </h2>
              <p
                className="text-white/40 mb-8 max-w-xl mx-auto"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Check out my projects or get in touch to discuss your next idea.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl glass border border-white/10 text-white/70 text-sm font-semibold hover:border-neon-blue/40 hover:text-white transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

