/* =============================================
   Cloud Transition Controller
   Mirrors the React CloudTransition component
   using CSS classes + inline style variables.
   ============================================= */

const CLOUD_LAYERS = [
  // ── TOP SECTION (flipped vertically) ──────────────
  { side:'left',  top:'-45%', width:'130vw', opacity:1,    rotate:0,   flipX:false, flipY:true,  delay:0,    zIndex:8, overlap:'35%' },
  { side:'right', top:'-45%', width:'130vw', opacity:1,    rotate:0,   flipX:true,  flipY:true,  delay:0,    zIndex:8, overlap:'35%' },
  { side:'left',  top:'-35%', width:'120vw', opacity:.95,  rotate:2,   flipX:true,  flipY:true,  delay:.02,  zIndex:7, overlap:'30%' },
  { side:'right', top:'-35%', width:'120vw', opacity:.95,  rotate:-2,  flipX:false, flipY:true,  delay:.02,  zIndex:7, overlap:'30%' },
  // ── LEFT GROUP ────────────────────────────────────
  { side:'left',  top:'10%',  width:'120vw', opacity:1,    rotate:0,   flipX:false, flipY:false, delay:0,    zIndex:5, overlap:'25%' },
  { side:'left',  top:'25%',  width:'115vw', opacity:.95,  rotate:2,   flipX:true,  flipY:false, delay:.03,  zIndex:4, overlap:'22%' },
  { side:'left',  top:'42%',  width:'118vw', opacity:1,    rotate:-2,  flipX:false, flipY:false, delay:.04,  zIndex:3, overlap:'24%' },
  { side:'left',  top:'58%',  width:'115vw', opacity:.95,  rotate:3,   flipX:true,  flipY:false, delay:.05,  zIndex:3, overlap:'22%' },
  { side:'left',  top:'75%',  width:'120vw', opacity:1,    rotate:-1,  flipX:false, flipY:false, delay:.02,  zIndex:2, overlap:'25%' },
  // ── RIGHT GROUP ───────────────────────────────────
  { side:'right', top:'12%',  width:'120vw', opacity:1,    rotate:0,   flipX:true,  flipY:false, delay:0,    zIndex:5, overlap:'25%' },
  { side:'right', top:'28%',  width:'115vw', opacity:.95,  rotate:-3,  flipX:false, flipY:false, delay:.03,  zIndex:4, overlap:'22%' },
  { side:'right', top:'45%',  width:'118vw', opacity:1,    rotate:2,   flipX:true,  flipY:false, delay:.04,  zIndex:3, overlap:'24%' },
  { side:'right', top:'62%',  width:'115vw', opacity:.95,  rotate:-2,  flipX:false, flipY:false, delay:.05,  zIndex:3, overlap:'22%' },
  { side:'right', top:'78%',  width:'120vw', opacity:1,    rotate:2,   flipX:true,  flipY:false, delay:.02,  zIndex:2, overlap:'25%' },
  // ── BOTTOM SEAL ───────────────────────────────────
  { side:'left',  top:'88%',  width:'125vw', opacity:1,    rotate:0,   flipX:false, flipY:false, delay:.01,  zIndex:6, overlap:'30%' },
  { side:'right', top:'88%',  width:'125vw', opacity:1,    rotate:0,   flipX:true,  flipY:false, delay:.01,  zIndex:6, overlap:'30%' },
  // ── CENTER FILL ───────────────────────────────────
  { side:'left',  top:'20%',  width:'90vw',  opacity:.9,   rotate:4,   flipX:false, flipY:false, delay:.07,  zIndex:7, overlap:'40%' },
  { side:'right', top:'35%',  width:'90vw',  opacity:.9,   rotate:-4,  flipX:true,  flipY:false, delay:.07,  zIndex:7, overlap:'40%' },
  { side:'left',  top:'52%',  width:'85vw',  opacity:.85,  rotate:-3,  flipX:true,  flipY:false, delay:.09,  zIndex:7, overlap:'38%' },
  { side:'right', top:'68%',  width:'88vw',  opacity:.85,  rotate:3,   flipX:false, flipY:false, delay:.09,  zIndex:7, overlap:'38%' },
  // ── TOP CENTER FILL ───────────────────────────────
  { side:'left',  top:'-25%', width:'95vw',  opacity:.9,   rotate:-3,  flipX:true,  flipY:true,  delay:.06,  zIndex:9, overlap:'42%' },
  { side:'right', top:'-25%', width:'95vw',  opacity:.9,   rotate:3,   flipX:false, flipY:true,  delay:.06,  zIndex:9, overlap:'42%' },
];

const CLOUD_IMGS = [
  'assets/images/cloud1.png',
  'assets/images/cloud2.png',
];

class CloudTransition {
  constructor() {
    this.overlay = document.getElementById('cloud-overlay');
    this._busy   = false;
    this._built  = false;
  }

  _build() {
    if (this._built) return;
    this._built = true;

    let html = '<div class="cloud-backdrop"></div>';
    CLOUD_LAYERS.forEach((c, i) => {
      const img     = CLOUD_IMGS[i % 2];
      const scaleX  = c.flipX ? -1 : 1;
      const scaleY  = c.flipY ? -1 : 1;
      const imgTf   = `rotate(${c.rotate}deg) scale(${scaleX},${scaleY})`;
      const posStyle = c.side === 'left'
        ? `right:${c.overlap};`
        : `left:${c.overlap};`;

      html += `
        <div class="cloud-layer cloud-${c.side}"
             style="--dur:0.8s;--delay:${c.delay}s;top:${c.top};width:${c.width};z-index:${c.zIndex};position:absolute;${posStyle}">
          <img src="${img}" alt="" draggable="false"
               style="width:100%;height:auto;transform:${imgTf};opacity:${c.opacity};user-select:none;" />
        </div>`;
    });
    this.overlay.innerHTML = html;
  }

  /**
   * Wraps a navigation callback with the cloud transition:
   * clouds close → callback() → clouds open
   */
  navigate(callback) {
    if (this._busy) return;
    this._busy = true;
    this._build();

    // Phase 1: close
    this.overlay.className = 'phase-closing';

    setTimeout(() => {
      callback();                         // render new page behind clouds
      setTimeout(() => {
        // Phase 2: open
        this.overlay.className = 'phase-opening';
        setTimeout(() => {
          this.overlay.className = '';
          this._busy = false;
        }, 1050);
      }, 120);
    }, 950);
  }
}

export const transition = new CloudTransition();
