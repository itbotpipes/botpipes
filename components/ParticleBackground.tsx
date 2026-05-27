"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  /** Number of particles to render. Default: 120 */
  particleCount?: number;
  /** Primary particle color (hex or rgb). Default: "#22d3ee" (cyan-400) */
  primaryColor?: string;
  /** Secondary particle color (hex or rgb). Default: "#3b82f6" (blue-500) */
  secondaryColor?: string;
  /** Max drift distance from origin in px. Default: 30 */
  driftRange?: number;
  /** Particle speed multiplier. Default: 1 */
  speed?: number;
  /** Canvas height as a percentage of viewport height. Default: 100 */
  heightVh?: number;
  /** Additional className for the wrapper div */
  className?: string;

  position?: "fixed" | "absolute";
}

export default function ParticleBackground({
  particleCount = 240,
  primaryColor = "#22d3ee",
  secondaryColor = "#3b82f6",
  driftRange = 10,
  speed = 1,
  heightVh = 100,
  className = "",
  position
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : hex;
    };

    const primaryRgb = primaryColor.startsWith("#")
      ? hexToRgb(primaryColor)
      : primaryColor;
    const secondaryRgb = secondaryColor.startsWith("#")
      ? hexToRgb(secondaryColor)
      : secondaryColor;

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const isPrimary = Math.random() > 0.35;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          speedX: (Math.random() - 0.5) * 0.4 * speed,
          speedY: (Math.random() - 0.5) * 0.4 * speed,
          color: isPrimary ? primaryRgb : secondaryRgb,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Drift with gentle sine oscillation
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce back toward origin when drifting too far
        const dx = p.x - p.baseX;
        const dy = p.y - p.baseY;
        if (Math.abs(dx) > driftRange) p.speedX *= -1;
        if (Math.abs(dy) > driftRange) p.speedY *= -1;

        // Subtle opacity pulse
        p.opacity += (Math.random() - 0.5) * 0.01;
        p.opacity = Math.max(0.05, Math.min(0.65, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw faint connection lines between nearby particles
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const alpha = (1 - dist / 60) * 0.06;
            ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [particleCount, primaryColor, secondaryColor, driftRange, speed]);

  return (
    <div
      className={`${position === "absolute" ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      style={{ height: `${heightVh}vh` }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}