'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const SKILLS_3D = [
  { label: 'React', color: '#61dafb', position: [2.5, 1, 0] },
  { label: 'Node.js', color: '#68a063', position: [-2.5, 1, 0] },
  { label: 'Three.js', color: '#ffffff', position: [0, 2.5, 0] },
  { label: 'TypeScript', color: '#3178c6', position: [2.5, -1, 0] },
  { label: 'Python', color: '#f7c948', position: [-2.5, -1, 0] },
  { label: 'Web3', color: '#ec4899', position: [0, -2.5, 0] },
];

function SkillOrb({ position, color, label, index }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.08);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.06} />
        </mesh>

        {/* Main orb */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Orbit ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.01, 6, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function CentralCore() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.2;
      ref.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.4}
        roughness={0}
        metalness={1}
        wireframe
      />
    </mesh>
  );
}

function ConnectingLines() {
  const ref = useRef();
  const geometry = useMemo(() => {
    const points = [];
    SKILLS_3D.forEach(({ position }) => {
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(...position));
    });
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.08 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.1} />
    </lineSegments>
  );
}

export default function AboutCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7c3aed" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />

        <CentralCore />
        <ConnectingLines />

        {SKILLS_3D.map((skill, i) => (
          <SkillOrb key={skill.label} {...skill} index={i} />
        ))}

        <Sparkles count={20} scale={6} size={0.8} speed={0.2} opacity={0.3} color="#00d4ff" />
      </Suspense>
    </Canvas>
  );
}
