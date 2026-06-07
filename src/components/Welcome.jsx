import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Award, Trophy, Code, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { type: 'Education', title: 'B.Tech - CS (AI & ML)', sub: 'ANITS, Visakhapatnam', detail: 'CGPA: 8.75 / 10.0 | 2023 – Present' },
  { type: 'Experience', title: 'Full Stack Intern', sub: 'PW Skills • 2024', detail: 'Completed full-stack development internship program, gaining hands-on experience in building complete web applications from concept to deployment.', tags: ['Web Apps', 'Deployment'] },
  { type: 'Achievement', title: 'Won Hackathon', sub: 'College Level', detail: 'Secured first place in a competitive college-level hackathon.' },
  { type: 'Achievement', title: 'Selected for SIH', sub: 'Smart India Hackathon', detail: 'Shortlisted for the prestigious Smart India Hackathon conducted at our college.' },
  { type: 'Achievement', title: 'Google Brand Ambassador', sub: 'Google', detail: 'Selected as a Google Student Brand Ambassador program participant.' },
  { type: 'Certification', title: 'Intro to Generative AI Studio', sub: 'Google • 2024', detail: 'Completed Google\'s course, learning about generative AI concepts, tools, and practical applications.', tags: ['Generative AI', 'Machine Learning'] },
  { type: 'Certification', title: 'DSA with Python', sub: 'PW Skills', detail: 'Completed comprehensive Data Structures and Algorithms course with Python programming.', tags: ['Python', 'DSA', 'Problem Solving'] },
  { type: 'Certification', title: 'Full Stack Course', sub: 'PW Skills', detail: 'Completed comprehensive full-stack development course covering both frontend and backend technologies.', tags: ['Frontend', 'Backend'] },
  { type: 'Certification', title: 'Python Course', sub: 'Infosys', detail: 'Successfully completed Python programming course gaining proficiency in fundamentals and object-oriented programming.', tags: ['Python', 'OOP'] },
  { type: 'Education', title: 'Intermediate (MPC)', sub: 'Narayana Junior College', detail: 'Score: 87% | 2023' },
  { type: 'Education', title: 'SSC (10th Grade)', sub: 'Narayana School', detail: 'CGPA: 10.0 / 10.0 | 2021' },
];

function PremiumRowCard({ t, index }) {
  return (
    <div className="premium-row-card group relative border-t border-gray-200 py-10 transition-all duration-500 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer overflow-hidden">
      
      {/* Animated Background Slide on Hover */}
      <div className="absolute inset-0 bg-[#f4f4f5] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] -z-10" />

      {/* Index */}
      <div className="md:w-[15%] shrink-0 flex items-center gap-4">
        <span className="text-lg font-bold text-gray-300 group-hover:text-black transition-colors duration-500 font-mono">
          0{index + 1}
        </span>
        <div className="w-8 h-[2px] bg-gray-200 group-hover:bg-black group-hover:w-12 transition-all duration-500" />
      </div>

      {/* Main Title & Sub */}
      <div className="md:w-[50%] flex flex-col gap-1 z-10">
        <h4 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight group-hover:translate-x-3 transition-transform duration-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {t.title}
        </h4>
        <h5 className="text-lg text-gray-500 font-medium group-hover:translate-x-3 transition-transform duration-500 delay-75" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {t.sub}
        </h5>
      </div>

      {/* Tag & Detail */}
      <div className="md:w-[35%] flex flex-col md:items-end gap-3 z-10 mt-4 md:mt-0">
        <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase group-hover:text-black transition-colors duration-500">
          {t.type}
        </span>
        <p className="text-sm text-gray-500 leading-relaxed md:text-right max-w-[280px]">
          {t.detail}
        </p>
        {t.tags && (
          <div className="flex flex-wrap gap-2 mt-1 md:justify-end">
            {t.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-[#f4f4f5] text-gray-500 text-[10px] rounded-md font-bold tracking-widest uppercase border border-gray-200 group-hover:border-gray-300 transition-colors duration-500">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default function Welcome() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text behind
      gsap.fromTo('.welcome-text-bg',
        { y: 150 },
        {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Animate the premium cards on scroll
      const cards = gsap.utils.toArray('.premium-row-card');
      cards.forEach(card => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ background: '#fff' }}>

      {/* ── 1. WELCOME section (frame 6 & 18) ── */}
      <div style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: '#fff',
      }}>
        {/* Giant grey WELCOME text */}
        <span
          className="welcome-text-bg"
          style={{
            position: 'absolute',
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(6rem, 20vw, 20rem)',
            color: 'rgba(0,0,0,0.08)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          WELCOME
        </span>

        {/* Removed duplicate image to allow Hero image to smoothly transition here */}


      </div>

      {/* ── 2. Premium Sticky Scroll Layout ── */}
      <div className="profile-container" style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0', padding: '140px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* Sticky Left Sidebar */}
            <div className="lg:w-[35%]">
              <div className="sticky top-40">
                <h2 className="text-7xl md:text-[6rem] font-black tracking-tighter mb-8 leading-[0.85] text-gray-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  MY<br/>
                  <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>JOURNEY</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium max-w-sm">
                  An overview of my academic background, internships, and the key achievements that have shaped my engineering skills.
                </p>
                
                {/* Scroll indicator mini animation */}
                <div className="flex items-center gap-4 text-black font-bold tracking-[0.2em] uppercase text-[11px]">
                  <div className="w-12 h-[2px] bg-black" />
                  Explore
                </div>
              </div>
            </div>

            {/* Right Side Scrolling List */}
            <div className="lg:w-[65%] flex flex-col">
              {DATA.map((t, i) => (
                <PremiumRowCard key={i} t={t} index={i} />
              ))}
              {/* Bottom border to close the list elegantly */}
              <div className="border-t border-gray-200 w-full" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
