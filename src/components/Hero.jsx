import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['FULL-STACK', 'AI & ML', 'ENGINEER', 'DEVELOPER'];

export default function Hero() {
  const sectionRef = useRef(null);
  const roleRef    = useRef(null);
  const imgRef     = useRef(null);
  const roleIdx    = useRef(0);

  // Entrance & Scroll Transition
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-in', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo(imgRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
      
      // Smooth massive transition to Welcome page
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      tl.to(imgRef.current, {
        x: '-29vw', // Move to perfect center
        y: '100vh', // Keep the character beautifully centered over WELCOME
        scale: 1.2, // Match the exact scale from the new screenshot
        transformOrigin: 'top center',
        '--mask-start': '40%', // Start fading right at the chest/waist
        '--mask-end': '55%',   // Completely transparent by 55% so NO LEGS show!
        ease: 'none'
      }, 0);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Role rolling
  useEffect(() => {
    const tick = () => {
      roleIdx.current = (roleIdx.current + 1) % ROLES.length;
      if (!roleRef.current) return;
      gsap.fromTo(roleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      roleRef.current.textContent = ROLES[roleIdx.current];
    };
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 10,
      }}
    >
      {/* LEFT: Text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vw, 80px)',
          paddingTop: 80,
          zIndex: 2,
        }}
      >
        {/* HELLO, I'M */}
        <div className="hero-in" style={{ marginBottom: 4 }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#111',
            }}
          >
            HELLO, I'M
          </h1>
        </div>

        {/* SANTHOSH */}
        <div className="hero-in" style={{ marginBottom: 8 }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6.5vw, 7rem)', // slightly smaller to fit name
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#111',
            }}
          >
            SANTHOSH
          </h1>
        </div>

        {/* Rolling role — outlined text */}
        <div className="hero-in" style={{ marginBottom: 16, overflow: 'hidden' }}>
          <div
            ref={roleRef}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5.5vw, 6rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'transparent',
              WebkitTextStroke: '2px #111',
            }}
          >
            {ROLES[0]}
          </div>
        </div>

        {/* Description */}
        <p className="hero-in" style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 360, marginBottom: 20 }}>
          Results-driven Computer Science undergraduate (AI & ML) at ANITS. Experienced in full-stack web development, Java, Python, and building production-grade ML models.
        </p>

        {/* Social icons */}
        <div className="hero-in" style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {[
            { Icon: FaInstagram, href: 'https://www.instagram.com/santhosh.31_/', label: 'IG' },
            { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/santhoshchintapenta/', label: 'LI' },
            { Icon: FaGithub, href: 'https://github.com/santhoshchintapenta', label: 'GH' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1.5px solid #e0e0e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#555', transition: 'all 0.2s', textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#555'; e.currentTarget.style.transform = ''; }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hero-in" style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '12px 28px',
              background: '#111', color: '#fff',
              border: 'none', borderRadius: 8,
              fontFamily: "'Outfit',sans-serif", fontWeight: 700,
              fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            Hire Me
          </button>
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '12px 28px',
              background: 'transparent', color: '#111',
              border: '1.5px solid #111', borderRadius: 8,
              fontFamily: "'Outfit',sans-serif", fontWeight: 700,
              fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}
          >
            My Work
          </button>
        </div>
      </div>

      {/* RIGHT: Real full body photo */}
      <div
        ref={imgRef}
        style={{
          width: '42%',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
        }}
        className="hidden md:flex hero-image-mask"
      >
        <img
          src="/Herooo_nobg.png"
          alt="Santhosh"
          style={{
            height: '95vh',
            width: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 5 }}>
        <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, transparent, #111)', animation: 'scroll-pulse 1.6s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', color: '#bbb', textTransform: 'uppercase' }}>SCROLL</span>
      </div>
    </section>
  );
}
