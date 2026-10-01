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
    gsap.fromTo(
      '.board .tile',
      { opacity: 0, y: 30, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out', overwrite: true }
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
  <!-- Top Lightweight Instruction Rail & Sleek Progress Track -->
  <div class="lobby-header-bar">
    <!-- Compact Instruction Rail -->
    <div class="instruction-rail">
      <div class="rail-step">
        <span class="step-num">01</span>
        <span class="step-lbl">CHỌN Ô</span>
      </div>
      <span class="rail-arrow" aria-hidden="true">›</span>
      <div class="rail-step">
        <span class="step-num">02</span>
        <span class="step-lbl">GIẢI THỬ THÁCH</span>
      </div>
      <span class="rail-arrow" aria-hidden="true">›</span>
      <div class="rail-step">
        <span class="step-num">03</span>
        <span class="step-lbl">MỞ MẢNH GHÉP</span>
      </div>
    </div>

    <!-- Sleek Dot Progress Track -->
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

  <!-- The 3×3 Mystery Board (frameless — artifacts in the world) -->
  <div class="board-field">
    <div class="stars" aria-hidden="true"></div>
    <div class="board">
      {#each PUZZLE_CELLS as cell (cell.id)}
        {@const st = pres.status[cell.id - 1]}
        {@const isDone = st === 'completed'}
        {@const mapping = getPieceMapping(cell.id)}
        <button
          class="tile"
          class:opened={st === 'opened'}
          class:done={isDone}
          disabled={isDone}
          aria-disabled={isDone}
          onclick={(e) => pick(e.currentTarget, cell.id)}
          aria-label={isDone ? `Mảnh ghép số ${cell.id} (đã mở)` : `Mảnh ghép số ${cell.id}`}
        >
          <!-- REVEALED SECRET PIECE LAYER (visible when completed) -->
          {#if isDone}
            <div
              class="piece-revealed-layer"
              style="
                background-image: url('{secretImg}');
                background-position: {mapping.bgPosition};
                background-size: 846px 591px;
              "
            >
              <div class="piece-overlay"></div>
              <div class="piece-badge">
                <span class="piece-check">✓</span>
                <span class="piece-id">0{cell.id}</span>
              </div>
            </div>
          {:else}
            <!-- UNOPENED MYSTERY ARTIFACT (All 9 tiles look 100% identical) -->
            <div class="tile-inner">
              <div class="tile-mystery-view">
                <span class="mystery-glyph">{ABSTRACT_GLYPHS[cell.id - 1]}</span>
                <span class="num-id">{String(cell.id).padStart(2, '0')}</span>
                <span class="mystery-node-label">NODE 0{cell.id}</span>
              </div>
            </div>
            <div class="tile-bevel"></div>
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
      <div class="grand-badge">
        <span class="grand-star">★</span>
        <span>HOÀN THÀNH 9 / 9 MẢNH GHÉP</span>
        <span class="grand-star">★</span>
      </div>
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

  /* ── INSTRUCTION RAIL (bare text, no pill) ─────── */
  .instruction-rail {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 4px 2px;
  }
  .rail-step {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .step-num {
    font-family: var(--f-display);
    font-size: 15px;
    color: var(--c-spot-cyan);
    font-weight: 800;
  }
  .step-lbl {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--c-ink-200);
  }
  .rail-arrow {
    color: rgba(255, 255, 255, 0.3);
    font-size: 18px;
    font-weight: 700;
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

  /* ── BOARD FIELD (no frame — artifacts float in the world) ── */
  .board-field {
    position: relative;
    padding: 12px;
  }
  .board-field::before {
    content: '';
    position: absolute;
    inset: -60px;
    background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0, 229, 255, 0.07) 0%, transparent 70%);
    pointer-events: none;
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

  /* ── BOARD GRID (846px x 591px total area) ───────── */
  .board {
    display: grid;
    grid-template-columns: repeat(3, 270px);
    grid-auto-rows: 185px;
    gap: 18px;
  }

  /* ── MYSTERY TILE (ENERGY NODE) ─────────────────── */
  .tile {
    position: relative;
    width: 270px;
    height: 185px;
    border-radius: var(--r-md);
    border: 1.5px solid rgba(0, 229, 255, 0.3);
    background: radial-gradient(
      140% 120% at 50% 10%,
      rgba(20, 48, 115, 0.82) 0%,
      rgba(8, 18, 42, 0.95) 100%
    );
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
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
    font-size: 78px;
    line-height: 1;
    color: #fff;
    text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 229, 255, 0.25);
  }
  .mystery-node-label {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.2em;
    color: var(--c-ink-300);
    text-transform: uppercase;
  }
  .tile-bevel {
    position: absolute;
    inset: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    pointer-events: none;
    border-radius: var(--r-md);
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
  .piece-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(7, 17, 38, 0.8) 100%);
    pointer-events: none;
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

  .grand-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 0.16em;
    color: var(--c-gold-glow);
    background: rgba(7, 17, 38, 0.85);
    border: 1.5px solid var(--c-gold-core);
    border-radius: var(--r-pill);
    padding: 6px 24px;
    box-shadow: 0 4px 20px rgba(255, 196, 37, 0.4);
    backdrop-filter: blur(16px);
  }
  .grand-star {
    color: var(--c-gold-core);
    font-size: 18px;
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
    font-size: 20px;
    font-weight: 700;
    color: var(--c-ink-200);
    background: rgba(7, 17, 38, 0.85);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: var(--r-pill);
    padding: 16px 36px;
    cursor: pointer;
    backdrop-filter: blur(16px);
    transition: background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), color var(--t-fast) var(--e-out);
  }
  .btn-grand-close:hover {
    color: #fff;
    border-color: var(--c-spot-cyan);
    background: rgba(13, 29, 69, 0.95);
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
