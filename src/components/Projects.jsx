import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 0, title: 'NexTest – Online Examination Platform', color: '#1a1a1a', textColor: '#fff', tag: 'Full-Stack (MERN)' },
  { id: 1, title: 'Breast Cancer Detection ML Model', color: '#e8186c', textColor: '#fff', tag: 'Machine Learning' },
  { id: 2, title: 'Automated Timetable Generator', color: '#1a0a2e', textColor: '#fff', tag: 'Java Backend' },
  { id: 3, title: 'Budget & Finance Tracker', color: '#f0f0e8', textColor: '#111', tag: 'Web App' },
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
      // 1. Initial State: Center stack with random messy rotations
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: '0vw',
          y: '0vw',
          // Index 0 sits perfectly straight on top of the pile
          rotation: i === 0 ? 0 : (Math.random() - 0.5) * 20, 
          zIndex: 50 - i, // Index 0 is the absolute top!
          scale: 0.9, 
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

      // 3. Grid Coordinates to fan out into a 3x3 layout
      const grid = [
        { x: '-30vw', y: '-22vw', rot: -6 }, // Index 0 (Top Left)
        { x: '0vw',   y: '-24vw', rot: 2 },  // Index 1 (Top Center)
        { x: '30vw',  y: '-22vw', rot: 8 },  // Index 2 (Top Right)
        { x: '-32vw', y: '0vw',   rot: -3 }, // Index 3 (Center Left)
        { x: '0vw',   y: '0vw',   rot: 0 },  // Index 4 (Center Folder stays in middle)
        { x: '32vw',  y: '2vw',   rot: 5 },  // Index 5 (Center Right)
        { x: '-30vw', y: '24vw',  rot: -5 }, // Index 6 (Bottom Left)
        { x: '0vw',   y: '26vw',  rot: -2 }, // Index 7 (Bottom Center)
        { x: '30vw',  y: '22vw',  rot: 6 },  // Index 8 (Bottom Right)
      ];

      // 4. Animate each card to its specific grid position
      cardsRef.current.forEach((card, i) => {
        tl.to(card, {
          x: grid[i].x,
          y: grid[i].y,
          rotation: grid[i].rot,
          scale: 1, 
          ease: 'power2.inOut'
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
