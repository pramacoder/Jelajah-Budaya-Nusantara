/* =============================================
   Navbar Component
   ============================================= */

import { transition } from './transition.js';
import { audio } from './audio.js';

const SVG_BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const SVG_MAP  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`;
const SVG_HOME = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

function navigate(href) {
  audio.unlock();
  audio.stop();
  transition.navigate(() => {
    window.location.hash = href;
  });
}

export function showNavbar() {
  const nav = document.getElementById('site-navbar');
  nav.classList.remove('hidden');
  nav.innerHTML = `
    <button class="nav-back-btn" id="nav-back" title="Kembali" aria-label="Kembali">
      ${SVG_BACK}<span class="nav-back-label">Kembali</span>
    </button>
    <span class="nav-logo">Nusantara</span>
    <div class="nav-actions">
      <button class="nav-icon-btn" id="nav-map"  title="Peta Indonesia" aria-label="Peta Indonesia">${SVG_MAP}</button>
      <button class="nav-icon-btn" id="nav-home" title="Beranda"        aria-label="Beranda">${SVG_HOME}</button>
    </div>
  `;

  document.getElementById('nav-back').addEventListener('click', () => {
    if (window.history.length > 1) {
      audio.stop();
      transition.navigate(() => window.history.back());
    } else {
      navigate('#/');
    }
  });
  document.getElementById('nav-map').addEventListener('click',  () => navigate('#/indonesia'));
  document.getElementById('nav-home').addEventListener('click', () => navigate('#/'));
}

export function hideNavbar() {
  const nav = document.getElementById('site-navbar');
  nav.classList.add('hidden');
  nav.innerHTML = '';
}
