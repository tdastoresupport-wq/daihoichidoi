# V5 FINAL QA
## Screenshot sweep (§40, all captured in live browser)
Opening · Dir1–5 · Lobby 0/9 · Q1 · Q4 AI · Q6 Music+fallback · Q7 Rebus · Q8 Lucky · Q9 · Wrong-state · Grand 9/9 · Closing. Partial-reveal evidenced via progress dots + disabled tiles in shots.
## Gameplay matrix (§42) — all PASS
Q1 correct/wrong/retry · Q2–Q5,Q7 correct · Q4 choice · Q6 audio-fallback + manual MC confirm · Q7 rebus · Q8 lucky+1 · Q9 dots + confirm · 9/9 → grand → closing · replay/home buttons present.
## Edge matrix (§43) — all PASS/stable
Rapid Enter (fast-forward, lands consistent) · rapid Space (debounced: opens, no auto-reveal; deliberate press reveals) · double tile-click (idempotent) · completed tile (disabled+labelled) · Esc (game→lobby, modal→close) · mute toggle (live "đang phát"/mute states) · resize 1366 (letterbox) · refresh (resets by design — MC must not refresh) · missing audio (fallback banner).
NOT headless-testable: physical fullscreen toggle, projector hardware, speaker output. Fullscreen code has rejection catch; needs venue check.
## Completion criteria (§47)
Logic✓ UX✓ UI✓ hierarchy✓ color✓ type✓ artwork✓(except closing hero — BLOCKER) animations✓ audio✓ secret-image✓ lucky-hidden✓ wrong-no-unlock✓ correct-unlocks-exact✓ 0→9/9✓ grand✓ keyboard✓ fullscreen-code✓ offline✓ profiled(static)✓ no-obvious-defects✓ check✓ build✓ preview✓.
