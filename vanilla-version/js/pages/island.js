/* =============================================
   Island Detail Page
   Route: #/indonesia/:islandId
   ============================================= */

import { ISLANDS, CATEGORY_COLORS } from '../data/islands.js';
import { audio }      from '../audio.js';
import { transition } from '../transition.js';

function navigate(href) {
  audio.stop();
  transition.navigate(() => { window.location.hash = href; });
}

/* ---- Modal (tanpa bagian video — video ada di halaman pulau) ---- */
function openModal(island, culture) {
  const col = CATEGORY_COLORS[culture.color] || CATEGORY_COLORS.amber;

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'culture-modal';
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <!-- Gradient top bar -->
      <div style="height:4px;background:linear-gradient(to right,${col.border},${col.text});border-radius:20px 20px 0 0;"></div>

      <div style="padding:1.5rem;">
        <!-- Close -->
        <button class="modal-close" id="modal-close-btn" aria-label="Tutup">✕</button>

        <!-- Category badge -->
        <div style="display:inline-flex;align-items:center;gap:.5rem;
                    padding:.35rem .85rem;border-radius:999px;border:1px solid ${col.border};
                    background:${col.bg};color:${col.text};font-size:.8rem;margin-bottom:1rem;">
          <span>${culture.icon}</span>
          <span>${culture.category}</span>
        </div>

        <!-- Title -->
        <h2 id="modal-title" style="font-family:var(--font-serif);font-size:1.55rem;color:#fff;margin-bottom:.85rem;">${culture.title}</h2>

        <!-- Description -->
        <p style="color:var(--text-muted);font-size:.95rem;line-height:1.75;">${culture.description}</p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  function closeModal() {
    audio.stop();
    modal.remove();
  }
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); }, { once: true });

  // Play audio for this culture item
  audio.play(`${island.id}_${culture.id}`);
}

/* ---- Main render ---- */
export function renderIsland(islandId) {
  const island = ISLANDS[islandId];
  const app    = document.getElementById('app');

  if (!island) {
    app.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;">
        <div style="font-size:4rem;margin-bottom:1rem;">🏝️</div>
        <h1 style="font-family:var(--font-serif);font-size:2rem;margin-bottom:.75rem;">Pulau Tidak Ditemukan</h1>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;">Sepertinya kamu tersesat di lautan Nusantara!</p>
        <button onclick="window.location.hash='#/indonesia'" class="btn-primary">← Kembali ke Peta</button>
      </div>`;
    return;
  }

  app.innerHTML = `
    <div style="min-height:100vh;background:var(--bg);padding-top:64px;">

      <!-- Hero Section -->
      <div style="position:relative;height:55vh;min-height:280px;overflow:hidden;">
        <img src="${island.heroImage}" alt="${island.name}"
             style="width:100%;height:100%;object-fit:cover;" loading="eager" />
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.25) 0%,transparent 45%,var(--bg) 100%);"></div>

        <!-- Island title overlay -->
        <div class="anim-fade-up" style="position:absolute;bottom:2rem;left:0;right:0;text-align:center;padding:0 1rem;">
          <span style="display:inline-block;padding:.3rem .9rem;margin-bottom:.6rem;border-radius:999px;
                       background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.35);
                       color:#fcd34d;font-size:.85rem;">
            ${island.subtitle}
          </span>
          <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3.4rem);color:#fff;text-shadow:0 2px 16px rgba(0,0,0,.5);">
            ${island.name}
          </h1>
        </div>
      </div>

      <!-- Description -->
      <div class="anim-fade-up" style="max-width:720px;margin:0 auto;padding:2rem 1.5rem 1rem;text-align:center;">
        <p style="color:var(--text-muted);font-size:1rem;line-height:1.8;">${island.description}</p>
      </div>

      <!-- Video Section (langsung di halaman detail pulau) -->
      <div class="anim-fade-up" style="max-width:720px;margin:0 auto;padding:0 1.5rem 2.5rem;text-align:center;">
        ${(() => {
          const ytId  = island.youtubeId;
          const hasYT = ytId && !ytId.startsWith('PLACEHOLDER');
          if (!hasYT) return '';
          const ytEmbed = `https://www.youtube.com/embed/${ytId}?rel=0`;
          return `
            <button id="island-video-btn"
                    style="display:inline-flex;align-items:center;gap:.65rem;
                           padding:.75rem 2rem;border-radius:999px;
                           background:rgba(220,38,38,.18);border:1px solid rgba(239,68,68,.40);
                           color:#fca5a5;font-size:1rem;cursor:pointer;transition:all .25s;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Lihat Video ${island.name}
            </button>
            <div id="island-video-embed" style="display:none;margin-top:1.1rem;">
              <div class="yt-wrap" style="border-radius:16px;overflow:hidden;">
                <iframe src="${ytEmbed}" allowfullscreen loading="lazy"
                        allow="accelerometer;autoplay;clipboard-write;encrypted-media;picture-in-picture">
                </iframe>
              </div>
            </div>`;
        })()}
      </div>

      <!-- Culture Section -->
      <div style="max-width:1100px;margin:0 auto;padding:0 1.25rem 4rem;">
        <h2 class="anim-fade-up" style="font-family:var(--font-serif);text-align:center;color:#fff;font-size:clamp(1.4rem,3vw,2rem);margin-bottom:1.75rem;">
          Kekayaan <span style="color:#fbbf24;">Budaya</span>
        </h2>

        <!-- 8-category grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem;">
          ${island.culture.map((c, i) => {
            const col = CATEGORY_COLORS[c.color] || CATEGORY_COLORS.amber;
            return `
              <button class="culture-card anim-fade-up d-${Math.min(i+1,6)}"
                      data-culture-idx="${i}"
                      style="text-align:left;padding:1.25rem;border-radius:14px;
                             background:${col.bg};border:1px solid ${col.border};
                             color:${col.text};cursor:pointer;
                             transition:transform .2s,box-shadow .2s;width:100%;">
                <div style="font-size:1.75rem;margin-bottom:.6rem;">${c.icon}</div>
                <span style="display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;opacity:.65;margin-bottom:.3rem;">${c.category}</span>
                <h3 style="font-size:1.05rem;color:#fff;margin-bottom:.5rem;line-height:1.3;">${c.title}</h3>
                <p style="font-size:.82rem;opacity:.62;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${c.description}</p>
                <div style="margin-top:.85rem;font-size:.75rem;opacity:.5;display:flex;align-items:center;gap:.25rem;">
                  Klik untuk detail
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </button>`;
          }).join('')}
        </div>

        <!-- Back to map -->
        <div style="text-align:center;margin-top:2.5rem;">
          <button onclick="(function(){window.location.hash='#/indonesia';})()" class="btn-primary" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.75);">
            ← Kembali ke Peta
          </button>
        </div>
      </div>
    </div>
  `;

  // Card hover effect
  document.querySelectorAll('.culture-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform  = 'translateY(-5px) scale(1.02)';
      card.style.boxShadow  = '0 12px 32px rgba(0,0,0,.35)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '';
    });
    card.addEventListener('click', () => {
      const idx     = parseInt(card.dataset.cultureIdx);
      const culture = island.culture[idx];
      openModal(island, culture);
    });
  });

  // Wire up island video toggle button
  const vidBtn  = document.getElementById('island-video-btn');
  const vidWrap = document.getElementById('island-video-embed');
  if (vidBtn && vidWrap) {
    vidBtn.addEventListener('click', () => {
      const isOpen = vidWrap.style.display !== 'none';
      vidWrap.style.display = isOpen ? 'none' : 'block';
      vidBtn.innerHTML = isOpen
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Lihat Video ${island.name}`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Tutup Video`;
    });
    vidBtn.addEventListener('mouseenter', () => { vidBtn.style.background = 'rgba(220,38,38,.32)'; });
    vidBtn.addEventListener('mouseleave', () => { vidBtn.style.background = 'rgba(220,38,38,.18)'; });
  }

  // Auto-play island intro audio
  audio.play(`${islandId}_intro`);
}
