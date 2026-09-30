# V4 IMPLEMENTATION REPORT
## Changed (engine preserved; visual/state-layer only)
1. `tokens.css`: +`--r-xl`.
2. `Lobby.svelte`: grand modal fixed→absolute-in-canvas; auto-fire gated on `scene==='lobby'` + once-flag; Esc closes modal; tiles expose `(đã mở)` + `aria-disabled`.
3. `Gameplay.svelte`: grading normalizes BOTH sides (`accepted.map(norm)`); input gets `id/name`; all artwork `onerror` hide.
4. `audio.svelte.ts`: `probeClip` requires `content-type: audio/*` (fixes SPA-fallback 200 false-positive); `playClip` stops previous clip.
5. `App.svelte`: ambient spotlight drift; `index.html`: Google Fonts removed (offline), +meta description/theme-color.
6. `transition: all` → explicit props (13 sites). `src/lib/fonts.css` new.
## Preserved untouched
Puzzle machine, navigation/keyboard map, fullscreen, secret-image mappings, completion semantics, Q6 QA-PENDING (no invented title), HAS_7B_DATA=false, reduced-motion.
## Verification
`npm run check` PASS · `npm run build` PASS · browser full 0→9/9 drive PASS (wrong path, MC confirm, lucky, Q6 fallback, grand auto, Esc, closing).
