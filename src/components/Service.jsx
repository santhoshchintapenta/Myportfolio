import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'PROGRAMMING LANGUAGES',
    desc: 'Proficient in Java, Python, and JavaScript for robust software development.',
    bg: '#5b21b6', // Purple
  },
  {
    title: 'WEB TECHNOLOGIES',
    desc: 'Full-Stack Development using the MERN Stack (MongoDB, Express.js, React, Node.js).',
    bg: '#ea580c', // Orange
  },
  {
    title: 'DATABASE MANAGEMENT',
    desc: 'Expert in MySQL and MongoDB schema design, complex queries, and CRUD operations.',
    bg: '#e11d48', // Red
  },
  {
    title: 'MACHINE LEARNING',
    desc: 'Experience building classification models with Logistic Regression, Random Forest, and SVM.',
    bg: '#166534', // Green
  },
  {
    title: 'CORE CONCEPTS',
    desc: 'Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming.',
    bg: '#ca8a04', // Yellow
  },
  {
    title: 'TOOLS & PLATFORMS',
    desc: 'Version control and development via Git, GitHub, and Visual Studio Code.',
    bg: '#0f172a', // Dark blue
  }
];

export default function Service() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      
      // Horizontal scroll animation
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + containerRef.current.offsetWidth * cards.length
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="service" 
      ref={containerRef}
      style={{ 
        height: '100vh', 
        background: '#e91e8c', // Pink bg shown in video 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background large "SERVICES" text */}
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
          fontSize: '30vw',
          color: 'rgba(255,255,255,0.1)',
          lineHeight: 1
        }}>
          TECHNICAL SKILLS
        </span>
      </div>

      {/* Horizontal scrolling container */}
      <div 
        ref={scrollRef}
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          paddingLeft: '10vw', // Initial offset
          position: 'relative',
          zIndex: 1
        }}
      >
        {SERVICES.map((s, i) => (
          <div 
            key={i} 
            className="service-card"
            style={{
              flexShrink: 0,
              width: '400px',
              height: '550px',
              marginRight: '60px',
              background: s.bg,
              borderRadius: '24px',
              padding: '30px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              transform: `rotateY(-15deg) rotateX(5deg)`, // 3D tilt
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
               <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
            </div>
            
            <h3 style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontSize: '3rem', 
              lineHeight: 1,
              marginBottom: '10px'
            }}>
              {s.title}
            </h3>
            
            <p style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.9rem',
              opacity: 0.8,
              marginBottom: 'auto'
            }}>
              {s.desc}
            </p>

            {/* Mockup visualization area inside card */}
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              height: '250px',
              width: '100%',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Fake UI elements to simulate mockup */}
              <div style={{ width: '80%', height: '80%', background: '#fff', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                 <div style={{ height: '30px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                 </div>
                 <div style={{ flex: 1, background: '#f5f5f5', padding: '10px' }}>
                    <div style={{ height: '20px', background: '#ddd', width: '40%', marginBottom: '10px', borderRadius: '4px' }}></div>
                    <div style={{ height: '10px', background: '#ddd', width: '100%', marginBottom: '6px', borderRadius: '4px' }}></div>
                    <div style={{ height: '10px', background: '#ddd', width: '80%', borderRadius: '4px' }}></div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
