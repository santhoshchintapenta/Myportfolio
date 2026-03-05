import { useEffect } from 'react';

export const useCursorStars = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-stars-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const maxStars = 50;

    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.opacity = 1;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3 - 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.02;
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (stars.length < maxStars) {
        for (let i = 0; i < 2; i++) {
          stars.push(new Star(mouseX, mouseY));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update();
        stars[i].draw(ctx);

        if (stars[i].opacity <= 0) {
          stars.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    };
  }, []);
};
