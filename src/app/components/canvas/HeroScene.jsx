'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AbstractBuilding() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating rotation
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
  });

  return (
    <group ref={meshRef}>
        {/* Main Architectural Block */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 4, 3]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Golden Accent Line */}
        <mesh position={[1.51, 0, 0]}>
            <boxGeometry args={[0.05, 4, 0.05]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        
        {/* Glass Elements */}
        <mesh position={[0, 0.5, 1.51]}>
            <planeGeometry args={[2, 1]} />
            <meshPhysicalMaterial 
                transmission={0.9} 
                roughness={0} 
                thickness={0.5} 
                ior={1.5}
                color="#ffffff"
            />
        </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10">
        <Canvas gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <Environment preset="city" />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <AbstractBuilding />
            </Float>
            
            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            
            {/* Dramatic Lighting */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={500} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={200} color="#d4af37" />
        </Canvas>
    </div>
  );
}
