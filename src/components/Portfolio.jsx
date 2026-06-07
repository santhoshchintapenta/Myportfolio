import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const THEMES = [
  { id: 'yellow', bg: '#f0c020', dot: '#f0c020' },
  { id: 'red', bg: '#e03030', dot: '#e03030' },
  { id: 'green', bg: '#22cc44', dot: '#22cc44' },
  { id: 'purple', bg: '#9922ee', dot: '#9922ee' },
  { id: 'orange', bg: '#f08020', dot: '#f08020' },
  { id: 'pink', bg: '#e8186c', dot: '#e8186c' },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const sharpRef = useRef(null);
  const sharpContentRef = useRef(null);
  const [themeIdx, setThemeIdx] = useState(0);
  const theme = THEMES[themeIdx];

  useEffect(() => {
    if (!cursorRef.current || !sectionRef.current || !sharpRef.current || !sharpContentRef.current) return;
    
    // Set initial GSAP transforms
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    
    // A state object to drive the pulsing size of our exposure mask
    const lens = { size: 140, x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // 1. Pulse the size of the lens (both outline and clipPath)
    gsap.to(lens, {
      size: 160,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        // Apply size to the visual outline
        gsap.set(cursorRef.current, { width: lens.size * 2, height: lens.size * 2 });
        // Apply circular clipPath
        gsap.set(sharpRef.current, {
          clipPath: `circle(${lens.size}px at ${lens.x}px ${lens.y}px)`
        });
      }
    });

    // 1.5 Continuously rotate the dashed visual outline!
    gsap.to(cursorRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none' // linear continuous spin
    });

    // 2. Add a magical breathing (zoom) effect to the exposed image itself!
    gsap.to(sharpContentRef.current, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 3. Smooth mouse tracking
    const xTo = gsap.quickTo(lens, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(lens, 'y', { duration: 0.15, ease: 'power3.out' });
    const cxTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power3.out' });
    const cyTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMove = e => {
      const r = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      xTo(x); yTo(y);
      cxTo(x); cyTo(y);
    };

    sectionRef.current.addEventListener('mousemove', onMove);
    return () => sectionRef.current?.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: theme.bg,
        cursor: 'crosshair', // Restored + shape cursor
        overflow: 'hidden',
        transition: 'background 0.8s ease'
      }}
    >
      {/* LAYER 1: BLURRY BACKGROUND */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(5rem, 22vw, 22rem)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            filter: 'blur(10px)',
          }}>
            PORTFOLIO
          </span>
        </div>
        
        {/* Centered Container. Character lightly visible at 40% */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '55vw', minWidth: '500px', height: '85vh',
          border: '1px solid rgba(255,255,255,1)', // Fully solid (will look like 0.5 due to layer opacity)
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <img
            src="/chatgpt_nobg.png"
            alt=""
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              opacity: 0.4, // 40% visibility as requested
            }}
          />
        </div>
      </div>

      {/* LAYER 2: SHARP REVEAL (FLASHLIGHT) */}
      <div 
        ref={sharpRef} 
        style={{ 
          position: 'absolute', inset: 0,
          background: theme.bg,
          clipPath: 'circle(140px at 50% 50%)',
          pointerEvents: 'none',
          zIndex: 5,
          transition: 'background 0.8s ease' // FIXED: Added smooth color transition to match base layer!
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(5rem, 22vw, 22rem)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}>
            PORTFOLIO
          </span>
        </div>
        
        {/* Centered Image Container with Sharp Border */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '55vw', minWidth: '500px', height: '85vh',
          border: '1px solid rgba(255,255,255,0.5)', // Match the perceived opacity of the base layer
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <img
            ref={sharpContentRef}
            src="/chatgpt_nobg.png"
            alt=""
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', // Fills the container
              objectPosition: 'top', // Crops perfectly at the waist
            }}
          />
        </div>
      </div>

      {/* Custom Cursor Outline (Rotating Dashed Ring) */}
      <div 
        ref={cursorRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          border: '4px dashed rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 50,
          boxShadow: `0 0 25px rgba(255,255,255,0.5)`,
          transition: 'border-color 0.8s ease, box-shadow 0.8s ease'
        }}
      />
      
      {/* Color dots (Positioned precisely at the bottom edge of the image container box) */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% + 42.5vh - 35px)', // 42.5vh is half of 85vh container height
        left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 20,
        zIndex: 100
      }}>
        {THEMES.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setThemeIdx(i)}
            style={{
              width: 24, height: 24,
              borderRadius: '50%',
              background: t.dot,
              border: i === themeIdx ? '3px solid #fff' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transform: i === themeIdx ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </section>
  );
}
