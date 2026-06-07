import React, { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
const NAV_LINKS = ['HOME', 'ABOUT', 'SKILLS', 'CONTACT', 'COLLABORATE'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', message: '' });

  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      const collaborateEl = document.getElementById('collaborate');
      
      let shouldBeWhite = false;
      
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 56) shouldBeWhite = true;
      }
      
      if (collaborateEl) {
        const footerRect = collaborateEl.getBoundingClientRect();
        if (footerRect.top <= 56) shouldBeWhite = false;
      }
      
      setIsWhite(shouldBeWhite);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── TOP NAVBAR (exactly as in video) ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          height: 56,
          background: 'transparent',
        }}
      >
        {/* Left: santhosh.ch logo */}
        <button onClick={() => scrollTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.15rem', color: isWhite ? '#fff' : '#111', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>
            Santhosh
          </span>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#f4c400', letterSpacing: '-0.02em' }}>
            .Chintapenta
          </span>
        </button>

        {/* Center: nav links (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="group relative"
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: isWhite ? '#fff' : '#111',
                cursor: 'pointer',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
              }}
            >
              {link}
              {/* Animated underline */}
              <div
                className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                style={{ background: isWhite ? '#fff' : '#111' }}
              />
            </button>
          ))}
        </div>

        {/* Right: RESUME pill */}
        <button
          onClick={() => window.open('/Santhosh_Resume%20copy.pdf', '_blank')}
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: '#111',
            background: '#fff',
            border: '1.5px solid #ccc',
            borderRadius: 999,
            padding: '6px 18px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111'; }}
        >
          RESUME
        </button>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 items-center justify-center w-9 h-9"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2, background: isWhite ? '#fff' : '#111', borderRadius: 2,
              transform: menuOpen && i === 0 ? 'rotate(45deg) translateY(7px)' : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
              transition: 'all 0.3s',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 90,
            background: '#f4c400',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
          }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '3rem', fontWeight: 900, color: '#111',
                letterSpacing: '0.05em', cursor: 'pointer', background: 'none', border: 'none',
              }}
            >{link}</button>
          ))}
        </div>
      )}

      {/* Testimonial Modal */}
      {modalOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={e => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 420, position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: 14, right: 14, cursor: 'pointer', background: 'none', border: 'none' }}>
              <X size={18} />
            </button>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.05em', marginBottom: 8 }}>ADD TESTIMONIAL</h3>
            <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: 20 }}>Share your experience working with me</p>
            <form onSubmit={e => { e.preventDefault(); setModalOpen(false); setForm({ name: '', role: '', message: '' }); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'name', ph: 'Your Name *', req: true },
                { key: 'role', ph: 'Your Role / Company' },
              ].map(f => (
                <input
                  key={f.key}
                  placeholder={f.ph}
                  required={f.req}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e5e5', borderRadius: 10, fontSize: '0.9rem', outline: 'none', fontFamily: "'Outfit',sans-serif" }}
                />
              ))}
              <textarea
                placeholder="Your Message *"
                rows={4}
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e5e5', borderRadius: 10, fontSize: '0.9rem', outline: 'none', resize: 'none', fontFamily: "'Outfit',sans-serif" }}
              />
              <button
                type="submit"
                style={{
                  background: '#111', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '13px', fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                  fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <Send size={14} /> Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
