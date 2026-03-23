/* =============================================
   Home Page
   Route: #/
   ============================================= */

import { audio } from '../audio.js';
import { transition } from '../transition.js';

function navigate(href) {
  audio.stop();
  transition.navigate(() => { window.location.hash = href; });
}

export function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="home-page" style="min-height:100vh;position:relative;overflow:hidden;">

      <!-- Background Earth -->
      <div style="position:absolute;inset:0;z-index:0;">
        <img src="assets/images/earth.png" alt="Bumi dilihat dari luar angkasa"
             style="width:100%;height:100%;object-fit:cover;" loading="eager" />
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.60) 0%,rgba(0,0,0,.38) 50%,rgba(0,0,0,.72) 100%);"></div>
      </div>

      <!-- Content -->
      <div style="position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;">

        <!-- Globe icon -->
        <div class="anim-scale-in" style="margin-bottom:1.25rem;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>

        <!-- Heading -->
        <h1 class="anim-fade-up d-1" style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3.6rem);color:#fff;margin-bottom:.6rem;max-width:700px;line-height:1.18;">
          Jelajahi Keanekaragaman<br>
          <span style="color:#fbbf24;">Budaya Indonesia</span>
        </h1>

        <!-- Subtitle -->
        <p class="anim-fade-up d-2" style="color:rgba(255,255,255,.78);font-size:clamp(.9rem,2vw,1.15rem);max-width:520px;margin-bottom:1.5rem;line-height:1.7;">
          Temukan keajaiban dari Sabang sampai Merauke. Jelajahi tarian, kuliner, pakaian adat, dan musik tradisional dari setiap pulau di Nusantara.
        </p>

        <!-- Audio Enable Banner -->
        <button id="audio-enable-btn" class="audio-welcome-banner anim-fade-up d-3" style="margin-bottom:1.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <span>🎙️ Klik untuk mengaktifkan Audio Narasi</span>
          <div class="sound-bars">
            <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
          </div>
        </button>

        <!-- CTA Button -->
        <button id="start-btn" class="btn-primary anim-fade-up d-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>
          Mulai Perjalanan
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <!-- Feature Cards -->
        <div class="anim-fade-up d-5"
             style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;max-width:680px;width:100%;margin-top:3.5rem;">
          ${[
            { icon:'🏝️', label:'5 Pulau Utama',  desc:'Jelajahi budaya unik' },
            { icon:'💃',  label:'40+ Budaya',    desc:'8 kategori per pulau'  },
            { icon:'🎵',  label:'Audio Panduan', desc:'Narasi interaktif'     },
          ].map(f => `
            <div class="glass" style="padding:1.1rem;text-align:center;">
              <div style="font-size:1.8rem;margin-bottom:.5rem;">${f.icon}</div>
              <div style="font-weight:600;color:#fff;font-size:.95rem;">${f.label}</div>
              <div style="color:rgba(255,255,255,.55);font-size:.8rem;margin-top:.2rem;">${f.desc}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>
  `;

  // Audio enable button — unlocks audio and plays welcome
  document.getElementById('audio-enable-btn').addEventListener('click', () => {
    audio.unlock();
    audio.play('welcome');
    // Change button to show "Audio Aktif"
    const btn = document.getElementById('audio-enable-btn');
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
      <span>🔊 Audio Narasi Aktif!</span>
      <div class="sound-bars">
        <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
      </div>`;
    btn.style.borderColor = 'rgba(251,191,36,.6)';
    btn.style.background = 'rgba(251,191,36,.2)';
  });

  // CTA event — also unlocks audio
  document.getElementById('start-btn').addEventListener('click', () => {
    audio.unlock();
    navigate('#/indonesia');
  });

  // Attempt to auto-play welcome audio (will be deferred if autoplay blocked)
  audio.play('welcome');
}
