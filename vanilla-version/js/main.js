/* =============================================
   Main Entry Point
   ============================================= */

import { initRouter } from './router.js';
import { createAudioControl } from './audio.js';

// Start the app
initRouter();

// Create floating audio control button
createAudioControl();
