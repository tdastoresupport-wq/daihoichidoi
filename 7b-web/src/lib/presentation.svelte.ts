// Presentation + puzzle state machine (Svelte 5 runes).
import { PUZZLE_CELLS } from './data';

export type SceneId = 'opening' | 'directions' | 'lobby' | 'game' | 'closing';
// SCENE 03 (goals) OFF — không có trong order cho đến khi HAS_7B_DATA.

export type CellStatus = 'available' | 'opened' | 'completed';
export type LastResult = 'correct' | 'wrong' | 'presented' | 'lucky' | null;

const LINEAR: SceneId[] = ['opening', 'directions', 'lobby', 'closing'];

class PresentationEngine {
  scene = $state<SceneId>('opening');
  activeCell = $state<number | null>(null); // cell id 1..9
  status = $state<CellStatus[]>(Array(9).fill('available'));
  revealed = $state(false);
  lastResult = $state<LastResult>(null);

  completedCount = $derived(this.status.filter((s) => s === 'completed').length);
  get active() {
    return this.activeCell === null
      ? null
      : (PUZZLE_CELLS.find((c) => c.id === this.activeCell) ?? null);
  }

  go(id: SceneId): void {
    this.scene = id;
    if (id !== 'game') {
      this.activeCell = null;
      this.revealed = false;
    }
  }

  next(): void {
    if (this.scene === 'game') return; // trong game: dùng reveal/back
    const i = LINEAR.indexOf(this.scene as SceneId);
    if (i >= 0 && i < LINEAR.length - 1) this.go(LINEAR[i + 1]);
  }

  prev(): void {
    if (this.scene === 'game') {
      this.backToLobby();
      return;
    }
    const i = LINEAR.indexOf(this.scene as SceneId);
    if (i > 0) this.go(LINEAR[i - 1]);
  }

  // Board -> Gameplay
  openCell(id: number): CellStatus {
    const idx = id - 1;
    if (this.status[idx] === 'completed') return 'completed';
    this.status[idx] = 'opened';
    this.activeCell = id;
    this.revealed = false;
    this.lastResult = null;
    this.scene = 'game';
    if (PUZZLE_CELLS[idx].kind === 'lucky') {
      this.status[idx] = 'completed';
      this.lastResult = 'lucky';
      this.revealed = true;
    }
    return this.status[idx];
  }

  reveal(): void {
    this.revealed = true;
  }

  markResult(r: Exclude<LastResult, null>): void {
    this.lastResult = r;
    if (this.activeCell !== null && (r === 'correct' || r === 'lucky')) {
      this.status[this.activeCell - 1] = 'completed';
    }
  }

  confirmManualCorrect(): void {
    if (this.activeCell !== null) {
      this.lastResult = 'correct';
      this.status[this.activeCell - 1] = 'completed';
    }
  }

  backToLobby(): void {
    // Ô đang mở dở (opened, chưa xong) giữ nguyên để chơi tiếp sau.
    this.activeCell = null;
    this.revealed = false;
    this.lastResult = null;
    this.scene = 'lobby';
  }

  resetGame(): void {
    this.status = Array(9).fill('available');
    this.backToLobby();
  }
}

export const pres = new PresentationEngine();
