<script lang="ts">
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import closingBg from '../assets/v2/heroes/hero-closing-16x9.jpg';

  function replay(): void {
    audio.click();
    pres.resetGame();
  }
  function toStart(): void {
    audio.click();
    pres.go('opening');
  }
</script>

<div class="closing-stage">
  <!-- Closing victory scene (dedicated hero, not a model sheet) -->
  <img src={closingBg} alt="Sân khấu bế mạc chiến thắng Chi đội 7B" class="nova-bg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
  <div class="nova-vignette" aria-hidden="true"></div>

  <!-- Atmospheric layers -->
  <div class="glow-top" aria-hidden="true"></div>
  <div class="glow-bot" aria-hidden="true"></div>

  <!-- Content: left-aligned on the stage -->
  <div class="finale-content">
    <div class="congrats-badge">
      <span class="star-icon">★</span>
      <span>ĐẠI HỘI CHI ĐỘI THÀNH CÔNG RỰC RỠ</span>
      <span class="star-icon">★</span>
    </div>

    <h2 class="title-thanks">CẢM ƠN<br />ĐÃ THAM GIA!</h2>

    <div class="identity-stack">
      <p class="sub-class">CHI ĐỘI LỚP 7B — TRƯỜNG THCS NGUYỄN DU</p>
      <p class="sub-year">NĂM HỌC 2026 – 2027</p>
    </div>

    <div class="score-pill">
      <span class="score-label">KẾT QUẢ THỬ THÁCH:</span>
      <span class="score-val">ĐÃ MỞ {pres.completedCount} / 09 Ô ĐỐ</span>
    </div>

    <div class="divider" aria-hidden="true"></div>

    <div class="cta-group">
      <button class="btn-replay" onclick={replay}>
        <span>Chơi lại bảng đố ↺</span>
      </button>
      <button class="btn-home" onclick={toStart}>
        <span>Về đầu chương trình</span>
      </button>
    </div>
  </div>
</div>

<style>
  .closing-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  /* ── CLOSING VICTORY BG (full-bleed) ──────────── */
  .nova-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.9) saturate(1.05);
  }
  .nova-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(7, 17, 38, 1) 0%,
      rgba(7, 17, 38, 0.9) 38%,
      rgba(7, 17, 38, 0.45) 65%,
      rgba(7, 17, 38, 0.15) 100%
    );
  }

  /* ── ATMOSPHERIC ────────────────────────────────── */
  .glow-top {
    position: absolute;
    top: -80px;
    left: 0;
    right: 0;
    height: 400px;
    background: radial-gradient(ellipse 80% 100% at 30% 0%, rgba(26, 101, 255, 0.28) 0%, transparent 70%);
    pointer-events: none;
  }
  .glow-bot {
    position: absolute;
    bottom: -60px;
    left: 0;
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse 80% 100% at 20% 100%, rgba(255, 196, 37, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── CONTENT ────────────────────────────────────── */
  .finale-content {
    position: absolute;
    left: var(--safe);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    max-width: 860px;
    z-index: 10;
  }

  .congrats-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 29, 69, 0.85);
    border: 1.5px solid rgba(255, 196, 37, 0.55);
    border-radius: var(--r-pill);
    padding: 10px 28px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: var(--c-gold-glow);
    box-shadow: 0 0 32px rgba(255, 196, 37, 0.25);
    backdrop-filter: blur(16px);
  }
  .star-icon {
    color: var(--c-gold-core);
  }

  .title-thanks {
    font-family: var(--f-display);
    font-size: 108px;
    line-height: 1.0;
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
    filter: drop-shadow(0 8px 30px rgba(255, 196, 37, 0.4));
    margin: 4px 0 0;
  }

  .identity-stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .sub-class {
    font-family: var(--f-display);
    font-size: 36px;
    color: var(--c-ink-100);
    margin: 0;
    letter-spacing: 0.02em;
  }
  .sub-year {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--c-ink-300);
    margin: 0;
  }

  .score-pill {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(21, 43, 104, 0.72);
    border: 1px solid rgba(0, 229, 255, 0.4);
    border-radius: var(--r-pill);
    padding: 12px 36px;
    backdrop-filter: blur(12px);
  }
  .score-label {
    font-size: 20px;
    font-weight: 700;
    color: var(--c-ink-300);
    white-space: nowrap;
  }
  .score-val {
    font-family: var(--f-display);
    font-size: 28px;
    color: var(--c-gold-core);
    white-space: nowrap;
  }

  .divider {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, var(--c-gold-core), transparent);
    border-radius: 2px;
  }

  .cta-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .btn-replay {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 0.04em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 18px 52px;
    cursor: pointer;
    box-shadow: 0 10px 36px rgba(255, 196, 37, 0.45);
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-replay:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 14px 44px rgba(255, 196, 37, 0.65);
  }
  .btn-home {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 22px;
    color: var(--c-ink-100);
    background: rgba(13, 29, 69, 0.7);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--r-pill);
    padding: 16px 44px;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition: background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .btn-home:hover {
    background: var(--c-stage-700);
    border-color: var(--c-gold-core);
  }
</style>
