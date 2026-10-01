// Presentation + true gameplay state machine (Svelte 5 runes).
import { PUZZLE_CELLS, type PuzzleCell } from './data';

export type SceneId = 'opening' | 'election' | 'directions' | 'lobby' | 'game' | 'closing';

export type CellStatus = 'available' | 'opened' | 'completed';
export type LastResult = 'correct' | 'wrong' | 'presented' | 'lucky' | null;

export type ChallengeState =
  | 'unopened'
  | 'selected'
  | 'intro'
  | 'question'
  | 'answering'
  | 'wrong'
  | 'retry'
  | 'timeout'
  | 'correct'
  | 'reward'
  | 'piece_unlock'
  | 'complete';

export const LINEAR_SCENES: SceneId[] = ['opening', 'election', 'directions', 'lobby', 'closing'];

class PresentationEngine {
  scene = $state<SceneId>('opening');
  activeCell = $state<number | null>(null); // cell id 1..9
  status = $state<CellStatus[]>(Array(9).fill('available'));
  revealed = $state(false);
  lastResult = $state<LastResult>(null);

  // Challenge State Machine
  challengeState = $state<ChallengeState>('unopened');
  isPaused = $state(false);

  completedCount = $derived(this.status.filter((s) => s === 'completed').length);
  completedPieceIds = $derived(
    this.status
      .map((st, i) => (st === 'completed' ? i + 1 : null))
      .filter((id): id is number => id !== null)
  );

  get active(): PuzzleCell | null {
    return this.activeCell === null
      ? null
      : (PUZZLE_CELLS.find((c) => c.id === this.activeCell) ?? null);
  }

  // Dynamic label for bottom dock action button
  get primaryActionLabel(): string {
    if (this.scene === 'opening') return 'BẮT ĐẦU ›';
    if (this.scene === 'election') return 'TIẾP ›';
    if (this.scene === 'directions') return 'TIẾP ›';
    if (this.scene === 'lobby') {
      return this.completedCount === 9 ? 'XEM BỨC TRANH 🌟' : 'CHỌN Ô SỐ';
    }
    if (this.scene === 'closing') return 'CHƠI LẠI ↺';
    if (this.scene === 'game') {
      if (this.isPaused) return 'TIẾP TỤC';
      switch (this.challengeState) {
        case 'intro':
          return 'HIỆN CÂU HỎI';
        case 'question':
        case 'answering':
          return 'XÁC NHẬN';
        case 'wrong':
          return 'THỬ LẠI';
        case 'retry':
          return 'CHỌN ĐÁP ÁN';
        case 'timeout':
          return 'MỞ ĐÁP ÁN (MC)';
        case 'correct':
        case 'reward':
          return 'NHẬN MẢNH GHÉP';
        case 'piece_unlock':
        case 'complete':
          return 'VỀ BẢNG CHỌN Ô';
        default:
          return 'TIẾP';
      }
    }
    return 'TIẾP ›';
  }

  go(id: SceneId): void {
    if (id === 'closing' && this.completedCount < 9 && this.scene === 'lobby') {
      // Cannot jump to closing before completing 9/9
      return;
    }
    this.scene = id;
    if (id !== 'game') {
      this.activeCell = null;
      this.revealed = false;
      this.isPaused = false;
      this.challengeState = 'unopened';
    }
  }

  next(): void {
    if (this.scene === 'game') {
      // In active game: NO direct nextSlide jumps.
      return;
    }
    const i = LINEAR_SCENES.indexOf(this.scene as SceneId);
    if (i >= 0 && i < LINEAR_SCENES.length - 1) {
      const target = LINEAR_SCENES[i + 1];
      // Gate: Lobby to Closing requires 9/9 completed
      if (this.scene === 'lobby' && target === 'closing' && this.completedCount < 9) {
        return;
      }
      this.go(target);
    }
  }

  prev(): void {
    if (this.scene === 'game') {
      // In active game: pause/escape overlay
      this.isPaused = true;
      return;
    }
    const i = LINEAR_SCENES.indexOf(this.scene as SceneId);
    if (i > 0) this.go(LINEAR_SCENES[i - 1]);
  }

  // Board -> Gameplay: Select any unopened cell
  openCell(id: number): CellStatus {
    const idx = id - 1;
    if (this.status[idx] === 'completed') {
      return 'completed';
    }
    this.status[idx] = 'opened';
    this.activeCell = id;
    this.revealed = false;
    this.lastResult = null;
    this.isPaused = false;
    this.scene = 'game';

    if (PUZZLE_CELLS[idx].kind === 'lucky') {
      this.challengeState = 'reward';
      this.revealed = true;
      this.lastResult = 'lucky';
      this.status[idx] = 'completed'; // lucky unlocks immediately
    } else {
      this.challengeState = 'question';
    }
    return this.status[idx];
  }

  // State transitions during challenge
  setChallengeState(st: ChallengeState): void {
    this.challengeState = st;
  }

  setWrong(): void {
    this.challengeState = 'wrong';
    this.lastResult = 'wrong';
  }

  retry(): void {
    this.challengeState = 'retry';
  }

  setTimeoutState(): void {
    if (this.challengeState !== 'correct' && this.challengeState !== 'complete') {
      this.challengeState = 'timeout';
    }
  }

  reveal(): void {
    this.revealed = true;
    if (this.challengeState === 'question' || this.challengeState === 'answering' || this.challengeState === 'timeout') {
      this.lastResult = 'presented';
    }
  }

  markResult(r: Exclude<LastResult, null>): void {
    this.lastResult = r;
    if (this.activeCell !== null && (r === 'correct' || r === 'lucky')) {
      this.challengeState = 'reward';
      this.status[this.activeCell - 1] = 'completed';
    }
  }

  confirmManualCorrect(): void {
    if (this.activeCell !== null) {
      this.lastResult = 'correct';
      this.challengeState = 'reward';
      this.status[this.activeCell - 1] = 'completed';
    }
  }

  unlockPiece(): void {
    if (this.activeCell !== null && this.status[this.activeCell - 1] === 'completed') {
      this.challengeState = 'piece_unlock';
    }
  }

  completeChallenge(): void {
    if (this.activeCell !== null && this.status[this.activeCell - 1] === 'completed') {
      this.challengeState = 'complete';
    }
  }

  // MC Escape / Pause actions
  pauseGame(): void {
    if (this.scene === 'game') {
      this.isPaused = true;
    }
  }

  resumeGame(): void {
    this.isPaused = false;
  }

  backToLobby(): void {
    // Return to lobby: preserve all completed pieces, progress, unopened states
    this.activeCell = null;
    this.revealed = false;
    this.lastResult = null;
    this.isPaused = false;
    this.challengeState = 'unopened';
    this.scene = 'lobby';
  }

  resetGame(): void {
    this.status = Array(9).fill('available');
    this.backToLobby();
  }
}

export const pres = new PresentationEngine();
