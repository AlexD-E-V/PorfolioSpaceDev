import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  /** Solo las doradas llevan halo: es caro y así se notan más. */
  halo: boolean;
}

/** Lee un token de tokens.css y lo devuelve como "R, G, B" para el canvas. */
function readToken(name: string, fallback: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  /* Deben ser tres números. Si el token no resolvió (por ejemplo porque
     apunta a otra variable que aún no existe), se usa el de reserva. */
  return /^\d+\s+\d+\s+\d+$/.test(raw) ? raw.replace(/\s+/g, ', ') : fallback;
}

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const white = readToken('--ink-50', '232, 236, 245');
    const atmos = readToken('--atmos', '0, 225, 255');
    const gold = readToken('--brand', '255, 194, 75');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let animationFrameId = 0;
    let stars: Star[] = [];
    const starCount = 150;

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        /* La mayoría del cielo es blanco, algo de cian de atmósfera y unas
           pocas doradas sueltas — la estrella de la marca asomando. */
        const roll = Math.random();
        const isGold = roll > 0.93;
        const color = isGold ? gold : roll > 0.72 ? atmos : white;

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random(),
          color,
          halo: isGold,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    /* En móvil, mostrar u ocultar la barra de direcciones dispara `resize`
       constantemente. Sin esto se regeneraban las 150 estrellas en cada
       evento y el campo entero parpadeaba al hacer scroll. */
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        if (reduced.matches) paint(false);
      }, 150);
    };

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;

        if (star.halo) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${star.color}, 0.7)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        if (!animate) continue;

        star.x += star.speedX;
        star.y += star.speedY;

        // Parpadeo
        star.opacity += (Math.random() - 0.5) * 0.02;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 0.8) star.opacity = 0.8;

        // Se vuelve a entrar por el lado contrario
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      ctx.shadowBlur = 0;
    };

    const loop = () => {
      paint(true);
      animationFrameId = requestAnimationFrame(loop);
    };

    /* Con reduced-motion el cielo sigue estando: se dibuja una vez y se
       queda quieto. Quitarlo entero sería perder el fondo, no la animación. */
    const start = () => {
      cancelAnimationFrame(animationFrameId);
      if (reduced.matches) paint(false);
      else loop();
    };

    window.addEventListener('resize', onResize);
    reduced.addEventListener('change', start);
    resizeCanvas();
    start();

    return () => {
      window.removeEventListener('resize', onResize);
      reduced.removeEventListener('change', start);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
