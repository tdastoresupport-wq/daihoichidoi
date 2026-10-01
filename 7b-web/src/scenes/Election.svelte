<script lang="ts">
  import { CANDIDATES } from '../lib/data';
</script>

<div class="election-stage">
  <div class="bg-glow" aria-hidden="true"></div>

  <header class="el-top">
    <p class="el-identity">CHI ĐỘI 7B · NĂM HỌC 2026 – 2027</p>
    <h1 class="el-title">BẦU BAN CHẤP HÀNH<br />CHI ĐỘI 7B</h1>
  </header>

  <ol class="names">
    {#each CANDIDATES as name, i}
      <li>
        <span class="idx">{String(i + 1).padStart(2, '0')}</span>
        <span class="cname">{name}</span>
      </li>
    {/each}
  </ol>
</div>

<style>
  .election-stage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 44px;
    padding: 150px var(--safe) 120px;
    text-align: center;
    overflow: hidden;
  }
  .bg-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(900px 420px at 50% 0%, rgba(255, 197, 49, 0.1), transparent 70%),
      radial-gradient(1000px 500px at 50% 110%, rgba(46, 124, 246, 0.14), transparent 70%);
    pointer-events: none;
  }
  .el-top {
    position: relative;
    z-index: 2;
  }
  .el-identity {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: var(--c-gold-400);
    margin: 0 0 10px;
  }
  .el-title {
    font-family: var(--f-display);
    font-size: 96px;
    /* ponytail: line-height 1.18 reserves room for stacked VI diacritics (Ầ Ấ Ộ...); 1.05 clipped (scrollH > clientH) */
    line-height: 1.18;
    padding: 0.06em 0 0.1em;
    color: var(--c-ink-100);
    margin: 0;
    overflow: visible;
    text-wrap: balance;
    text-shadow: 0 6px 32px rgba(0, 0, 0, 0.8);
  }
  .names {
    position: relative;
    z-index: 2;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 64px;
    text-align: left;
  }
  .names li {
    display: flex;
    align-items: baseline;
    gap: 20px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.16);
    padding: 10px 4px;
  }
  .names .idx {
    font-family: var(--f-display);
    font-size: 30px;
    color: var(--c-gold-400);
  }
  .names .cname {
    font-size: 38px;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--c-ink-100);
    white-space: nowrap;
  }
</style>
