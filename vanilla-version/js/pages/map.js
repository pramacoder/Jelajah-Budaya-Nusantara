/* =============================================
   Map Page
   Route: #/indonesia
   ============================================= */

import { ISLANDS, ISLAND_POSITIONS } from '../data/islands.js';
import { audio }      from '../audio.js';
import { transition } from '../transition.js';

const PIN_SVG = `<svg viewBox="0 0 24 24" width="28" height="28" fill="rgba(255,255,255,.25)" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="white" stroke="none"/></svg>`;
const PIN_ACTIVE = `<svg viewBox="0 0 24 24" width="34" height="34" fill="rgba(251,191,36,.35)" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#fbbf24" stroke="none"/></svg>`;

function navigate(href) {
  audio.unlock();
  audio.stop();
  transition.navigate(() => { window.location.hash = href; });
}

export function renderMap() {
  const app = document.getElementById('app');

  const islandIds = Object.keys(ISLANDS);

  app.innerHTML = `
    <div style="min-height:100vh;background:var(--bg);padding-top:64px;">

      <!-- Map Scroll Wrapper (horizontal scroll on mobile) -->
      <div id="map-scroll" style="width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:.5rem;">
        <div id="map-inner" style="position:relative;min-width:900px;width:100%;">

          <!-- Map Image -->
          <img id="map-img" src="assets/images/indonesia-map.png" alt="Peta Indonesia"
               style="width:100%;height:auto;display:block;" draggable="false" />

          <!-- Island Hotspots -->
          ${islandIds.map(id => {
            const pos = ISLAND_POSITIONS[id];
            return `
              <div class="island-hotspot" data-id="${id}"
                   style="position:absolute;top:${pos.top};left:${pos.left};width:${pos.width};height:${pos.height};cursor:pointer;">
                <!-- Highlight overlay -->
                <div class="hotspot-hl" style="position:absolute;inset:0;border-radius:10px;border:2px solid transparent;transition:all .25s;"></div>
                <!-- Pin -->
                <div class="hotspot-pin" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform .25s;">
                  ${PIN_SVG}
                </div>
                <!-- Popup (shown on hover) -->
                <div class="hotspot-popup" data-id="${id}" style="display:none;pointer-events:none;"></div>
              </div>`;
          }).join('')}
        </div>
      </div>

    </div>
  `;

  // --- Hotspot interactions ---
  let activeId = null;

  function buildPopup(id) {
    const isl  = ISLANDS[id];
    const side = getPopupSide(id);
    const posClass = {
      right: 'left:calc(100% + 10px);top:50%;transform:translateY(-50%)',
      left:  'right:calc(100% + 10px);top:50%;transform:translateY(-50%)',
      top:   'bottom:calc(100% + 10px);left:50%;transform:translateX(-50%)',
    }[side];

    return `
      <div style="position:absolute;${posClass};z-index:20;width:280px;
                  background:var(--bg-card);border:1px solid rgba(251,191,36,.3);
                  border-radius:14px;padding:1rem;box-shadow:0 8px 32px rgba(0,0,0,.5);
                  animation:fadeIn .2s ease both;">
        <div style="font-family:var(--font-serif);color:#fbbf24;font-size:1.05rem;margin-bottom:.3rem;">${isl.name}</div>
        <p style="color:var(--text-muted);font-size:.72rem;line-height:1.4;margin-bottom:.75rem;">${isl.tagline}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.4rem;margin-bottom:.7rem;">
          ${isl.culture.slice(0,4).map(c => `
            <div style="background:rgba(255,255,255,.06);border-radius:7px;padding:.35rem .5rem;display:flex;align-items:center;gap:.35rem;">
              <span style="font-size:.75rem;">${c.icon}</span>
              <span style="font-size:.67rem;color:rgba(147,197,253,.9);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.title}</span>
            </div>`).join('')}
        </div>
        <div style="color:rgba(251,191,36,.75);font-size:.7rem;display:flex;align-items:center;gap:.25rem;">
          Klik untuk jelajahi
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>`;
  }

  function getPopupSide(id) {
    return { sumatra:'right', jawa:'top', kalimantan:'right', bali:'top', papua:'left' }[id] || 'right';
  }

  function setActive(id) {
    if (activeId === id) return;
    clearActive();
    activeId = id;

    const el  = document.querySelector(`.island-hotspot[data-id="${id}"]`);
    if (!el) return;

    el.querySelector('.hotspot-hl').style.cssText  += ';background:rgba(251,191,36,.20);border-color:rgba(251,191,36,.60);box-shadow:0 0 18px rgba(251,191,36,.25);';
    el.querySelector('.hotspot-pin').innerHTML       = PIN_ACTIVE;
    el.querySelector('.hotspot-pin').style.transform = 'translate(-50%,-50%) scale(1.15) translateY(-4px)';

    const popup = el.querySelector('.hotspot-popup');
    popup.innerHTML   = buildPopup(id);
    popup.style.display = 'block';

    // Narrate island on hover (debounced + fade-in to prevent collisions)
    audio.playHover(`${id}_hover`);
  }

  function clearActive() {
    if (!activeId) return;
    const el = document.querySelector(`.island-hotspot[data-id="${activeId}"]`);
    if (el) {
      el.querySelector('.hotspot-hl').style.cssText         = 'position:absolute;inset:0;border-radius:10px;border:2px solid transparent;transition:all .25s;';
      el.querySelector('.hotspot-pin').innerHTML             = PIN_SVG;
      el.querySelector('.hotspot-pin').style.transform       = 'translate(-50%,-50%)';
      el.querySelector('.hotspot-popup').style.display       = 'none';
    }
    activeId = null;
    // Fade out hover audio smoothly
    audio.stopHover();
  }

  document.querySelectorAll('.island-hotspot').forEach(el => {
    const id = el.dataset.id;
    el.addEventListener('mouseenter', () => setActive(id));
    el.addEventListener('mouseleave', clearActive);
    el.addEventListener('click',      () => navigate(`#/indonesia/${id}`));
    // Touch support
    el.addEventListener('touchstart', (e) => { e.preventDefault(); setActive(id); }, { passive: false });
    el.addEventListener('touchend',   ()  => navigate(`#/indonesia/${id}`));
  });



  // Auto-play map intro audio
  audio.play('map_intro');
}
