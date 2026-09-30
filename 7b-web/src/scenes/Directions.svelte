<script lang="ts">
  import SceneHeader from '../components/SceneHeader.svelte';
  import Icon from '../components/Icon.svelte';
  import { DIRECTIONS } from '../lib/data';
  import { audio } from '../lib/audio.svelte';

  import dir1 from '../assets/v2/directions/directions-01.jpg';
  import dir2 from '../assets/v2/directions/directions-02.jpg';
  import dir3 from '../assets/v2/directions/directions-03.jpg';
  import dir4 from '../assets/v2/directions/directions-04.jpg';
  import dir5 from '../assets/v2/directions/directions-05.jpg';

  const DIR_IMAGES = [dir1, dir2, dir3, dir4, dir5];
  const ICONS = ['ai', 'abc', 'team', 'leaf', 'heart'];

  let idx = $state(0);

  export function step(dir: 1 | -1): boolean {
    const n = idx + dir;
    if (n < 0 || n >= DIRECTIONS.length) return false;
    idx = n;
    audio.click();
    return true;
  }
  export function reset(): void {
    idx = 0;
  }

  function setIndex(i: number) {
    if (i !== idx) {
      idx = i;
      audio.click();
    }
  }
</script>

<div class="directions-stage">
  <!-- Full-screen Background Artwork with Fade/Scale -->
  {#each DIR_IMAGES as img, i}
    <img
      src={img}
      alt="Định hướng {i + 1}"
      class="artwork-bg"
      class:active={i === idx}
      aria-hidden={i !== idx}
      onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
    />
  {/each}

  <!-- Adaptive Text-Safe Gradient Overlay -->
  <div
    class="artwork-overlay"
    class:align-right={idx === 1}
    aria-hidden="true"
  ></div>

  <!-- Top Scene Header -->
  <SceneHeader kicker="Scene 02 — Định hướng năm học" title="PHƯƠNG HƯỚNG HOẠT ĐỘNG" />

  <!-- Main Hero Content Panel -->
  <div class="content-wrapper" class:align-right={idx === 1}>
    <div class="glass-content">
      <!-- Kicker badge with counter -->
      <div class="direction-badge">
        <span class="badge-num">MỤC {String(idx + 1).padStart(2, '0')}</span>
        <span class="badge-sep">/</span>
        <span class="badge-total">05</span>
      </div>

      <!-- Icon with glowing ring -->
      <div class="icon-ring">
        <div class="icon-glow" aria-hidden="true"></div>
        <Icon name={ICONS[idx]} size={72} />
      </div>

      <!-- Direction Headline -->
      <h2 class="direction-headline">
        {DIRECTIONS[idx]}
      </h2>

      <!-- Subtitle -->
      <div class="direction-sub">
        Năm học 2026 – 2027 · Chi đội 7B
      </div>

      <!-- Dot Navigation -->
      <div class="nav-controls">
        <div class="dots-pill">
          {#each DIRECTIONS as _, i}
            <button
              class="dot-btn"
              class:active={i === idx}
              onclick={() => setIndex(i)}
              aria-label="Chuyển đến mục {i + 1}"
            >
              <span class="dot-inner"></span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Left & Right Floating Navigation Arrows -->
  <button
    class="nav-arrow nav-prev"
    disabled={idx === 0}
    onclick={() => step(-1)}
    aria-label="Mục trước"
  >
    ‹
  </button>

  <button
    class="nav-arrow nav-next"
    disabled={idx === DIRECTIONS.length - 1}
    onclick={() => step(1)}
    aria-label="Mục tiếp"
  >
    ›
  </button>
</div>

<style>
  .directions-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: var(--c-stage-900);
  }

  /* ── FULL-SCREEN ARTWORK BG ─────────────────────── */
  .artwork-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    transform: scale(1.04);
    transition:
      opacity 0.6s var(--e-out),
      transform 0.8s var(--e-out);
    pointer-events: none;
    z-index: 1;
  }
  .artwork-bg.active {
    opacity: 1;
    transform: scale(1);
    z-index: 2;
  }

  /* ── ADAPTIVE OVERLAY ───────────────────────────── */
  .artwork-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    transition: background 0.5s ease;
    background: linear-gradient(
      90deg,
      rgba(7, 17, 38, 0.96) 0%,
      rgba(7, 17, 38, 0.88) 38%,
      rgba(7, 17, 38, 0.55) 60%,
      rgba(7, 17, 38, 0.15) 85%,
      transparent 100%
    );
  }
  .artwork-overlay.align-right {
    background: linear-gradient(
      270deg,
      rgba(7, 17, 38, 0.96) 0%,
      rgba(7, 17, 38, 0.88) 38%,
      rgba(7, 17, 38, 0.55) 60%,
      rgba(7, 17, 38, 0.15) 85%,
      transparent 100%
    );
  }

  /* ── CONTENT WRAPPER ────────────────────────────── */
  .content-wrapper {
    position: absolute;
    inset: 0;
    z-index: var(--z-content);
    display: flex;
    align-items: center;
    padding: 100px var(--safe) 60px;
    justify-content: flex-start;
    transition: opacity 0.4s var(--e-out);
  }
  .content-wrapper.align-right {
    justify-content: flex-end;
  }

  .glass-content {
    max-width: 860px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 40px 48px;
    background: rgba(7, 17, 38, 0.65);
    border: 1.5px solid rgba(255, 196, 37, 0.25);
    border-radius: var(--r-xl);
    backdrop-filter: blur(20px);
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.7),
      0 0 40px rgba(26, 101, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  .align-right .glass-content {
    align-items: flex-end;
    text-align: right;
  }

  /* ── BADGE ──────────────────────────────────────── */
  .direction-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 0.18em;
    color: var(--c-gold-glow);
    background: rgba(13, 29, 69, 0.8);
    border: 1px solid rgba(255, 196, 37, 0.4);
    border-radius: var(--r-pill);
    padding: 6px 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
  .badge-sep {
    color: rgba(255, 255, 255, 0.3);
  }
  .badge-total {
    color: rgba(255, 255, 255, 0.5);
  }

  /* ── ICON RING ──────────────────────────────────── */
  .icon-ring {
    position: relative;
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
    color: var(--c-gold-core);
    filter: drop-shadow(0 0 20px rgba(255, 196, 37, 0.5));
  }
  .icon-glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 196, 37, 0.2) 0%, transparent 70%);
    border: 1.5px solid rgba(255, 196, 37, 0.35);
  }

  /* ── HEADLINE & SUB ─────────────────────────────── */
  .direction-headline {
    font-family: var(--f-display);
    font-size: 56px;
    line-height: 1.15;
    color: var(--c-ink-100);
    margin: 0;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.8);
  }

  .direction-sub {
    font-size: 22px;
    font-weight: 600;
    color: var(--c-spot-cyan);
    letter-spacing: 0.05em;
    margin: 0;
  }

  /* ── DOT NAVIGATION ─────────────────────────────── */
  .nav-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
  }
  .dots-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 29, 69, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--r-pill);
    padding: 8px 18px;
    backdrop-filter: blur(12px);
  }
  .dot-btn {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out);
  }
  .dot-inner {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    transition: width var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out), border-radius var(--t-fast) var(--e-out);
  }
  .dot-btn.active .dot-inner {
    width: 32px;
    border-radius: var(--r-pill);
    background: var(--c-gold-core);
    box-shadow: 0 0 14px var(--c-gold-core);
  }
  .dot-btn:hover .dot-inner {
    background: var(--c-ink-100);
  }

  /* ── FLOATING ARROWS ────────────────────────────── */
  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    background: rgba(13, 29, 69, 0.75);
    color: var(--c-ink-100);
    font-size: 40px;
    line-height: 1;
    display: grid;
    place-items: center;
    cursor: pointer;
    backdrop-filter: blur(14px);
    z-index: var(--z-content);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out), opacity var(--t-fast) var(--e-out);
  }
  .nav-prev {
    left: 28px;
  }
  .nav-next {
    right: 28px;
  }
  .nav-arrow:disabled {
    opacity: 0.18;
    cursor: default;
    pointer-events: none;
  }
  .nav-arrow:not(:disabled):hover {
    background: var(--c-spot-400);
    border-color: var(--c-spot-cyan);
    box-shadow: 0 0 24px var(--c-spot-400);
    transform: translateY(-50%) scale(1.1);
  }
</style>
