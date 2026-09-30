<script lang="ts">
  import { audio } from '../lib/audio.svelte';
</script>

<div class="dock" class:muted={audio.muted} title="Nhạc chờ Đại hội">
  <button
    class="speaker"
    onclick={() => {
      audio.unlock();
      audio.click();
      audio.toggleMute();
    }}
    aria-label={audio.muted ? 'Bật nhạc chờ' : 'Tắt nhạc chờ'}
  >
    {#if audio.muted || !audio.hasTrack}
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
        <line x1="16" y1="9" x2="22" y2="15" />
        <line x1="22" y1="9" x2="16" y2="15" />
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    {/if}
  </button>
  <div class="meta">
    <span class="name">Nhạc chờ Đại hội</span>
    <span class="state">
      {#if !audio.hasTrack}
        chưa có file nhạc
      {:else if audio.muted}
        đã tắt
      {:else if audio.playing}
        <span class="eq" aria-hidden="true"><i></i><i></i><i></i></span> đang phát
      {:else}
        nhấn để phát
      {/if}
    </span>
  </div>
</div>

<style>
  .dock {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 29, 69, 0.8);
    border: 1px solid rgba(255, 196, 37, 0.3);
    border-radius: var(--r-pill);
    padding: 6px 20px 6px 8px;
    backdrop-filter: blur(16px);
  }
  .speaker {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: var(--c-stage-700);
    color: var(--c-gold-core);
    transition: background-color var(--t-fast) var(--e-out), color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out), opacity var(--t-fast) var(--e-out);
  }
  .speaker:hover {
    background: var(--c-spot-400);
    color: #fff;
    box-shadow: 0 0 16px var(--c-spot-400);
  }
  .muted .speaker {
    opacity: 0.5;
    color: var(--c-ink-300);
  }
  .meta {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    text-align: left;
  }
  .name {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 22px;
    color: var(--c-ink-100);
  }
  .state {
    font-size: 18px;
    color: var(--c-ink-300);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .eq { display: inline-flex; align-items: flex-end; gap: 3px; height: 16px; }
  .eq i { width: 4px; background: var(--c-success); border-radius: 2px; animation: eqb 0.9s ease-in-out infinite; }
  .eq i:nth-child(1) { height: 60%; }
  .eq i:nth-child(2) { height: 100%; animation-delay: 0.2s; }
  .eq i:nth-child(3) { height: 45%; animation-delay: 0.4s; }
  @keyframes eqb { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }
</style>
