import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 0, title: 'NexTest – Online Examination Platform', color: '#1a1a1a', textColor: '#fff', tag: 'Full-Stack (MERN)', status: 'Coming Soon' },
  { id: 1, title: 'Breast Cancer Detection ML Model', color: '#e8186c', textColor: '#fff', tag: 'Machine Learning', status: 'Live', link: 'https://cancervisionai.streamlit.app/' },
  { id: 2, title: 'Automated Timetable Generator', color: '#1a0a2e', textColor: '#fff', tag: 'Java Backend', status: 'Coming Soon' },
  { id: 3, title: 'Budget & Finance Tracker', color: '#f0f0e8', textColor: '#111', tag: 'Web App', status: 'Live', link: 'https://stellar-kringle-ca0c97.netlify.app/' },
  { id: 4, title: 'MY PROJECTS', color: '#f4c400', textColor: '#111', tag: 'Explore', isFolder: true },
  { id: 5, title: '150+ LeetCode DSA Problems Solved', color: '#2d1a2e', textColor: '#fff', tag: 'Algorithms' },
  { id: 6, title: 'Responsive UI/UX Interfaces', color: '#111', textColor: '#f4c400', tag: 'Frontend Design' },
  { id: 7, title: 'End-to-End Database Architecture', color: '#0a1a3e', textColor: '#aad4ff', tag: 'MySQL & MongoDB' },
  { id: 8, title: 'Firebase Auth & Node REST APIs', color: '#22cc44', textColor: '#111', tag: 'Backend' },
];

export default function Projects() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: All perfectly hidden behind the center folder
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: '0vw',
          y: '0vh',
          // Hide perfectly behind the folder
          rotation: 0, 
          // Folder (Index 4) is absolute top, everything else is below it
          zIndex: i === 4 ? 100 : 50 - i, 
          // Scale down slightly so they don't poke out from behind the folder
          scale: i === 4 ? 1 : 0.8, 
        });
      });

      // 2. Timeline for the scatter/fan-out effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // Scroll for 2 window heights to complete the scatter
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // 3. Grid Coordinates to fan out into a 3x3 layout (using vh to strictly fit screen height)
      const grid = [
        { x: '-32vw', y: '-30vh', rot: -6 }, // Index 0 (Top Left)
        { x: '0vw',   y: '-33vh', rot: 2 },  // Index 1 (Top Center)
        { x: '32vw',  y: '-30vh', rot: 8 },  // Index 2 (Top Right)
        { x: '-34vw', y: '0vh',   rot: -3 }, // Index 3 (Center Left)
        { x: '0vw',   y: '0vh',   rot: 0 },  // Index 4 (Center Folder stays in middle)
        { x: '34vw',  y: '2vh',   rot: 5 },  // Index 5 (Center Right)
        { x: '-32vw', y: '32vh',  rot: -5 }, // Index 6 (Bottom Left)
        { x: '0vw',   y: '34vh',  rot: -2 }, // Index 7 (Bottom Center)
        { x: '32vw',  y: '30vh',  rot: 6 },  // Index 8 (Bottom Right)
      ];

      // 4. Animate each card to its specific grid position
      cardsRef.current.forEach((card, i) => {
        tl.to(card, {
          x: grid[i].x,
          y: grid[i].y,
          rotation: grid[i].rot,
          scale: 1, 
          ease: 'power2.out' // Looks better flying out
        }, 0); // all start scattering at the exact same time
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      style={{
        height: '100vh',
        background: '#f8f8f5',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Huge "MY WORK" Text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1, // Behind the cards
      }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 24vw, 30rem)',
          fontWeight: 900,
          color: '#111',
          lineHeight: 0.8,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          userSelect: 'none'
        }}>
          MY WORK
        </h1>
      </div>

      {/* Cards Stack/Grid Container */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={el => cardsRef.current[i] = el}
            onClick={() => {
              if (proj.link) window.open(proj.link, '_blank');
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '26vw',
              height: '16vw',
              minWidth: 260,
              minHeight: 160,
              background: proj.color,
              borderRadius: proj.isFolder ? '4px 16px 16px 16px' : '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
            }}
            className="group hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
          >
            {/* Folder Tab Fake Element */}
            {proj.isFolder && (
              <div style={{
                position: 'absolute',
                top: -16, left: 0,
                width: '35%', height: 16,
                background: proj.color,
                borderRadius: '8px 8px 0 0',
              }} />
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase', 
                  color: proj.textColor,
                  opacity: 0.7 
                }}>
                  {proj.tag}
                </span>
                {proj.status && (
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: proj.status === 'Live' ? 'rgba(34, 204, 68, 0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${proj.status === 'Live' ? 'rgba(34, 204, 68, 0.3)' : 'rgba(255,255,255,0.2)'}`,
                      color: proj.status === 'Live' ? '#22cc44' : proj.textColor,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {/* Pulsing Dot for Live Status */}
                    {proj.status === 'Live' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22cc44] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22cc44]"></span>
                      </span>
                    )}

                    <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {proj.status}
                    </span>

                    {/* Animated Arrow (Moves on Card Hover) */}
                    {proj.status === 'Live' && (
                      <span 
                        className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                        style={{ fontSize: '0.8rem', fontWeight: 900 }}
                      >
                        ↗
                      </span>
                    )}
                  </div>
                )}
              </div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(1.2rem, 1.8vw, 2rem)',
                fontWeight: 800,
                color: proj.textColor,
                lineHeight: 1.1,
                marginTop: 8
              }} className="group-hover:translate-x-1 transition-transform duration-300">
                {proj.title}
              </h3>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: 36, height: 36, 
                borderRadius: '50%', 
                background: proj.textColor, 
                color: proj.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold',
                opacity: 0.9
              }} className="group-hover:scale-110 transition-transform duration-300">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
