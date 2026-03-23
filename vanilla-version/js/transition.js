/* =============================================
   Cloud Transition Controller
   Uses Web Animations API (element.animate) — 100% vanilla JS.
   No external libraries. Works in all modern browsers.

   Layer grouping for parallax effect:
     Group A (idx 0–3)   : top-section flipped layers  — fastest (680ms)
     Group B (idx 4–13)  : left/right main groups      — medium  (800ms)
     Group C (idx 14–21) : center fill + seal layers   — slowest (930ms)

   Phase timing:
     CLOSING : ~920ms  (clouds slide in, backdrop fades in at 300ms)
     gap      : 80ms   (new page renders behind closed clouds)
     OPENING  : ~920ms (backdrop fades out, clouds slide out staggered)
   ============================================= */

const CLOUD_LAYERS = [
  // ── GROUP A: TOP SECTION (flipped) ─── fastest
  { side:'left',  top:'-45%', width:'140vw', opacity:1,    rotate:0,   flipX:false, flipY:true,  delay:0,    zIndex:8, overlap:'45%' },
  { side:'right', top:'-45%', width:'140vw', opacity:1,    rotate:0,   flipX:true,  flipY:true,  delay:0,    zIndex:8, overlap:'45%' },
  { side:'left',  top:'-35%', width:'130vw', opacity:1,    rotate:2,   flipX:true,  flipY:true,  delay:.02,  zIndex:7, overlap:'40%' },
  { side:'right', top:'-35%', width:'130vw', opacity:1,    rotate:-2,  flipX:false, flipY:true,  delay:.02,  zIndex:7, overlap:'40%' },

  // ── GROUP B: LEFT/RIGHT MAIN GROUPS ─── medium speed
  { side:'left',  top:'5%',   width:'130vw', opacity:1,    rotate:0,   flipX:false, flipY:false, delay:0,    zIndex:5, overlap:'35%' },
  { side:'left',  top:'20%',  width:'125vw', opacity:1,    rotate:2,   flipX:true,  flipY:false, delay:.03,  zIndex:4, overlap:'32%' },
  { side:'left',  top:'37%',  width:'128vw', opacity:1,    rotate:-2,  flipX:false, flipY:false, delay:.04,  zIndex:3, overlap:'34%' },
  { side:'left',  top:'54%',  width:'125vw', opacity:1,    rotate:3,   flipX:true,  flipY:false, delay:.05,  zIndex:3, overlap:'32%' },
  { side:'left',  top:'72%',  width:'130vw', opacity:1,    rotate:-1,  flipX:false, flipY:false, delay:.02,  zIndex:2, overlap:'35%' },
  { side:'right', top:'7%',   width:'130vw', opacity:1,    rotate:0,   flipX:true,  flipY:false, delay:0,    zIndex:5, overlap:'35%' },
  { side:'right', top:'22%',  width:'125vw', opacity:1,    rotate:-3,  flipX:false, flipY:false, delay:.03,  zIndex:4, overlap:'32%' },
  { side:'right', top:'40%',  width:'128vw', opacity:1,    rotate:2,   flipX:true,  flipY:false, delay:.04,  zIndex:3, overlap:'34%' },
  { side:'right', top:'57%',  width:'125vw', opacity:1,    rotate:-2,  flipX:false, flipY:false, delay:.05,  zIndex:3, overlap:'32%' },
  { side:'right', top:'75%',  width:'130vw', opacity:1,    rotate:2,   flipX:true,  flipY:false, delay:.02,  zIndex:2, overlap:'35%' },

  // ── GROUP C: BOTTOM SEAL ─── slowest
  { side:'left',  top:'85%',  width:'140vw', opacity:1,    rotate:0,   flipX:false, flipY:false, delay:.01,  zIndex:6, overlap:'45%' },
  { side:'right', top:'85%',  width:'140vw', opacity:1,    rotate:0,   flipX:true,  flipY:false, delay:.01,  zIndex:6, overlap:'45%' },
  // ── GROUP C: CENTER FILL (close all gaps)
  { side:'left',  top:'15%',  width:'110vw', opacity:1,    rotate:4,   flipX:false, flipY:false, delay:.06,  zIndex:7, overlap:'55%' },
  { side:'right', top:'30%',  width:'110vw', opacity:1,    rotate:-4,  flipX:true,  flipY:false, delay:.06,  zIndex:7, overlap:'55%' },
  { side:'left',  top:'45%',  width:'105vw', opacity:1,    rotate:-3,  flipX:true,  flipY:false, delay:.08,  zIndex:7, overlap:'52%' },
  { side:'right', top:'60%',  width:'108vw', opacity:1,    rotate:3,   flipX:false, flipY:false, delay:.08,  zIndex:7, overlap:'52%' },
  // ── GROUP C: TOP CENTER FILL (seal the top corners)
  { side:'left',  top:'-30%', width:'115vw', opacity:1,    rotate:-3,  flipX:true,  flipY:true,  delay:.05,  zIndex:9, overlap:'55%' },
  { side:'right', top:'-30%', width:'115vw', opacity:1,    rotate:3,   flipX:false, flipY:true,  delay:.05,  zIndex:9, overlap:'55%' },
  // ── EXTRA: Additional center coverage
  { side:'left',  top:'0%',   width:'100vw', opacity:1,    rotate:1,   flipX:false, flipY:false, delay:.07,  zIndex:8, overlap:'50%' },
  { side:'right', top:'0%',   width:'100vw', opacity:1,    rotate:-1,  flipX:true,  flipY:false, delay:.07,  zIndex:8, overlap:'50%' },
];

const CLOUD_IMGS = [
  'assets/images/cloud1.png',
  'assets/images/cloud2.png',
];

/* ---- Easing per group (parallax feel) ---- */
function getEasing(idx) {
  if (idx < 4)  return 'cubic-bezier(0.4, 0, 0.6, 1)';  // Group A: snap in fast
  if (idx < 14) return 'cubic-bezier(0.4, 0, 0.2, 1)';  // Group B: smooth material easing
  return          'cubic-bezier(0.2, 0, 0.2, 1)';        // Group C: slow, dramatic
}

/* ---- Duration per group (parallax: outer faster, inner slower) ---- */
function getDuration(idx) {
  if (idx < 4)  return 680;  // Group A: fastest  (top layers)
  if (idx < 14) return 800;  // Group B: medium   (main flanks)
  return          930;        // Group C: slowest  (center fill)
}

/* ---- Helper: Promise-based delay ---- */
const wait = ms => new Promise(r => setTimeout(r, ms));

class CloudTransition {
  constructor() {
    this.overlay  = document.getElementById('cloud-overlay');
    this._busy    = false;
    this._built   = false;
    this._layers  = [];   // DOM refs to .cloud-layer elements
    this._backdrop = null;
  }

  /* Build cloud DOM once */
  _build() {
    if (this._built) return;
    this._built = true;

    /* Backdrop */
    const backdrop = document.createElement('div');
    backdrop.className = 'cloud-backdrop';
    this.overlay.appendChild(backdrop);
    this._backdrop = backdrop;

    /* Cloud layers */
    CLOUD_LAYERS.forEach((c, i) => {
      const img    = CLOUD_IMGS[i % 2];
      const scaleX = c.flipX ? -1 : 1;
      const scaleY = c.flipY ? -1 : 1;
      const imgTf  = `rotate(${c.rotate}deg) scale(${scaleX},${scaleY})`;
      const posStyle = c.side === 'left'
        ? `right:${c.overlap};`
        : `left:${c.overlap};`;

      const div = document.createElement('div');
      div.className = `cloud-layer cloud-${c.side}`;
      div.style.cssText = `top:${c.top};width:${c.width};z-index:${c.zIndex};${posStyle}`;
      div.innerHTML = `<img src="${img}" alt="" draggable="false"
        style="width:100%;height:auto;transform:${imgTf};opacity:${c.opacity};user-select:none;" />`;
      this.overlay.appendChild(div);
      this._layers.push({ el: div, side: c.side, delay: c.delay });
    });
  }

  /* Reset all layers to off-screen starting position */
  _resetLayers() {
    this._layers.forEach(({ el, side }) => {
      el.style.transform = side === 'left' ? 'translateX(-110%)' : 'translateX(110%)';
    });
    this._backdrop.style.opacity = '0';
  }

  /* ---- CLOSING phase: slide clouds IN ---- */
  _animateClose() {
    const animations = this._layers.map(({ el, side }, idx) => {
      const from  = side === 'left' ? 'translateX(-110%)' : 'translateX(110%)';
      const delay = this._layers[idx].delay * 1000; // convert to ms

      return el.animate(
        [
          { transform: from,               offset: 0 },
          { transform: 'translateX(0)',    offset: 1 },
        ],
        {
          duration:   getDuration(idx),
          delay:      delay,
          easing:     getEasing(idx),
          fill:       'forwards',
        }
      );
    });

    /* Backdrop fades in quickly — covers screen immediately to hide any cloud gaps */
    const backdropAnim = this._backdrop.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 200, delay: 100, easing: 'ease-in', fill: 'forwards' }
    );

    return Promise.all([
      ...animations.map(a => a.finished),
      backdropAnim.finished,
    ]);
  }

  /* ---- OPENING phase: slide clouds OUT ---- */
  _animateOpen() {
    /* Backdrop fades out immediately */
    this._backdrop.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 350, easing: 'ease-out', fill: 'forwards' }
    );

    /* Clouds slide out — center layers leave first (reverse stagger) */
    const total = this._layers.length;
    const animations = this._layers.map(({ el, side }, idx) => {
      // Reverse: layers with higher index get smaller delay → exit sooner
      const reverseDelay = (total - 1 - idx) * 10; // ms per step
      const to = side === 'left' ? 'translateX(-110%)' : 'translateX(110%)';

      return el.animate(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: to,              offset: 1 },
        ],
        {
          duration:   getDuration(idx),
          delay:      reverseDelay,
          easing:     getEasing(idx),
          fill:       'forwards',
        }
      );
    });

    return Promise.all(animations.map(a => a.finished));
  }

  /**
   * Trigger full cloud transition:
   * clouds close → callback() renders new page → clouds open
   */
  async navigate(callback) {
    if (this._busy) return;
    this._busy = true;
    this._build();
    this._resetLayers();

    /* Show overlay */
    this.overlay.style.display = 'block';

    /* 1. Close */
    await this._animateClose();

    /* 2. Render new page behind closed clouds */
    callback();
    await wait(80);

    /* 3. Open */
    await this._animateOpen();

    /* 4. Clean up */
    this.overlay.style.display = 'none';
    this._resetLayers();
    this._busy = false;
  }
}

export const transition = new CloudTransition();
