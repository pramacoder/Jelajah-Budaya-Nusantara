/* =============================================
   Hash-Based Router
   Routes: #/ | #/indonesia | #/indonesia/:id
   Uses dynamic import() for lazy-loading pages.
   ============================================= */

import { showNavbar, hideNavbar } from './navbar.js';
import { audio } from './audio.js';

/* ---- Page loader cache so modules aren't re-fetched ---- */
const moduleCache = {};
async function getModule(path) {
  if (!moduleCache[path]) {
    moduleCache[path] = await import(path);
  }
  return moduleCache[path];
}

/* ---- Show loading spinner ---- */
function showLoader() {
  document.getElementById('app').innerHTML = `
    <div class="page-loader"><div class="loader-ring"></div></div>`;
}

/* ---- Scroll to top on navigation ---- */
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ---- Parse current hash ---- */
function parseHash() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '') || '/';
  const parts = path.split('/').filter(Boolean); // ['indonesia', 'bali']
  return { path, parts };
}

/* ---- Main route dispatcher ---- */
async function route() {
  scrollTop();
  showLoader();

  const { parts } = parseHash();

  // #/  → Home
  if (parts.length === 0) {
    hideNavbar();
    audio.stop();
    const { renderHome } = await getModule('./pages/home.js');
    renderHome();

    // Prefetch map & island module in background
    setTimeout(() => {
      getModule('./pages/map.js');
      getModule('./pages/island.js');
    }, 600);
    return;
  }

  // #/indonesia
  if (parts[0] === 'indonesia' && parts.length === 1) {
    showNavbar();
    const { renderMap } = await getModule('./pages/map.js');
    renderMap();

    // Prefetch island module
    setTimeout(() => getModule('./pages/island.js'), 400);
    return;
  }

  // #/indonesia/:islandId
  if (parts[0] === 'indonesia' && parts[1]) {
    showNavbar();
    const { renderIsland } = await getModule('./pages/island.js');
    renderIsland(parts[1]);
    return;
  }

  // 404 fallback
  hideNavbar();
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;">
      <div style="font-size:4rem;margin-bottom:1rem;">🏝️</div>
      <h1 style="font-family:var(--font-serif);font-size:2rem;margin-bottom:.75rem;">Halaman Tidak Ditemukan</h1>
      <p style="color:var(--text-muted);margin-bottom:1.5rem;">Sepertinya kamu tersesat di lautan Nusantara!</p>
      <button onclick="window.location.hash='#/'" class="btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        Kembali ke Beranda
      </button>
    </div>`;
}

/* ---- Init router ---- */
export function initRouter() {
  window.addEventListener('hashchange', route);
  route(); // render current hash on load
}
