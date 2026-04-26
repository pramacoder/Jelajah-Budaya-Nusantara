// Path ke semua file audio yang tersedia
export const AUDIO_PATHS = {
  // === Sinyal Jawaban (Quiz Solo) ===
  CORRECT:   '/audio/sinyal/correct.mp3',
  INCORRECT: '/audio/sinyal/Incorrect.mp3',
  STREAK5:   '/audio/sinyal/correctstreak5.mp3',
  ABOVE_90:  '/audio/sinyal/diatas90.mp3',
  BELOW_90:  '/audio/sinyal/dibawah90.mp3',

  // === Classroom Mode ===
  // Gunakan sinyal yang sama untuk classroom feedback
  CLASSROOM_CORRECT:   '/audio/sinyal/correct.mp3',
  CLASSROOM_INCORRECT: '/audio/sinyal/Incorrect.mp3',
  CLASSROOM_STREAK:    '/audio/sinyal/correctstreak5.mp3',
  CLASSROOM_FINISH:    '/audio/sinyal/diatas90.mp3',   // fanfare untuk podium
};

// ─── One-shot Sound Effect ────────────────────────────────────────────────────
export const playSound = (path: string, volume = 1.0) => {
  try {
    const audio = new Audio(path);
    audio.volume = volume;
    audio.play().catch(e => console.warn('Audio play prevented:', e));
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
};

// ─── BGM Manager (looping background music) ──────────────────────────────────
let bgmInstance: HTMLAudioElement | null = null;

export const playBGM = (path: string, volume = 0.25) => {
  stopBGM();
  try {
    bgmInstance = new Audio(path);
    bgmInstance.loop = true;
    bgmInstance.volume = volume;
    bgmInstance.play().catch(e => console.warn('BGM play prevented:', e));
  } catch (error) {
    console.warn('BGM error:', error);
  }
};

export const stopBGM = () => {
  if (bgmInstance) {
    bgmInstance.pause();
    bgmInstance.currentTime = 0;
    bgmInstance = null;
  }
};

export const setBGMVolume = (volume: number) => {
  if (bgmInstance) bgmInstance.volume = Math.max(0, Math.min(1, volume));
};
