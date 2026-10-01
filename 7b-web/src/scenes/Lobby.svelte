<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SceneHeader from '../components/SceneHeader.svelte';

  import { PUZZLE_CELLS, getPieceMapping } from '../lib/data';
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import { burst } from '../lib/confetti';

  import secretImg from '../assets/v2/puzzle/secret-image-7b.jpg';

  const ABSTRACT_GLYPHS = ['◈', '◇', '✦', '⬡', '✧', '◈', '◇', '✦', '⬡'];

// Constellation layout (% of field) — asymmetric, mysterious.
const NODE_POS = [
  { x: 27, y: 10 }, { x: 50, y: 6 }, { x: 16, y: 32 },
  { x: 74, y: 28 }, { x: 48, y: 47 }, { x: 20, y: 68 },
  { x: 70, y: 66 }, { x: 36, y: 88 }, { x: 60, y: 88 }
];
const LINK_PATH =
  'M421,62 L780,37 L1154,174 L1092,409 L936,546 L562,546 L312,422 L250,198 L749,291 Z';

  let showGrandReveal = $state(false);
  let grandRevealModal: HTMLElement | null = $state(null);
  let autoFired = false;
  let pickTimer = 0;

  onMount(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && showGrandReveal) showGrandReveal = false;
    };
    window.addEventListener('keydown', onKey);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        window.removeEventListener('keydown', onKey);
        window.clearTimeout(pickTimer);
      };
    }
    // Entrance: title settles, arcs draw, nodes appear one by one.
    gsap.fromTo(
      '.shead',
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', overwrite: true }
    );
    gsap.fromTo(
      '.board .tile',
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.09, ease: 'power2.out', overwrite: true }
    );
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(pickTimer);
    };
  });

  // Grand reveal chỉ tự mở khi đã về board (không giật màn hình lúc đọc đáp án ô 9).
  $effect(() => {
    const done = pres.completedCount === 9;
    const sc = pres.scene;
    if (!done) autoFired = false;
    if (done && sc === 'lobby' && !showGrandReveal && !autoFired) {
      autoFired = true;
      const timer = window.setTimeout(() => {
        showGrandReveal = true;
        audio.fanfare();
        if (grandRevealModal) burst(grandRevealModal);
      }, 500);
      return () => clearTimeout(timer);
    }
  });

  function pick(el: HTMLElement, id: number): void {
    audio.unlock();
    audio.click();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      // Focus lock: siblings dim while the chosen artifact charges.
      const sibs = [...(el.parentElement?.children ?? [])].filter((c) => c !== el);
      gsap.to(sibs, { opacity: 0.35, duration: 0.18, ease: 'power2.out' });
      // Mystery artifact selection energy animation
      gsap.timeline()
        .to(el, { scale: 0.94, duration: 0.1, ease: 'power2.in' })
        .to(el, { scale: 1.04, duration: 0.22, ease: 'power2.out' });

      gsap.fromTo(
        el,
        { boxShadow: '0 0 0 0 rgba(0, 229, 255, 0.95)' },
        { boxShadow: '0 0 0 35px rgba(0, 229, 255, 0)', duration: 0.38, ease: 'power2.out' }
      );
    }

    window.clearTimeout(pickTimer);
    pickTimer = window.setTimeout(() => pres.openCell(id), 180);
  }

  function triggerFullMasterView() {
    audio.fanfare();
    showGrandReveal = true;
  }
</script>

<SceneHeader kicker="Scene 04 — Thử thách tri thức" title="BỨC TRANH BÍ MẬT — CHI ĐỘI 7B" />

<div class="lobby-stage">
  <!-- Slim command line: instruction + progress, no pills -->
  <div class="lobby-header-bar">
    <p class="command-line">
      <span class="cmd-gold">CHỌN 1 TRONG 9 ĐIỂM SÁNG</span>
      <span class="cmd-sep">·</span>
      <span>GIẢI THỬ THÁCH → MỞ MẢNH GHÉP</span>
    </p>
    <div class="progress-track">
      <div class="dots-meter" aria-hidden="true">
        {#each Array(9) as _, i}
          <span class="meter-dot" class:filled={i < pres.completedCount}></span>
        {/each}
      </div>
      <div class="progress-label">
        <span class="prog-cur">{pres.completedCount}</span>
        <span class="prog-sep">/</span>
        <span class="prog-total">9 MẢNH GHÉP</span>
      </div>
    </div>
  </div>

  <!-- CONSTELLATION FIELD -->
  <div class="board-field">
    <div class="stars" aria-hidden="true"></div>
    <svg class="constellation" viewBox="0 0 1560 620" aria-hidden="true">
      <ellipse class="orbit" cx="780" cy="310" rx="700" ry="255" />
      <ellipse class="orbit o2" cx="780" cy="310" rx="470" ry="175" />
      <path class="links" d={LINK_PATH} pathLength="1" />
    </svg>
    <div class="secret-silhouette" aria-hidden="true"></div>
    <div class="board">
      {#each PUZZLE_CELLS as cell (cell.id)}
        {@const st = pres.status[cell.id - 1]}
        {@const isDone = st === 'completed'}
        {@const mapping = getPieceMapping(cell.id)}
        {@const pos = NODE_POS[cell.id - 1]}
        <button
          class="tile node"
          style={`left:${pos.x}%;top:${pos.y}%`}
          class:opened={st === 'opened'}
          class:done={isDone}
          disabled={isDone}
          aria-disabled={isDone}
          onclick={(e) => pick(e.currentTarget, cell.id)}
          aria-label={isDone ? `Mảnh ghép số ${cell.id} (đã mở)` : `Mảnh ghép số ${cell.id}`}
        >
          {#if isDone}
            <div
              class="piece-revealed-layer"
              style="
                background-image: url('{secretImg}');
                background-position: {mapping.bgPosition};
                background-size: 570px 398px;
              "
            >
              <div class="piece-badge">
                <span class="piece-check">✓</span>
                <span class="piece-id">0{cell.id}</span>
              </div>
            </div>
          {:else}
            <div class="tile-inner">
              <div class="tile-mystery-view">
                <span class="mystery-glyph">{ABSTRACT_GLYPHS[cell.id - 1]}</span>
                <span class="num-id">{String(cell.id).padStart(2, '0')}</span>
              </div>
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Grand view trigger button if 9/9 completed -->
  {#if pres.completedCount === 9}
    <div class="grand-trigger-banner">
      <button class="btn-grand-reveal" onclick={triggerFullMasterView}>
        <span>🌟 CHIÊM NGƯỠNG BỨC TRANH BÍ MẬT 7B 🌟</span>
      </button>
    </div>
  {/if}
</div>

<!-- ═══ GRAND 9/9 MASTER IMAGE FULL VIEWPORT REVEAL ═══ -->
{#if showGrandReveal}
  <div class="grand-fullscreen-stage" bind:this={grandRevealModal}>
    <!-- Full-viewport Master Artwork Background -->
    <img src={secretImg} alt="Bức tranh bí mật Chi đội 7B" class="grand-fullscreen-bg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
    <div class="grand-fullscreen-overlay" aria-hidden="true"></div>
    <div class="grand-fullscreen-glow" aria-hidden="true"></div>

    <!-- Top Celebration Header -->
    <div class="grand-fullscreen-header">
      <p class="grand-kicker">★ &nbsp;HOÀN THÀNH 9 / 9 MẢNH GHÉP&nbsp; ★</p>
      <h1 class="grand-title">BỨC TRANH BÍ MẬT CHI ĐỘI 7B</h1>
      <p class="grand-sub">“Đoàn kết – Trí tuệ – Sáng tạo – Bứt phá tương lai”</p>
    </div>

    <!-- Bottom Floating Actions -->
    <div class="grand-fullscreen-footer">
      <button class="btn-grand-close" onclick={() => (showGrandReveal = false)}>
        ✕ Xem lại bảng đố
      </button>
      <button
        class="btn-grand-next"
        onclick={() => {
          showGrandReveal = false;
          pres.next();
        }}
      >
        <span>TIẾP TỤC: BẾ MẠC ĐẠI HỘI</span>
        <span class="arrow">→</span>
      </button>
    </div>
  </div>
{/if}

<style>
  .lobby-stage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 105px var(--safe) 55px;
  }

  /* ── LOBBY HEADER BAR ───────────────────────────── */
  .lobby-header-bar {
    display: flex;
    align-items: center;
    gap: 32px;
    z-index: var(--z-content);
    flex-wrap: wrap;
    justify-content: center;
  }

  /* ── LOBBY HEADER: slim command line ────────────── */
  .command-line {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--c-ink-300);
    margin: 0;
  }
  .cmd-gold {
    color: var(--c-gold-400);
  }
  .cmd-sep {
    margin: 0 12px;
    color: rgba(255, 255, 255, 0.3);
  }

  /* ── SLEEK PROGRESS TRACK (bare, no pill) ───────── */
  .progress-track {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 4px 2px;
  }
  .dots-meter {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .meter-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .meter-dot.filled {
    background: var(--c-spot-cyan);
    box-shadow: 0 0 10px var(--c-spot-cyan);
    transform: scale(1.15);
  }
  .progress-label {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 15px;
  }
  .prog-cur {
    font-family: var(--f-display);
    font-size: 18px;
    color: var(--c-spot-cyan);
    font-weight: 800;
  }
  .prog-sep {
    color: rgba(255, 255, 255, 0.35);
  }
  .prog-total {
    color: var(--c-ink-200);
    letter-spacing: 0.05em;
  }

  /* ── CONSTELLATION FIELD ────────────────────────── */
  .board-field {
    position: relative;
    width: 1560px;
    max-width: calc(100% - var(--safe) * 2);
    aspect-ratio: 1560 / 620;
  }
  .constellation {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .constellation .links {
    fill: none;
    stroke: rgba(0, 229, 255, 0.28);
    stroke-width: 2;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: linkDraw 1.6s var(--e-out) 0.3s forwards;
  }
  .constellation .orbit {
    fill: none;
    stroke: rgba(111, 165, 255, 0.16);
    stroke-width: 1.5;
    stroke-dasharray: 2 14;
    animation: orbitSpin 40s linear infinite;
    transform-origin: 780px 310px;
  }
  .constellation .o2 {
    animation-duration: 28s;
    animation-direction: reverse;
  }
  @keyframes linkDraw {
    to { stroke-dashoffset: 0; }
  }
  @keyframes orbitSpin {
    to { transform: rotate(360deg); }
  }
  /* Secret silhouette pulse (abstract, once) */
  .secret-silhouette {
    position: absolute;
    left: 50%;
    top: 47%;
    width: 420px;
    height: 280px;
    transform: translate(-50%, -50%);
    background-image: url('../assets/v2/puzzle/secret-image-7b.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    filter: blur(46px) saturate(1.2);
    opacity: 0;
    pointer-events: none;
    animation: silhouettePulse 2.2s var(--e-out) 0.9s;
  }
  @keyframes silhouettePulse {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    35% { opacity: 0.5; }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.12); }
  }

  /* ── BOARD: absolute nodes ────────────────────────── */
  .board {
    position: absolute;
    inset: 0;
  }
  /* Sparse twinkling dust — 2 layers only, lobby lifecycle */
  .stars {
    position: absolute;
    inset: -40px;
    pointer-events: none;
    background-image:
      radial-gradient(2px 2px at 12% 22%, rgba(255, 255, 255, 0.8), transparent 60%),
      radial-gradient(1.5px 1.5px at 68% 12%, rgba(255, 221, 102, 0.7), transparent 60%),
      radial-gradient(2px 2px at 84% 66%, rgba(255, 255, 255, 0.6), transparent 60%),
      radial-gradient(1.5px 1.5px at 32% 78%, rgba(0, 229, 255, 0.7), transparent 60%),
      radial-gradient(1.5px 1.5px at 48% 38%, rgba(255, 255, 255, 0.5), transparent 60%);
    animation: starTwinkle 7s ease-in-out infinite alternate;
  }
  @keyframes starTwinkle {
    from { opacity: 0.35; }
    to   { opacity: 1; }
  }

  /* ── MYSTERY NODE (orb, not card) ───────────────── */
  .tile.node {
    position: absolute;
    width: 190px;
    height: 190px;
    margin: -95px 0 0 -95px; /* center on left/top point (GSAP-safe) */
    border-radius: 50%;
    border: 2px solid rgba(0, 229, 255, 0.35);
    background: radial-gradient(
      circle at 50% 32%,
      rgba(32, 72, 160, 0.9) 0%,
      rgba(8, 18, 42, 0.96) 72%
    );
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.65),
      inset 0 2px 10px rgba(255, 255, 255, 0.1),
      0 0 26px rgba(0, 229, 255, 0.12);
    transition:
      transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  /* Subtle surface light sweep on hover */
  .tile::before {
    content: '';
    position: absolute;
    inset: -100%;
    border-radius: 50%;
    background: linear-gradient(115deg, transparent 40%, rgba(0, 229, 255, 0.12) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.45s ease;
    pointer-events: none;
    z-index: 3;
  }
  .tile:hover:not(:disabled)::before {
    transform: translateX(100%);
  }

  .tile:hover:not(:disabled) {
    transform: translateY(-5px) scale(1.025);
    border-color: rgba(0, 229, 255, 0.85);
    box-shadow:
      0 18px 36px rgba(0, 0, 0, 0.75),
      0 0 28px rgba(0, 229, 255, 0.35);
  }
  .tile:active:not(:disabled) {
    transform: scale(0.95);
  }

  .tile.opened {
    border-color: var(--c-spot-cyan);
    box-shadow: 0 0 32px rgba(0, 229, 255, 0.45);
  }

  .tile.done {
    cursor: default;
    border-color: rgba(255, 196, 37, 0.5);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 196, 37, 0.3);
    animation: pieceRevealGlow 0.8s var(--e-out);
  }
  @keyframes pieceRevealGlow {
    0% { transform: scale(0.88); box-shadow: 0 0 50px rgba(255, 196, 37, 0.9); }
    100% { transform: scale(1); box-shadow: 0 8px 24px rgba(0,0,0,0.6), 0 0 20px rgba(255,196,37,0.3); }
  }

  /* ── UNOPENED MYSTERY TILE INNER ────────────────── */
  .tile-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .tile-mystery-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .mystery-glyph {
    font-size: 16px;
    color: var(--c-spot-cyan);
    opacity: 0.75;
    letter-spacing: 0.1em;
  }
  .num-id {
    font-family: var(--f-display);
    font-size: 62px;
    line-height: 1;
    color: #fff;
    text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 229, 255, 0.25);
  }

  /* ── REVEALED SECRET PIECE LAYER ────────────────── */
  .piece-revealed-layer {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 8px 10px;
    overflow: hidden;
    animation: pieceSettle 0.6s var(--e-out);
  }
  @keyframes pieceSettle {
    0% { opacity: 0; transform: scale(1.07); }
    100% { opacity: 1; transform: scale(1); }
  }
  .piece-badge {
    position: relative;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(7, 17, 38, 0.85);
    border: 1px solid var(--c-gold-core);
    border-radius: var(--r-pill);
    padding: 2px 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  }
  .piece-check {
    color: var(--c-success);
    font-size: 14px;
    font-weight: 900;
  }
  .piece-id {
    font-family: var(--f-display);
    font-size: 14px;
    color: var(--c-gold-core);
  }

  /* ── GRAND TRIGGER BANNER ───────────────────────── */
  .grand-trigger-banner {
    z-index: var(--z-content);
    margin-top: 4px;
  }
  .btn-grand-reveal {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 0.05em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, #fff7cc 0%, var(--c-gold-core) 50%, var(--c-gold-500) 100%);
    border: none;
    border-radius: var(--r-pill);
    padding: 16px 48px;
    cursor: pointer;
    box-shadow:
      0 12px 36px rgba(255, 196, 37, 0.5),
      0 0 30px rgba(0, 229, 255, 0.4);
    animation: grandButtonPulse 2s infinite ease-in-out;
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-grand-reveal:hover {
    transform: scale(1.05);
  }
  @keyframes grandButtonPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 12px 36px rgba(255, 196, 37, 0.5); }
    50%       { transform: scale(1.03); box-shadow: 0 16px 48px rgba(255, 196, 37, 0.8), 0 0 40px rgba(0, 229, 255, 0.6); }
  }

  /* ── 9/9 MASTER IMAGE REVEAL (inside 16:9 canvas) ───────── */
  .grand-fullscreen-stage {
    position: absolute;
    inset: 0;
    z-index: 100;
    background: #000;
    overflow: hidden;
    animation: fullFadeIn 1.2s var(--e-out);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px var(--safe);
  }
  @keyframes fullFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .grand-fullscreen-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
    filter: brightness(0.92) contrast(1.05);
    animation: grandZoom 1.6s var(--e-out);
  }
  @keyframes grandZoom {
    from { transform: scale(1.08); }
    to   { transform: scale(1); }
  }

  .grand-fullscreen-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(
      ellipse 100% 100% at 50% 50%,
      rgba(7, 17, 38, 0.1) 0%,
      rgba(7, 17, 38, 0.7) 75%,
      rgba(7, 17, 38, 0.95) 100%
    );
  }

  .grand-fullscreen-glow {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    box-shadow: inset 0 0 100px rgba(255, 196, 37, 0.45);
  }

  .grand-fullscreen-header {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    animation: slideDown 0.6s 0.2s var(--e-out) both;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .grand-kicker {
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 0.2em;
    color: var(--c-gold-400);
    margin: 0;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9);
  }

  .grand-title {
    font-family: var(--f-display);
    font-size: 58px;
    color: var(--c-gold-glow);
    margin: 0;
    text-shadow:
      0 4px 24px rgba(0, 0, 0, 0.9),
      0 0 40px rgba(255, 196, 37, 0.6);
  }

  .grand-sub {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
    letter-spacing: 0.04em;
  }

  .grand-fullscreen-footer {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    animation: slideUp 0.6s 0.4s var(--e-out) both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .btn-grand-close {
    font-family: var(--f-body);
    font-size: 22px;
    font-weight: 700;
    color: var(--c-ink-200);
    background: none;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 10px 6px;
    cursor: pointer;
    transition: color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .btn-grand-close:hover {
    color: #fff;
    border-color: var(--c-spot-cyan);
  }

  .btn-grand-next {
    font-family: var(--f-body);
    font-size: 26px;
    font-weight: 800;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, #fff3b0 0%, var(--c-gold-core) 50%, var(--c-gold-500) 100%);
    border: none;
    border-radius: var(--r-pill);
    padding: 20px 56px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    box-shadow:
      0 12px 40px rgba(255, 196, 37, 0.6),
      0 0 30px rgba(255, 196, 37, 0.4);
    transition: transform var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .btn-grand-next:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow:
      0 18px 50px rgba(255, 196, 37, 0.8),
      0 0 50px rgba(255, 196, 37, 0.6);
  }
  .arrow {
    font-size: 30px;
  }
</style>
