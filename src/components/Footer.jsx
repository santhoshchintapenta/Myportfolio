import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#f4c400',
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '40px',
        overflow: 'hidden',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        marginTop: '-40px',
        zIndex: 10
      }}
    >
      {/* Marquee Background Text */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div className="marquee-left" style={{ whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8vw', color: 'rgba(0,0,0,0.05)', paddingRight: '50px' }}>
            SANTHOSH CHINTAPENTA • FULL STACK DEVELOPER • AI & ML ENTHUSIAST •
          </span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8vw', color: 'rgba(0,0,0,0.05)', paddingRight: '50px' }}>
            SANTHOSH CHINTAPENTA • FULL STACK DEVELOPER • AI & ML ENTHUSIAST •
          </span>
        </div>
        <div className="marquee-right" style={{ whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8vw', color: 'rgba(0,0,0,0.05)', paddingRight: '50px' }}>
            GET IN TOUCH • LET'S COLLABORATE •
          </span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8vw', color: 'rgba(0,0,0,0.05)', paddingRight: '50px' }}>
            GET IN TOUCH • LET'S COLLABORATE •
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Character Image */}
        <div style={{ height: '350px', marginBottom: '30px' }}>
          <img
            src="/animated_nobg.png"
            alt="Character"
            style={{ height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              // Fallback if animated.png doesn't exist, use hero.png
              e.target.src = "/chatgpt_nobg.png";
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
          <button style={{
            padding: '12px 32px',
            background: '#2563eb', // Blue
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
            transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Follow
          </button>
          <button style={{
            padding: '12px 32px',
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: '12px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Message
          </button>
        </div>

        {/*   Santhosh.chintapenta Branding */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '2.5rem',
            color: '#111',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Santhosh<span style={{ color: '#fff' }}>.Chintapenta</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem',
            color: '#555',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            Crafting digital experiences that inspire and perform.
          </p>
        </div>

      </div>
    </footer>
  );
}
