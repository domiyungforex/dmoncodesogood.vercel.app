import './globals.css';
import { ProjectsProvider } from '@/context/ProjectsContext';

export const metadata = {
  title: 'AKINYELE DOMINION — Full-Stack & Creative Developer',
  description: 'Building immersive digital experiences at the intersection of code and creativity. Specializing in React, Three.js, and modern web architecture. DMON CODE SO GOOD',
  keywords: ['developer', 'portfolio', '3D', 'Three.js', 'React', 'Next.js', 'full-stack'],
  openGraph: {
    title: 'AKINYELE DOMINION — Developer Portfolio',
    description: 'Immersive 3D developer portfolio — DMON CODE SO GOOD',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030308',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ProjectsProvider>
          {children}
        </ProjectsProvider>
      </body>
    </html>
  );
}
