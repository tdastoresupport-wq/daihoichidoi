# V4 PERFORMANCE REPORT (measured 2026-10-01, vite preview, localhost)
- Load: LCP 165–182ms, CLS 0.00, TTFB ~5ms (DevTools trace, 2 runs).
- Bundle: JS 150KB (gzip 56KB), CSS 40KB (gzip 7.6KB); fonts 120KB woff2; images ~8MB local JPG + 3MB mp3 (all 304/local, 0 failed requests).
- Interaction jank: rAF sampling INVALID in this environment (headless throttles rAF to ~1Hz) — recorded as unmeasured. Static analysis instead: all animated props are transform/opacity/box-shadow-pulse; no width/height/top/left loops; single canvas confetti ≤90 rects × 1.2s; backdrop-filter layers static (no per-frame cost); GSAP tweens finite.
- Budgets: idle = 1 ambient keyframe loop (compositor) + eq bars on 2 components; no DOM particle systems; images decode on demand per scene (Opening mounts hero only).
- Risks: `backdrop-filter: blur(20px)` on several glass panels — static cost, fine on projector PCs; pre-2016 hardware untested. Directions preloads 5 JPGs (~3.3MB) on first visit — local, no stall observed.
