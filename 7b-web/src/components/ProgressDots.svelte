<script lang="ts">
  import { pres } from '../lib/presentation.svelte';

  // Ô vừa hoàn thành gần nhất (để ping) — đúng cả khi mở không theo thứ tự.
  let lastDone = $state(-1);
  let seen = new Set<number>();
  $effect(() => {
    const done = pres.status
      .map((s, i) => (s === 'completed' ? i : -1))
      .filter((i) => i >= 0);
    const fresh = done.filter((i) => !seen.has(i));
    seen = new Set(done);
    if (fresh.length > 0) lastDone = fresh[fresh.length - 1];
  });
</script>

<div class="prog" aria-label="Tiến độ thử thách">
  {#each pres.status as st, i}
    <span
      class="dot"
      class:done={st === 'completed'}
      class:now={st === 'opened'}
      title="Ô số {i + 1}"
    >
      {#if st === 'completed' && i === lastDone}
        <span class="ping"></span>
      {/if}
    </span>
  {/each}
  <span class="cap">ĐÃ MỞ <strong>{pres.completedCount} / 09</strong> Ô</span>
</div>

<style>
  .prog {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 29, 69, 0.8);
    border: 1px solid rgba(255, 196, 37, 0.3);
    border-radius: var(--r-pill);
    padding: 8px 24px;
    backdrop-filter: blur(16px);
  }
  .dot {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .ping {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid var(--c-success);
    animation: dotPing 0.6s var(--e-out);
    pointer-events: none;
  }
  @keyframes dotPing {
    from { transform: scale(0.5); opacity: 1; }
    to   { transform: scale(1.4); opacity: 0; }
  }
  .dot.now {
    background: var(--c-gold-core);
    border-color: var(--c-gold-glow);
    box-shadow: 0 0 14px var(--c-gold-core);
    transform: scale(1.2);
  }
  .dot.done {
    background: var(--c-success);
    border-color: #34d399;
    box-shadow: 0 0 12px var(--c-success);
  }
  .cap {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--c-ink-200);
    margin-left: 8px;
    white-space: nowrap;
  }
  .cap strong {
    color: var(--c-gold-core);
  }
</style>
