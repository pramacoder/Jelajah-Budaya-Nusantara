export const AUDIO_PATHS = {
  CORRECT: '/audio/sinyal/correct.mp3',
  INCORRECT: '/audio/sinyal/Incorrect.mp3',
  STREAK5: '/audio/sinyal/correctstreak5.mp3',
  ABOVE_90: '/audio/sinyal/diatas90.mp3',
  BELOW_90: '/audio/sinyal/dibawah90.mp3'
};

export const playSound = (path: string) => {
  try {
    const audio = new Audio(path);
    audio.play().catch(e => console.warn('Audio play prevented by browser:', e));
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
};
