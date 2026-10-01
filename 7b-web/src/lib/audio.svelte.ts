// Nhạc chờ Đại hội (global) + SFX synth.
// V10: Q6 cũ (âm nhạc) đã loại bỏ hoàn toàn — không còn clip nào khác.
// File nhạc: public/audio/nhac-cho-dai-hoi.mp3.

const WAITING_SRC = 'audio/nhac-cho-dai-hoi.mp3';

class AudioEngine {
  muted = $state(false);
  playing = $state(false);
  hasTrack = $state(true);
  private el: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private unlocked = false;

  private ensure(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.el) {
      const a = new Audio(WAITING_SRC);
      a.loop = true;
      a.preload = 'auto';
      a.addEventListener('playing', () => (this.playing = true));
      a.addEventListener('pause', () => (this.playing = false));
      a.addEventListener('error', () => (this.hasTrack = false));
      this.el = a;
    }
    return this.el;
  }

  // Gọi ở gesture đầu tiên (click/phím) — autoplay policy của browser.
  unlock(): void {
    if (this.unlocked) return;
    this.unlocked = true;
    if (!this.muted) void this.play();
  }

  async play(): Promise<void> {
    const a = this.ensure();
    if (!a) return;
    try {
      await a.play();
    } catch {
      // browser chặn autoplay — chờ gesture tiếp theo (unlock đã gắn).
    }
  }

  pause(): void {
    this.el?.pause();
  }

  toggleMute(): void {
    this.muted = !this.muted;
    const a = this.ensure();
    if (!a) return;
    if (this.muted) a.pause();
    else void this.play();
  }

  // ---- SFX synth nhẹ (WebAudio, không file) ----
  private tone(freq: number, delay: number, dur: number, type: OscillatorType = 'sine'): void {
    try {
      if (typeof window === 'undefined') return;
      this.ctx ??= new AudioContext();
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.05);
    } catch {
      // bỏ qua khi AudioContext unavailable
    }
  }

  click(): void {
    this.tone(660, 0, 0.08, 'triangle');
  }
  tick(): void {
    if (this.muted) return;
    this.tone(880, 0, 0.05, 'square');
  }
  correct(): void {
    this.tone(523, 0, 0.12);
    this.tone(784, 0.1, 0.18);
  }
  wrong(): void {
    this.tone(196, 0, 0.22, 'sawtooth');
  }
  fanfare(): void {
    [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.11, 0.16, 'triangle'));
  }
}

export const audio = new AudioEngine();
