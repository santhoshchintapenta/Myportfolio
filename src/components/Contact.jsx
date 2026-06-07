import React from 'react';
import { FaInstagram, FaEnvelope, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Send } from 'lucide-react';

export default function Contact() {
  return (
    <section 
      id="contact" 
      style={{ 
        background: '#0a0a0a', 
        color: '#fff', 
        position: 'relative',
        padding: '100px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Background CONNECT text */}
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
          fontSize: '35vw',
          color: 'rgba(255,255,255,0.03)',
          lineHeight: 1
        }}>
          CONNECT
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          letterSpacing: '0.02em',
          marginBottom: '60px',
          lineHeight: 1
        }}>
          LET'S TALK
        </h2>

        {/* 4 Large Circle Social Icons */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
          {[
            { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/santhosh.31_/' },
            { Icon: FaEnvelope, label: 'Email', href: 'mailto:santhoshchintapenta31@gmail.com' },
            { Icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/santhoshchintapenta/' },
            { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/santhoshchintapenta' }
          ].map((s, i) => (
            <a 
              key={i}
              href={s.href}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '3rem',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <s.Icon />
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={{
                flex: '1 1 200px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 24px',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Outfit', sans-serif",
                outline: 'none'
              }}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{
                flex: '1 1 200px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 24px',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Outfit', sans-serif",
                outline: 'none'
              }}
            />
          </div>
          <textarea 
            placeholder="Your Message" 
            rows="5"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '16px 24px',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: "'Outfit', sans-serif",
              outline: 'none',
              resize: 'none'
            }}
          />
        </form>

      </div>
    </section>
  );
}
