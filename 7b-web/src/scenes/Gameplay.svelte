<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import gsap from 'gsap';
  import { pres } from '../lib/presentation.svelte';
  import { audio } from '../lib/audio.svelte';
  import { burst } from '../lib/confetti';
  import { QUESTION_TIME_S, getPieceMapping } from '../lib/data';
  import Icon from '../components/Icon.svelte';
  import secretImg from '../assets/v2/puzzle/secret-image-7b.jpg';
  import figLucky from '../assets/v2/gameplay/puzzle-lucky-chest.jpg';

  let picked: number | null = $state(null); // locked correct pick
  let misses: number[] = $state([]); // wrong picks
  let timeLeft = $state(QUESTION_TIME_S);
  let timerId = 0;
  let lastWhole = QUESTION_TIME_S;
  let rewardCall: gsap.core.Tween | null = null;
  let cardEl: HTMLElement | null = $state(null);

  const cell = $derived(pres.active);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stopTimer(): void {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = 0;
    }
  }

  function startTimer(): void {
    stopTimer();
    const t0 = performance.now();
    timeLeft = QUESTION_TIME_S;
    lastWhole = QUESTION_TIME_S;

    timerId = window.setInterval(() => {
      if (pres.isPaused) return; // Freeze timer if paused by MC
      const elapsed = (performance.now() - t0) / 1000;
      timeLeft = Math.max(0, Math.round((QUESTION_TIME_S - elapsed) * 10) / 10);
      const whole = Math.ceil(timeLeft);
      if (whole !== lastWhole) {
        lastWhole = whole;
        if (whole <= 5 && whole > 0 && !pres.revealed) audio.tick();
      }
      if (timeLeft <= 0) {
        stopTimer();
        pres.setTimeoutState();
      }
    }, 100);
  }

  // Lifecycle per cell
  $effect(() => {
    picked = null;
    misses = [];
    if (cell) {
      if (cell.kind === 'quiz' && !pres.revealed) {
        startTimer();
      } else {
        stopTimer();
      }
    }
    return () => stopTimer();
  });

  onDestroy(() => {
    stopTimer();
    rewardCall?.kill();
    rewardCall = null;
  });

  // Keys 1–4 select answers
  function onKey(e: KeyboardEvent): void {
    if (pres.scene !== 'game' || pres.isPaused || !cell || cell.kind !== 'quiz' || pres.revealed) return;
    const n = ['1', '2', '3', '4'].indexOf(e.key);
    if (n >= 0) select(n);
  }

  onMount(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function flyPiece(): void {
    if (!cell || reducedMotion || !cardEl) return;
    try {
      const from = cardEl.getBoundingClientRect();
      const prog = document.querySelector('.prog-mini') || document.querySelector('.dock-btn');
      const to = prog?.getBoundingClientRect();
      if (!to) return;
      const m = getPieceMapping(cell.id);
      const ghost = document.createElement('div');
      ghost.className = 'fly-piece';
      ghost.style.backgroundImage = `url('${secretImg}')`;
      ghost.style.backgroundPosition = m.bgPosition;
      ghost.style.left = `${from.left + from.width / 2 - 60}px`;
      ghost.style.top = `${from.top + from.height / 3}px`;
      document.body.appendChild(ghost);
      gsap.to(ghost, {
        left: to.left + to.width / 2 - 60,
        top: to.top,
        scale: 0.25,
        opacity: 0.6,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: () => ghost.remove()
      });
    } catch {
      // cosmetic only
    }
  }

  function celebrate(): void {
    rewardCall?.kill();
    rewardCall = gsap.delayedCall(0.12, () => {
      if (cardEl) burst(cardEl);
      audio.fanfare();
    });
    flyPiece();
    pres.unlockPiece();
  }

  function select(i: number): void {
    if (!cell || cell.kind !== 'quiz' || pres.revealed || picked !== null || misses.includes(i)) return;
    audio.unlock();

    if (i === cell.correctIndex) {
      picked = i;
      audio.correct();
      stopTimer();
      pres.reveal();
      pres.markResult('correct');
      celebrate();
    } else {
      misses = [...misses, i];
      audio.wrong();
      pres.setWrong();
      const beam = cardEl?.querySelector(`[data-beam="${i}"]`);
      if (beam && !reducedMotion) {
        gsap.fromTo(beam, { x: 0 }, { x: 12, duration: 0.06, repeat: 3, yoyo: true, overwrite: true });
      }
    }
  }

  function retryAnswer(): void {
    audio.click();
    pres.retry();
  }

  function revealManual(): void {
    audio.click();
    stopTimer();
    pres.reveal();
    if (cell?.kind === 'lucky') {
      pres.markResult('lucky');
      celebrate();
    } else {
      pres.markResult('presented');
    }
  }

  function confirmCorrect(): void {
    audio.correct();
    stopTimer();
    pres.confirmManualCorrect();
    celebrate();
  }

  function handleCompleteAndBack(): void {
    audio.click();
    pres.completeChallenge();
    pres.backToLobby();
  }

  function resumeChallenge(): void {
    audio.click();
    pres.resumeGame();
  }

  function returnToLobbyFromPause(): void {
    audio.click();
    stopTimer();
    pres.backToLobby();
  }
</script>

{#if cell}
  <div class="game-stage motif-{cell.motif}" bind:this={cardEl} class:is-lucky={cell.kind === 'lucky'}>
    <div class="motif-bg" aria-hidden="true"></div>

    {#if cell.kind === 'lucky'}
      <!-- LUCKY reward world -->
      <div class="lucky-wrap">
        <div class="lucky-copy">
          <div class="chip-row">
            <span class="chip">MẢNH GHÉP 0{cell.id}</span>
            <span class="chip dim">{cell.chip}</span>
          </div>
          <div class="lucky-star-burst" aria-hidden="true">✦</div>
          <h2 class="lucky-title">Ô MAY MẮN!</h2>
          <p class="lucky-msg">{cell.question}</p>
          <p class="reward"><span class="rwicon"><Icon name="gift" size={64} /></span>+1 PHẦN QUÀ</p>
          <div class="piece-unlocked-banner">
            <span class="banner-icon">🧩</span>
            <span>ĐÃ MỞ KHÓA MẢNH GHÉP 0{cell.id} BỨC TRANH BÍ MẬT!</span>
          </div>
          <button class="btn-back-board highlight" onclick={handleCompleteAndBack}>
            ‹ QUAY LẠI BẢNG CHỌN Ô
          </button>
        </div>
        <div class="lucky-art">
          <img
            src={figLucky}
            alt="Rương quà may mắn"
            class="lucky-img"
            onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </div>
      </div>
    {:else}
      <!-- QUIZ game-show floor -->
      <div class="quiz-floor">
        <div class="meta-row">
          <span class="chip">THỬ THÁCH 0{cell.id}</span>
          <span class="chip dim">{cell.chip}</span>
          <span
            class="timer"
            class:urgent={timeLeft <= 5 && !pres.revealed && pres.challengeState !== 'timeout'}
            class:done={pres.challengeState === 'timeout' || pres.revealed}
          >
            {#if pres.revealed}
              <span>ĐÃ CHỐT ĐÁP ÁN</span>
            {:else if pres.challengeState === 'timeout'}
              <span>HẾT GIỜ — MC CHỦ ĐỘNG</span>
            {:else}
              <span class="t-num">{Math.ceil(timeLeft)}</span><span class="t-unit">GIÂY</span>
            {/if}
            <span class="t-bar"><i style={`width:${(timeLeft / QUESTION_TIME_S) * 100}%`}></i></span>
          </span>
          <span class="prog-mini">{pres.completedCount} / 9 MẢNH GHÉP</span>
        </div>

        <p class="prompt">{cell.promptLabel}</p>
        <h2 class="question">{cell.question}</h2>

        {#if !pres.revealed}
          <div class="beams">
            {#each cell.options as op, idx}
              <button
                class="beam"
                data-beam={idx}
                style={`animation-delay:${0.12 + idx * 0.08}s`}
                disabled={misses.includes(idx)}
                onclick={() => select(idx)}
                aria-label={`Đáp án ${op.label}: ${op.text}`}
              >
                <span class="marker">{op.label}</span>
                <span class="beam-text">{op.text}</span>
                <span class="key-hint">{idx + 1}</span>
              </button>
            {/each}
          </div>

          {#if pres.challengeState === 'wrong' || misses.length > 0}
            <div class="feedback-box wrong">
              <span class="fb-text">Chưa chính xác — Hãy chọn lại đáp án khác.</span>
              <button class="btn-retry" onclick={retryAnswer}>THỬ LẠI</button>
            </div>
          {/if}

          <div class="mc-row">
            <button class="ghost" onclick={revealManual}>Mở đáp án (MC)</button>
            <button class="ghost pause-btn" onclick={() => pres.pauseGame()}>Tạm dừng (Esc)</button>
          </div>
        {:else}
          <div class="beams locked">
            {#each cell.options as op, idx}
              <div
                class="beam"
                class:hit={idx === cell.correctIndex}
                class:miss={idx !== cell.correctIndex}
                aria-label={`Đáp án ${op.label}: ${op.text}`}
              >
                <span class="marker">{op.label}</span>
                <span class="beam-text">{op.text}</span>
              </div>
            {/each}
          </div>

          <p class="expl">{cell.explanation}</p>

          {#if pres.lastResult === 'correct' || pres.lastResult === 'lucky'}
            <div class="piece-unlocked-banner">
              <span class="banner-icon">🧩</span>
              <span>ĐÃ MỞ KHÓA MẢNH GHÉP 0{cell.id} BỨC TRANH BÍ MẬT!</span>
            </div>
          {:else}
            <div class="mc-decision-box">
              <span class="mc-label">ĐIỀU KHIỂN MC:</span>
              <button class="btn-mc-correct" onclick={confirmCorrect}>
                ✓ XÁC NHẬN ĐÚNG & MỞ MẢNH GHÉP 0{cell.id}
              </button>
            </div>
          {/if}
        {/if}

        <button
          class="btn-back-board"
          class:highlight={pres.lastResult === 'correct' || pres.lastResult === 'lucky'}
          onclick={handleCompleteAndBack}
        >
          ‹ QUAY LẠI BẢNG CHỌN Ô
        </button>
      </div>
    {/if}

    <!-- ═══ MC ESCAPE / PAUSE OVERLAY (Esc) ═══ -->
    {#if pres.isPaused}
      <div class="mc-pause-overlay">
        <div class="pause-card">
          <div class="pause-header">
            <span class="pause-badge">MC CONTROL</span>
            <h3 class="pause-title">ĐANG TẠM DỪNG THỬ THÁCH</h3>
            <p class="pause-subtitle">
              Thử thách số 0{cell.id} · {cell.chip}
            </p>
          </div>
          <div class="pause-actions">
            <button class="btn-pause-resume" onclick={resumeChallenge}>
              <span>TIẾP TỤC THỬ THÁCH</span>
            </button>
            <button class="btn-pause-lobby" onclick={returnToLobbyFromPause}>
              <span>QUAY LẠI BẢNG CHỌN Ô</span>
            </button>
          </div>
          <p class="pause-hint">
            (Bảng đố sẽ lưu giữ nguyên các mảnh ghép đã hoàn thành)
          </p>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .game-stage {
    position: absolute;
    inset: 0;
    z-index: var(--z-content);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── MOTIF BACKGROUNDS ── */
  .motif-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .motif-burst .motif-bg {
    background:
      radial-gradient(circle at 50% 30%, rgba(255, 197, 49, 0.14) 0%, transparent 45%),
      repeating-conic-gradient(from 0deg at 50% 30%, rgba(255, 197, 49, 0.05) 0deg 6deg, transparent 6deg 12deg);
  }
  .motif-burst .motif-bg::after {
    content: '%';
    position: absolute;
    right: 6%;
    top: 8%;
    font-family: var(--f-display);
    font-size: 380px;
    line-height: 1;
    color: rgba(255, 197, 49, 0.07);
  }
  .motif-words .motif-bg {
    background:
      linear-gradient(180deg, transparent 20%, rgba(46, 124, 246, 0.12) 50%, transparent 80%),
      radial-gradient(ellipse 60% 45% at 50% 40%, rgba(111, 165, 255, 0.16) 0%, transparent 70%);
  }
  .motif-science .motif-bg {
    background:
      radial-gradient(circle at 18% 70%, rgba(34, 192, 122, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 82% 25%, rgba(0, 229, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 70% 80%, rgba(34, 192, 122, 0.07) 0%, transparent 35%);
  }
  .motif-type .motif-bg::after {
    content: 'Aa';
    position: absolute;
    left: 4%;
    bottom: 2%;
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 420px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.045);
  }
  .motif-keys .motif-bg {
    background:
      linear-gradient(180deg, transparent 55%, rgba(0, 229, 255, 0.06) 100%),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 2px, transparent 2px 72px);
  }
  .motif-peaks .motif-bg {
    background:
      radial-gradient(circle at 78% 18%, rgba(255, 197, 49, 0.2) 0%, transparent 22%),
      linear-gradient(180deg, transparent 45%, rgba(11, 27, 61, 0.9) 78%);
  }
  .motif-peaks .motif-bg::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 34%;
    background: linear-gradient(180deg, transparent 0%, rgba(6, 15, 38, 0.9) 100%);
    clip-path: polygon(0 100%, 0 55%, 12% 30%, 24% 62%, 38% 22%, 52% 58%, 66% 28%, 80% 60%, 100% 35%, 100% 100%);
  }
  .motif-kinetic .motif-bg {
    background: radial-gradient(circle at 50% 45%, rgba(255, 197, 49, 0.1) 0%, transparent 50%);
  }
  .motif-kinetic .motif-bg::after {
    content: '?';
    position: absolute;
    right: 5%;
    top: 6%;
    font-family: var(--f-display);
    font-size: 400px;
    line-height: 1;
    color: rgba(255, 197, 49, 0.08);
    animation: qPulse 2.4s ease-in-out infinite;
  }
  @keyframes qPulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.06); opacity: 1; }
  }
  .motif-lock .motif-bg {
    background:
      repeating-radial-gradient(circle at 50% 42%, rgba(0, 229, 255, 0.06) 0 2px, transparent 2px 46px),
      radial-gradient(circle at 50% 42%, rgba(0, 229, 255, 0.1) 0%, transparent 45%);
  }
  .motif-gold .motif-bg {
    background: radial-gradient(circle at 72% 45%, rgba(255, 197, 49, 0.16) 0%, transparent 55%);
  }

  /* ── QUIZ FLOOR ── */
  .quiz-floor {
    position: relative;
    z-index: 2;
    width: 1500px;
    max-width: calc(100% - var(--safe) * 2);
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 170px 0 120px;
  }
  .meta-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .chip {
    font-size: 24px;
    font-weight: 700;
    color: var(--c-ink-100);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--r-pill);
    padding: 8px 24px;
    background: rgba(18, 41, 92, 0.6);
  }
  .chip.dim {
    color: var(--c-gold-400);
    border-color: rgba(255, 197, 49, 0.5);
  }
  .prog-mini {
    margin-left: auto;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: var(--c-ink-300);
  }
  .timer {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 800;
    color: var(--c-spot-300);
    letter-spacing: 0.06em;
  }
  .t-num {
    font-family: var(--f-display);
    font-size: 34px;
    color: var(--c-ink-100);
    min-width: 52px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .t-bar {
    width: 180px;
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
  }
  .t-bar i {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--c-spot-400), var(--c-spot-300));
    border-radius: 4px;
    transition: width 0.1s linear;
  }
  .timer.urgent {
    color: var(--c-danger);
  }
  .timer.urgent .t-num {
    color: var(--c-danger);
    animation: tPulse 1s ease-in-out infinite;
  }
  @keyframes tPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.12); }
  }
  .timer.done {
    color: var(--c-ink-300);
  }

  .prompt {
    font-size: 30px;
    font-weight: 700;
    color: var(--c-gold-400);
    margin: 0;
  }
  .question {
    font-family: var(--f-display);
    font-size: 60px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--c-ink-100);
    margin: 0;
    text-wrap: balance;
    text-shadow: 0 6px 32px rgba(0, 0, 0, 0.8);
    white-space: pre-line;
  }

  /* ── ANSWER BEAMS ── */
  .beams {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 48px;
    margin-top: 6px;
  }
  .beam {
    display: flex;
    align-items: baseline;
    gap: 20px;
    background: none;
    border: none;
    border-bottom: 3px solid rgba(111, 165, 255, 0.35);
    padding: 14px 8px 14px 4px;
    cursor: pointer;
    text-align: left;
    color: var(--c-ink-100);
    animation: beamIn 0.45s var(--e-out) both;
    transition: border-color var(--t-fast) var(--e-out), transform var(--t-fast) var(--e-out), opacity var(--t-fast) var(--e-out);
  }
  @keyframes beamIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .beam:hover:not(:disabled),
  .beam:focus-visible {
    border-bottom-color: var(--c-spot-300);
    transform: translateX(10px);
  }
  .beam:hover:not(:disabled) .marker,
  .beam:focus-visible .marker {
    background: var(--c-spot-400);
    border-color: var(--c-spot-300);
    box-shadow: 0 0 22px rgba(46, 124, 246, 0.55);
    animation: markerPulse 0.9s ease-in-out infinite;
  }
  @keyframes markerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.12); }
  }
  .beam:disabled {
    cursor: default;
  }
  .marker {
    flex: none;
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid rgba(111, 165, 255, 0.5);
    font-family: var(--f-display);
    font-size: 34px;
    color: var(--c-ink-100);
    transition: background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out), box-shadow var(--t-fast) var(--e-out);
  }
  .beam-text {
    font-size: 38px;
    font-weight: 700;
    line-height: 1.25;
  }
  .key-hint {
    margin-left: auto;
    font-size: 20px;
    font-weight: 700;
    color: var(--c-ink-300);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 8px;
    padding: 2px 12px;
  }
  .beam:disabled:not(.hit) .marker {
    border-color: var(--c-danger);
    color: var(--c-danger);
  }
  .beam:disabled:not(.hit) {
    opacity: 0.45;
    border-bottom-color: rgba(240, 82, 77, 0.4);
  }
  .beams.locked .beam {
    cursor: default;
    animation: none;
  }
  .beams.locked .beam.hit {
    border-bottom-color: var(--c-gold-400);
  }
  .beams.locked .beam.hit .marker {
    background: var(--c-gold-400);
    border-color: var(--c-gold-400);
    color: var(--c-ink-900);
    box-shadow: 0 0 34px rgba(255, 197, 49, 0.65);
  }
  .beams.locked .beam.hit .beam-text {
    color: var(--c-gold-400);
    text-shadow: 0 0 26px rgba(255, 197, 49, 0.5);
  }
  .beams.locked .beam.miss {
    opacity: 0.4;
  }

  .feedback-box {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 4px;
  }
  .feedback-box.wrong .fb-text {
    font-size: 26px;
    font-weight: 800;
    color: var(--c-danger);
  }
  .btn-retry {
    font-family: var(--f-body);
    font-size: 20px;
    font-weight: 800;
    color: var(--c-ink-100);
    background: rgba(240, 82, 77, 0.35);
    border: 1.5px solid var(--c-danger);
    border-radius: var(--r-pill);
    padding: 6px 20px;
    cursor: pointer;
  }

  .expl {
    font-size: 30px;
    font-weight: 600;
    color: var(--c-ink-100);
    border-left: 5px solid var(--c-gold-400);
    padding-left: 24px;
    margin: 4px 0 0;
    max-width: 1200px;
  }

  .ghost {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 24px;
    color: var(--c-ink-300);
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.25);
    border-radius: var(--r-pill);
    padding: 10px 32px;
    cursor: pointer;
    transition: color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .ghost:hover {
    color: var(--c-ink-100);
    border-color: var(--c-gold-400);
  }
  .mc-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 6px;
  }
  .mc-decision-box {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
  }
  .mc-label {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--c-spot-300);
  }
  .btn-mc-correct {
    font-family: var(--f-body);
    font-size: 24px;
    font-weight: 800;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-success), #34d399);
    border: none;
    border-radius: var(--r-pill);
    padding: 12px 32px;
    cursor: pointer;
  }
  .btn-back-board {
    align-self: flex-start;
    margin-top: 8px;
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 26px;
    color: var(--c-ink-100);
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--r-pill);
    padding: 12px 40px;
    cursor: pointer;
  }
  .btn-back-board:hover {
    border-color: var(--c-gold-400);
  }
  .btn-back-board.highlight {
    background: var(--c-gold-400);
    border-color: var(--c-gold-400);
    color: var(--c-ink-900);
    font-weight: 800;
  }

  /* ── Piece fly ghost ── */
  :global(.fly-piece) {
    position: fixed;
    width: 120px;
    height: 120px;
    border-radius: 18px;
    background-size: 846px 591px;
    background-repeat: no-repeat;
    border: 3px solid var(--c-gold-400);
    box-shadow: 0 0 40px rgba(255, 197, 49, 0.8);
    pointer-events: none;
    z-index: 200;
  }

  /* ── LUCKY reward world ── */
  .lucky-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 40px;
    padding: 0 var(--safe);
  }
  .lucky-copy {
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: flex-start;
  }
  .chip-row {
    display: flex;
    gap: 12px;
  }
  .lucky-star-burst {
    font-size: 72px;
    color: var(--c-gold-400);
    filter: drop-shadow(0 0 24px rgba(255, 197, 49, 0.7));
    line-height: 1;
  }
  .lucky-title {
    font-family: var(--f-display);
    font-size: 110px;
    line-height: 1;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, var(--c-gold-400) 45%, #ffeaa7 75%, var(--c-gold-500) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 8px 28px rgba(255, 197, 49, 0.4));
  }
  .lucky-msg {
    font-size: 32px;
    font-weight: 700;
    color: var(--c-ink-100);
    margin: 0;
    white-space: pre-line;
    line-height: 1.5;
  }
  .reward {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 52px;
    font-weight: 800;
    color: var(--c-gold-400);
    margin: 0;
  }
  .rwicon {
    color: var(--c-gold-400);
    display: inline-flex;
  }
  .lucky-art {
    display: flex;
    justify-content: center;
  }
  .lucky-img {
    width: min(640px, 100%);
    border-radius: var(--r-lg);
    box-shadow: var(--sh-card), 0 0 80px rgba(255, 197, 49, 0.25);
  }
  .piece-unlocked-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 2px solid var(--c-gold-400);
    padding: 12px 2px 0;
    font-size: 24px;
    font-weight: 800;
    color: var(--c-gold-400);
  }
  .banner-icon {
    font-size: 28px;
  }

  /* ── MC PAUSE OVERLAY ── */
  .mc-pause-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    background: rgba(4, 11, 28, 0.85);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.25s var(--e-out);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .pause-card {
    background: rgba(13, 29, 69, 0.95);
    border: 2px solid var(--c-spot-cyan);
    border-radius: var(--r-lg);
    padding: 44px 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 229, 255, 0.3);
    max-width: 640px;
  }
  .pause-badge {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: var(--c-spot-cyan);
    border: 1px solid var(--c-spot-cyan);
    border-radius: var(--r-pill);
    padding: 4px 16px;
  }
  .pause-title {
    font-family: var(--f-display);
    font-size: 42px;
    color: #ffffff;
    margin: 8px 0 4px;
  }
  .pause-subtitle {
    font-size: 22px;
    font-weight: 600;
    color: var(--c-gold-400);
    margin: 0;
  }
  .pause-actions {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin-top: 8px;
  }
  .btn-pause-resume {
    font-family: var(--f-body);
    font-weight: 800;
    font-size: 22px;
    color: var(--c-ink-900);
    background: linear-gradient(135deg, var(--c-gold-core), var(--c-gold-500));
    border: none;
    border-radius: var(--r-pill);
    padding: 16px 36px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(255, 196, 37, 0.4);
    transition: transform var(--t-fast) var(--e-out);
  }
  .btn-pause-resume:hover {
    transform: scale(1.02);
  }
  .btn-pause-lobby {
    font-family: var(--f-body);
    font-weight: 700;
    font-size: 20px;
    color: var(--c-ink-100);
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--r-pill);
    padding: 14px 36px;
    cursor: pointer;
    transition: background-color var(--t-fast) var(--e-out), border-color var(--t-fast) var(--e-out);
  }
  .btn-pause-lobby:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: var(--c-spot-cyan);
  }
  .pause-hint {
    font-size: 15px;
    color: var(--c-ink-300);
    margin: 0;
  }
</style>
