import './globals.css';
import { ProjectsProvider } from '@/context/ProjectsContext';

export const metadata = {
  title: '0x_zynex — Web3 Frontend Developer | DApps, DeFi & Smart Contract UIs',
  description: 'DMON CODE SO GOOD. Building high-converting Web3 interfaces that turn visitors into users. DApp frontend, DeFi dashboards, NFT marketplaces, and smart contract integrations.',
  keywords: ['Web3', 'DApp', 'DeFi', 'NFT', 'smart contract', 'frontend', 'React', 'Three.js', 'Next.js', 'Solidity', 'TypeScript', 'DMON CODE SO GOOD'],
  openGraph: {
    title: '0x_zynex — Web3 Frontend Developer',
    description: 'DMON CODE SO GOOD. High-converting Web3 interfaces for crypto founders.',
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
