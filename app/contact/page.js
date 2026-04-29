'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-dark-800" />
          <div className="absolute inset-0 bg-gradient-radial from-neon-pink/6 via-transparent to-transparent" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          
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
              
              <p
                className="text-base md:text-lg text-white/40 max-w-2xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Have a project in mind or just want to chat? I&apos;m always open to interesting conversations.
              </p>
            </motion.div>
          </div>
        </section>

        <ContactSection />

        {/* Quick Links */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-dark-900" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3
                className="text-2xl font-bold text-white mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Explore More
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  About
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Projects
                </Link>
                <Link
                  href="/skills"
                  className="px-6 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Skills
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

