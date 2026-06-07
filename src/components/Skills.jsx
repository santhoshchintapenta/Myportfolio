import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    title: 'PROGRAMMING LANGUAGES',
    desc: 'Proficient in Java, Python, and JavaScript for robust software development.',
    bg: '#8b5cf6', // Violet
  },
  {
    title: 'WEB TECHNOLOGIES',
    desc: 'Full-Stack Development using the MERN Stack (MongoDB, Express.js, React, Node.js).',
    bg: '#f97316', // Orange
  },
  {
    title: 'DATABASE MANAGEMENT',
    desc: 'Expert in MySQL and MongoDB schema design, complex queries, and CRUD operations.',
    bg: '#ef4444', // Red
  },
  {
    title: 'MACHINE LEARNING',
    desc: 'Experience with Logistic Regression, Random Forest, SVM, and model evaluation.',
    bg: '#22c55e', // Green
  },
  {
    title: 'CORE CONCEPTS',
    desc: 'Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming.',
    bg: '#eab308', // Yellow
  },
  {
    title: 'TOOLS & PLATFORMS',
    desc: 'Version control and development via Git, GitHub, and Visual Studio Code.',
    bg: '#3b82f6', // Blue
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skills-card');
      
      // Horizontal scroll animation with color transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + containerRef.current.offsetWidth * cards.length
        }
      });

      // Move the cards container horizontally
      tl.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        duration: 1
      }, 0); // Start at time 0

      // Animate the background color of the main container synchronously
      // Total duration is cards.length - 1 chunks.
      const colorSteps = 1 / (cards.length - 1);
      
      // Set initial background color to the first card's color
      gsap.set(containerRef.current, { backgroundColor: SKILLS_DATA[0].bg });

      for (let i = 0; i < cards.length - 1; i++) {
        tl.to(containerRef.current, {
          backgroundColor: SKILLS_DATA[i + 1].bg,
          ease: "none",
          duration: colorSteps
        }, i * colorSteps); // Overlap perfectly with the slide
      }
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      style={{ 
        height: '100vh', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background large "SKILLS" outline text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '32vw',
          color: 'transparent',
          WebkitTextStroke: '4px rgba(255,255,255,0.12)', // Subtle translucent outline
          lineHeight: 1
        }}>
          SKILLS
        </span>
      </div>

      {/* Horizontal scrolling container */}
      <div 
        ref={scrollRef}
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          paddingLeft: '35vw', // Start with the first card roughly centered
          position: 'relative',
          zIndex: 1
        }}
      >
        {SKILLS_DATA.map((s, i) => (
          <div 
            key={i} 
            className="skills-card"
            style={{
              flexShrink: 0,
              width: '420px',
              height: '580px',
              marginRight: '120px',
              background: '#fff', // Pure white thick outer border
              borderRadius: '24px',
              padding: '12px', // The thickness of the white frame
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              transform: `rotateY(-15deg) rotateX(5deg)`, // 3D tilt is back!
              transformStyle: 'preserve-3d',
              perspective: '1500px'
            }}
          >
            {/* The colored interior */}
            <div style={{
              background: s.bg,
              borderRadius: '16px',
              width: '100%',
              height: '100%',
              padding: '30px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Fake logo/icon top left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                 <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.9)', borderRadius: '6px' }}></div>
              </div>
              
              <h3 style={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontSize: '2.5rem', 
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '15px',
                textTransform: 'uppercase'
              }}>
                {s.title}
              </h3>
              
              <p style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.95rem',
                opacity: 0.9,
                lineHeight: 1.4,
                marginBottom: 'auto'
              }}>
                {s.desc}
              </p>

              {/* Mockup visualization area inside card */}
              <div style={{
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '12px',
                height: '240px',
                width: '100%',
                marginTop: '30px',
                display: 'flex',
                alignItems: 'flex-end', // Align laptop to bottom
                justifyContent: 'center',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)'
              }}>
                {/* Fake Laptop Frame */}
                <div style={{ 
                  width: '85%', 
                  height: '80%', 
                  background: '#111', 
                  borderTopLeftRadius: '12px', 
                  borderTopRightRadius: '12px', 
                  border: '4px solid #333',
                  borderBottom: 'none',
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                   {/* Laptop Screen Header */}
                   <div style={{ height: '20px', background: '#222', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }}></div>
                         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></div>
                      </div>
                   </div>
                   {/* Laptop Screen Content Area */}
                   <div style={{ flex: 1, background: '#fff', display: 'flex' }}>
                      {/* Fake Sidebar */}
                      <div style={{ width: '30%', background: '#f5f5f5', borderRight: '1px solid #e5e5e5', padding: '8px' }}>
                        <div style={{ width: '100%', height: '8px', background: '#ddd', borderRadius: '2px', marginBottom: '10px' }} />
                        <div style={{ width: '70%', height: '6px', background: '#ddd', borderRadius: '2px', marginBottom: '6px' }} />
                        <div style={{ width: '80%', height: '6px', background: '#ddd', borderRadius: '2px', marginBottom: '6px' }} />
                      </div>
                      {/* Fake Main Content */}
                      <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '40%', height: '12px', background: '#111', borderRadius: '2px' }} />
                        <div style={{ width: '100%', height: '40px', background: s.bg, borderRadius: '4px', opacity: 0.2 }} />
                        <div style={{ width: '100%', flex: 1, background: '#f0f0f0', borderRadius: '4px' }} />
                      </div>
                   </div>
                   {/* Fake Laptop Base (Hovering outside the screen frame slightly) */}
                   <div style={{
                     position: 'absolute',
                     bottom: '0px',
                     left: '-10%',
                     width: '120%',
                     height: '8px',
                     background: '#aaa',
                     borderTopLeftRadius: '4px',
                     borderTopRightRadius: '4px',
                     boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
                   }} />
                </div>
              </div>

              {/* Fake small feature icons row at the bottom */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginTop: '20px' }}>
                <div style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                <div style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                <div style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                <div style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
