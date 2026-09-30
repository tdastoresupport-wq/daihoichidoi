# V4 DESIGN SYSTEM (delta vs V2 bible — implementation truth)
- Tokens: `src/lib/tokens.css`. ADD vs V2: `--r-xl: 44px` (was referenced, undefined). Fonts self-hosted `src/lib/fonts.css` + `src/assets/fonts/*.woff2` (Paytone One 400, Bricolage Grotesque 400–800 variable; vietnamese+latin; `font-display: swap`).
- Motion: micro 160ms, tile shockwave ~320ms, reveal ~450–480ms, scene 600ms, grand 800ms fade+scale; ambient = one 16s transform-only drift on App spotlight. No layout-property animation in loops (`transition: all` eliminated, 13 sites → explicit props).
- States: tile available/hover(lift+sweep)/selected(shockwave)/opened(cyan)/completed(secret piece + gold badge)/lucky-identical-pre-open (board rule: no leak). Answer: mystery → reveal(flip) → correct(success+confetti+fanfare+piece banner) / presented(MC confirm) / wrong(shake+retry, no progress).
- Grand reveal: absolute inset-0 inside 16:9 canvas (z-100), auto-fires only on lobby at 9/9 (never mid-answer), Esc-aware, re-openable via trigger button.
- Confetti: single body-level canvas, z-60 fixed (above canvas stacking context incl. modal), 1.2s, reduced-motion-guarded.
