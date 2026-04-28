'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Environment,
  Stars,
  Sparkles,
  Trail,
  useTexture,
  RoundedBox,
  Torus,
  TorusKnot,
  Icosahedron,
  Octahedron,
  Dodecahedron,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useMouseParallax } from '@/hooks/useMouseParallax';

/* ─────────────── Sub-components ─────────────── */

function CameraController() {
  const { camera } = useThree();
  const { x, y } = useMouseParallax(0.4);
  const targetRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    targetRef.current.x += (x * 1.5 - targetRef.current.x) * 0.05;
    targetRef.current.y += (y * 1.0 - targetRef.current.y) * 0.05;
    camera.position.x = targetRef.current.x;
    camera.position.y = targetRef.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function MainOrb() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <sphereGeometry args={[1.6, 128, 128]} />
      <MeshDistortMaterial
        color="#0a0a1a"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function GlowRing({ radius = 2.2, color = '#00d4ff', speed = 0.8, tilt = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 180]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function FloatingCrystal({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.3 * speed + offset;
      ref.current.rotation.y = clock.getElapsedTime() * 0.5 * speed + offset;
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.7 * speed + offset) * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0} floatIntensity={0}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0}
          metalness={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function FloatingCube({ position, scale = 1, speed = 0.5 }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2 * speed + offset;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3 * speed + offset;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
}

function FloatingKnot({ position, scale = 0.3 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusKnotGeometry args={[1, 0.35, 128, 16, 2, 3]} />
      <MeshWobbleMaterial
        color="#ec4899"
        emissive="#ec4899"
        emissiveIntensity={0.3}
        factor={0.3}
        speed={1}
        roughness={0.1}
        metalness={0.7}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function ParticleField({ count = 1500 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#06b6d4'),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function GridPlane() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.z = (clock.getElapsedTime() * 0.5) % 1;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, '#00d4ff', '#7c3aed']}
      position={[0, -3.5, -8]}
      rotation={[0, 0, 0]}
      material-transparent
      material-opacity={0.12}
    />
  );
}

/* ─────────────── Main Canvas ─────────────── */

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <CameraController />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00d4ff" />
        <pointLight position={[-5, -5, 5]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#ec4899" />

        {/* Main central orb */}
        <MainOrb />

        {/* Orbital rings */}
        <GlowRing radius={2.2} color="#00d4ff" speed={0.4} tilt={0.4} />
        <GlowRing radius={2.5} color="#7c3aed" speed={-0.3} tilt={-0.6} />
        <GlowRing radius={2.8} color="#ec4899" speed={0.2} tilt={1.0} />

        {/* Floating objects */}
        <FloatingCrystal position={[3.5, 1.2, -1]} color="#00d4ff" scale={0.9} speed={0.9} />
        <FloatingCrystal position={[-3.2, -0.8, -1.5]} color="#7c3aed" scale={0.7} speed={1.1} />
        <FloatingCrystal position={[2.5, -2, 0]} color="#ec4899" scale={0.6} speed={0.8} />
        <FloatingCrystal position={[-2.8, 2, -2]} color="#10b981" scale={0.5} speed={1.3} />

        <FloatingCube position={[4.5, -1.5, -2]} scale={0.8} speed={0.6} />
        <FloatingCube position={[-4, 1.5, -3]} scale={0.6} speed={0.9} />

        <FloatingKnot position={[-4.5, -0.5, -2]} scale={0.25} />

        {/* Stars */}
        <Stars
          radius={80}
          depth={50}
          count={3000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />

        {/* Sparkles around main orb */}
        <Sparkles
          count={80}
          scale={5}
          size={1.5}
          speed={0.3}
          opacity={0.6}
          color="#00d4ff"
        />

        {/* Custom particle field */}
        <ParticleField count={1200} />

        {/* Grid */}
        <GridPlane />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Post processing */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            offset={[0.0005, 0.0005]}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
