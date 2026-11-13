import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/*
  LIFE AT CATALYST — "photos assemble into the word → 36-photo gallery wall".

  Entering   As the section scrolls into view, scattered photos fly in,
             spinning, and assemble into "CATALYST".
  0%         The word is locked: photos clipped to real Inter Black letter
             shapes, traced with a thin white outline.
  ~4–9%      The outline fades and the tiles are released from the letters.
  ~6–55%     Tiles sweep out left-to-right on curved, spinning paths. 36 "lead"
             tiles each grow into a cell of the gallery wall (6×6 on wide
             screens, 4×9 on phones) and sharpen into the full photo; the rest
             shrink into their cell and fade.
  55–100%    The wall holds with a slow zoom, then the title comes in.

  Everything is drawn on one <canvas> and only redrawn when the (smoothed)
  scroll values change, so it stays smooth even with hundreds of tiles.

  Photos (all Catalyst's own): 01–09 campus life, 10–18 campuses,
  19–36 catalysthub.in gallery. thumbs/ = 160px squares for the word,
  gallery/ = 640×480 for the wall.
*/

const PHOTO_COUNT = 36;
const pad2 = (n) => String(n).padStart(2, "0");
const thumbSrc = (i) => `/images/campus-life/thumbs/${pad2(i + 1)}.webp`;
const gallerySrc = (i) => `/images/campus-life/gallery/${pad2(i + 1)}.webp`;

const FONT_FAMILY = "Inter, ui-sans-serif, system-ui, sans-serif";
const FONT_WEIGHT = 900;
const CAP_HEIGHT = 0.727; // Inter cap height, in em
const FLIGHT = 0.32; // share of the scroll each tile spends flying
const RELEASE = [0.04, 0.09]; // clip → free

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
// Small deterministic hash → [0, 1)
const rand = (a, b) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------- Layout ---------- */
function buildLayout(w, h) {
  if (!w || !h) return null;
  const lines = w / h < 0.95 ? ["CATA", "LYST"] : ["CATALYST"];

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(w);
  canvas.height = Math.ceil(h);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.font = `${FONT_WEIGHT} 100px ${FONT_FAMILY}`;
  const widths100 = lines.map((l) => ctx.measureText(l).width);
  const lineStep = 0.86;
  const blockEm = CAP_HEIGHT + (lines.length - 1) * lineStep;
  const fs = Math.min(((w * 0.9) / Math.max(...widths100)) * 100, (h * 0.58) / blockEm);
  const capH = CAP_HEIGHT * fs;
  const blockH = blockEm * fs;
  const top = (h - blockH) / 2;
  const textLines = lines.map((line, i) => {
    const lw = (widths100[i] / 100) * fs;
    return { line, x: (w - lw) / 2, y: top + capH + i * lineStep * fs, width: lw };
  });

  // Rasterise the word to find tiles that sit on a letter
  ctx.font = `${FONT_WEIGHT} ${fs}px ${FONT_FAMILY}`;
  textLines.forEach((l) => ctx.fillText(l.line, l.x, l.y));
  const px = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const inside = (x, y) => {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || iy < 0 || ix >= canvas.width || iy >= canvas.height) return false;
    return px[(iy * canvas.width + ix) * 4 + 3] > 127;
  };

  const cell = Math.max(13, Math.min(46, fs * 0.1));
  const gap = Math.max(2, Math.round(cell * 0.1));
  const pitch = cell + gap;
  const x0 = Math.min(...textLines.map((l) => l.x));
  const x1 = Math.max(...textLines.map((l) => l.x + l.width));
  const cols = Math.ceil((x1 - x0) / pitch) + 1;
  const rows = Math.ceil(blockH / pitch) + 1;
  const offX = x0 - (cols * pitch - (x1 - x0)) / 2;
  const offY = top - (rows * pitch - blockH) / 2;

  // Gallery wall
  const gCols = w / h < 0.8 ? 4 : 6;
  const gRows = PHOTO_COUNT / gCols;
  const gPad = w >= 640 ? 12 : 6;
  const gGap = w >= 640 ? 8 : 5;
  const cw = (w - gPad * 2 - gGap * (gCols - 1)) / gCols;
  const ch = (h - gPad * 2 - gGap * (gRows - 1)) / gRows;
  const cells = Array.from({ length: PHOTO_COUNT }, (_, k) => {
    const c = k % gCols;
    const r = Math.floor(k / gCols);
    return { x: gPad + c * (cw + gGap), y: gPad + r * (ch + gGap), w: cw, h: ch, c, r };
  });

  const tiles = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const tx = offX + c * pitch;
      const ty = offY + r * pitch;
      let hits = 0;
      for (let sy = 0; sy < 4; sy += 1) {
        for (let sx = 0; sx < 4; sx += 1) {
          if (inside(tx + ((sx + 0.5) / 4) * cell, ty + ((sy + 0.5) / 4) * cell)) hits += 1;
        }
      }
      if (hits < 3) continue;
      const u = (tx + cell / 2 - x0) / (x1 - x0); // 0..1 across the word
      const v = (ty + cell / 2 - top) / blockH; // 0..1 down the word
      tiles.push({
        x: tx,
        y: ty,
        u,
        v,
        photo: (r * 11 + c * 5) % PHOTO_COUNT,
        start: 0.06 + clamp01(u) * 0.12 + rand(c + 1, r + 2) * 0.05,
        lead: false,
        // Assemble-in: starts scattered around the word, lands in its letter
        fromX: tx + (tx - w / 2) * (0.9 + rand(r, c + 9) * 1.4) + (rand(c, r + 5) - 0.5) * w * 0.3,
        fromY: ty + (ty - h / 2) * (1.5 + rand(r + 3, c) * 2) + (rand(c + 4, r) - 0.5) * h * 0.5,
        delay: rand(r + 11, c + 13) * 0.35,
        rot: (rand(c + 17, r + 19) - 0.5) * 1.1,
        arc: (rand(r + 23, c + 29) - 0.5) * h * 0.16,
      });
    }
  }

  // Each gallery cell gets the tile nearest its matching spot in the word
  const taken = new Set();
  cells.forEach((cellRect, k) => {
    const cu = (cellRect.c + 0.5) / gCols;
    const cv = (cellRect.r + 0.5) / gRows;
    let best = -1;
    let bestD = Infinity;
    tiles.forEach((t, i) => {
      if (taken.has(i)) return;
      const d = (t.u - cu) ** 2 + ((t.v - cv) * 0.6) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best < 0) return;
    taken.add(best);
    Object.assign(tiles[best], { lead: true, photo: k, target: cellRect });
  });

  // Other tiles drift into the cell in the same region and fade there
  const radius = w >= 640 ? 10 : 6;
  tiles.forEach((t, i) => {
    if (t.lead) return;
    const gc = Math.min(gCols - 1, Math.max(0, Math.floor(t.u * gCols)));
    const gr = Math.min(gRows - 1, Math.max(0, Math.floor(t.v * gRows)));
    const target = cells[gr * gCols + gc];
    const size = Math.min(target.w, target.h) * (0.3 + rand(i, 3) * 0.2);
    t.target = {
      x: target.x + rand(i, 7) * (target.w - size),
      y: target.y + rand(i, 11) * (target.h - size),
      w: size,
      h: size,
    };
  });

  return { fs, top, bottom: top + blockH, textLines, tiles, cell, radius };
}

/* ---------- Canvas helpers ---------- */
function drawCover(ctx, img, x, y, w, h, zoom = 1) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const r = Math.max(w / iw, h / ih) * zoom;
  const sw = w / r;
  const sh = h / r;
  ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
}

function roundedClip(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.clip();
}

function fillWord(ctx, layout) {
  ctx.font = `${FONT_WEIGHT} ${layout.fs}px ${FONT_FAMILY}`;
  layout.textLines.forEach((l) => ctx.fillText(l.line, l.x, l.y));
}

function useImages(count, srcFor, onLoad) {
  const ref = useRef([]);
  useEffect(() => {
    ref.current = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = onLoad;
      img.src = srcFor(i);
      return img;
    });
  }, [count, srcFor, onLoad]);
  return ref;
}

/* ---------- Hooks ---------- */
function useStageSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function useFontReady() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    let alive = true;
    const done = () => alive && setReady(true);
    if (document.fonts?.load) document.fonts.load(`${FONT_WEIGHT} 100px Inter`).then(done, done);
    else done();
    return () => {
      alive = false;
    };
  }, []);
  return ready;
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
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {Array.from({ length: PHOTO_COUNT }, (_, i) => (
            <img
              key={i}
              src={gallerySrc(i)}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section ---------- */
function CampusLifeMotion() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const bufRef = useRef({ mask: null, soft: null, dpr: 1 });
  const spritesRef = useRef({ key: "", list: [], cells: [] });
  const frameRef = useRef(0);

  const { w, h } = useStageSize(stageRef);
  const fontReady = useFontReady();
  const layout = useMemo(() => (fontReady ? buildLayout(w, h) : null), [w, h, fontReady]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5, restDelta: 0.0002 });

  // Assemble-in while the section scrolls into view (before it pins)
  const { scrollYProgress: enterProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const enter = useSpring(enterProgress, { stiffness: 90, damping: 26, mass: 0.5, restDelta: 0.0002 });

  const drawRef = useRef(() => {});
  const requestDraw = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      drawRef.current();
    });
  }, []);

  const thumbs = useImages(PHOTO_COUNT, thumbSrc, requestDraw);
  const fulls = useImages(PHOTO_COUNT, gallerySrc, requestDraw);

  // Size the canvas (and its mask buffers) for the device pixel ratio
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !w || !h) return;
    // 1.5× on phones keeps it sharp while drawing ~45% fewer pixels
    const dpr = Math.min(window.devicePixelRatio || 1, w < 640 ? 1.5 : 2);
    const make = () => document.createElement("canvas");
    bufRef.current.mask ??= make();
    bufRef.current.soft ??= make();
    bufRef.current.dpr = dpr;
    [canvas, bufRef.current.mask, bufRef.current.soft].forEach((c) => {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    // One mask with every line of the word (clipping line by line would cancel out)
    if (layout) {
      const mc = bufRef.current.mask.getContext("2d");
      mc.clearRect(0, 0, w, h);
      mc.fillStyle = "#000";
      fillWord(mc, layout);
    }
    requestDraw();
  }, [w, h, layout, requestDraw]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !layout) return;
    const ctx = canvas.getContext("2d");
    const p = progress.get();
    const e = enter.get();
    const assembling = e < 0.999;
    // Tiles are free while they assemble, snap into the letters, then release again
    const release = Math.max(smooth(RELEASE[0], RELEASE[1], p), 1 - smooth(0.82, 1, e));
    const zoom = 1.08 - 0.08 * smooth(0.45, 1, p);

    // Each photo pre-cut once to the tile's pixel size → cheap draws every frame
    const { dpr } = bufRef.current;
    const spriteKey = `${layout.cell}|${dpr}`;
    if (spritesRef.current.key !== spriteKey) spritesRef.current = { key: spriteKey, list: [], cells: [] };
    const sprite = (i) => {
      const list = spritesRef.current.list;
      if (list[i]) return list[i];
      const img = thumbs.current[i];
      if (!img?.complete || !img.naturalWidth) return null;
      const size = Math.max(1, Math.round(layout.cell * dpr));
      const sc = document.createElement("canvas");
      sc.width = size;
      sc.height = size;
      drawCover(sc.getContext("2d"), img, 0, 0, size, size);
      list[i] = sc;
      return sc;
    };

    // Gallery photos pre-cut to their wall cell (+8% margin for the slow zoom)
    const cellSprite = (t) => {
      const cells = spritesRef.current.cells;
      if (cells[t.photo]) return cells[t.photo];
      const img = fulls.current[t.photo];
      if (!img?.complete || !img.naturalWidth) return null;
      const cw = Math.max(1, Math.round(t.target.w * dpr * 1.08));
      const ch = Math.max(1, Math.round(t.target.h * dpr * 1.08));
      const sc = document.createElement("canvas");
      sc.width = cw;
      sc.height = ch;
      drawCover(sc.getContext("2d"), img, 0, 0, cw, ch);
      cells[t.photo] = sc;
      return sc;
    };

    const paintTiles = (c) => {
      c.clearRect(0, 0, w, h);
      // Ordinary tiles first, gallery leads on top
      for (let pass = 0; pass < 2; pass += 1) {
        for (const t of layout.tiles) {
          if (t.lead !== (pass === 1)) continue;
          if (assembling) {
            const ae = clamp01((e - t.delay) / 0.6);
            const sp = ae > 0.01 && sprite(t.photo);
            if (!sp) continue;
            const ea = 1 - (1 - ae) ** 3;
            const size = layout.cell * lerp(2.6, 1, ea);
            c.save();
            c.globalAlpha = Math.min(1, ae * 1.6);
            c.translate(lerp(t.fromX, t.x, ea) + layout.cell / 2, lerp(t.fromY, t.y, ea) + layout.cell / 2);
            c.rotate(t.rot * 1.6 * (1 - ea));
            c.drawImage(sp, -size / 2, -size / 2, size, size);
            c.restore();
            continue;
          }

          const k = easeInOutCubic(clamp01((p - t.start) / FLIGHT));
          const raw = clamp01((p - t.start) / FLIGHT);
          const swing = Math.sin(Math.PI * k); // 0 → 1 → 0 over the flight
          const x = lerp(t.x, t.target.x, k);
          const y = lerp(t.y, t.target.y, k) + swing * t.arc;
          const tw = lerp(layout.cell, t.target.w, k);
          const th = lerp(layout.cell, t.target.h, k);
          const thumb = thumbs.current[t.photo];

          if (!t.lead) {
            const alpha = 1 - smooth(0.45, 1, raw);
            const sp = alpha > 0.01 && sprite(t.photo);
            if (!sp) continue;
            c.globalAlpha = alpha;
            if (swing > 0.001) {
              c.save();
              c.translate(x + tw / 2, y + th / 2);
              c.rotate(swing * t.rot);
              c.drawImage(sp, -tw / 2, -th / 2, tw, th);
              c.restore();
            } else {
              c.drawImage(sp, x, y, tw, th);
            }
            continue;
          }

          // Lead tile still sitting in the word: plain sprite, no clipping needed
          if (raw <= 0) {
            const sp = sprite(t.photo);
            if (sp) {
              c.globalAlpha = 1;
              c.drawImage(sp, x, y, tw, th);
            }
            continue;
          }

          c.save();
          if (swing > 0.001) {
            c.translate(x + tw / 2, y + th / 2);
            c.rotate(swing * t.rot * 0.35);
            c.translate(-(x + tw / 2), -(y + th / 2));
          }
          roundedClip(c, x, y, tw, th, lerp(2, layout.radius, k));
          const sharp = smooth(0.35, 0.9, raw);
          if (sharp < 1 && thumb?.complete) {
            c.globalAlpha = 1;
            drawCover(c, thumb, x, y, tw, th);
          }
          const full = sharp > 0 && cellSprite(t);
          if (full) {
            c.globalAlpha = sharp;
            drawCover(c, full, x, y, tw, th, (raw >= 1 ? zoom : 1) * 1.08);
          }
          c.restore();
        }
      }
      c.globalAlpha = 1;
    };

    const clipToWord = (c, mask) => {
      c.save();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalCompositeOperation = "destination-in";
      c.drawImage(mask, 0, 0);
      c.restore();
    };

    paintTiles(ctx);
    if (release <= 0) {
      clipToWord(ctx, bufRef.current.mask);
    } else if (release < 1) {
      // Letters stay solid; what sits outside them fades in with `release`
      const soft = bufRef.current.soft;
      const sc = soft.getContext("2d");
      sc.save();
      sc.setTransform(1, 0, 0, 1, 0, 0);
      sc.clearRect(0, 0, soft.width, soft.height);
      sc.globalAlpha = release;
      sc.fillRect(0, 0, soft.width, soft.height);
      sc.globalAlpha = 1;
      sc.drawImage(bufRef.current.mask, 0, 0);
      sc.restore();
      clipToWord(ctx, soft);
    }

    // Sharp outline of the letters
    const outline = (1 - smooth(0.02, 0.07, p)) * smooth(0.8, 1, e);
    if (outline > 0) {
      ctx.save();
      ctx.globalAlpha = outline;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = Math.max(1.5, layout.fs * 0.008);
      ctx.lineJoin = "miter";
      ctx.font = `${FONT_WEIGHT} ${layout.fs}px ${FONT_FAMILY}`;
      layout.textLines.forEach((l) => ctx.strokeText(l.line, l.x, l.y));
      ctx.restore();
    }
  };

  useLayoutEffect(() => {
    drawRef.current = draw;
  });

  useMotionValueEvent(progress, "change", requestDraw);
  useMotionValueEvent(enter, "change", requestDraw);
  useEffect(() => {
    requestDraw();
  }, [layout, requestDraw]);
  useEffect(
    () => () => {
      // Reset the handle too: React StrictMode re-mounts in development, and a
      // stale handle would block every later redraw.
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    },
    []
  );

  const introOut = useTransform(progress, [0.02, 0.08], [1, 0]);
  const introIn = useTransform(enter, [0.85, 1], [0, 1]);
  const introOpacity = useTransform([introIn, introOut], ([a, b]) => a * b);
  const titleOpacity = useTransform(progress, [0.7, 0.82], [0, 1]);
  const titleY = useTransform(progress, [0.7, 0.82], [30, 0]);
  const shadeOpacity = useTransform(progress, [0.64, 0.82], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="campus-life-heading" className="relative h-[420vh] bg-[#081830]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="The word Catalyst made of campus photos, which opens into a wall of 36 photos from Catalyst classes, convocations, campuses and Onam"
          className="absolute inset-0 h-full w-full"
        />

        {/* Intro line + scroll cue, placed around the word */}
        <motion.div style={{ opacity: introOpacity }} className="pointer-events-none absolute inset-0 z-10">
          <p
            style={{ top: layout ? Math.max(24, layout.top - 52) : "20svh" }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-[#AFC0DA]"
          >
            Life at campus
          </p>
          <div
            style={{ top: layout ? layout.bottom + 40 : "78svh" }}
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8EA3C4]"
          >
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.6s_ease-in-out_infinite] bg-white/70" />
            </span>
          </div>
        </motion.div>

        {/* Shade + title on the finished wall */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: shadeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#081830]/90 via-[#081830]/30 to-transparent"
        />
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-x-0 bottom-0 z-30 px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <h2 id="campus-life-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Life at Catalyst
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-white/80 sm:text-base">
              Classrooms, convocations and Onam on campus. A few moments from our
              students&apos; year across 9 campuses in Kerala.
            </p>
            <p className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#70C7FF]">
              <span className="h-px w-10 bg-[#70C7FF]" />
              {PHOTO_COUNT} moments
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// LIFE AT CATALYST
export default function CampusLifeSection() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <StaticGallery />;
  return <CampusLifeMotion />;
}
