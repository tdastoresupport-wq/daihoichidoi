<script lang="ts">
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import heroBg from '../assets/v2/heroes/hero-opening-16x9.jpg';
</script>

<div class="opening-stage">
  <img src={heroBg} alt="Sân khấu Đại hội Chi đội 7B" class="stage-bg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
  <div class="stage-overlay"></div>

  <div class="content-left">
    <div class="school-badge">
      <span class="icon-star">★</span>
      <span>LIÊN ĐỘI TRƯỜNG THCS NGUYỄN DU</span>
    </div>

    <h1 class="main-title">
      <span class="kicker-sub">ĐẠI HỘI CHI ĐỘI</span>
      <span class="class-hero">LỚP 7B</span>
    </h1>

    <div class="year-pill">
      <span>NĂM HỌC 2026 – 2027</span>
    </div>

    <p class="tagline">“Rèn đức, luyện tài — Vững bước tương lai”</p>

    <button
      class="cta-start"
      onclick={() => {
        audio.unlock();
        audio.click();
        pres.next();
      }}
    >
      <span>BẮT ĐẦU CHƯƠNG TRÌNH</span>
      <span class="arrow">→</span>
    </button>
  </div>
</div>

<style>
  .opening-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .stage-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
    filter: brightness(0.95) contrast(1.05);
  }
  .stage-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(7, 17, 38, 0.96) 0%,
      rgba(7, 17, 38, 0.82) 42%,
      rgba(7, 17, 38, 0.35) 65%,
      transparent 100%
    );
  }
  .content-left {
    position: absolute;
    left: var(--safe);
    top: 50%;
    transform: translateY(-52%);
    max-width: 960px;
    z-index: var(--z-content);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .school-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 0.14em;
    color: var(--c-gold-glow);
    background: rgba(13, 29, 69, 0.7);
    border: 1px solid rgba(255, 196, 37, 0.4);
    border-radius: var(--r-pill);
    padding: 8px 24px;
    backdrop-filter: blur(16px);
  }
  .icon-star {
    color: var(--c-gold-core);
    font-size: 20px;
  }
  .main-title {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
  }
  .kicker-sub {
    font-family: var(--f-display);
    font-size: 52px;
    letter-spacing: 0.04em;
    color: var(--c-ink-100);
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  }
  .class-hero {
    font-family: var(--f-display);
    font-size: 140px;
    line-height: 0.95;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      var(--c-gold-core) 35%,
      #ffeaa7 60%,
      var(--c-gold-500) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 8px 30px rgba(255, 196, 37, 0.35));
  }
  .year-pill {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 28px;
    letter-spacing: 0.08em;
    color: var(--c-ink-100);
    background: linear-gradient(90deg, var(--c-stage-800), var(--c-stage-700));
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--r-pill);
    padding: 10px 36px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  .tagline {
    font-size: 30px;
    font-weight: 600;
    color: var(--c-ink-300);
    margin: 4px 0 12px;
    font-style: italic;
  }
  .cta-start {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 0.04em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 22px 64px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 12px 40px rgba(255, 196, 37, 0.4);
    transition:
      transform var(--t-fast) var(--e-out),
      box-shadow var(--t-fast) var(--e-out);
  }
  .cta-start:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 16px 50px rgba(255, 196, 37, 0.6);
  }
  .cta-start:active {
    transform: translateY(1px) scale(0.98);
  }
  .arrow {
    font-size: 34px;
    transition: transform var(--t-fast) var(--e-out);
  }
  .cta-start:hover .arrow {
    transform: translateX(6px);
  }
</style>
