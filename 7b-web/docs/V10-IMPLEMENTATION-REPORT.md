# V10 IMPLEMENTATION + QA REPORT
## Question bank
Replaced verbatim per spec (Q1 25%, Q2 watches, Q3 CO2, Q4 lung linh, Q5 Ctrl+Z, Q6 Fansipan, Q7 30, Q8 lucky, Q9 63). Old music Q6 fully removed (no probe/fallback/music UI); nine-dots assets orphaned on disk, unimported. Q6/Q9 now deterministic auto-grade; MC override retained.
## Gameplay rebuild
A/B/C/D beams (2-col, markers, 1-4 keys), 15s wall-clock timer (non-blocking expiry, tick last 5s, MC still answers), per-motif CSS worlds (burst/words/science/type/keys/peaks/kinetic/lock/gold), staggered beam entrance, fly-piece reward travel, short explanations post-reveal only.
## Lobby
Constellation: 9 circular orbs at asymmetric % coords, SVG link path draw-in, 2 slow orbits, one-shot blurred silhouette pulse, slim command line, title settle. Grand de-chromed (kicker text + ghost buttons). Board rule holds: identical pre-open.
## Fixes found by browser QA
1. Timer instant-expiry (interval pile-up) → wall-clock design. 2. `.motif-bg` intercepting all clicks (P0) → pointer-events:none. 3. Test-harness map typos (not app bugs).
## Verification (production build, live browser)
Full 1→9 drive: wrong/retry, all correct paths, Q6 beam, Q8 lucky, Q9, 9/9 unique pieces, grand auto, closing. Keys 1-4. Timer 15→expiry→answerable. Reverse-order covered by engine (unchanged) + V8. Lighthouse 100/100. Console zero. 1920 + 1366 screenshots. check 0 errors, build pass.
## Remaining
Q6 title/clip: none exists, stays manual-capable MCQ (no fabrication). Venue hardware check. Reduced-motion: code guards, not live-emulated.
