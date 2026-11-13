import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { campusLifePhotos } from "../Data/campusLife";
import { LOGO_SHAPE } from "../Data/catalystLogoShape";

/*
  LIFE AT CATALYST — the Catalyst logo, made of campus photos, opens into a photo wall.

  The section is 420vh tall with a sticky full-screen stage. Two numbers drive everything:
    enter  0 → 1 while the section scrolls into view (before it pins)
    scroll 0 → 1 while the stage is pinned

  enter           Scattered photos fly in and assemble into the logo.
  scroll 0–7%     The logo is locked: photos are cut to the logo's exact outline,
                  the tick is washed in brand cyan, and a thin white line traces it.
  scroll 7–58%    Photos peel off the logo left to right — the outline is wiped away
                  just ahead of them — and fly out on curved, tilting paths. One tile
                  per photo grows into that photo's card on the wall.
  scroll 36–100%  The wall keeps moving: neighbouring columns drift in opposite
                  directions, so every photo passes through the screen.
  scroll 72–84%   The title rises in.

  How it is built
  - Everything is painted on one <canvas>. Scroll position is read straight from the
    section's position, eased, and painted once per animation frame — nothing runs
    while the page is still.
  - Photos come from Data/campusLife.js. Each photo is pre-cut once into a small tile
    and a wall-sized card, so a frame is just a few hundred cheap image draws.
  - Until a photo has loaded, its tiles are painted in brand blues, so the logo is
    never blank.
  - If a device cannot hold a steady frame rate, the canvas drops to a lower pixel
    density (2x → 1.5x → 1x) instead of stuttering.
  - prefers-reduced-motion gets a plain photo grid instead.
*/

const TICK_COLOR = "#00BFFA";
const TAGLINE_COLOR = "#9FB2CF";
const PLACEHOLDERS = ["#14325E", "#1A4279", "#102A50", "#1D4C8C"];

// Scroll timeline (share of the pinned scroll)
const FLIGHT_FROM = 0.07; // first photos leave the logo…
const FLIGHT_SPREAD = 0.16; // …the last ones this much later (left → right)
const FLIGHT = 0.3; // how long one photo travels
const FREE_AT = 1.3; // a photo is clear of the logo's outline once it has moved this many tile widths
const DRIFT_FROM = 0.36; // wall columns start drifting
const TITLE = [0.72, 0.84];

const SMOOTHING = 0.13; // seconds — easing applied to the scroll position
const FADE_MS = 450; // photo fades in over its placeholder
const TILE_SIZE = 0.026; // mosaic tile, as a share of the logo's width
const PIXEL_BUDGET = 8_000_000; // cap on canvas pixels (keeps 4K/5K screens smooth)
const DPR_STEPS = [2, 1.5, 1]; // canvas sharpness; steps down if a device cannot keep up

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const clamp01 = (v) => clamp(v, 0, 1);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
// Small deterministic hash → [0, 1)
const rand = (a, b) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

/* ---------- Logo outlines ---------- */
let logoPaths = null;
function getLogoPaths() {
  if (!logoPaths) {
    logoPaths = {
      mark: new Path2D(LOGO_SHAPE.wordmark + LOGO_SHAPE.tick), // letters + tick
      tick: new Path2D(LOGO_SHAPE.tick),
      tagline: new Path2D(LOGO_SHAPE.tagline),
    };
  }
  return logoPaths;
}

/* ---------- Layout ---------- */
// Photo wall: columns of 4:3 cards, taller than the screen so they can drift
function buildWall(w, h, count) {
  const gap = w >= 640 ? 10 : 6;
  const pad = gap;
  const view = h - pad * 2;
  let cols = w < 640 ? 3 : w < 1024 ? 4 : w < 1440 ? 5 : w < 1920 ? 6 : 7;
  cols = Math.max(1, Math.min(cols, count));
  let cw = 0;
  let ch = 0;
  for (;;) {
    cw = (w - pad * 2 - gap * (cols - 1)) / cols;
    ch = cw * 0.75;
    const shortest = Math.floor(count / cols) * (ch + gap) - gap;
    if (shortest >= view * 1.2 || cols <= 2) break;
    cols -= 1; // fewer, larger columns until they overflow the screen
  }

  const perCol = Array.from({ length: cols }, (_, c) => Math.floor(count / cols) + (c < count % cols ? 1 : 0));
  const cells = Array.from({ length: count }, (_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const colHeight = perCol[c] * (ch + gap) - gap;
    return {
      x: pad + c * (cw + gap),
      y: pad + r * (ch + gap),
      travel: Math.max(0, colHeight - view), // how far this column can slide
      even: c % 2 === 0,
      u: (c + 0.5) / cols,
      v: (r + 0.5) / perCol[c],
    };
  });
  return { cols, perCol, cw, ch, gap, cells, radius: w >= 640 ? 12 : 7 };
}

function buildLayout(w, h, count) {
  if (!w || !h || !count) return null;
  const { mark } = getLogoPaths();

  // Logo lockup, centred on the stage
  const scale = Math.min(
    (w * (w < 640 ? 0.92 : 0.86)) / LOGO_SHAPE.width,
    (h * 0.46) / LOGO_SHAPE.height,
    1560 / LOGO_SHAPE.width
  );
  const lw = LOGO_SHAPE.width * scale;
  const lh = LOGO_SHAPE.height * scale;
  const ox = (w - lw) / 2;
  const oy = (h - lh) / 2;
  const markH = LOGO_SHAPE.lettersBottom * scale; // tick top → bottom of the letters

  // Rasterise the logo once (1px = 1 CSS px) to know which tiles sit on it
  const probe = document.createElement("canvas");
  probe.width = Math.max(1, Math.ceil(lw));
  probe.height = Math.max(1, Math.ceil(markH));
  const pc = probe.getContext("2d", { willReadFrequently: true });
  if (!pc) return null;
  pc.scale(scale, scale);
  pc.fill(mark, "evenodd");
  const px = pc.getImageData(0, 0, probe.width, probe.height).data;
  const inside = (x, y) => {
    const ix = Math.round(x - ox);
    const iy = Math.round(y - oy);
    if (ix < 0 || iy < 0 || ix >= probe.width || iy >= probe.height) return false;
    return px[(iy * probe.width + ix) * 4 + 3] > 127;
  };

  const wall = buildWall(w, h, count);

  // Mosaic tiles on a square grid; shrink them if there are more photos than tiles
  let cell = clamp(lw * TILE_SIZE, 10, 46);
  let spots = [];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const gap = Math.max(1.5, Math.round(cell * 0.09 * 2) / 2);
    const pitch = cell + gap;
    const cols = Math.ceil((lw + gap) / pitch);
    const rows = Math.ceil((markH + gap) / pitch);
    const gx = ox - (cols * pitch - gap - lw) / 2;
    const gy = oy - (rows * pitch - gap - markH) / 2;
    spots = [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const x = gx + c * pitch;
        const y = gy + r * pitch;
        let hits = 0;
        for (let sy = 0; sy < 4; sy += 1) {
          for (let sx = 0; sx < 4; sx += 1) {
            if (inside(x + ((sx + 0.5) / 4) * cell, y + ((sy + 0.5) / 4) * cell)) hits += 1;
          }
        }
        if (hits >= 2) spots.push({ x, y, c, r });
      }
    }
    if (spots.length >= count * 1.25 || cell <= 6) break;
    cell *= 0.84;
  }

  // Spread the photos so neighbouring tiles differ
  let step = Math.max(1, Math.round(count * 0.382));
  while (gcd(step, count) !== 1) step += 1;

  const tiles = spots.map(({ x, y, c, r }, n) => {
    const u = clamp01((x + cell / 2 - ox) / lw);
    const v = clamp01((y + cell / 2 - oy) / markH);
    // Where a tile that does not become a wall card drifts off to
    const col = Math.min(wall.cols - 1, Math.floor(u * wall.cols));
    const row = Math.min(wall.perCol[col] - 1, Math.floor(v * wall.perCol[col]));
    return {
      x,
      y,
      u,
      v,
      photo: (n * step) % count,
      lead: false,
      cell: row * wall.cols + col,
      size: Math.min(wall.cw, wall.ch) * (0.3 + rand(n, 3) * 0.2),
      fx: rand(n, 7),
      fy: rand(n, 11),
      start: FLIGHT_FROM + u * FLIGHT_SPREAD + rand(c + 1, r + 2) * 0.05,
      // Assemble-in: starts scattered around the logo
      fromX: x + (x - w / 2) * (0.9 + rand(r, c + 9) * 1.4) + (rand(c, r + 5) - 0.5) * w * 0.3,
      fromY: y + (y - h / 2) * (1.5 + rand(r + 3, c) * 2) + (rand(c + 4, r) - 0.5) * h * 0.5,
      delay: rand(r + 11, c + 13) * 0.35,
      rot: (rand(c + 17, r + 19) - 0.5) * 1.1,
      arc: (rand(r + 23, c + 29) - 0.5) * h * 0.16,
    };
  });

  // One tile per photo becomes that photo's card on the wall: the nearest free tile
  const taken = new Set();
  wall.cells.forEach((target, k) => {
    let best = -1;
    let bestD = Infinity;
    tiles.forEach((t, i) => {
      if (taken.has(i)) return;
      const d = (t.u - target.u) ** 2 + ((t.v - target.v) * 0.5) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best < 0) return;
    taken.add(best);
    Object.assign(tiles[best], { lead: true, photo: k, cell: k });
  });

  return {
    scale,
    ox,
    oy,
    lw,
    cell,
    tiles,
    wall,
    labelTop: Math.max(16, oy + LOGO_SHAPE.lettersTop * scale - 48),
    cueTop: oy + lh + 34,
  };
}

/* ---------- Painting ---------- */
function drawCover(ctx, img, x, y, w, h) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const r = Math.max(w / iw, h / ih);
  const sw = w / r;
  const sh = h / r;
  ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
}

// A photo pre-scaled to the exact pixel size it is painted at. Returned as an
// ImageBitmap where the browser supports it (cheapest thing to paint), else a canvas.
function makeSprite(img, width, height) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const paint = (c) => {
    const ctx = c.getContext("2d");
    if (!ctx) return false;
    ctx.imageSmoothingQuality = "high";
    drawCover(ctx, img, 0, 0, w, h);
    return true;
  };
  try {
    if (typeof OffscreenCanvas !== "undefined") {
      const off = new OffscreenCanvas(w, h);
      if (paint(off) && off.transferToImageBitmap) return off.transferToImageBitmap();
    }
  } catch {
    // fall through to a regular canvas
  }
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return paint(c) ? c : null;
}

// Pre-cut a few loaded photos for the current layout; returns how many are still waiting
function buildSprites(env, limit) {
  const { layout, store, dpr } = env;
  if (!layout) return 0;
  const key = `${layout.cell.toFixed(2)}|${layout.wall.cw.toFixed(1)}|${dpr.toFixed(2)}`;
  let built = 0;
  let waiting = 0;
  for (let i = 0; i < store.imgs.length; i += 1) {
    if (!store.loaded[i] || store.key[i] === key) continue;
    if (built >= limit) {
      waiting += 1;
      continue;
    }
    const tile = makeSprite(store.imgs[i], layout.cell * dpr, layout.cell * dpr);
    const card = makeSprite(store.imgs[i], layout.wall.cw * dpr, layout.wall.ch * dpr);
    if (!tile || !card) continue;
    store.tile[i]?.close?.(); // free the sprites cut for the previous size
    store.card[i]?.close?.();
    store.tile[i] = tile;
    store.card[i] = card;
    store.key[i] = key;
    if (!store.readyAt[i]) store.readyAt[i] = performance.now();
    built += 1;
  }
  return waiting;
}

// Match the canvas's pixel size to the stage and the current sharpness step
function sizeCanvas(env) {
  const { canvas, w, h } = env;
  if (!canvas || !w || !h) return;
  env.dpr = Math.min(window.devicePixelRatio || 1, DPR_STEPS[env.quality], Math.sqrt(PIXEL_BUDGET / (w * h)));
  const pw = Math.round(w * env.dpr);
  const ph = Math.round(h * env.dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
}

function roundedClip(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.clip();
}

// Write a style only when it changes (the browser normalises values, so compare our own copy)
function setStyle(env, name, prop, value) {
  const el = env.els[name];
  const key = `${name}.${prop}`;
  if (!el || env.styles[key] === value) return;
  env.styles[key] = value;
  el.style[prop] = value;
}

// Paints one frame. Returns true while something is still animating on its own.
function paintFrame(env, enter, scroll, time) {
  const { canvas, w, h, dpr, layout, store } = env;
  if (!canvas || !layout || !w || !h) return false;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const paths = getLogoPaths();
  const { wall, tiles, cell, scale, ox, oy, lw } = layout;
  const e = enter;
  const p = scroll;

  let busy = false;
  const fadeOf = (i) => {
    const at = store.readyAt[i];
    if (!at) return 0;
    const a = (time - at) / FADE_MS;
    if (a >= 1) return 1;
    busy = true;
    return a < 0 ? 0 : a;
  };

  const lock = smooth(0.8, 1, e); // 1 = the logo is assembled and cuts the photos to its outline
  const outline = smooth(0.86, 1, e);
  const chrome = outline * (1 - smooth(0.02, 0.07, p)); // tagline + intro text
  const wipe = clamp01((p - FLIGHT_FROM + 0.012) / FLIGHT_SPREAD); // how far the photos have peeled off
  const drift = clamp01((p - DRIFT_FROM) / (1 - DRIFT_FROM));
  const settled = e >= 0.999;

  const placeholder = (i) => PLACEHOLDERS[i % PLACEHOLDERS.length];

  // A small square tile (the mosaic)
  const drawTile = (photo, x, y, tw, th, alpha, rot) => {
    const sprite = store.tile[photo];
    const fade = sprite ? fadeOf(photo) : 0;
    let dx = x;
    let dy = y;
    if (rot) {
      ctx.save();
      ctx.translate(x + tw / 2, y + th / 2);
      ctx.rotate(rot);
      dx = -tw / 2;
      dy = -th / 2;
    }
    if (fade < 1) {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = placeholder(photo);
      ctx.fillRect(dx, dy, tw, th);
    }
    if (fade > 0) {
      ctx.globalAlpha = alpha * fade;
      ctx.drawImage(sprite, dx, dy, tw, th);
    }
    if (rot) ctx.restore();
  };

  // A rounded card growing into (or sitting on) the wall; mix 0 = tile crop, 1 = full photo
  const drawCard = (photo, x, y, tw, th, alpha, rot, radius, mix) => {
    const fade = store.card[photo] ? fadeOf(photo) : 0;
    ctx.save();
    if (rot) {
      ctx.translate(x + tw / 2, y + th / 2);
      ctx.rotate(rot);
      ctx.translate(-(x + tw / 2), -(y + th / 2));
    }
    roundedClip(ctx, x, y, tw, th, radius);
    if (fade < 1) {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = placeholder(photo);
      ctx.fillRect(x, y, tw, th);
    }
    if (fade > 0) {
      if (mix < 1) {
        ctx.globalAlpha = alpha * fade;
        drawCover(ctx, store.tile[photo], x, y, tw, th);
      }
      if (mix > 0) {
        ctx.globalAlpha = alpha * fade * mix;
        drawCover(ctx, store.card[photo], x, y, tw, th);
      }
    }
    ctx.restore();
  };

  // home = true paints the photos still sitting in the logo (the caller clips them to its
  // outline); home = false paints the ones that have left, plus everything while assembling.
  const paintTiles = (home) => {
    // Tiles that fade away first, wall cards on top
    for (let pass = 0; pass < 2; pass += 1) {
      for (const t of tiles) {
        if (t.lead !== (pass === 1)) continue;

        // 1. Where the tile is on its way from the logo to the wall
        const raw = clamp01((p - t.start) / FLIGHT);
        if (!home && raw <= 0 && lock >= 0.999) continue; // still in the logo
        const k = raw <= 0 ? 0 : raw >= 1 ? 1 : easeInOutCubic(raw);
        const swing = k > 0 && k < 1 ? Math.sin(Math.PI * k) : 0; // 0 → 1 → 0
        const target = wall.cells[t.cell];
        const targetY = target.y - target.travel * (target.even ? drift : 1 - drift);
        let alpha = 1;
        let tx = target.x;
        let ty = targetY;
        let tW = wall.cw;
        let tH = wall.ch;
        if (!t.lead) {
          alpha = 1 - smooth(0.45, 1, raw);
          if (alpha <= 0.01) continue;
          tx += t.fx * (wall.cw - t.size);
          ty += t.fy * (wall.ch - t.size);
          tW = t.size;
          tH = t.size;
        }
        let tw = lerp(cell, tW, k);
        let th = lerp(cell, tH, k);
        let x = lerp(t.x, tx, k);
        let y = lerp(t.y, ty, k) + swing * t.arc;
        let rot = swing * t.rot * (t.lead ? 0.35 : 1);

        // Inside the logo's outline until it has slid clear of its own spot
        const moved = (Math.abs(x - t.x) + Math.abs(y - t.y)) / cell;
        let alphaMul = 1;
        if (home) {
          if (moved >= FREE_AT) continue;
        } else {
          alphaMul = Math.max(1 - lock, smooth(0.1, FREE_AT, moved));
          if (alphaMul <= 0.004) continue;
        }

        // 2. Still flying in to assemble the logo
        if (!settled) {
          const ae = clamp01((e - t.delay) / 0.6);
          if (ae <= 0.01) continue;
          if (ae < 1) {
            const ea = 1 - (1 - ae) ** 3;
            const grow = lerp(2.4, 1, ea);
            const cx = lerp(t.fromX + cell / 2, x + tw / 2, ea);
            const cy = lerp(t.fromY + cell / 2, y + th / 2, ea);
            tw *= grow;
            th *= grow;
            x = cx - tw / 2;
            y = cy - th / 2;
            rot += t.rot * 1.6 * (1 - ea);
            alpha *= Math.min(1, ae * 1.6);
          }
        }

        // 3. Skip what is off screen, paint the rest
        const m = rot ? Math.max(tw, th) * 0.5 : 0;
        if (x + tw + m < 0 || y + th + m < 0 || x - m > w || y - m > h) continue;
        if (k >= 1 && settled) {
          x = Math.round(x * dpr) / dpr;
          y = Math.round(y * dpr) / dpr;
        }
        if (home || !t.lead || k <= 0) drawTile(t.photo, x, y, tw, th, alpha * alphaMul, rot);
        else drawCard(t.photo, x, y, tw, th, alpha * alphaMul, rot, lerp(2, wall.radius, k), smooth(0.3, 0.85, raw));
      }
    }
    ctx.globalAlpha = 1;
  };

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  if (lock > 0.001) {
    // Photos still in the logo, cut to its outline
    ctx.save();
    ctx.transform(scale, 0, 0, scale, ox, oy);
    ctx.clip(paths.mark, "evenodd");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintTiles(true);
    ctx.restore();

    // Brand cyan over the photos inside the tick
    ctx.save();
    ctx.transform(scale, 0, 0, scale, ox, oy);
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.55 * lock;
    ctx.fillStyle = TICK_COLOR;
    ctx.fill(paths.tick);
    ctx.restore();
  }

  // Photos on the move (and all of them while the logo is still assembling)
  paintTiles(false);

  // Thin white outline, wiped away left → right just ahead of the departing photos
  if (outline > 0.001 && wipe < 1) {
    ctx.save();
    if (wipe > 0) {
      ctx.beginPath();
      ctx.rect(ox + lw * wipe, 0, w, h);
      ctx.clip();
    }
    ctx.transform(scale, 0, 0, scale, ox, oy);
    ctx.globalAlpha = outline;
    ctx.lineWidth = (w < 640 ? 1.25 : 1.75) / scale;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke(paths.mark);
    ctx.restore();
  }

  // EDUCATION
  if (chrome > 0.001) {
    ctx.save();
    ctx.transform(scale, 0, 0, scale, ox, oy);
    ctx.globalAlpha = chrome * 0.85;
    ctx.fillStyle = TAGLINE_COLOR;
    ctx.fill(paths.tagline, "evenodd");
    ctx.restore();
  }

  // Text layers
  const title = smooth(TITLE[0], TITLE[1], p);
  setStyle(env, "intro", "opacity", chrome.toFixed(3));
  setStyle(env, "shade", "opacity", smooth(TITLE[0] - 0.08, TITLE[1], p).toFixed(3));
  setStyle(env, "title", "opacity", title.toFixed(3));
  setStyle(env, "title", "transform", `translate3d(0, ${((1 - title) * 28).toFixed(1)}px, 0)`);

  return busy;
}

/* ---------- Hooks ---------- */
function useStageSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => {
      const next = { w: el.clientWidth, h: el.clientHeight };
      setSize((prev) => (prev.w === next.w && prev.h === next.h ? prev : next));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

// True once the section is within a few screens of the viewport (start loading photos)
function useNear(ref) {
  const [near, setNear] = useState(() => typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return near;
}

/* ---------- Reduced-motion fallback ---------- */
function StaticGallery() {
  return (
    <section aria-labelledby="campus-life-heading" className="bg-[#081830] px-3 py-14 sm:px-4 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 id="campus-life-heading" className="px-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Life at Catalyst
        </h2>
        <p className="mt-3 max-w-xl px-2 text-[15px] leading-7 text-[#AFC0DA]">
          Classrooms, convocations and Onam on campus. A few moments from our students&apos; year.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
          {campusLifePhotos.map((photo) => (
            <li key={photo.src}>
              <img
                src={photo.src}
                alt={photo.alt}
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Per-photo state: its <img>, whether it has loaded, and its pre-cut sprites
const createStore = () => ({ src: [], imgs: [], loaded: [], readyAt: [], tile: [], card: [], key: [] });

/* ---------- Section ---------- */
function CampusLifeMotion() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const introRef = useRef(null);
  const shadeRef = useRef(null);
  const titleRef = useRef(null);

  // Everything the painter needs, kept outside React state so scrolling never re-renders
  const envRef = useRef(null);
  if (envRef.current === null) {
    envRef.current = {
      canvas: null,
      w: 0,
      h: 0,
      dpr: 1,
      quality: 0, // index into DPR_STEPS
      layout: null,
      els: {},
      styles: {},
      store: createStore(),
    };
  }
  const engineRef = useRef(null);
  const buildTimerRef = useRef(0);
  const mountedRef = useRef(false);

  const { w, h } = useStageSize(stageRef);
  const near = useNear(sectionRef);
  const count = campusLifePhotos.length;
  const layout = useMemo(() => buildLayout(w, h, count), [w, h, count]);

  // Cut sprites a few at a time so a frame never stalls
  const scheduleBuild = useCallback(() => {
    if (!mountedRef.current || buildTimerRef.current) return;
    const run = () => {
      buildTimerRef.current = 0;
      if (!mountedRef.current) return;
      const waiting = buildSprites(envRef.current, 3);
      engineRef.current?.kick();
      if (waiting) buildTimerRef.current = window.setTimeout(run, 24);
    };
    buildTimerRef.current = window.setTimeout(run, 0);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      window.clearTimeout(buildTimerRef.current);
      buildTimerRef.current = 0;
    };
  }, []);

  // Scroll → eased progress → one paint per animation frame
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const state = { enter: 0, scroll: 0, enterTo: 0, scrollTo: 0, raf: 0, last: 0, gaps: [] };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      state.enterTo = clamp01((vh - rect.top) / vh);
      state.scrollTo = clamp01(-rect.top / Math.max(1, rect.height - vh));
    };
    const ease = (from, to, k) => (Math.abs(to - from) < 0.0005 ? to : from + (to - from) * k);
    const frame = (time) => {
      state.raf = 0;
      const gap = state.last ? time - state.last : 0;
      const dt = gap ? Math.min(0.05, gap / 1000) : 1 / 60;
      state.last = time;

      // Repeated dropped frames → paint at a lower pixel density from now on.
      // (A steady 30fps, e.g. a phone in low-power mode, has no gaps this long.)
      if (gap > 0 && gap < 250) {
        state.gaps.push(gap);
        if (state.gaps.length >= 40) {
          const dropped = state.gaps.filter((g) => g > 45).length;
          state.gaps.length = 0;
          const env = envRef.current;
          if (dropped >= 6 && env.quality < DPR_STEPS.length - 1 && env.dpr > 1.01) {
            env.quality += 1;
            sizeCanvas(env);
            scheduleBuild();
          }
        }
      }
      const k = 1 - Math.exp(-dt / SMOOTHING);
      state.enter = ease(state.enter, state.enterTo, k);
      state.scroll = ease(state.scroll, state.scrollTo, k);
      const busy = paintFrame(envRef.current, state.enter, state.scroll, time);
      if (busy || state.enter !== state.enterTo || state.scroll !== state.scrollTo) {
        state.raf = requestAnimationFrame(frame);
      } else {
        state.last = 0;
      }
    };
    const kick = () => {
      measure();
      if (!state.raf) state.raf = requestAnimationFrame(frame);
    };

    const canvas = canvasRef.current;
    engineRef.current = { kick };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    document.addEventListener("visibilitychange", kick); // repaint when the tab comes back
    canvas?.addEventListener("contextrestored", kick); // …or the browser hands the canvas back
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      document.removeEventListener("visibilitychange", kick);
      canvas?.removeEventListener("contextrestored", kick);
      cancelAnimationFrame(state.raf);
      state.raf = 0;
      engineRef.current = null;
    };
  }, [scheduleBuild]);

  // Keep the painter's view of the stage up to date
  useLayoutEffect(() => {
    const env = envRef.current;
    const canvas = canvasRef.current;
    env.canvas = canvas;
    env.els = { intro: introRef.current, shade: shadeRef.current, title: titleRef.current };
    env.styles = {};
    env.w = w;
    env.h = h;
    env.layout = layout;
    env.quality ??= 0; // (a hot reload can hand us state saved by an older version of this file)
    sizeCanvas(env);
    scheduleBuild();
    engineRef.current?.kick();
  }, [w, h, layout, scheduleBuild]);

  // Load the photos once the section is a few screens away
  useEffect(() => {
    if (!near) return;
    const env = envRef.current;
    if (!env.store?.src) env.store = createStore();
    const { store } = env;
    Object.values(store).forEach((list) => {
      list.length = Math.min(list.length, campusLifePhotos.length); // photos removed from the list
    });
    campusLifePhotos.forEach((photo, i) => {
      if (store.src[i] === photo.src) return; // already loading or loaded
      const img = new Image();
      img.decoding = "async";
      store.src[i] = photo.src;
      store.imgs[i] = img;
      store.loaded[i] = false;
      store.key[i] = null;
      store.readyAt[i] = 0;
      const ready = () => {
        if (store.imgs[i] !== img) return; // the list changed while this was loading
        store.loaded[i] = true;
        scheduleBuild();
      };
      img.onload = () => {
        if (img.decode) img.decode().then(ready, ready);
        else ready();
      };
      img.src = photo.src;
    });
    scheduleBuild(); // photos that finished loading while this component was re-mounting
  }, [near, scheduleBuild]);

  return (
    <section ref={sectionRef} aria-labelledby="campus-life-heading" className="relative h-[420vh] bg-[#081830]">
      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#0C2345_0%,#081830_58%,#050F21_100%)] supports-[height:100svh]:h-[100svh]"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`The Catalyst Education logo made of campus photos, which opens into a wall of ${count} photos of classes, convocations, celebrations and campuses`}
          className="absolute inset-0 h-full w-full"
        />

        {/* Intro line + scroll cue, placed around the logo */}
        <div ref={introRef} className="pointer-events-none absolute inset-0 opacity-0">
          <p
            style={{ top: layout ? layout.labelTop : "30svh" }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-[#AFC0DA]"
          >
            Life at campus
          </p>
          <div
            style={{ top: layout ? layout.cueTop : "70svh" }}
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8EA3C4]"
          >
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.6s_ease-in-out_infinite] bg-white/70" />
            </span>
          </div>
        </div>

        {/* Shade + title over the photo wall */}
        <div
          ref={shadeRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081830]/95 via-[#081830]/35 to-transparent opacity-0"
        />
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 pb-10 pl-6 pr-24 opacity-0 sm:px-10 sm:pb-14 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <h2 id="campus-life-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Life at Catalyst
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-white/80 sm:text-base">
              Classrooms, convocations and Onam on campus. A few moments from our
              students&apos; year across 9 campuses in Kerala.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// LIFE AT CATALYST
export default function CampusLifeSection() {
  const prefersReducedMotion = useReducedMotion();
  if (campusLifePhotos.length === 0) return null;
  if (prefersReducedMotion) return <StaticGallery />;
  return <CampusLifeMotion />;
}
