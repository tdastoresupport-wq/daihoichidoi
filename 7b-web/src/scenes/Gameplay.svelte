<script lang="ts">
  import { onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import { norm } from '../lib/data';
  import { burst } from '../lib/confetti';
  import Icon from '../components/Icon.svelte';

  // V2 Dedicated Game Assets
  import figNineDots from '../assets/v2/gameplay/fig-nine-dots.svg';
  import figNineDotsSolution from '../assets/v2/gameplay/fig-nine-dots-solution.svg';
  import figAi from '../assets/v2/gameplay/scene-ai-companion.jpg';
  import figMusic from '../assets/v2/gameplay/scene-music-challenge.jpg';
  import figRebus from '../assets/v2/gameplay/fig-rebus-but-pha.svg';
  import figLucky from '../assets/v2/gameplay/puzzle-lucky-chest.jpg';

  let guess = $state('');
  let tried = $state(false);
  let clipOk = $state<boolean | null>(null);
  let cardEl: HTMLElement | null = $state(null);
  let rewardCall: gsap.core.Tween | null = null;

  onDestroy(() => {
    // Không bắn confetti/fanfare sau khi scene đã unmount.
    rewardCall?.kill();
    rewardCall = null;
  });

  const cell = $derived(pres.active);

  // Which cells use an image panel on the right
  const hasImage = $derived(
    cell !== null &&
    (cell.id === 4 || cell.kind === 'visual' || cell.kind === 'audio' || cell.kind === 'dots' || cell.kind === 'lucky')
  );

  $effect(() => {
    guess = '';
    tried = false;
    clipOk = null;
    if (cell?.hasAudioClip) void audio.probeClip().then((ok) => (clipOk = ok));
  });

  // Reveal animation (restrained flip; reduced-motion → instant final state)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $effect(() => {
    if (!pres.revealed || !cardEl) return;
    const ans = cardEl.querySelector('.acard, .lucky-reveal');
    if (reducedMotion) {
      gsap.set(ans ?? cardEl, { clearProps: 'all', opacity: 1 });
      return;
    }
    if (ans) {
      gsap.fromTo(
        ans,
        { rotationX: -60, opacity: 0, y: 24, transformPerspective: 1000 },
        { rotationX: 0, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true }
      );
    }
    if (pres.lastResult === 'correct' || pres.lastResult === 'lucky') {
      // ~120ms anticipation, then reward lands together with fanfare.
      rewardCall?.kill();
      rewardCall = gsap.delayedCall(0.12, () => {
        burst(cardEl as HTMLElement);
        audio.fanfare();
        if (ans) {
          gsap.fromTo(
            ans,
            { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.9)' },
            { boxShadow: '0 0 0 36px rgba(16, 185, 129, 0)', duration: 0.55, repeat: 1, ease: 'power2.out' }
          );
        }
      });
    }
  });

  function submit(): void {
    if (!cell?.checkable || pres.revealed) return;
    tried = true;
    const ok = (cell.accepted ?? []).map(norm).includes(norm(guess));
    if (ok) {
      audio.correct();
      pres.reveal();
      pres.markResult('correct');
    } else {
      audio.wrong();
      const form = cardEl?.querySelector('.answer-form');
      if (form) gsap.fromTo(form, { x: 0 }, { x: 14, duration: 0.06, repeat: 3, yoyo: true, overwrite: true });
    }
  }

  function revealManual(): void {
    audio.click();
    pres.reveal();
    if (cell?.kind === 'lucky') {
      pres.markResult('lucky');
    } else {
      pres.lastResult = 'presented';
    }
  }

  function confirmCorrect(): void {
    audio.correct();
    pres.confirmManualCorrect();
  }

  function back(): void {
    audio.click();
    pres.backToLobby();
  }
</script>

{#if cell}
  <div class="game-stage" bind:this={cardEl} class:has-image={hasImage} class:is-lucky={cell.kind === 'lucky'}>

    <!-- ═══ BACKGROUND ACCENT ═══ -->
    <div class="stage-bg-accent" aria-hidden="true">
      <div class="accent-top"></div>
      <div class="accent-bot"></div>
    </div>

    <!-- ═══ LEFT PANEL: CONTENT ═══ -->
    <div class="content-panel">

      <!-- Cell badge -->
      <div class="chip-cell">
        <span class="cell-num">MẢNH GHÉP 0{cell.id}</span>
        <span class="chip-sep"></span>
        <span class="cell-type">{cell.chip}</span>
      </div>

      {#if cell.kind === 'lucky'}
        <!-- LUCKY special state -->
        <div class="lucky-content">
          <div class="lucky-star-burst" aria-hidden="true">✦</div>
          <h2 class="lucky-title">ÔI MAY MẮN QUÁ!</h2>
          <p class="lucky-msg">{cell.question}</p>
          <div class="lucky-reward">
            <Icon name="gift" size={52} />
            <span class="lucky-plus">+1 PHẦN QUÀ</span>
          </div>
          <div class="piece-unlocked-banner lucky-banner">
            <span class="banner-icon">🧩</span>
            <span>ĐÃ MỞ KHÓA MẢNH GHÉP 0{cell.id} BỨC TRANH BÍ MẬT!</span>
          </div>
        </div>

      {:else}
        <!-- QUESTION FLOW -->

        <!-- Level 3: Instruction / prompt -->
        {#if cell.promptLabel}
          <p class="prompt-label">{cell.promptLabel}</p>
        {/if}

        <!-- Level 2: Main question -->
        <div class="question-block">
          <p class="question-text">{cell.question}</p>
        </div>

        <!-- Answer input form -->
        {#if cell.checkable && !pres.revealed}
          <form class="answer-form" onsubmit={(e) => { e.preventDefault(); submit(); }}>
            <input
              id="answer-input"
              name="answer"
              bind:value={guess}
              placeholder="Nhập câu trả lời… (Enter để chấm)"
              autocomplete="off"
              aria-label="Nhập câu trả lời"
            />
            <button type="submit" class="btn-submit">
              <span>CHẤM</span>
              <span class="check-icon">✓</span>
            </button>
          </form>
          {#if tried && !pres.revealed}
            <p class="feedback-wrong">Chưa chính xác — thử lại hoặc nhờ MC mở đáp án.</p>
          {/if}
        {/if}

        <!-- Action row -->
        {#if !pres.revealed}
          <div class="action-row">
            {#if !cell.checkable}
              <button class="btn-primary-glow" onclick={revealManual}>
                ĐÃ TRÌNH BÀY — MỞ ĐÁP ÁN
              </button>
            {:else}
              <button class="btn-ghost-glow" onclick={revealManual}>
                Mở đáp án (MC)
              </button>
            {/if}
          </div>
        {/if}

        <!-- Answer reveal card -->
        {#if pres.revealed}
          <div class="acard" class:good={pres.lastResult === 'correct'} class:pass={pres.lastResult === 'presented'}>
            <div class="acard-header">
              {#if pres.lastResult === 'correct'}
                <span class="badge-status success">✓ CHÍNH XÁC!</span>
              {:else}
                <span class="badge-status">ĐÁP ÁN CHÍNH THỨC:</span>
              {/if}
            </div>
            <p class="answer-content">{cell.answer}</p>
            {#if cell.answerNote}
              <p class="answer-note">{cell.answerNote}</p>
            {/if}

            {#if pres.lastResult === 'correct'}
              <!-- Piece Unlocked Success Banner -->
              <div class="piece-unlocked-banner">
                <span class="banner-icon">🧩</span>
                <span>ĐÃ MỞ KHÓA MẢNH GHÉP 0{cell.id} BỨC TRANH BÍ MẬT!</span>
              </div>
            {:else}
              <!-- MC Decision Buttons for Manual Reveal -->
              <div class="mc-decision-box">
                <span class="mc-label">ĐIỀU KHIỂN MC:</span>
                <div class="mc-btn-group">
                  <button class="btn-mc-correct" onclick={confirmCorrect}>
                    ✓ XÁC NHẬN ĐÚNG & MỞ MẢNH GHÉP 0{cell.id}
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      {/if}

      <!-- Return button -->
      <button class="btn-back-board" class:highlight={pres.lastResult === 'correct' || pres.lastResult === 'lucky'} onclick={back}>
        ‹ QUAY LẠI BẢNG ĐỐ
      </button>
    </div>

    <!-- ═══ RIGHT PANEL: VISUAL ═══ -->
    {#if hasImage && cell.kind !== 'lucky'}
      <div class="visual-panel">
        {#if cell.id === 4}
          <img src={figAi} alt="Trí tuệ nhân tạo và học sinh" class="artwork-fill" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
          <div class="artwork-vignette"></div>
        {:else if cell.kind === 'visual'}
          <img src={figRebus} alt="Nhìn hình đoán từ — Bứt Phá" class="artwork-fill rebus-svg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
          <div class="artwork-vignette"></div>
        {:else if cell.kind === 'dots'}
          <div class="svg-scene">
            <div class="svg-bg-glow" aria-hidden="true"></div>
            {#if pres.revealed}
              <img src={figNineDotsSolution} alt="Đáp án câu đố 9 điểm: 4 đoạn thẳng liên tục" class="dots-svg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
              <p class="svg-caption sol">✓ Kéo 4 đoạn thẳng vượt ra ngoài ranh giới hình vuông.</p>
            {:else}
              <img src={figNineDots} alt="Câu đố 9 điểm" class="dots-svg" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
              <p class="svg-caption">Nối tất cả 9 điểm bằng 4 đoạn thẳng không nhấc bút.</p>
            {/if}
          </div>
        {:else if cell.kind === 'audio'}
          <div class="music-scene">
            <img src={figMusic} alt="Nghe nhạc đoán tên bài hát" class="artwork-fill" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
            <div class="artwork-vignette"></div>
            <div class="audio-overlay">
              {#if clipOk === false}
                <p class="warn-audio">Chưa có file clip — MC mở nhạc ngoài.</p>
              {:else}
                <button class="btn-play-clip" onclick={() => audio.playClip()}>
                  <span class="eq-waves" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
                  <Icon name="note" size={28} />
                  <span>PHÁT ĐOẠN NHẠC</span>
                </button>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {:else if cell.kind === 'lucky'}
      <!-- Lucky: full-screen chest image on right -->
      <div class="visual-panel lucky-panel">
        <img src={figLucky} alt="Rương quà may mắn" class="artwork-fill lucky-img-fill" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
        <div class="lucky-overlay-glow" aria-hidden="true"></div>
      </div>
    {/if}

  </div>
{/if}

<style>
  /* ── STAGE ROOT ──────────────────────────────────── */
  .game-stage {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    z-index: var(--z-content);
    overflow: hidden;
  }
  /* Two-column when there's an image */
  .game-stage.has-image {
    grid-template-columns: 1fr 1fr;
  }
  .game-stage.is-lucky {
    grid-template-columns: 1fr 1fr;
  }

  /* ── BACKGROUND ACCENTS ─────────────────────────── */
  .stage-bg-accent {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .accent-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: radial-gradient(ellipse 80% 100% at 30% 0%, rgba(26, 101, 255, 0.18) 0%, transparent 70%);
  }
  .accent-bot {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: radial-gradient(ellipse 60% 100% at 20% 100%, rgba(255, 196, 37, 0.08) 0%, transparent 70%);
  }

  /* ── LEFT: CONTENT PANEL ────────────────────────── */
  .content-panel {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px var(--safe) 80px 96px;
    gap: 20px;
    overflow: hidden;
  }
  /* When no image: center the content */
  .game-stage:not(.has-image):not(.is-lucky) .content-panel {
    align-items: center;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px var(--safe) 80px;
  }

  .chip-cell {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(13, 29, 69, 0.85);
    border: 1px solid rgba(255, 196, 37, 0.45);
    border-radius: var(--r-pill);
    padding: 10px 30px;
    backdrop-filter: blur(16px);
    align-self: flex-start;
  }
  .game-stage:not(.has-image):not(.is-lucky) .chip-cell {
    align-self: center;
  }
  .cell-num {
    font-family: var(--f-display);
    font-size: 26px;
    color: var(--c-gold-core);
  }
  .chip-sep {
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
  }
  .cell-type {
    font-size: 22px;
    font-weight: 700;
    color: var(--c-ink-200);
  }

  /* ── PROMPT ─────────────────────────────────────── */
  .prompt-label {
    font-size: 24px;
    font-weight: 700;
    color: var(--c-gold-glow);
    margin: 0;
    line-height: 1.4;
  }

  /* ── QUESTION (direct type, gold rule accent — no box) ── */
  .question-block {
    border-left: 5px solid var(--c-gold-core);
    padding: 6px 0 6px 30px;
  }
  .game-stage:not(.has-image):not(.is-lucky) .question-block {
    border-left: none;
    border-top: 5px solid var(--c-gold-core);
    padding: 26px 0 0;
    text-align: center;
    max-width: 1000px;
  }
  .question-text {
    font-family: var(--f-display);
    font-size: 38px;
    line-height: 1.35;
    color: var(--c-ink-100);
    margin: 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    white-space: pre-line;
  }

  /* ── ANSWER FORM ────────────────────────────────── */
  .answer-form {
    display: flex;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;
  }
  .game-stage:not(.has-image):not(.is-lucky) .answer-form {
    justify-content: center;
  }
  .answer-form input {
    font-family: var(--f-body);
    font-size: 26px;
    flex: 1;
    min-width: 320px;
    max-width: 560px;
    background: rgba(7, 17, 38, 0.92);
    border: 2px solid rgba(255, 196, 37, 0.5);
    border-radius: var(--r-pill);
    padding: 14px 30px;
    outline: none;
    color: #fff;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
    transition: border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .answer-form input:focus {
    border-color: var(--c-spot-cyan);
    box-shadow: 0 0 24px rgba(0, 229, 255, 0.35);
  }
  .btn-submit {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 24px;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 14px 40px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 24px rgba(255, 196, 37, 0.4);
    transition: transform var(--t-fast) var(--e-out);
    white-space: nowrap;
  }
  .btn-submit:hover { transform: translateY(-2px) scale(1.04); }

  .feedback-wrong {
    font-size: 22px;
    font-weight: 700;
    color: var(--c-danger);
    margin: 0;
  }

  /* ── ACTION ROW ─────────────────────────────────── */
  .action-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .game-stage:not(.has-image):not(.is-lucky) .action-row {
    justify-content: center;
  }
  .btn-primary-glow {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 0.04em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 16px 48px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(255, 196, 37, 0.4);
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-primary-glow:hover { transform: translateY(-2px) scale(1.03); }

  .btn-ghost-glow {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 22px;
    color: var(--c-ink-200);
    background: rgba(13, 29, 69, 0.6);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--r-pill);
    padding: 12px 36px;
    cursor: pointer;
    transition: background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .btn-ghost-glow:hover {
    background: var(--c-stage-700);
    border-color: var(--c-gold-core);
  }

  /* ── ANSWER REVEAL (direct type under gold rule — no box) */
  .acard {
    padding: 24px 0 0;
    border-top: 3px solid var(--c-gold-core);
  }
  .game-stage:not(.has-image):not(.is-lucky) .acard {
    text-align: center;
    max-width: 1000px;
  }
  .acard.good {
    border-top-color: var(--c-success);
  }
  .acard.pass {
    border-top-color: var(--c-gold-core);
  }
  .acard-header {
    margin-bottom: 10px;
  }
  .badge-status {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--c-gold-glow);
    text-transform: uppercase;
  }
  .badge-status.success { color: var(--c-success); }
  .answer-content {
    font-family: var(--f-display);
    font-size: 44px;
    line-height: 1.25;
    color: var(--c-ink-100);
    margin: 0;
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }
  .answer-note {
    font-size: 24px;
    font-weight: 600;
    color: var(--c-ink-300);
    margin: 8px 0 0;
  }

  /* ── BACK BUTTON ────────────────────────────────── */
  .btn-back-board {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 20px;
    color: var(--c-ink-100);
    background: rgba(13, 29, 69, 0.7);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--r-pill);
    padding: 10px 28px;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition: transform var(--t-fast) var(--e-out), background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
    align-self: flex-start;
    margin-top: 8px;
  }
  .game-stage:not(.has-image):not(.is-lucky) .btn-back-board {
    align-self: center;
  }
  .btn-back-board:hover {
    background: var(--c-stage-700);
    border-color: var(--c-gold-core);
    transform: translateX(-4px);
  }

  /* ── LUCKY SPECIAL ──────────────────────────────── */
  .lucky-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .lucky-star-burst {
    font-size: 72px;
    color: var(--c-gold-core);
    filter: drop-shadow(0 0 24px rgba(255, 196, 37, 0.7));
    animation: starSpin 6s linear infinite;
    line-height: 1;
  }
  @keyframes starSpin {
    from { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.15); }
    to { transform: rotate(360deg) scale(1); }
  }
  .lucky-title {
    font-family: var(--f-display);
    font-size: 72px;
    line-height: 1.1;
    background: linear-gradient(135deg, #ffffff 0%, var(--c-gold-core) 40%, #ffeaa7 70%, var(--c-gold-500) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 8px 28px rgba(255, 196, 37, 0.4));
    margin: 0;
  }
  .lucky-msg {
    font-size: 28px;
    font-weight: 700;
    color: var(--c-ink-200);
    margin: 0;
    max-width: 500px;
    line-height: 1.5;
    white-space: pre-line;
  }
  .lucky-reward {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 6px 0;
    color: var(--c-gold-core);
    align-self: flex-start;
  }
  .lucky-plus {
    font-family: var(--f-display);
    font-size: 44px;
    color: var(--c-gold-glow);
  }

  /* ── RIGHT: VISUAL PANEL ────────────────────────── */
  .visual-panel {
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .artwork-fill {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .artwork-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(7, 17, 38, 0.7) 0%,
      rgba(7, 17, 38, 0.1) 40%,
      transparent 100%
    );
  }

  /* SVG (Triangle) scene */
  .svg-scene {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    background: radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
    padding: 40px;
  }
  .svg-bg-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0, 229, 255, 0.12) 0%, transparent 70%);
  }
  .dots-svg {
    max-height: 480px;
    max-width: 100%;
    border-radius: var(--r-md);
    border: 2px solid rgba(0, 229, 255, 0.3);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.6),
      0 0 40px rgba(0, 229, 255, 0.2);
    position: relative;
    z-index: 2;
  }
  .rebus-svg {
    object-fit: contain;
    padding: 30px;
  }
  .svg-caption {
    font-size: 22px;
    font-weight: 700;
    color: var(--c-ink-300);
    text-align: center;
    position: relative;
    z-index: 2;
    margin: 0;
  }
  .svg-caption.sol {
    color: var(--c-success);
  }

  /* Music scene */
  .music-scene {
    position: absolute;
    inset: 0;
  }
  .audio-overlay {
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 3;
  }
  .btn-play-clip {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 0.04em;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 16px 48px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(255, 196, 37, 0.55);
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-play-clip:hover { transform: translateY(-2px) scale(1.04); }

  .eq-waves {
    display: inline-flex;
    align-items: flex-end;
    gap: 3px;
    height: 22px;
  }
  .eq-waves i {
    width: 4px;
    background: var(--c-ink-900);
    border-radius: 2px;
    animation: eqAnim 0.8s ease-in-out infinite alternate;
  }
  .eq-waves i:nth-child(1) { height: 40%; }
  .eq-waves i:nth-child(2) { height: 90%; animation-delay: 0.1s; }
  .eq-waves i:nth-child(3) { height: 60%; animation-delay: 0.2s; }
  .eq-waves i:nth-child(4) { height: 100%; animation-delay: 0.3s; }
  .eq-waves i:nth-child(5) { height: 50%; animation-delay: 0.4s; }
  @keyframes eqAnim {
    0% { transform: scaleY(0.4); }
    100% { transform: scaleY(1); }
  }
  .warn-audio {
    background: rgba(239, 68, 68, 0.9);
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    padding: 10px 28px;
    border-radius: var(--r-pill);
  }

  /* Lucky panel */
  .lucky-panel .lucky-img-fill {
    object-position: center;
    transform: scale(1.04);
    filter: brightness(0.85) saturate(1.2);
  }
  .lucky-overlay-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(7, 17, 38, 0.6) 0%,
      rgba(255, 196, 37, 0.05) 50%,
      transparent 100%
    );
  }

  /* Piece Unlocked Banner (slim status line) */
  .piece-unlocked-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 2px solid var(--c-gold-core);
    padding: 12px 2px 0;
    margin-top: 14px;
    font-size: 20px;
    font-weight: 800;
    color: var(--c-gold-glow);
    animation: bannerPop 0.45s var(--e-out);
  }
  .piece-unlocked-banner.lucky-banner {
    margin-top: 20px;
    justify-content: center;
  }
  .banner-icon {
    font-size: 24px;
  }
  @keyframes bannerPop {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  /* MC Decision Box */
  .mc-decision-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
  }
  .mc-label {
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: var(--c-spot-cyan);
  }
  .mc-btn-group {
    display: flex;
    gap: 12px;
  }
  .btn-mc-correct {
    font-family: var(--f-body);
    font-size: 18px;
    font-weight: 800;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-success), #34d399);
    border: none;
    border-radius: var(--r-pill);
    padding: 10px 24px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-mc-correct:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 22px rgba(16, 185, 129, 0.6);
  }

  .btn-back-board.highlight {
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    color: var(--c-ink-900);
    border: none;
    font-weight: 800;
    box-shadow: 0 6px 20px rgba(255, 196, 37, 0.4);
  }
</style>
