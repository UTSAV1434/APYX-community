"use client";

import { useRef, useEffect, useCallback } from "react";

interface Orb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  speed: number;
}

const COLORS = [
  "rgba(176, 38, 255, 0.3)",   // #B026FF
  "rgba(109, 74, 255, 0.25)",  // #6D4AFF
  "rgba(47, 123, 255, 0.25)",  // #2F7BFF
  "rgba(20, 200, 255, 0.2)",   // #14C8FF
  "rgba(168, 85, 247, 0.2)",   // #A855F7
];

export function InteractiveHeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const initOrbs = useCallback((width: number, height: number) => {
    const orbCount = width < 768 ? 3 : 5;
    orbsRef.current = Array.from({ length: orbCount }, (_, i) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        radius: 150 + Math.random() * 200,
        color: COLORS[i % COLORS.length],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        speed: 0.2 + Math.random() * 0.3,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initOrbs(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    const animate = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      orbsRef.current.forEach((orb) => {
        if (!reducedMotion.current) {
          // Slow floating motion
          orb.x += orb.vx * orb.speed;
          orb.y += orb.vy * orb.speed;

          // Bounce off edges softly
          if (orb.x < -orb.radius || orb.x > w + orb.radius) orb.vx *= -1;
          if (orb.y < -orb.radius || orb.y > h + orb.radius) orb.vy *= -1;

          // Mouse repulsion (subtle)
          const dx = orb.x - mouseRef.current.x;
          const dy = orb.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            const force = (300 - dist) / 300;
            orb.x += (dx / dist) * force * 2;
            orb.y += (dy / dist) * force * 2;
          }
        }

        // Draw orb with gaussian-like falloff
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    if (!reducedMotion.current) {
      animate();
    } else {
      // Draw once for reduced motion
      orbsRef.current.forEach((orb) => {
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [initOrbs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
