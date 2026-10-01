# V8 TECHNICAL REPORT (production build, live browser — commit c2314e1, pushed)

- **Performance: PASS** — LCP ~170ms, CLS 0, JS gzip ~56KB; animations transform/opacity-only; no per-frame JS loops; confetti canvas is transient (1.2s, removed after).
- **Memory/cleanup: PASS** — heap 4MB→3MB across full 9-cell session, DOM 53→162 nodes bounded. Fixed this round: Gameplay reward delayedCall killed on unmount; Lobby pick-timer single + cleared on unmount (prevents post-navigation openCell).
- **Fullscreen 1920×1080: PASS** — requestFullscreen() entered successfully in-browser; 1920×1080 full-bleed + 1366×768 letterbox screenshot-verified; no scrollbar (overflow hidden); 96px safe area.
- **Keyboard reliability: PASS** — arrows/Enter/Space/Esc/F/M all behave; 500ms primary debounce blocks double-fire; rapid two-tile settles deterministically (last-wins, other resumable, progress uncorrupted); single window listener with cleanup; Esc-during-pick stays consistent.
- **Audio robustness: PASS** — mute×3 stable, clip-stop-previous, SFX short-lived oscillators, full try/catch, Q6-missing fallback banner, UI fully usable with zero audio.
- **Recovery paths: PASS** — wrong→retry, all artwork onerror-hide, refresh→clean opening (resets by design), completed tiles locked + labelled.
- **Secret-image permutations: PASS** — reverse 9→1 drive: 9 pieces, 9 unique IDs, progress exact, grand fires; no duplicates, no misassignment.
- **Reduced motion: NOT VERIFIED live** (no media-emulation tool in this env) — guards present in App/Lobby/Gameplay/confetti + global CSS kill-switch; code-reviewed only.
- **Production browser: PASS** — full matrix green, zero console messages, zero failed requests (all local: JS/CSS/fonts/images/mp3).
- **Build: PASS** — check 0 errors, vite build clean.

Không redesign, không đổi logic/data. Còn lại ngoài tầm browser: loa/máy chiếu vật lý tại hội trường.
