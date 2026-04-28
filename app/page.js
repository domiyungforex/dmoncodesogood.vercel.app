'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading with realistic progress
    const steps = [
      { target: 20, delay: 150 },
      { target: 45, delay: 300 },
      { target: 70, delay: 500 },
      { target: 88, delay: 400 },
      { target: 100, delay: 300 },
    ];

    let currentStep = 0;
    const tick = () => {
      if (currentStep >= steps.length) {
        setTimeout(() => setLoading(false), 400);
        return;
      }
      const { target, delay } = steps[currentStep];
      setProgress(target);
      currentStep++;
      setTimeout(tick, delay);
    };

    setTimeout(tick, 200);
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen progress={progress} />}
      
      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        <main>
          <HeroSection />
          
          {/* About Section with View All link */}
          <AboutSection />
          <div className="relative bg-dark-900 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex justify-end">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs text-neon-blue hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View full about page →
              </Link>
            </div>
          </div>
          
          {/* Projects Section with View All link */}
          <ProjectsSection />
          <div className="relative bg-dark-800 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs text-neon-blue hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View all projects →
              </Link>
            </div>
          </div>
          
          {/* Skills Section with View All link */}
          <SkillsSection />
          <div className="relative bg-dark-900 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex justify-end">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 text-xs text-neon-blue hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View all skills →
              </Link>
            </div>
          </div>
          
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
