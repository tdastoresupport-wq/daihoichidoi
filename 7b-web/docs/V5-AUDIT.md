# V5 AUDIT — 7B Interactive Web Presentation
Date: 2026-10-01 | Base: commit 9525af4 (V4) | Method: full source read + live browser (17 screenshots, DOM-driven full flow, Lighthouse, network, rAF sampling)

## A–D. Architecture / Logic / Mechanics / State
Unchanged from V4, all verified: Svelte 5 runes stores, 0→9/9 drive PASS, wrong→retry no-progress, MC-confirm for manual (Q6/Q9), lucky auto, secret-image mapping math exact (846×591), grand gated on lobby.

## E–G. UX / UI / Design system
Mystery board identical pre-open ✓; gold=reward only ✓; full-viewport story scenes ✓; tokens enforced (1 undefined token found+fixed in V4).

## H. Artwork
All referenced assets exist. Issues: (1) Closing uses Nova character SHEET with visible labels — P0 asset blocker (carried from V4). (2) Unused on disk, not bundled: `fig-tam-giac.svg` (V1), `scene-rebus-puzzle.jpg`, `directions-06.jpg` — P2, no action. (3) Hero/grand art carries decorative "CLASS 7B" baked text — approved per V2 manifest (identity, not wording); no Vietnamese answers baked anywhere ✓.

## I. Typography
Paytone One + Bricolage self-hosted (vietnamese+latin, swap); hierarchy 20–140px, min body ≥20px (dock microcopy) — projector-acceptable; verified loaded in browser.

## J. Animation
Bands respected (160/320/480/600/800ms); `transition:all` eliminated; ambient = 1 transform drift; reduced-motion guards + confetti skip.

## K. Audio
Loop + SFX + fanfare + probe/content-type + stop-previous verified live.

## L. Performance
LCP ~170ms, CLS 0, JS gzip ~56KB, 0 failed requests. rAF jank unmeasurable headless (throttled) — static-only. Directions mounts 5 JPGs (~3.3MB) eagerly; local, no stall observed → keep (documented decision, no WebP re-encode: local deployment, zero measured stall).

## M. Accessibility
Lighthouse 100/100; named controls; focus-visible; completed tiles expose state; input id/name.

## N. Projector
1920×1080 full-bleed + 1366×768 letterbox screenshot-verified; ≥24px critical type; safe area respected.

## O. Offline
Zero remote requests (fonts/mp3/images local). MUST serve over HTTP (`vite preview`); file:// = blank (ES modules) — documented, by design.

## P. Deploy readiness
`npm run build` → static `dist/`, no server/backend. Cloudflare Pages/any static host compatible (SPA fallback irrelevant — single route + hash-free relative asset paths... note: absolute `/audio/` + `/favicon.svg` paths require domain-root serving; use root deployment).

## Q. Code quality
Centralized data/tokens/anims; TS strict 0 errors; no console.*; no dead imports found (unused asset FILES only, unreferenced).

## R. Known bugs (found in V5 browser audit)
- P0: Closing character-sheet backdrop (asset blocker, needs new artwork).
- P1 (FIXED in V5): rapid double-Space/Enter auto-revealed answers — added 500ms `primary()` debounce; verified open-without-reveal + deliberate-reveal.
- P2: DevTools-protocol clicks flaky on grand-modal buttons (test-tool artifact; DOM events work — verified via evaluate).

## Priority summary
P0: closing hero asset (external). P1: none remaining. P2: unused files, SEO meta (kiosk-irrelevant), clip-ducking polish.
