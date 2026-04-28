'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Detect active section only on home page
      if (isHome) {
        const sections = ['about', 'projects', 'skills', 'contact'];
        for (const id of sections.reverse()) {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleNavClick = (e, href) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const isActive = (href) => {
    if (href.startsWith('/')) {
      return pathname === href;
    }
    return isHome && activeSection === href.replace('#', '');
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass border-b border-neon-blue/10'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center group-hover:border-neon-blue/60 transition-all duration-300">
                <span
                  className="text-sm font-bold text-neon-blue"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  AD
                </span>
              </div>
              <span
                className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                AKINYELE DOMINION
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group ${
                    active ? 'text-neon-blue' : 'text-white/50 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className="text-neon-blue/50 text-xs mr-1">
                    {String(navLinks.findIndex(l => l.href === href) + 1).padStart(2, '0')}.
                  </span>
                  {label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-neon-blue/5 border border-neon-blue/20"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Menu toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-medium text-neon-blue border border-neon-blue/30 rounded-lg hover:bg-neon-blue/10 hover:border-neon-blue/60 transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>Resume</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-px bg-white transition-all duration-300 ${
                    menuOpen
                      ? i === 0 ? 'w-5 rotate-45 translate-y-[5px]'
                        : i === 1 ? 'w-0 opacity-0'
                        : 'w-5 -rotate-45 -translate-y-[5px]'
                      : i === 1 ? 'w-4' : 'w-5'
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-6 px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-neon-blue transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Home
            </Link>
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-neon-blue transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-white/50 hover:text-neon-blue transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
