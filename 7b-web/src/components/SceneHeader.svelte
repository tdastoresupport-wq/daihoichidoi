<script lang="ts">
  let { kicker, title }: { kicker: string; title: string } = $props();
</script>

<header class="shead">
  <div class="kicker-badge">
    <span class="dot"></span>
    <span class="kicker">{kicker}</span>
  </div>
  <h2 class="title">{title}</h2>
</header>

<style>
  .shead {
    position: absolute;
    top: 48px;
    left: var(--safe);
    right: var(--safe);
    text-align: center;
    z-index: var(--z-header);
    pointer-events: none;
  }
  .kicker-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(13, 29, 69, 0.65);
    border: 1px solid rgba(255, 196, 37, 0.3);
    border-radius: var(--r-pill);
    padding: 6px 20px;
    backdrop-filter: blur(12px);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-gold-core);
    box-shadow: 0 0 10px var(--c-gold-core);
  }
  .kicker {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-gold-glow);
  }
  .title {
    font-family: var(--f-display);
    font-size: 64px;
    line-height: 1.1;
    color: var(--c-ink-100);
    margin: 12px 0 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  }
</style>
