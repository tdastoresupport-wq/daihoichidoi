# V5 PERFORMANCE REPORT
- Load (DevTools trace, 2 runs): LCP 165–182ms, CLS 0.00, TTFB ~5ms.
- Transfer: JS 150KB (gzip ~56KB), CSS 40KB, fonts 120KB, images ~8MB + mp3 3MB, all local 200/304, 0 failures.
- Runtime: animations transform/opacity-only (except 10→32px dot pill, negligible); confetti ≤90 rects/1.2s on canvas; backdrop-filters static; no per-frame JS loops except one 16s CSS drift.
- rAF jank: UNMEASURABLE in this headless env (throttled ~1Hz) — do not claim; static budget analysis substituted (documented limitation).
- No bottleneck found; no optimization applied (per skill: no measurement naming a bottleneck → no change).
