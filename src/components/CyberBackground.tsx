"use client";

import { useEffect, useRef } from "react";

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particles system
    const particleCount = prefersReducedMotion ? 20 : 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      baseAlpha: number;
    }> = [];

    const colors = [
      "#E91E63", // Pink
      "#FF6F9C", // Light Pink
      "#7C3AED", // Purple
      "#00F0FF", // Cyan accent
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.4),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.4),
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid in canvas
      const gridSize = 60;
      ctx.strokeStyle = "rgba(233, 30, 99, 0.03)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Connect close particles with subtle cyber lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(233, 30, 99, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(time + p.x) * 0.1;

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(0.8, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background Radial Glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#E91E63]/12 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#7C3AED]/12 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#E91E63]/8 rounded-full blur-3xl" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />

      {/* Canvas for particles and nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scanline Overlay */}
      <div className="absolute inset-0 cyber-scanlines opacity-25" />

      {/* Corner HUD Markers */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-[#E91E63]/30 tracking-widest select-none hidden md:block">
        SYS.LOC // 36.75°N 3.05°E • CSI_SEC_NODE_2026
      </div>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-[#E91E63]/30 tracking-widest select-none hidden md:block">
        PROTOCOL // OCTOBRE_ROSE_V1.0
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-600 tracking-widest select-none hidden md:block">
        [+] CSI OPEN DAYS 2026 • L1 MISSION
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#FF6F9C]/30 tracking-widest select-none hidden md:block">
        STATUS: ONLINE
      </div>
    </div>
  );
}
