<script lang="ts">
  import SceneHeader from '../components/SceneHeader.svelte';
  import Icon from '../components/Icon.svelte';
  import { DIRECTIONS, ACADEMIC_STATS_7B, TOTAL_STUDENTS_7B } from '../lib/data';
  import { audio } from '../lib/audio.svelte';

  import dir1 from '../assets/v2/directions/directions-01.jpg';
  import dir2 from '../assets/v2/directions/directions-02.jpg';
  import dir3 from '../assets/v2/directions/directions-03.jpg';
  import dir4 from '../assets/v2/directions/directions-04.jpg';
  import dir5 from '../assets/v2/directions/directions-05.jpg';

  const DIR_IMAGES = [dir1, dir2, dir3, dir4, dir5];
  const ICONS = ['ai', 'abc', 'team', 'leaf', 'heart'];
  // Editorial variety per chapter
  const POSES = ['pose-left-wide', 'pose-right', 'pose-center', 'pose-left-wide', 'pose-right'];

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

  <!-- Text-safe scrim (bottom-weighted for direct typography) -->
  <div
    class="artwork-overlay"
    class:flip-x={idx === 1 || idx === 4}
    aria-hidden="true"
  ></div>

  <!-- Top Scene Header -->
  <SceneHeader kicker="Scene 02 — Phương hướng hoạt động" title="PHƯƠNG HƯỚNG HOẠT ĐỘNG CHI ĐỘI 7B" />

  <!-- Main Editorial Content -->
  <div class="content-wrapper {POSES[idx]}">
    <div class="editorial">
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
        <div class="dots-row">
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

    <!-- ═══ ACADEMIC INFOGRAPHIC (Embedded in Direction 01: Học tập) ═══ -->
    {#if idx === 0}
      <div class="academic-infographic">
        <div class="infographic-header">
          <span class="info-kicker">KẾT QUẢ XẾP LOẠI HỌC TẬP</span>
          <span class="info-total">TỔNG HỢP: {TOTAL_STUDENTS_7B} HS</span>
        </div>

        <div class="infographic-stage">
          <div class="orbit-rings" aria-hidden="true">
            <div class="orbit-ring r1"></div>
            <div class="orbit-ring r2"></div>
          </div>

          <!-- Central Learning Core Symbol -->
          <div class="center-learning-core">
            <span class="core-icon">📖</span>
            <span class="core-label">CHI ĐỘI 7B</span>
          </div>

          <!-- 4 Orbiting Achievement Nodes -->
          <div class="nodes-grid">
            {#each ACADEMIC_STATS_7B as stat}
              <div class="achievement-node">
                <div class="node-badge">
                  <span class="node-num">{stat.countDisplay}</span>
                  <span class="node-unit">{stat.unit}</span>
                </div>
                <div class="node-category">{stat.category}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
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

  /* ── TEXT-SAFE SCRIM ────────────────────────────── */
  .artwork-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    transition: opacity 0.5s ease;
    background:
      linear-gradient(
        100deg,
        rgba(7, 17, 38, 0.94) 0%,
        rgba(7, 17, 38, 0.6) 42%,
        rgba(7, 17, 38, 0.15) 75%,
        transparent 90%
      ),
      linear-gradient(
        180deg,
        rgba(7, 17, 38, 0.5) 0%,
        transparent 26%,
        transparent 55%,
        rgba(7, 17, 38, 0.94) 100%
      );
  }
  .artwork-overlay.flip-x {
    background:
      linear-gradient(
        260deg,
        rgba(7, 17, 38, 0.94) 0%,
        rgba(7, 17, 38, 0.6) 42%,
        rgba(7, 17, 38, 0.15) 75%,
        transparent 90%
      ),
      linear-gradient(
        180deg,
        rgba(7, 17, 38, 0.5) 0%,
        transparent 26%,
        transparent 55%,
        rgba(7, 17, 38, 0.94) 100%
      );
  }

  /* ── CONTENT WRAPPER ────────────────────────────── */
  .content-wrapper {
    position: absolute;
    inset: 0;
    z-index: var(--z-content);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 140px var(--safe) 140px;
    pointer-events: none;
  }
  .content-wrapper > * {
    pointer-events: auto;
  }
  .pose-left { align-items: flex-end; justify-content: flex-start; }
  .pose-left-wide { align-items: center; justify-content: space-between; }
  .pose-right { align-items: flex-end; justify-content: flex-end; text-align: right; }
  .pose-center { align-items: flex-end; justify-content: center; text-align: center; }

  .editorial {
    max-width: 780px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .pose-right .editorial { align-items: flex-end; }
  .pose-right .editorial .direction-badge { align-self: flex-end; }
  .pose-center .editorial { align-items: center; max-width: 1200px; }
  .pose-center .editorial .direction-badge { align-self: center; }

  /* ── BADGE ──────────────────────────────────────── */
  .direction-badge {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
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
    width: 90px;
    height: 90px;
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
    font-size: 72px;
    line-height: 1.1;
    color: var(--c-ink-100);
    margin: 0;
    text-wrap: balance;
    text-shadow: 0 6px 32px rgba(0, 0, 0, 0.85);
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
    margin-top: 6px;
  }
  .dots-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 4px 2px;
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

  /* ── ACADEMIC INFOGRAPHIC (PART 6) ──────────────── */
  .academic-infographic {
    width: 700px;
    background: rgba(11, 26, 62, 0.88);
    border: 2px solid rgba(0, 229, 255, 0.4);
    border-radius: var(--r-lg);
    padding: 32px 36px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 229, 255, 0.15);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: fadeIn 0.5s var(--e-out);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .infographic-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 14px;
  }
  .info-kicker {
    font-family: var(--f-body);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: var(--c-gold-glow);
  }
  .info-total {
    font-size: 18px;
    font-weight: 800;
    color: var(--c-spot-cyan);
    background: rgba(0, 229, 255, 0.12);
    border: 1px solid var(--c-spot-cyan);
    border-radius: var(--r-pill);
    padding: 4px 16px;
  }

  .infographic-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .orbit-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .orbit-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px dashed rgba(0, 229, 255, 0.2);
  }
  .orbit-ring.r1 { width: 340px; height: 340px; }
  .orbit-ring.r2 { width: 520px; height: 260px; }

  .center-learning-core {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 29, 69, 0.95);
    border: 1.5px solid var(--c-gold-core);
    border-radius: var(--r-pill);
    padding: 8px 24px;
    box-shadow: 0 4px 20px rgba(255, 196, 37, 0.35);
    z-index: 2;
  }
  .core-icon {
    font-size: 28px;
  }
  .core-label {
    font-family: var(--f-display);
    font-size: 22px;
    color: var(--c-gold-core);
    letter-spacing: 0.06em;
  }

  .nodes-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    z-index: 2;
  }
  .achievement-node {
    display: flex;
    align-items: center;
    gap: 22px;
    background: rgba(7, 17, 38, 0.85);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--r-md);
    padding: 14px 24px;
    transition: transform var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .achievement-node:hover {
    transform: translateY(-2px);
    border-color: var(--c-spot-cyan);
  }

  .node-badge {
    display: flex;
    align-items: baseline;
    gap: 4px;
    background: radial-gradient(circle at 30% 30%, #fff7cc, var(--c-gold-core));
    color: var(--c-ink-900);
    border-radius: var(--r-pill);
    padding: 6px 16px;
    min-width: 86px;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(255, 196, 37, 0.4);
  }
  .node-num {
    font-family: var(--f-display);
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
  }
  .node-unit {
    font-size: 16px;
    font-weight: 800;
  }
  .node-category {
    font-family: var(--f-body);
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.05em;
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
  .nav-prev { left: 28px; }
  .nav-next { right: 28px; }
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
