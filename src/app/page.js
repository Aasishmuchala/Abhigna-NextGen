'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image as DreiImage, useScroll, ScrollControls, Scroll, Text } from '@react-three/drei';
import { projects } from './data';
import * as THREE from 'three';

// --- 3D COMPONENTS ---

function ProjectItem({ index, position, scale, url, title, location }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    // Subtle float
    ref.current.material.zoom = THREE.MathUtils.lerp(ref.current.material.zoom, hovered ? 1.2 : 1, delta * 2);
    ref.current.material.grayscale = THREE.MathUtils.lerp(ref.current.material.grayscale, hovered ? 0 : 0.8, delta * 2);
  });

  return (
    <group position={position}>
      <DreiImage 
        ref={ref}
        url={url} 
        scale={scale} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        transparent
      />
      {/* 3D Text Overlay */}
      <Text 
        position={[-scale[0]/2, -scale[1]/2 - 0.5, 0]} 
        anchorX="left" 
        fontSize={0.3} 
        color={hovered ? "#d4af37" : "white"}
        font="/fonts/Cinzel-Regular.ttf" // You need to add this font to public/fonts/
      >
        {title.toUpperCase()}
      </Text>
      <Text 
        position={[-scale[0]/2, -scale[1]/2 - 0.8, 0]} 
        anchorX="left" 
        fontSize={0.15} 
        color="#888"
      >
        {location}
      </Text>
    </group>
  );
}

function Scene() {
  const { width, height } = useThree((state) => state.viewport);
  const data = projects;
  
  return (
    <ScrollControls pages={data.length + 1} damping={0.1}>
      <Scroll>
        {/* HERO */}
        {/* We keep the hero empty in 3D, handled by DOM for crisp text */}
      </Scroll>
      
      <Scroll>
        {/* PROJECT GALLERY */}
        {data.map((project, i) => (
          <ProjectItem 
            key={project.id}
            index={i}
            // Layout logic: Zig-zag pattern down the page
            position={[
              (i % 2 === 0 ? -1 : 1) * (width * 0.25), 
              -height * (i + 1) + 2, 
              0
            ]}
            scale={[4, 5, 1]}
            url={project.image} // Ensure these images exist in /public/images/
            title={project.title}
            location={project.location}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

// --- MAIN PAGE ---

export default function Home() {
  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, smooth: true });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="w-full h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* 3D CANVAS LAYER */}
      <div className="fixed inset-0 z-0">
        <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 5], fov: 50 }}>
            <Scene />
        </Canvas>
      </div>

      {/* DOM UI LAYER (Overlays) */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none mix-blend-difference">
        {/* NAV */}
        <nav className="flex justify-between p-10">
            <div className="text-xl font-bold tracking-[0.2em] pointer-events-auto cursor-pointer">ABHIGNA</div>
            <div className="text-sm pointer-events-auto cursor-pointer hover:text-gold-500">MENU +</div>
        </nav>

        {/* HERO TEXT */}
        <section className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-[12vw] leading-none font-serif tracking-tighter">
                ABHIGNA
            </h1>
            <div className="flex justify-between w-[40vw] mt-4 text-xs tracking-[0.3em] uppercase opacity-70">
                <span>Bangalore</span>
                <span>Est. 2007</span>
            </div>
        </section>

        {/* FOOTER HINT */}
        <div className="fixed bottom-10 right-10 text-xs opacity-50">
            SCROLL TO EXPLORE
        </div>
      </div>

    </main>
  );
}
