/* =============================================
   Audio Manager
   Plays MP3 files from the /audio/ folder.
   If a file is missing, it silently skips.
   ============================================= */

class AudioManager {
  constructor() {
    this._current = null;   // currently playing Audio object
    this._queue   = [];     // pending file to play after current stops
    this._muted   = false;
  }

  /** Play an audio file by name (without extension) */
  play(filename) {
    if (this._muted) return;
    this.stop();
    const audio = new Audio(`audio/${filename}.mp3`);
    audio.volume = 0.85;
    this._current = audio;
    audio.play().catch(() => {
      /* File not found or browser blocked autoplay — silently skip */
    });
    audio.addEventListener('ended', () => {
      this._current = null;
      if (this._queue.length) {
        this.play(this._queue.shift());
      }
    });
  }

  /** Stop currently playing audio */
  stop() {
    if (this._current) {
      this._current.pause();
      this._current.currentTime = 0;
      this._current = null;
    }
  }

  /** Queue a file — plays after current audio ends */
  queue(filename) {
    if (this._current) {
      this._queue = [filename]; // replace queue (only 1 queued)
    } else {
      this.play(filename);
    }
  }

  /** Toggle mute */
  toggleMute() {
    this._muted = !this._muted;
    if (this._muted) this.stop();
    return this._muted;
  }

  get isMuted() { return this._muted; }
}

export const audio = new AudioManager();
