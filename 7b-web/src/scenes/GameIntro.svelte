<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SceneHeader from '../components/SceneHeader.svelte';
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';

  const RULES_DATA = [
    {
      num: '01',
      title: 'CHỌN ĐIỂM SÁNG BẤT KỲ',
      desc: 'Chi đội lựa chọn 1 trong 9 điểm sáng bí ẩn trên hải đồ chòm sao để mở câu hỏi thử thách.',
      icon: '✦',
      highlight: '9 ĐIỂM SÁNG'
    },
    {
      num: '02',
      title: 'GIẢI MÃ THỬ THÁCH',
      desc: 'Trả lời đúng trong thời gian quy định để mở khóa 01 mảnh ghép bí mật (có cơ hội mở ô may mắn nhận quà).',
      icon: '🧩',
      highlight: 'MỞ MẢNH GHÉP'
    },
    {
      num: '03',
      title: 'HÉ LỘ BỨC TRANH BÍ MẬT',
      desc: 'Hoàn thành trọn vẹn 9/9 mảnh ghép để chiêm ngưỡng Bức tranh Bí mật và bước vào phần Bế mạc Đại hội.',
      icon: '🌟',
      highlight: '9 / 9 MẢNH GHÉP'
    }
  ];

  onMount(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.intro-card',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'power2.out', overwrite: true }
    );
    gsap.fromTo(
      '.intro-cta-box',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: 'power2.out', overwrite: true }
    );
  });

  function startLobby(): void {
    audio.unlock();
    audio.click();
    pres.next();
  }
</script>

<SceneHeader kicker="Scene 04 — Giới thiệu & Thể lệ" title="THỂ LỆ TRÒ CHƠI — BỨC TRANH BÍ MẬT" />

<div class="intro-stage">
  <!-- Glowing stage halo -->
  <div class="stage-halo" aria-hidden="true">
    <div class="halo-circle"></div>
  </div>

  <!-- Main 3 Rules Grid -->
  <main class="intro-container">
    <div class="rules-grid">
      {#each RULES_DATA as rule, i}
        <div class="intro-card" style={`animation-delay:${i * 0.1}s`}>
          <div class="card-glow" aria-hidden="true"></div>
          
          <div class="card-top">
            <div class="num-badge">
              <span class="num-val">{rule.num}</span>
            </div>
            <div class="icon-bubble">
              <span class="icon-val">{rule.icon}</span>
            </div>
          </div>

          <div class="card-body">
            <h3 class="rule-title">{rule.title}</h3>
            <div class="rule-divider" aria-hidden="true"></div>
            <p class="rule-desc">{rule.desc}</p>
          </div>

          <div class="card-footer">
            <span class="highlight-chip">{rule.highlight}</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Central CTA Button to enter lobby -->
    <div class="intro-cta-box">
      <button class="btn-start-lobby" onclick={startLobby}>
        <span>VÀO BẢNG CHỌN Ô</span>
        <span class="cta-arrow">→</span>
      </button>
      <p class="cta-hint">Nhấn <strong>Enter</strong> hoặc <strong>Space</strong> để bắt đầu thử thách</p>
    </div>
  </main>
</div>

<style>
  .intro-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 160px var(--safe) 80px;
  }

  .stage-halo {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: grid;
    place-items: center;
  }
  .halo-circle {
    width: 1100px;
    height: 600px;
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 229, 255, 0.12) 0%,
      rgba(26, 101, 255, 0.08) 50%,
      transparent 75%
    );
    filter: blur(40px);
  }

  .intro-container {
    position: relative;
    z-index: 10;
    width: 1560px;
    max-width: calc(100% - var(--safe) * 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    width: 100%;
  }

  .intro-card {
    position: relative;
    background: rgba(11, 26, 62, 0.88);
    border: 2px solid rgba(0, 229, 255, 0.35);
    border-radius: var(--r-lg);
    padding: 36px 32px;
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.65),
      inset 0 1px 12px rgba(255, 255, 255, 0.1),
      0 0 30px rgba(0, 229, 255, 0.1);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    min-height: 420px;
    transition: transform var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .intro-card:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: var(--c-spot-cyan);
    box-shadow:
      0 24px 50px rgba(0, 0, 0, 0.8),
      0 0 40px rgba(0, 229, 255, 0.3);
  }

  .card-glow {
    position: absolute;
    inset: 0;
    border-radius: var(--r-lg);
    background: radial-gradient(circle at 20% 0%, rgba(0, 229, 255, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .num-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff7d6, var(--c-gold-core) 55%, var(--c-gold-500) 100%);
    color: var(--c-ink-900);
    box-shadow:
      0 6px 20px rgba(255, 196, 37, 0.45),
      0 0 16px rgba(255, 196, 37, 0.3);
    border: 2px solid #ffffff;
  }
  .num-val {
    font-family: var(--f-display);
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
  }

  .icon-bubble {
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(13, 29, 69, 0.9);
    border: 1.5px solid rgba(0, 229, 255, 0.4);
    box-shadow: 0 0 18px rgba(0, 229, 255, 0.25);
  }
  .icon-val {
    font-size: 30px;
    color: var(--c-spot-cyan);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
  }

  .rule-title {
    font-family: var(--f-display);
    font-size: 34px;
    line-height: 1.2;
    color: var(--c-gold-glow);
    margin: 0;
    letter-spacing: 0.02em;
    text-shadow: 0 3px 12px rgba(0, 0, 0, 0.8);
  }

  .rule-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--c-gold-core), var(--c-spot-cyan));
    border-radius: 2px;
  }

  .rule-desc {
    font-family: var(--f-body);
    font-size: 24px;
    line-height: 1.45;
    font-weight: 600;
    color: var(--c-ink-200);
    margin: 0;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .highlight-chip {
    display: inline-flex;
    align-items: center;
    font-family: var(--f-body);
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: var(--c-spot-cyan);
    background: rgba(0, 229, 255, 0.12);
    border: 1.5px solid rgba(0, 229, 255, 0.5);
    border-radius: var(--r-pill);
    padding: 6px 18px;
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.2);
  }

  /* ── CTA BOX ────────────────────────────────────── */
  .intro-cta-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .btn-start-lobby {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 28px;
    letter-spacing: 0.06em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, #ffffff 0%, var(--c-gold-core) 40%, var(--c-gold-500) 100%);
    border: none;
    border-radius: var(--r-pill);
    padding: 18px 56px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    box-shadow:
      0 12px 36px rgba(255, 196, 37, 0.5),
      0 0 28px rgba(255, 196, 37, 0.35);
    transition: transform var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .btn-start-lobby:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow:
      0 18px 48px rgba(255, 196, 37, 0.75),
      0 0 40px rgba(0, 229, 255, 0.4);
  }
  .cta-arrow {
    font-size: 32px;
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-start-lobby:hover .cta-arrow {
    transform: translateX(6px);
  }

  .cta-hint {
    font-size: 19px;
    font-weight: 600;
    color: var(--c-ink-300);
    margin: 0;
  }
  .cta-hint strong {
    color: var(--c-spot-cyan);
  }
</style>
