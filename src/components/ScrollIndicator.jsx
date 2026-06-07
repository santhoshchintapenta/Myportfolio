import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollIndicator() {
  const lineRef = useRef(null);

  useEffect(() => {
    // A sleek continuous sliding animation for the scroll line
    gsap.fromTo(lineRef.current, 
      { y: '-100%' }, 
      { 
        y: '100%', 
        duration: 1.5, 
        repeat: -1, 
        ease: 'power2.inOut',
      }
    );
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        mixBlendMode: 'difference', // Ensures it's visible on any background color
        color: '#fff',
        pointerEvents: 'none', // So it doesn't block clicks
      }}
    >
      <span style={{
        writingMode: 'vertical-rl',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        Scroll
      </span>
      
      {/* Container for the animated line */}
      <div style={{
        width: '2px',
        height: '60px',
        background: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '2px',
      }}>
        {/* The animated highlight line */}
        <div 
          ref={lineRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            background: '#fff',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}
