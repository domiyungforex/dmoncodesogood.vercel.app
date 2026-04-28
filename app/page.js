'use client';

import { useState, useEffect } from 'react';
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
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
