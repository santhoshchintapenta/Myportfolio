import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const name = "SANTHOSH";

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Stagger in letters
    gsap.fromTo(lettersRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)' }
    );

    let currentProgress = { value: 0 };
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation sequence
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });

        // 1. Fade out the text & letters
        exitTl.to([textRef.current, ...lettersRef.current], {
          y: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.in'
        }, 0);

        // 2. Split the panels
        exitTl.to(topPanelRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut'
        }, 0.3);
        
        exitTl.to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut'
        }, 0.3);
      }
    });

    // Animate progress to 100
    tl.to(currentProgress, {
      value: 100,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(currentProgress.value)}%`;
        }
      }
    }, 0);

    return () => {
      tl.kill();
      gsap.killTweensOf(lettersRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      {/* Top Panel */}
      <div 
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          background: '#fff',
          zIndex: 1
        }}
      />
      {/* Bottom Panel */}
      <div 
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          background: '#fff',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {/* Animated Name */}
        <div style={{ display: 'flex', gap: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
          {name.split('').map((char, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                color: '#666',
                letterSpacing: '0.2em',
                display: 'inline-block'
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress Percentage */}
        <div 
          ref={textRef}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(5rem, 12vw, 12rem)',
            color: '#111',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          0%
        </div>
      </div>
    </div>
  );
}
