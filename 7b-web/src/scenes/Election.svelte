<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { CANDIDATES_7B } from '../lib/data';
  import heroBg from '../assets/v2/heroes/hero-election-stage.jpg';

  // All 6 candidates displayed on 1 single slide in 2 cols x 3 rows

  onMount(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.election-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', overwrite: true }
    );
    gsap.fromTo(
      '.candidate-card',
      { opacity: 0, scale: 0.96, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', overwrite: true }
    );
  });
</script>

<div class="election-stage">
  <!-- Cinematic Background Stage -->
  <img
    src={heroBg}
    alt="Sân khấu Bầu cử Ban chấp hành Chi đội 7B"
    class="election-bg"
    onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
  />
  <div class="stage-overlay" aria-hidden="true"></div>

  <!-- Abstract Civic & Light Geometry (Voting Rings & Beams) -->
  <div class="stage-light-rings" aria-hidden="true">
    <div class="voting-ring outer"></div>
    <div class="voting-ring inner"></div>
    <div class="center-stage-glow"></div>
  </div>

  <!-- Top Title Banner -->
  <header class="election-header">
    <div class="badge-ceremony">
      <span class="icon-star">★</span>
      <span>ĐẠI HỘI CHI ĐỘI 7B · TRƯỜNG THCS NGUYỄN DU</span>
      <span class="icon-star">★</span>
    </div>

    <h1 class="election-main-title">
      <span class="title-action">BẦU BAN CHẤP HÀNH</span>
      <span class="title-class">CHI ĐỘI 7B</span>
    </h1>

    <div class="header-sub-row">
      <span class="year-kicker">NĂM HỌC 2026 – 2027</span>
      <span class="sep-dot">·</span>
      <span class="section-kicker">DANH SÁCH ỨNG CỬ / ĐỀ CỬ</span>
    </div>
  </header>

  <!-- Central Candidate Presentation Arena: All 6 on 1 Slide (2 cols x 3 rows) -->
  <main class="candidate-arena">
    <div class="candidate-grid-2col">
      {#each CANDIDATES_7B as c (c.id)}
        <div class="candidate-card">
          <div class="card-glass-frame">
            <div class="number-tag">
              <span class="tag-val">{c.number}</span>
            </div>
            <div class="candidate-identity">
              <h2 class="candidate-name">{c.name}</h2>
            </div>
          </div>
          <div class="card-accent-bar" aria-hidden="true"></div>
        </div>
      {/each}
    </div>
  </main>

  <!-- Bottom Stage Subtext -->
  <footer class="election-footer">
    <p class="footer-note">
      Đại biểu tiến hành biểu quyết / bỏ phiếu bầu Ban Chấp hành Chi đội nhiệm kỳ mới
    </p>
  </footer>
</div>

<style>
  .election-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 50px var(--safe) 100px;
    background: var(--c-stage-void);
  }

  .election-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.82) contrast(1.1);
    z-index: 1;
  }

  .stage-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: radial-gradient(
      ellipse 120% 90% at 50% 15%,
      rgba(7, 17, 38, 0.75) 0%,
      rgba(7, 17, 38, 0.92) 60%,
      rgba(7, 17, 38, 0.98) 100%
    );
    pointer-events: none;
  }

  /* ── ABSTRACT LIGHT & VOTING RINGS ─────────────── */
  .stage-light-rings {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    overflow: hidden;
  }
  .voting-ring {
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%) rotateX(70deg);
    border-radius: 50%;
    border: 2px solid rgba(0, 229, 255, 0.2);
    box-shadow: 0 0 50px rgba(0, 229, 255, 0.12);
  }
  .voting-ring.outer {
    width: 1500px;
    height: 1500px;
    border-style: dashed;
    animation: ringSpin 60s linear infinite;
  }
  .voting-ring.inner {
    width: 1100px;
    height: 1100px;
    border-color: rgba(255, 196, 37, 0.25);
    animation: ringSpin 40s linear infinite reverse;
  }
  .center-stage-glow {
    position: absolute;
    left: 50%;
    top: 52%;
    width: 900px;
    height: 450px;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 229, 255, 0.1) 0%,
      rgba(26, 101, 255, 0.06) 45%,
      transparent 75%
    );
  }
  @keyframes ringSpin {
    to { transform: translate(-50%, -50%) rotateX(70deg) rotate(360deg); }
  }

  /* ── ELECTION HEADER ────────────────────────────── */
  .election-header {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }

  .badge-ceremony {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 17px;
    letter-spacing: 0.16em;
    color: var(--c-gold-glow);
    background: rgba(13, 29, 69, 0.85);
    border: 1px solid rgba(255, 196, 37, 0.45);
    border-radius: var(--r-pill);
    padding: 5px 22px;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
  }
  .icon-star {
    color: var(--c-gold-core);
    font-size: 14px;
  }

  .election-main-title {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 16px;
    margin: 0;
    line-height: 1.1;
  }
  .title-action {
    font-family: var(--f-display);
    font-size: 52px;
    letter-spacing: 0.04em;
    color: var(--c-ink-100);
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.85);
  }
  .title-class {
    font-family: var(--f-display);
    font-size: 64px;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      var(--c-gold-core) 40%,
      #ffeaa7 70%,
      var(--c-gold-500) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 4px 20px rgba(255, 196, 37, 0.5));
  }

  .header-sub-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .year-kicker {
    font-size: 22px;
    font-weight: 800;
    color: var(--c-ink-200);
    letter-spacing: 0.08em;
  }
  .sep-dot {
    color: rgba(255, 255, 255, 0.4);
    font-size: 20px;
  }
  .section-kicker {
    font-family: var(--f-body);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.16em;
    color: var(--c-spot-cyan);
    text-shadow: 0 0 16px rgba(0, 229, 255, 0.6);
  }

  /* ── ALL 6 CANDIDATES IN 2 COLUMNS ──────────────── */
  .candidate-arena {
    position: relative;
    z-index: 10;
    width: 1540px;
    max-width: calc(100% - var(--safe) * 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 12px 0;
  }

  .candidate-grid-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 36px;
    width: 100%;
  }

  .candidate-card {
    position: relative;
    border-radius: var(--r-md);
    background: rgba(11, 26, 62, 0.85);
    border: 1.5px solid rgba(0, 229, 255, 0.35);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.65),
      inset 0 1px 12px rgba(255, 255, 255, 0.1),
      0 0 24px rgba(0, 229, 255, 0.1);
    backdrop-filter: blur(20px);
    overflow: hidden;
    transition: transform var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .candidate-card:hover {
    transform: translateY(-2px) scale(1.01);
    border-color: var(--c-spot-cyan);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.8),
      0 0 32px rgba(0, 229, 255, 0.3);
  }

  .card-glass-frame {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 18px 28px;
    position: relative;
    z-index: 2;
  }

  .number-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 78px;
    height: 78px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff7d6, var(--c-gold-core) 55%, var(--c-gold-500) 100%);
    color: var(--c-ink-900);
    box-shadow:
      0 6px 20px rgba(255, 196, 37, 0.45),
      0 0 18px rgba(255, 196, 37, 0.3);
    border: 2.5px solid #ffffff;
    flex-shrink: 0;
  }
  .tag-val {
    font-family: var(--f-display);
    font-size: 40px;
    font-weight: 900;
    line-height: 1;
  }

  .candidate-identity {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
  .candidate-name {
    font-family: var(--f-display);
    font-size: 40px;
    line-height: 1.15;
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.02em;
    text-shadow: 0 3px 14px rgba(0, 0, 0, 0.9);
  }

  .card-accent-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--c-gold-core), var(--c-spot-cyan));
    opacity: 0.8;
  }

  /* ── FOOTER ─────────────────────────────────────── */
  .election-footer {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer-note {
    font-size: 19px;
    font-weight: 600;
    color: var(--c-ink-300);
    margin: 0;
    letter-spacing: 0.04em;
    background: rgba(7, 17, 38, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--r-pill);
    padding: 6px 24px;
  }
</style>
