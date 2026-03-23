/* =============================================
   Audio Manager
   Plays MP3 files from the /audio/ folder.
   If a file is missing, it silently skips.
   Handles browser autoplay policy gracefully.
   ============================================= */

class AudioManager {
  constructor() {
    this._current = null;   // currently playing Audio object
    this._queue   = [];     // pending file to play after current stops
    this._muted   = false;
    this._pending = null;   // audio file pending user interaction (autoplay blocked)
    this._unlocked = false; // whether user has interacted (autoplay unlocked)
    this._onStateChange = []; // callbacks when play/stop/mute state changes
    this._hoverTimer = null;  // debounce timer for hover audio
    this._isHoverAudio = false; // whether current audio is a hover clip
  }

  /** Register a callback for state changes */
  onStateChange(fn) {
    this._onStateChange.push(fn);
  }

  _notifyStateChange() {
    const state = { playing: !!this._current, muted: this._muted };
    this._onStateChange.forEach(fn => fn(state));
  }

  /** Try to unlock audio context on first user interaction */
  unlock() {
    if (this._unlocked) return;
    this._unlocked = true;
    // If there's a pending audio from autoplay block, play it now
    if (this._pending) {
      const file = this._pending;
      this._pending = null;
      this.play(file);
    }
  }

  /** Play an audio file by name (without extension) */
  play(filename) {
    if (this._muted) return;

    // If not unlocked yet, save as pending
    if (!this._unlocked) {
      this._pending = filename;
      return;
    }

    this.stop();
    const audio = new Audio(`audio/${filename}.mp3`);
    audio.volume = 0.85;
    this._current = audio;
    this._notifyStateChange();

    audio.play().catch(() => {
      /* File not found or browser blocked autoplay — save as pending */
      this._current = null;
      this._pending = filename;
      this._notifyStateChange();
    });

    audio.addEventListener('ended', () => {
      this._current = null;
      this._notifyStateChange();
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
      this._notifyStateChange();
    }
    this._pending = null;
    this._cancelHover();
  }

  /** Fade out current audio over `ms` milliseconds, then stop */
  fadeOut(ms = 300) {
    if (!this._current) return Promise.resolve();
    const audio = this._current;
    const startVol = audio.volume;
    const steps = 15;
    const interval = ms / steps;
    const decrement = startVol / steps;

    return new Promise(resolve => {
      const fade = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - decrement);
        if (audio.volume <= 0.01) {
          clearInterval(fade);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = startVol; // reset for reuse
          if (this._current === audio) {
            this._current = null;
            this._notifyStateChange();
          }
          resolve();
        }
      }, interval);
    });
  }

  /**
   * Play hover audio with debounce to prevent collisions.
   * Waits `delay` ms before playing. If a new hover comes in
   * during that window, the previous one is cancelled.
   * When leaving an island, fadeOut is used for a smooth stop.
   */
  playHover(filename, delay = 250) {
    // Cancel any pending hover
    this._cancelHover();

    this._hoverTimer = setTimeout(() => {
      this._hoverTimer = null;
      // Fade out any currently playing hover audio
      if (this._current && this._isHoverAudio) {
        this.fadeOut(200).then(() => {
          this._playHoverFile(filename);
        });
      } else if (this._current) {
        // Non-hover audio playing (e.g. map_intro) — fade then play hover
        this.fadeOut(200).then(() => {
          this._playHoverFile(filename);
        });
      } else {
        this._playHoverFile(filename);
      }
    }, delay);
  }

  /** Internal: actually play the hover file */
  _playHoverFile(filename) {
    if (this._muted || !this._unlocked) {
      if (!this._unlocked) this._pending = filename;
      return;
    }
    const audio = new Audio(`audio/${filename}.mp3`);
    audio.volume = 0;
    this._current = audio;
    this._isHoverAudio = true;
    this._notifyStateChange();

    audio.play().catch(() => {
      this._current = null;
      this._isHoverAudio = false;
      this._notifyStateChange();
    });

    // Fade in
    const targetVol = 0.85;
    const steps = 10;
    const interval = 150 / steps;
    const increment = targetVol / steps;
    const fadeIn = setInterval(() => {
      if (audio.volume < targetVol - 0.01) {
        audio.volume = Math.min(targetVol, audio.volume + increment);
      } else {
        audio.volume = targetVol;
        clearInterval(fadeIn);
      }
    }, interval);

    audio.addEventListener('ended', () => {
      this._current = null;
      this._isHoverAudio = false;
      this._notifyStateChange();
      if (this._queue.length) {
        this.play(this._queue.shift());
      }
    });
  }

  /** Stop hover audio with fade */
  stopHover() {
    this._cancelHover();
    if (this._current && this._isHoverAudio) {
      this.fadeOut(250).then(() => {
        this._isHoverAudio = false;
      });
    }
  }

  /** Cancel pending hover timer */
  _cancelHover() {
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
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
    this._notifyStateChange();
    return this._muted;
  }

  get isMuted()   { return this._muted; }
  get isPlaying() { return !!this._current; }
}

export const audio = new AudioManager();

/* ---- Floating Audio Control Button ---- */
export function createAudioControl() {
  // Remove existing if any
  const existing = document.getElementById('audio-fab');
  if (existing) existing.remove();

  const btn = document.createElement('button');
  btn.id = 'audio-fab';
  btn.className = 'audio-fab';
  btn.setAttribute('aria-label', 'Kontrol Audio');
  btn.title = 'Aktifkan/Matikan Audio Narasi';
  
  function updateIcon() {
    const muted = audio.isMuted;
    const playing = audio.isPlaying;
    
    if (muted) {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>`;
      btn.classList.remove('playing');
      btn.classList.add('muted');
    } else {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>`;
      btn.classList.remove('muted');
      if (playing) {
        btn.classList.add('playing');
      } else {
        btn.classList.remove('playing');
      }
    }
  }

  updateIcon();

  // Listen for state changes
  audio.onStateChange(updateIcon);

  btn.addEventListener('click', () => {
    audio.unlock(); // ensure unlocked
    audio.toggleMute();
    updateIcon();
  });

  document.body.appendChild(btn);
  return btn;
}

/* ---- Global unlock listener: unlock audio on first user click/touch ---- */
function globalUnlock() {
  audio.unlock();
  document.removeEventListener('click', globalUnlock);
  document.removeEventListener('touchstart', globalUnlock);
  document.removeEventListener('keydown', globalUnlock);
}
document.addEventListener('click', globalUnlock);
document.addEventListener('touchstart', globalUnlock);
document.addEventListener('keydown', globalUnlock);
