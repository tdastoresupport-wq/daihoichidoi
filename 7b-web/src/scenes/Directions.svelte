<script lang="ts" module>
  // Persist carousel position across remounts (e.g. back from Election).
  let savedIdx = 0;
</script>

<script lang="ts">
  import SceneHeader from '../components/SceneHeader.svelte';
  import Icon from '../components/Icon.svelte';
  import { DIRECTIONS, ACADEMIC_STATS_7B } from '../lib/data';
  import { audio } from '../lib/audio.svelte';
  import dir1 from '../assets/v2/directions/directions-01.jpg';
  import dir2 from '../assets/v2/directions/directions-02.jpg';
  import dir3 from '../assets/v2/directions/directions-03.jpg';
  import dir4 from '../assets/v2/directions/directions-04.jpg';
  import dir5 from '../assets/v2/directions/directions-05.jpg';
  import dir6 from '../assets/v2/directions/directions-06.jpg';

  // TOTAL_STEPS = 5 direction cards + 1 final summary
  const TOTAL_STEPS = 6;
  const SUMMARY_IDX = 5;

  const DIR_IMAGES = [dir1, dir2, dir3, dir4, dir5, dir6];
  const ICONS = ['ai', 'abc', 'team', 'leaf', 'heart'];
  const POSES = ['pose-left-wide', 'pose-right', 'pose-center', 'pose-left-wide', 'pose-right'];

  let idx = $state(savedIdx);

  export function step(dir: 1 | -1): boolean {
    const n = idx + dir;
    if (n < 0 || n >= TOTAL_STEPS) return false;
    idx = n;
    savedIdx = n;
    audio.click();
    return true;
  }
  export function reset(): void {
    idx = 0;
    savedIdx = 0;
  }

  function setIndex(i: number) {
    if (i !== idx) {
      idx = i;
      savedIdx = i;
      audio.click();
    }
  }

  const hocTapStats = ACADEMIC_STATS_7B;
</script>

<div class="directions-stage">
  {#each DIR_IMAGES as img, i}
    <img
      src={img}
      alt={i === SUMMARY_IDX ? 'Kết quả và mục tiêu Chi đội 7B' : `Định hướng ${i + 1}`}
      class="artwork-bg"
      class:active={i === idx}
      aria-hidden={i !== idx}
      onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
    />
  {/each}

  {#if idx < SUMMARY_IDX}
    <div
      class="artwork-overlay"
      class:flip-x={idx === 1 || idx === 4}
      aria-hidden="true"
    ></div>

    <SceneHeader kicker="Phương hướng hoạt động" title="PHƯƠNG HƯỚNG HOẠT ĐỘNG CHI ĐỘI 7B" />

    <div class="content-wrapper {POSES[idx]}">
      <div class="editorial">
        <div class="direction-badge">
          <span class="badge-num">MỤC {String(idx + 1).padStart(2, '0')}</span>
          <span class="badge-sep">/</span>
          <span class="badge-total">05</span>
        </div>

        <div class="icon-ring">
          <div class="icon-glow" aria-hidden="true"></div>
          <Icon name={ICONS[idx]} size={72} />
        </div>

        <h2 class="direction-headline">
          {DIRECTIONS[idx]}
        </h2>

        <div class="direction-sub">
          Năm học 2026 – 2027 · Chi đội 7B
        </div>

        <div class="nav-controls">
          <div class="dots-row">
            {#each Array(TOTAL_STEPS) as _, i}
              <button
                class="dot-btn"
                class:active={i === idx}
                class:summary-dot={i === SUMMARY_IDX}
                onclick={() => setIndex(i)}
                aria-label={i === SUMMARY_IDX ? 'Kết quả & Mục tiêu' : `Chuyển đến mục ${i + 1}`}
              >
                <span class="dot-inner"></span>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <button
      class="nav-arrow nav-prev"
      disabled={idx === 0}
      onclick={() => step(-1)}
      aria-label="Mục trước"
    >&#8249;</button>

    <button
      class="nav-arrow nav-next"
      onclick={() => step(1)}
      aria-label="Mục tiếp"
    >&#8250;</button>

  {:else}
    <!-- FINAL SUMMARY SLIDE (idx === 5) — KET QUA & MUC TIEU -->
    <div class="summary-scrim" aria-hidden="true"></div>

    <div class="summary-root">
      <header class="sum-identity">
        <span class="sum-class">CHI ĐỘI 7B</span>
        <span class="sum-sep" aria-hidden="true">·</span>
        <span class="sum-year">NĂM HỌC 2026 – 2027</span>
      </header>

      <div class="sum-headline-wrap">
        <h1 class="sum-headline">MỤC TIÊU PHẤN ĐẤU</h1>
        <div class="sum-headline-rule" aria-hidden="true"></div>
      </div>

      <div class="sum-cols">
        <!-- LEFT: REN LUYEN -->
        <div class="sum-col sum-col-ren">
          <div class="sum-col-icon" aria-hidden="true">✔</div>
          <div class="sum-col-title">RÈN LUYỆN</div>
          <div class="sum-big-number">100%</div>
          <div class="sum-col-sub">HỌC SINH<br>XẾP LOẠI TỐT</div>
          <div class="sum-col-bar-wrap" aria-hidden="true">
            <div class="sum-col-bar sum-col-bar-green"></div>
          </div>
        </div>

        <div class="sum-divider" aria-hidden="true"></div>

        <!-- RIGHT: HOC TAP -->
        <div class="sum-col sum-col-hoc">
          <div class="sum-col-icon" aria-hidden="true">📖</div>
          <div class="sum-col-title">HỌC TẬP</div>
          <div class="sum-rows">
            {#each hocTapStats as stat}
              <div class="sum-row">
                <span class="sum-row-num">{stat.countDisplay}</span>
                <span class="sum-row-label">HS — XẾP LOẠI {stat.category}</span>
              </div>
            {/each}
            <div class="sum-row sum-row-total">
              <span class="sum-row-num">51</span>
              <span class="sum-row-label">TỔNG: 51 HS</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sum-target">
        <div class="sum-target-icon" aria-hidden="true">🏆</div>
        <div class="sum-target-text">
          <span class="sum-target-verb">HƯỚNG ĐẾN DANH HIỆU</span>
          <span class="sum-target-award">CHI ĐỘI XUẤT SẮC</span>
        </div>
        <div class="sum-target-icon" aria-hidden="true">🏆</div>
      </div>

      <div class="sum-dots-wrap">
        <div class="dots-row">
          {#each Array(TOTAL_STEPS) as _, i}
            <button
              class="dot-btn"
              class:active={i === idx}
              class:summary-dot={i === SUMMARY_IDX}
              onclick={() => setIndex(i)}
              aria-label={i === SUMMARY_IDX ? 'Kết quả & Mục tiêu' : `Chuyển đến mục ${i + 1}`}
            >
              <span class="dot-inner"></span>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <button
      class="nav-arrow nav-prev"
      onclick={() => step(-1)}
      aria-label="Quay lại mục 5"
    >&#8249;</button>

  {/if}
</div>

<style>
  .directions-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: var(--c-stage-900);
  }

  .artwork-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    transform: scale(1.04);
    transition: opacity 0.6s var(--e-out), transform 0.8s var(--e-out);
    pointer-events: none;
    z-index: 1;
  }
  .artwork-bg.active {
    opacity: 1;
    transform: scale(1);
    z-index: 2;
  }

  .artwork-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background:
      linear-gradient(100deg, rgba(7,17,38,0.94) 0%, rgba(7,17,38,0.6) 42%, rgba(7,17,38,0.15) 75%, transparent 90%),
      linear-gradient(180deg, rgba(7,17,38,0.5) 0%, transparent 26%, transparent 55%, rgba(7,17,38,0.94) 100%);
  }
  .artwork-overlay.flip-x {
    background:
      linear-gradient(260deg, rgba(7,17,38,0.94) 0%, rgba(7,17,38,0.6) 42%, rgba(7,17,38,0.15) 75%, transparent 90%),
      linear-gradient(180deg, rgba(7,17,38,0.5) 0%, transparent 26%, transparent 55%, rgba(7,17,38,0.94) 100%);
  }

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
  .content-wrapper > * { pointer-events: auto; }
  .pose-left { align-items: flex-end; justify-content: flex-start; }
  .pose-left-wide { align-items: center; justify-content: space-between; }
  .pose-right { align-items: flex-end; justify-content: flex-end; text-align: right; }
  .pose-center { align-items: flex-end; justify-content: center; text-align: center; }

  .editorial { max-width: 780px; display: flex; flex-direction: column; gap: 20px; }
  .pose-right .editorial { align-items: flex-end; }
  .pose-right .editorial .direction-badge { align-self: flex-end; }
  .pose-center .editorial { align-items: center; max-width: 1200px; }
  .pose-center .editorial .direction-badge { align-self: center; }

  .direction-badge {
    display: inline-flex; align-items: center; align-self: flex-start; gap: 8px;
    font-family: var(--f-body); font-weight: 800; font-size: 18px; letter-spacing: 0.18em;
    color: var(--c-gold-glow); background: rgba(13,29,69,0.8);
    border: 1px solid rgba(255,196,37,0.4); border-radius: var(--r-pill);
    padding: 6px 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }
  .badge-sep { color: rgba(255,255,255,0.3); }
  .badge-total { color: rgba(255,255,255,0.5); }

  .icon-ring {
    position: relative; width: 90px; height: 90px; display: grid; place-items: center;
    color: var(--c-gold-core); filter: drop-shadow(0 0 20px rgba(255,196,37,0.5));
  }
  .icon-glow {
    position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,37,0.2) 0%, transparent 70%);
    border: 1.5px solid rgba(255,196,37,0.35);
  }

  .direction-headline {
    font-family: var(--f-display); font-size: 72px; line-height: 1.1;
    color: var(--c-ink-100); margin: 0; text-wrap: balance;
    text-shadow: 0 6px 32px rgba(0,0,0,0.85);
  }
  .direction-sub {
    font-size: 22px; font-weight: 600; color: var(--c-spot-cyan);
    letter-spacing: 0.05em; margin: 0;
  }

  .nav-controls { display: flex; align-items: center; gap: 16px; margin-top: 6px; }
  .dots-row { display: flex; align-items: center; gap: 14px; padding: 4px 2px; }
  .dot-btn {
    width: 14px; height: 14px; border-radius: 50%; border: none;
    background: transparent; padding: 0; cursor: pointer; display: grid; place-items: center;
  }
  .dot-inner {
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transition: width var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out),
                box-shadow var(--t-fast) var(--e-out), border-radius var(--t-fast) var(--e-out);
  }
  .dot-btn.active .dot-inner {
    width: 32px; border-radius: var(--r-pill);
    background: var(--c-gold-core); box-shadow: 0 0 14px var(--c-gold-core);
  }
  .dot-btn.summary-dot .dot-inner { border-radius: 3px; transform: rotate(45deg); }
  .dot-btn.summary-dot.active .dot-inner { width: 14px; height: 14px; border-radius: 3px; }

  .nav-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 68px; height: 68px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.25); background: rgba(13,29,69,0.75);
    color: var(--c-ink-100); font-size: 40px; line-height: 1;
    display: grid; place-items: center; cursor: pointer; backdrop-filter: blur(14px);
    z-index: var(--z-content); box-shadow: 0 12px 30px rgba(0,0,0,0.5);
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out),
                border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out),
                opacity var(--t-fast) var(--e-out);
  }
  .nav-prev { left: 28px; }
  .nav-next { right: 28px; }
  .nav-arrow:disabled { opacity: 0.18; cursor: default; pointer-events: none; }
  .nav-arrow:not(:disabled):hover {
    background: var(--c-spot-400); border-color: var(--c-spot-cyan);
    box-shadow: 0 0 24px var(--c-spot-400); transform: translateY(-50%) scale(1.1);
  }

  /* ==============================================
     FINAL SUMMARY SLIDE (idx === 5)
  ============================================== */
  .summary-scrim {
    position: absolute; inset: 0; z-index: 3; pointer-events: none;
    /* ponytail: mid-band hardened (0.92@42%, 0.78@60%) so the cup/laurel stays right of the text zone; tail still clears to transparent at 94% to keep hero visible */
    background:
      linear-gradient(105deg,
        rgba(7,17,38,0.97) 0%, rgba(7,17,38,0.92) 42%,
        rgba(7,17,38,0.78) 60%, rgba(7,17,38,0.38) 78%, transparent 94%),
      linear-gradient(180deg,
        rgba(7,17,38,0.65) 0%, transparent 18%,
        transparent 68%, rgba(7,17,38,0.9) 100%);
  }

  .summary-root {
    position: absolute; inset: 0; z-index: var(--z-content);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 52px var(--safe) 112px;
    animation: sumEntrance 0.55s var(--e-out) both;
  }
  @keyframes sumEntrance { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  .sum-identity { display: flex; align-items: center; gap: 16px; }
  .sum-class {
    font-family: var(--f-display); font-size: 30px; color: var(--c-gold-core);
    letter-spacing: 0.12em; text-shadow: 0 2px 14px rgba(255,196,37,0.5);
  }
  .sum-sep { font-size: 24px; color: rgba(255,255,255,0.25); }
  .sum-year {
    font-family: var(--f-body); font-size: 22px; font-weight: 700;
    color: var(--c-ink-300); letter-spacing: 0.07em;
  }

  .sum-headline-wrap { display: flex; flex-direction: column; gap: 10px; }
  .sum-headline {
    font-family: var(--f-display); font-size: 84px;
    /* ponytail: 1.14 + block padding fits stacked VI marks (Ụ Ấ Ớ...); line-height:1 clipped (scrollH 101 > clientH 84) */
    line-height: 1.2;
    padding: 0.06em 0 0.08em;
    color: var(--c-ink-100); margin: 0; letter-spacing: 0.02em;
    text-shadow: 0 4px 32px rgba(0,0,0,0.8); max-width: 900px;
  }
  .sum-headline-rule {
    width: 120px; height: 4px; border-radius: 2px;
    background: linear-gradient(90deg, var(--c-gold-core), transparent);
  }

  .sum-cols { display: flex; align-items: stretch; gap: 0; max-width: 960px; }
  .sum-col { display: flex; flex-direction: column; gap: 10px; padding: 0 44px 0 0; }
  .sum-col:last-child { padding-left: 44px; padding-right: 0; }
  /* ponytail: text-shadow keeps HỌC TẬP rows legible over residual glow; cols max-width already reserves the hero zone */
  .sum-col-hoc { position: relative; }
  .sum-row-label { text-shadow: 0 2px 12px rgba(0,0,0,0.9); }

  .sum-col-icon { font-size: 36px; line-height: 1; }
  .sum-col-ren .sum-col-icon { color: #4ade80; font-size: 40px; font-weight: 900; }

  .sum-col-title {
    font-family: var(--f-body); font-size: 20px; font-weight: 900;
    letter-spacing: 0.22em; color: var(--c-ink-300); text-transform: uppercase;
  }
  .sum-col-ren .sum-col-title { color: #86efac; }
  .sum-col-hoc .sum-col-title { color: var(--c-spot-300); }

  .sum-big-number {
    font-family: var(--f-display); font-size: 128px; line-height: 0.85;
    color: #4ade80; letter-spacing: -0.02em;
    text-shadow: 0 0 60px rgba(74,222,128,0.4), 0 4px 24px rgba(0,0,0,0.7);
  }
  .sum-col-sub {
    font-family: var(--f-body); font-size: 22px; font-weight: 800;
    color: #bbf7d0; line-height: 1.3; letter-spacing: 0.04em;
  }
  .sum-col-bar-wrap {
    margin-top: 4px; height: 6px; width: 220px;
    background: rgba(255,255,255,0.1); border-radius: var(--r-pill); overflow: hidden;
  }
  .sum-col-bar { height: 100%; border-radius: var(--r-pill); }
  .sum-col-bar-green {
    width: 100%; background: linear-gradient(90deg, #4ade80, #22c55e);
    animation: barGrow 1s 0.4s var(--e-out) both;
  }
  @keyframes barGrow { from { width: 0; } to { width: 100%; } }

  .sum-divider {
    width: 1.5px; flex-shrink: 0; align-self: stretch;
    background: linear-gradient(180deg,
      transparent,
      rgba(255,255,255,0.25) 20%,
      rgba(255,255,255,0.25) 80%,
      transparent);
  }

  .sum-rows { display: flex; flex-direction: column; gap: 8px; }
  .sum-row { display: flex; align-items: baseline; gap: 18px; }
  .sum-row-num {
    font-family: var(--f-display); font-size: 76px; line-height: 1;
    color: var(--c-ink-100); min-width: 96px; text-align: right;
    letter-spacing: -0.02em; text-shadow: 0 2px 20px rgba(0,0,0,0.6);
  }
  .sum-row-label {
    font-family: var(--f-body); font-size: 22px; font-weight: 800;
    color: var(--c-ink-300); letter-spacing: 0.05em; white-space: nowrap;
  }
  .sum-rows .sum-row:nth-child(1) .sum-row-num { color: var(--c-gold-core); }
  .sum-rows .sum-row:nth-child(1) .sum-row-label { color: var(--c-gold-glow); }
  .sum-rows .sum-row:nth-child(2) .sum-row-num { color: var(--c-spot-300); }
  .sum-rows .sum-row:nth-child(2) .sum-row-label { color: var(--c-spot-300); }
  .sum-rows .sum-row:nth-child(3) .sum-row-num { color: #94a3b8; }
  .sum-rows .sum-row:nth-child(3) .sum-row-label { color: #94a3b8; }
  .sum-row-total { border-top: 1px solid rgba(255,255,255,0.15); padding-top: 8px; margin-top: 4px; }
  .sum-row-total .sum-row-num { font-size: 54px; color: var(--c-ink-200); }
  .sum-row-total .sum-row-label { color: var(--c-ink-200); }

  .sum-target {
    display: flex; align-items: center; gap: 20px; max-width: 820px;
    background: linear-gradient(135deg,
      rgba(255,196,37,0.18) 0%, rgba(13,29,69,0.85) 50%, rgba(255,196,37,0.14) 100%);
    border: 2px solid rgba(255,196,37,0.5); border-radius: var(--r-xl);
    padding: 22px 44px; backdrop-filter: blur(12px);
    animation: targetPulse 3.5s ease-in-out infinite;
  }
  @keyframes targetPulse {
    0%, 100% { box-shadow: 0 8px 40px rgba(255,196,37,0.2), 0 0 80px rgba(255,196,37,0.08); }
    50%       { box-shadow: 0 8px 56px rgba(255,196,37,0.38), 0 0 100px rgba(255,196,37,0.16); }
  }
  .sum-target-icon { font-size: 42px; flex-shrink: 0; filter: drop-shadow(0 0 12px rgba(255,196,37,0.7)); }
  .sum-target-text { display: flex; flex-direction: column; gap: 2px; }
  .sum-target-verb {
    font-family: var(--f-body); font-size: 18px; font-weight: 800;
    letter-spacing: 0.2em; color: var(--c-gold-glow); text-transform: uppercase;
  }
  .sum-target-award {
    font-family: var(--f-display); font-size: 50px; line-height: 1.05;
    color: var(--c-gold-core); letter-spacing: 0.04em;
    text-shadow: 0 2px 20px rgba(255,196,37,0.5);
  }

  .sum-dots-wrap { display: flex; justify-content: flex-start; }
</style>
