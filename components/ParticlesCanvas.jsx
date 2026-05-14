'use client';
import { useEffect, useRef } from 'react';

function useWorkerCanvas(canvasRef, heroRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero || window.innerWidth <= 768) return;

    // OffscreenCanvas path — animation runs off the main thread
    if (typeof OffscreenCanvas !== 'undefined' && typeof canvas.transferControlToOffscreen === 'function') {
      const worker = new Worker('/workers/particles.worker.js');
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage(
        { type: 'init', canvas: offscreen, width: canvas.offsetWidth, height: canvas.offsetHeight },
        [offscreen]
      );
      const onMouseMove = (e) => {
        const r = hero.getBoundingClientRect();
        worker.postMessage({ type: 'mouse', mouseX: e.clientX - r.left, mouseY: e.clientY - r.top });
      };
      const onMouseLeave = () => worker.postMessage({ type: 'mouseleave' });
      const onResize = () => worker.postMessage({ type: 'resize', width: canvas.offsetWidth, height: canvas.offsetHeight });
      hero.addEventListener('mousemove', onMouseMove, { passive: true });
      hero.addEventListener('mouseleave', onMouseLeave, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      return () => {
        worker.postMessage({ type: 'stop' });
        worker.terminate();
        hero.removeEventListener('mousemove', onMouseMove);
        hero.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', onResize);
      };
    }

    // Fallback: main-thread canvas for browsers without OffscreenCanvas
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], animId;
    const DIST = 150, COLOR = 'rgba(113,177,54,';
    const mouse = { x: -9999, y: -9999 };
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() {
      nodes = [];
      for (let i = 0; i < 45; i++) nodes.push({ x: Math.random() * (W * 0.45) + W * 0.55, y: Math.random() * H, angle: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.5, angleChange: (Math.random() - 0.5) * 0.04, baseRadius: 1.5 + Math.random() * 2.5, pulseSpeed: 0.02 + Math.random() * 0.02, pulseOffset: Math.random() * Math.PI * 2, radius: 2 });
    }
    function lineAlpha(x1, x2, base) {
      const mx = Math.max(x1, x2);
      const fade = mx > W * 0.55 ? 1 : Math.max(0, (mx - W * 0.4) / (W * 0.15));
      return base * fade;
    }
    function nodeAlpha(x) {
      return x > W * 0.55 ? 1 : Math.max(0, (x - W * 0.4) / (W * 0.15));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() * 0.001;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.angleChange += (Math.random() - 0.5) * 0.005;
        n.angleChange = Math.max(-0.06, Math.min(0.06, n.angleChange));
        n.angle += n.angleChange;
        n.x += Math.cos(n.angle) * n.speed;
        n.y += Math.sin(n.angle) * n.speed;
        if (n.x < W * 0.3) n.angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
        if (n.x > W + 20) n.x = W * 0.55;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        n.radius = md < 80 ? n.baseRadius * (1 + (80 - md) / 80 * 1.5) : n.baseRadius * (1 + 0.3 * Math.sin(t * n.pulseSpeed * 60 + n.pulseOffset));
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) { const la = lineAlpha(nodes[i].x, nodes[j].x, 1 - d / DIST); if (la > 0.001) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = COLOR + la + ')'; ctx.lineWidth = 1; ctx.stroke(); } }
        }
      }
      for (let i = 0; i < nodes.length; i++) { const a = nodeAlpha(nodes[i].x); if (a > 0.001) { ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2); ctx.fillStyle = COLOR + a + ')'; ctx.fill(); } }
      animId = requestAnimationFrame(draw);
    }
    const onMouseMove = (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    hero.addEventListener('mousemove', onMouseMove, { passive: true });
    hero.addEventListener('mouseleave', onMouseLeave, { passive: true });
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize, { passive: true });
    resize(); init(); draw();
    return () => { cancelAnimationFrame(animId); hero.removeEventListener('mousemove', onMouseMove); hero.removeEventListener('mouseleave', onMouseLeave); window.removeEventListener('resize', onResize); };
  }, [canvasRef, heroRef]);
}

function useHeroParallax(heroRef, canvasRef, innerRef, auroraRef) {
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const hero = heroRef.current, canvas = canvasRef.current, inner = innerRef.current, aurora = auroraRef.current;
    if (!hero || !canvas) return;
    let heroVisible = true;
    const io = new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      if (!heroVisible) { canvas.style.transform = ''; if (aurora) aurora.style.transform = ''; if (inner) inner.style.transform = ''; }
    }, { threshold: 0 });
    io.observe(hero);
    const onScroll = () => {
      if (!heroVisible) return;
      const s = window.scrollY;
      canvas.style.transform = `translateY(${s * 0.08}px)`;
      if (aurora) aurora.style.transform = `translateY(${s * 0.08}px)`;
      if (inner) inner.style.transform = `translateY(${s * -0.2}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [heroRef, canvasRef, innerRef, auroraRef]);
}

export default function ParticlesCanvas({ heroRef, heroInnerRef, heroAuroraRef }) {
  const canvasRef = useRef(null);
  useWorkerCanvas(canvasRef, heroRef);
  useHeroParallax(heroRef, canvasRef, heroInnerRef, heroAuroraRef);
  return <canvas id="hero-canvas" ref={canvasRef} />;
}
