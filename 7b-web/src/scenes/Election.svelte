<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import { CANDIDATES_7B } from '../lib/data';
  import heroBg from '../assets/v2/heroes/hero-election-stage.jpg';

  const CANDIDATES_PER_PAGE = 2; // 2 large prominent candidates per view for optimal hall readability
  let pageIdx = $state(0);

  const totalPages = $derived(
    Math.max(1, Math.ceil(CANDIDATES_7B.length / CANDIDATES_PER_PAGE))
  );

  const currentCandidates = $derived(
    CANDIDATES_7B.slice(
      pageIdx * CANDIDATES_PER_PAGE,
      (pageIdx + 1) * CANDIDATES_PER_PAGE
    )
  );

  export function isLast(): boolean {
    return pageIdx >= totalPages - 1;
  }

  export function step(dir: 1 | -1): boolean {
    const next = pageIdx + dir;
    if (next >= 0 && next < totalPages) {
      pageIdx = next;
      audio.click();
      animateCards();
      return true;
    }
    return false;
  }

  function setPage(i: number): void {
    if (i !== pageIdx && i >= 0 && i < totalPages) {
      pageIdx = i;
      audio.click();
      animateCards();
    }
  }

  function animateCards(): void {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.candidate-card',
      { opacity: 0, scale: 0.95, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', overwrite: true }
    );
  }

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.election-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', overwrite: true }
    );
    animateCards();
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

    <div class="year-kicker">
      <span>NĂM HỌC 2026 – 2027</span>
    </div>

    <div class="section-kicker">
      <span class="kicker-line"></span>
      <span class="kicker-text">DANH SÁCH ỨNG CỬ / ĐỀ CỬ</span>
      <span class="kicker-line"></span>
    </div>
  </header>

  <!-- Central Candidate Presentation Arena -->
  <main class="candidate-arena">
    <div class="candidate-stack">
      {#each currentCandidates as c (c.id)}
        <div class="candidate-card">
          <div class="podium-aura" aria-hidden="true"></div>
          <div class="card-glass-frame">
            <div class="number-tag">
              <span class="tag-val">{c.number}</span>
            </div>
            <div class="candidate-identity">
              <h2 class="candidate-name">{c.name}</h2>
              <p class="candidate-role">Ứng cử viên Ban Chấp hành Chi đội 7B</p>
            </div>
          </div>
          <div class="card-accent-bar" aria-hidden="true"></div>
        </div>
      {/each}
    </div>
  </main>

  <!-- Multi-step Sequence Pagination -->
  <footer class="election-footer">
    <div class="sequence-nav">
      <span class="seq-label">DANH SÁCH ỨNG CỬ VIÊN ({pageIdx * CANDIDATES_PER_PAGE + 1}–{Math.min((pageIdx + 1) * CANDIDATES_PER_PAGE, CANDIDATES_7B.length)} / {CANDIDATES_7B.length})</span>
      <div class="seq-dots">
        {#each Array(totalPages) as _, i}
          <button
            class="seq-dot"
            class:active={i === pageIdx}
            onclick={() => setPage(i)}
            aria-label={`Trang danh sách ${i + 1}`}
          >
            <span></span>
          </button>
        {/each}
      </div>
    </div>
  </footer>

  <!-- Left & Right Navigation Arrows -->
  <button
    class="nav-arrow nav-prev"
    disabled={pageIdx === 0}
    onclick={() => step(-1)}
    aria-label="Ứng cử viên trước"
  >
    ‹
  </button>
  <button
    class="nav-arrow nav-next"
    disabled={pageIdx === totalPages - 1}
    onclick={() => step(1)}
    aria-label="Ứng cử viên tiếp theo"
  >
    ›
  </button>
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
    padding: 60px var(--safe) 120px;
    background: var(--c-stage-void);
  }

  .election-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.85) contrast(1.1);
    z-index: 1;
  }

  .stage-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: radial-gradient(
      ellipse 120% 90% at 50% 15%,
      rgba(7, 17, 38, 0.72) 0%,
      rgba(7, 17, 38, 0.9) 60%,
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
    border: 2px solid rgba(0, 229, 255, 0.25);
    box-shadow: 0 0 50px rgba(0, 229, 255, 0.15);
  }
  .voting-ring.outer {
    width: 1400px;
    height: 1400px;
    border-style: dashed;
    animation: ringSpin 60s linear infinite;
  }
  .voting-ring.inner {
    width: 1000px;
    height: 1000px;
    border-color: rgba(255, 196, 37, 0.3);
    animation: ringSpin 40s linear infinite reverse;
  }
  .center-stage-glow {
    position: absolute;
    left: 50%;
    top: 52%;
    width: 800px;
    height: 400px;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 229, 255, 0.12) 0%,
      rgba(26, 101, 255, 0.08) 45%,
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
    gap: 10px;
    text-align: center;
  }

  .badge-ceremony {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 0.16em;
    color: var(--c-gold-glow);
    background: rgba(13, 29, 69, 0.85);
    border: 1px solid rgba(255, 196, 37, 0.45);
    border-radius: var(--r-pill);
    padding: 6px 24px;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
  }
  .icon-star {
    color: var(--c-gold-core);
    font-size: 15px;
  }

  .election-main-title {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 18px;
    margin: 0;
    line-height: 1.1;
  }
  .title-action {
    font-family: var(--f-display);
    font-size: 56px;
    letter-spacing: 0.04em;
    color: var(--c-ink-100);
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.85);
  }
  .title-class {
    font-family: var(--f-display);
    font-size: 68px;
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

  .year-kicker {
    font-size: 24px;
    font-weight: 800;
    color: var(--c-ink-200);
    letter-spacing: 0.08em;
  }

  .section-kicker {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 4px;
  }
  .kicker-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--c-spot-cyan));
  }
  .section-kicker .kicker-line:last-child {
    background: linear-gradient(90deg, var(--c-spot-cyan), transparent);
  }
  .kicker-text {
    font-family: var(--f-body);
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.22em;
    color: var(--c-spot-cyan);
    text-shadow: 0 0 16px rgba(0, 229, 255, 0.6);
  }

  /* ── CANDIDATE ARENA ────────────────────────────── */
  .candidate-arena {
    position: relative;
    z-index: 10;
    width: 1400px;
    max-width: calc(100% - var(--safe) * 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 16px 0;
  }

  .candidate-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 1100px;
  }

  .candidate-card {
    position: relative;
    border-radius: var(--r-lg);
    background: rgba(11, 26, 62, 0.85);
    border: 2px solid rgba(0, 229, 255, 0.4);
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.7),
      inset 0 1px 16px rgba(255, 255, 255, 0.12),
      0 0 35px rgba(0, 229, 255, 0.15);
    backdrop-filter: blur(24px);
    overflow: hidden;
    transition: transform var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .candidate-card:hover {
    transform: translateY(-4px) scale(1.015);
    border-color: var(--c-spot-cyan);
    box-shadow:
      0 26px 60px rgba(0, 0, 0, 0.85),
      0 0 45px rgba(0, 229, 255, 0.4);
  }

  .card-glass-frame {
    display: flex;
    align-items: center;
    gap: 36px;
    padding: 28px 48px;
    position: relative;
    z-index: 2;
  }

  .number-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 110px;
    height: 110px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff7d6, var(--c-gold-core) 55%, var(--c-gold-500) 100%);
    color: var(--c-ink-900);
    box-shadow:
      0 10px 30px rgba(255, 196, 37, 0.5),
      0 0 25px rgba(255, 196, 37, 0.35);
    border: 3px solid #ffffff;
    flex-shrink: 0;
  }
  .tag-val {
    font-family: var(--f-display);
    font-size: 56px;
    font-weight: 900;
    line-height: 1;
  }

  .candidate-identity {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }
  .candidate-name {
    font-family: var(--f-display);
    font-size: 52px;
    line-height: 1.15;
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.03em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
  }
  .candidate-role {
    font-size: 22px;
    font-weight: 700;
    color: var(--c-spot-cyan);
    letter-spacing: 0.06em;
    margin: 0;
  }

  .card-accent-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--c-gold-core), var(--c-spot-cyan));
    opacity: 0.85;
  }

  /* ── FOOTER & PAGINATION ────────────────────────── */
  .election-footer {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sequence-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .seq-label {
    font-size: 18px;
    font-weight: 700;
    color: var(--c-ink-200);
    letter-spacing: 0.12em;
  }
  .seq-dots {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .seq-dot {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  .seq-dot span {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: width var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out), border-radius var(--t-fast) var(--e-out);
  }
  .seq-dot.active span {
    width: 36px;
    border-radius: var(--r-pill);
    background: var(--c-gold-core);
    box-shadow: 0 0 16px var(--c-gold-core);
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
