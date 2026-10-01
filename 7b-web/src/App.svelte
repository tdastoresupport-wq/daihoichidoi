<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { pres, type SceneId } from './lib/presentation.svelte';
  import { audio } from './lib/audio.svelte';
  import AudioDock from './components/AudioDock.svelte';
  import ProgressDots from './components/ProgressDots.svelte';
  import Opening from './scenes/Opening.svelte';
  import Directions from './scenes/Directions.svelte';
  import Lobby from './scenes/Lobby.svelte';
  import Gameplay from './scenes/Gameplay.svelte';
  import Closing from './scenes/Closing.svelte';

  const W = 1920;
  const H = 1080;
  let scale = $state(1);
  let sceneEl: HTMLElement | null = $state(null);
  let directionsRef: { step: (d: 1 | -1) => boolean } | null = $state(null);

  function fit(): void {
    scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  }

  function toggleFullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  // Chặn bấm đôi vô tình (MC double-tap): primary cách nhau tối thiểu 500ms.
  // Điều hướng directions-step (←/→) giữ nguyên nhịp nhanh có chủ ý.
  let lastPrimaryAt = 0;
  function primary(): void {
    const now = performance.now();
    if (now - lastPrimaryAt < 500) return;
    lastPrimaryAt = now;
    audio.unlock();
    switch (pres.scene) {
      case 'opening':
      case 'closing':
        if (pres.scene === 'closing') {
          audio.click();
          pres.resetGame();
        } else pres.next();
        break;
      case 'directions':
        if (directionsRef && !directionsRef.step(1)) pres.next();
        break;
      case 'lobby': {
        const i = pres.status.findIndex((s) => s !== 'completed');
        if (i >= 0) {
          audio.click();
          pres.openCell(i + 1);
        } else pres.next();
        break;
      }
      case 'game':
        if (!pres.revealed) {
          if (pres.active?.kind === 'lucky') return;
          pres.reveal();
          if (pres.active && !pres.active.checkable) {
            audio.click();
            pres.markResult('presented');
          }
        } else back();
        break;
    }
  }

  function back(): void {
    audio.unlock();
    audio.click();
    pres.prev();
  }

  function onKey(e: KeyboardEvent): void {
    const tag = (document.activeElement?.tagName ?? '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea';
    audio.unlock();
    if (e.key === 'ArrowRight' && !typing) {
      e.preventDefault();
      if (pres.scene === 'directions' && directionsRef?.step(1)) return;
      primary();
    } else if (e.key === 'ArrowLeft' && !typing) {
      e.preventDefault();
      if (pres.scene === 'directions' && directionsRef?.step(-1)) return;
      back();
    } else if (e.key === 'Enter' && !typing) {
      e.preventDefault();
      primary();
    } else if (e.key === ' ' && !typing) {
      e.preventDefault();
      primary();
    } else if (e.key === 'Escape') {
      pres.go('lobby');
    } else if ((e.key === 'f' || e.key === 'F') && !typing) {
      toggleFullscreen();
    } else if ((e.key === 'm' || e.key === 'M') && !typing) {
      audio.toggleMute();
    }
  }

  $effect(() => {
    const s: SceneId = pres.scene;
    void s;
    if (!sceneEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(sceneEl, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      sceneEl,
      { opacity: 0, y: 18, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true }
    );
  });

  onMount(() => {
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('keydown', onKey);
    const unlock = (): void => audio.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', unlock);
    };
  });
</script>

<div class="letterbox">
  <div
    class="canvas"
    style={`width:${W}px;height:${H}px;transform:translate(-50%,-50%) scale(${scale});`}
  >
    <!-- Cinematic Stage Atmosphere -->
    <div class="bg-stage" aria-hidden="true">
      <div class="spot-sapphire"></div>
      <div class="spot-gold"></div>
    </div>

    <!-- Active Scene Root -->
    <div class="scene-root" bind:this={sceneEl}>
      {#key pres.scene}
        {#if pres.scene === 'opening'}
          <Opening />
        {:else if pres.scene === 'directions'}
          <Directions bind:this={directionsRef} />
        {:else if pres.scene === 'lobby'}
          <Lobby />
        {:else if pres.scene === 'game'}
          <Gameplay />
        {:else}
          <Closing />
        {/if}
      {/key}
    </div>

    <!-- Bottom Stage Dock for MC -->
    <footer class="stage-dock">
      <div class="nav-cluster">
        <button class="dock-btn" onclick={back} aria-label="Lùi lại">
          <span>‹ Trước</span>
        </button>
        <button class="dock-btn gold" onclick={primary} aria-label="Tiếp tục">
          <span>Tiếp ›</span>
        </button>
        <button class="dock-btn icon-only" onclick={toggleFullscreen} aria-label="Toàn màn hình" title="Toàn màn hình (F)">
          <span>⛶</span>
        </button>
      </div>

      {#if pres.scene === 'lobby' || pres.scene === 'game'}
        <ProgressDots />
      {:else}
        <div class="stage-hint">
          <span>← → Điều hướng · Enter Chọn · Esc Về bảng đố · F Toàn màn hình · M Nhạc</span>
        </div>
      {/if}

      <AudioDock />
    </footer>
  </div>
</div>

<style>
  .letterbox {
    position: fixed;
    inset: 0;
    background: var(--c-stage-void);
    overflow: hidden;
  }
  .canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: center center;
    background: radial-gradient(
      120% 120% at 50% 10%,
      var(--c-stage-900) 0%,
      var(--c-stage-950) 60%,
      var(--c-stage-void) 100%
    );
    overflow: hidden;
    font-family: var(--f-body);
  }
  .bg-stage {
    position: absolute;
    inset: 0;
    z-index: var(--z-bg);
    pointer-events: none;
  }
  .spot-sapphire {
    position: absolute;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 1400px;
    height: 700px;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(26, 101, 255, 0.28) 0%,
      rgba(26, 101, 255, 0.08) 50%,
      transparent 80%
    );
    animation: driftSapphire 16s ease-in-out infinite alternate;
  }
  @keyframes driftSapphire {
    from { transform: translateX(-52%); }
    to { transform: translateX(-48%); }
  }
  .spot-gold {
    position: absolute;
    bottom: -200px;
    right: 5%;
    width: 900px;
    height: 500px;
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(255, 196, 37, 0.12) 0%,
      transparent 70%
    );
  }
  .scene-root {
    position: absolute;
    inset: 0;
    z-index: var(--z-content);
  }
  .stage-dock {
    position: absolute;
    left: var(--safe);
    right: var(--safe);
    bottom: 24px;
    z-index: var(--z-dock);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-cluster {
    display: flex;
    gap: 10px;
  }
  .dock-btn {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 22px;
    color: var(--c-ink-100);
    background: rgba(13, 29, 69, 0.75);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--r-pill);
    padding: 8px 24px;
    cursor: pointer;
    backdrop-filter: blur(16px);
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .dock-btn:hover {
    background: var(--c-stage-700);
    border-color: var(--c-spot-cyan);
  }
  .dock-btn.gold {
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border-color: var(--c-gold-core);
    color: var(--c-ink-900);
    box-shadow: 0 4px 20px rgba(255, 196, 37, 0.35);
  }
  .dock-btn.gold:hover {
    box-shadow: 0 6px 28px rgba(255, 196, 37, 0.6);
    transform: translateY(-1px);
  }
  .dock-btn.icon-only {
    padding: 8px 18px;
    font-size: 20px;
  }
  .stage-hint {
    font-size: 19px;
    font-weight: 600;
    color: var(--c-ink-300);
    background: rgba(7, 17, 38, 0.6);
    padding: 6px 20px;
    border-radius: var(--r-pill);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
  }
</style>
