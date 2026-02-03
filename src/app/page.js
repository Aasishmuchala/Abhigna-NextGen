'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import HeroScene from './components/canvas/HeroScene';
import './globals.css';

export default function Home() {
  
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      
      {/* 3D BACKGROUND */}
      <HeroScene />

      {/* HERO CONTENT */}
      <section className="h-screen w-full flex flex-col justify-center items-center relative z-10 pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
        >
            <h1 className="text-[10vw] font-serif leading-[0.85] tracking-tighter mix-blend-difference">
                ABHIGNA
            </h1>
            <p className="mt-8 text-sm uppercase tracking-[0.5em] text-gold-500">
                The Architecture of Silence
            </p>
        </motion.div>
      </section>

      {/* SCROLL CONTENT */}
      <section className="min-h-screen w-full bg-black/80 backdrop-blur-md relative z-20 py-32 px-10">
        <div className="max-w-4xl mx-auto">
            <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-light leading-snug text-gray-300"
            >
                We do not build structures. We sculpt <span className="text-white italic">moments</span>. 
                Using advanced <strong>Sthyra™</strong> visualization technology, we bridge the gap between imagination and reality.
            </motion.h2>

            <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="project-card group cursor-pointer">
                    <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative">
                        <img 
                            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600" 
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <h3 className="mt-6 text-2xl font-serif">Aadhya Serene</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">Under Construction</p>
                </div>

                <div className="project-card group cursor-pointer mt-20">
                    <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative">
                        <img 
                            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2600" 
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="mt-6 text-2xl font-serif">Misty Woods</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">Completed</p>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}
