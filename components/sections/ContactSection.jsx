'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useMouseParallax';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    handle: '@domiyungforex',
    url: 'https://github.com/domiyungforex',
    color: '#ffffff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '0x_zynex',
    url: 'https://linkedin.com',
    color: '#0a66c2',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    handle: '@domiyung',
    url: 'https://x.com/domiyung',
    color: '#1d9bf0',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'oxzzynex@gmail.com',
    url: 'mailto:oxzzynex@gmail.com',
    color: '#ec4899',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function FormField({ label, name, type = 'text', placeholder, value, onChange, multiline, error }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${focused || value ? '-top-2.5 text-xs px-1' : 'top-4 text-sm'}`}
        style={{
          color: focused ? '#00d4ff' : 'rgba(255,255,255,0.3)',
          background: focused || value ? '#080812' : 'transparent',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {label}
      </label>

      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        className={`w-full px-4 py-4 rounded-xl bg-dark-700/50 border text-white text-sm outline-none transition-all duration-300 resize-none ${focused ? 'border-neon-blue/60 shadow-neon-blue' : error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'} ${multiline ? 'min-h-[120px]' : ''}`}
        style={{ fontFamily: 'var(--font-body)' }}
      />

      <div
        className={`absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-500 ${focused ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
      />

      {error && (
        <p className="mt-1 text-xs text-red-400" style={{ fontFamily: 'var(--font-mono)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-pink/6 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <span className="text-xs text-neon-blue/60 tracking-widest uppercase mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>04 / Contact</span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Let&apos;s <span className="shimmer-text">Build Together</span></h2>
          <p className="text-base text-white/40 max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>Building a Web3 product? I help crypto founders ship interfaces that convert. Let&apos;s talk.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="p-8 rounded-3xl glass border border-white/5 gradient-border">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-neon-green/20 border border-neon-green/30 flex items-center justify-center text-3xl">✓</div>
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Message Sent!</h3>
                    <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="mt-4 px-6 py-3 text-sm rounded-xl glass border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 transition-all" style={{ fontFamily: 'var(--font-mono)' }}>Send another →</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="flex flex-col gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                      <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <FormField label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                    <FormField label="Your Message" name="message" value={form.message} onChange={handleChange} multiline error={errors.message} />

                    <button onClick={handleSubmit} disabled={status === 'sending'} className="group relative w-full py-4 rounded-xl overflow-hidden mt-2 disabled:opacity-70" data-hoverable="true">
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple transition-opacity group-hover:opacity-90" />
                      <div className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      <span className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                        {status === 'sending' ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                        ) : (
                          <>Send Message<svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                        )}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2 flex flex-col gap-8" initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="p-6 rounded-2xl glass border border-neon-green/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs text-neon-green font-medium uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Open to Web3 projects</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>Currently taking on DApp frontend, DeFi dashboard, and NFT marketplace projects. Response time: usually within 12–24 hours.</p>
            </div>

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Find me on-chain</p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map(({ name, handle, url, color, icon }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-white/15 transition-all duration-300" data-hoverable="true" style={{ '--hover-color': color }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:text-white" style={{ background: `${color}15`, border: `1px solid ${color}30`, color: `${color}` }}>{icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-display)' }}>{name}</p>
                      <p className="text-xs text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>{handle}</p>
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl glass border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-xl">📍</div>
              <div>
                <p className="text-sm text-white font-medium" style={{ fontFamily: 'var(--font-display)' }}>Remote / Global</p>
                <p className="text-xs text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>Working with teams across all time zones</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
