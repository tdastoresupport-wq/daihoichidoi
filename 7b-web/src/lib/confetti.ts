// Confetti tiết chế: phun trong 1.2s, màu gold/spot/success. Tôn trọng reduced-motion.
const COLORS = ['#ffc531', '#f5a800', '#2e7cf6', '#22c07a', '#ffffff'];

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  r: number;
  vr: number;
  c: string;
}

export function burst(host: HTMLElement, n = 90): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = host.getBoundingClientRect();
  const cv = document.createElement('canvas');
  cv.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:60;';
  document.body.appendChild(cv);
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
  const ctx = cv.getContext('2d');
  if (!ctx) {
    cv.remove();
    return;
  }
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 3;
  const ps: P[] = Array.from({ length: n }, () => ({
    x: cx,
    y: cy,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -11 - 3,
    s: Math.random() * 7 + 4,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    c: COLORS[(Math.random() * COLORS.length) | 0]
  }));
  const t0 = performance.now();
  const tick = (t: number): void => {
    const el = (t - t0) / 1000;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of ps) {
      p.vy += 0.45;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, 1 - el / 1.2);
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    }
    if (el < 1.2) requestAnimationFrame(tick);
    else cv.remove();
  };
  requestAnimationFrame(tick);
}
