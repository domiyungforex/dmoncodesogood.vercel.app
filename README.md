# 🚀 0x_zynex — Web3 Developer Portfolio

DMON CODE SO GOOD

A premium, production-ready 3D developer portfolio built with Next.js, React Three Fiber, and Framer Motion.

## ✨ Features

- **Immersive 3D Hero** — Floating geometry, particle fields, animated rings with post-processing (Bloom + Chromatic Aberration)
- **Mouse Parallax** — Camera reacts subtly to mouse movement across the entire 3D scene
- **Scroll Animations** — Framer Motion powered entrance animations throughout
- **Glassmorphism UI** — Consistent glass panels with neon accents
- **3D Skills Visualization** — Interactive orbiting skill orbs in the About section
- **Project Cards** — Hover glow effects + modal with full project details
- **Animated Skills Bars** — Scroll-triggered skill progress bars with live counters
- **Elegant Contact Form** — Floating label inputs with neon focus effects
- **Custom Cursor** — Dot + ring cursor with hover state interactions
- **Loading Screen** — Animated progress bar with 3D aesthetic
- **Smooth Navbar** — Scroll-aware with active section detection

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| 3D | Three.js + React Three Fiber + Drei |
| Animations | Framer Motion |
| Post-FX | @react-three/postprocessing |
| Styling | Tailwind CSS |
| Fonts | Syne (display) + JetBrains Mono + Outfit |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or unzip the project
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css       # Global styles, CSS variables, animations
│   ├── layout.js         # Root layout with metadata
│   └── page.js           # Main page orchestrator
├── components/
│   ├── LoadingScreen.jsx  # Animated loading screen
│   ├── Navbar.jsx         # Scroll-aware navigation
│   ├── Footer.jsx         # Footer with back-to-top
│   ├── sections/
│   │   ├── HeroSection.jsx    # Fullscreen 3D hero
│   │   ├── AboutSection.jsx   # Bio + 3D skills viz
│   │   ├── ProjectsSection.jsx # Project cards + modal
│   │   ├── SkillsSection.jsx  # Skill bars + tech orbit
│   │   └── ContactSection.jsx # Contact form + socials
│   ├── three/
│   │   ├── HeroCanvas.jsx     # Main 3D scene
│   │   └── AboutCanvas.jsx    # Skills orbit scene
│   └── ui/
│       └── CustomCursor.jsx   # Custom cursor component
├── hooks/
│   └── useMouseParallax.js   # Mouse & scroll hooks
├── public/                   # Static assets
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## 🎨 Customization

### Personal Info
- Update name/bio in `components/sections/HeroSection.jsx` and `AboutSection.jsx`
- Modify projects in `components/sections/ProjectsSection.jsx` (`PROJECTS` array)
- Update skills in `components/sections/SkillsSection.jsx` (`SKILL_CATEGORIES`)
- Add social links in `components/sections/ContactSection.jsx` (`SOCIAL_LINKS`)

### Colors / Theme
Edit CSS variables in `app/globals.css`:
```css
:root {
  --neon-blue: #00d4ff;
  --neon-purple: #7c3aed;
  --neon-pink: #ec4899;
}
```

### Fonts
Change font imports in `app/layout.js` and update `--font-display`, `--font-mono`, `--font-body` variables.

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or push to GitHub and connect via [vercel.com](https://vercel.com).

## ⚡ Performance Notes

- Three.js components are **dynamically imported** (`ssr: false`) to reduce initial bundle
- `dpr={[1, 2]}` caps pixel ratio for performance
- Bloom post-processing uses `luminanceThreshold` to avoid full-frame blurs
- Particle counts are tuned for 60fps on mid-range hardware
- All section animations use `viewport: { once: true }` to prevent re-triggering

## 📄 License

MIT — use freely for personal and commercial projects.
