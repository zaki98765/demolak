import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/*
  LIFE AT CATALYST — "word made of photos → gallery".

  0%       "CATALYST" is built from small campus photos. The letters are clipped
           to real Inter Black outlines and traced with a thin white stroke,
           so the shape is exact and sharp at every screen size.
  ~6–45%   The outline fades, the clip releases and every photo tile flies to
           its spot in the 3×3 gallery (left tiles → left column, etc.),
           growing as it goes while the full-size photo fades in under it.
  45–75%   The gallery settles.
  75–100%  The gallery holds with the section title.

  Performance: one scroll value is written to the CSS variable --p on the
  stage; each tile computes its own transform from it in CSS (see .cl-tile
  in index.css), so React never re-renders while scrolling.
*/

const WORD = "CATALYST";
const THUMB_COUNT = 36;
const thumb = (i) => `/images/campus-life/thumbs/${String(i + 1).padStart(2, "0")}.webp`;
const FONT_FAMILY = "Inter, ui-sans-serif, system-ui, sans-serif";
const FONT_WEIGHT = 900;
const CAP_HEIGHT = 0.727; // Inter cap height, in em
const CLIP_UNTIL = 0.06; // progress at which tiles are released from the letter clip

const photos = [
  { src: "/images/campus-life/celebration.webp", alt: "Students at a Catalyst cultural night" },
  { src: "/images/campus-life/graduates.webp", alt: "Graduates holding their certificates" },
  { src: "/images/campus-life/chenda.webp", alt: "Chenda melam performance during Onam" },
  { src: "/images/campus-life/classroom.webp", alt: "Faculty helping students in a classroom" },
  { src: "/images/campus-life/center.webp", alt: "Smiling graduates at the Catalyst convocation" },
  { src: "/images/campus-life/lab.webp", alt: "Students working in the computer lab" },
  { src: "/images/campus-life/lecture.webp", alt: "A faculty member teaching a class" },
  { src: "/images/campus-life/onam.webp", alt: "Students celebrating Catalyst Onam 2026" },
  { src: "/images/campus-life/students.webp", alt: "Students attending a lecture" },
];

// Small deterministic hash → [0, 1)
const rand = (a, b) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------- Gallery tile (full-size photo) ---------- */
function GalleryTile({ photo, index, progress }) {
  const start = 0.3 + (index % 3) * 0.015 + Math.floor(index / 3) * 0.015;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.25], [0.94, 1]);
  const imgScale = useTransform(progress, [start, 1], [1.2, 1.02]);

  return (
    <motion.figure
      style={{ opacity, scale }}
      className="relative h-full w-full overflow-hidden rounded-xl bg-[#10294B] sm:rounded-2xl"
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ scale: imgScale }}
        className="h-full w-full object-cover"
      />
    </motion.figure>
  );
}

/* ---------- Layout ---------- */
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
    if (document.fonts?.load) {
      document.fonts.load(`${FONT_WEIGHT} 100px Inter`).then(done, done);
    } else {
      done();
    }
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

function buildLayout(w, h) {
  if (!w || !h) return null;
  const lines = w / h < 0.95 ? ["CATA", "LYST"] : [WORD];

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(w);
  canvas.height = Math.ceil(h);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  // Measure at 100px with the real font, then fit 90% width / 58% height
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

  // Rasterise the word to know which tiles sit on a letter
  ctx.font = `${FONT_WEIGHT} ${fs}px ${FONT_FAMILY}`;
  ctx.fillStyle = "#000";
  textLines.forEach((l) => ctx.fillText(l.line, l.x, l.y));
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const inside = (px, py) => {
    const ix = Math.round(px);
    const iy = Math.round(py);
    if (ix < 0 || iy < 0 || ix >= canvas.width || iy >= canvas.height) return false;
    return pixels[(iy * canvas.width + ix) * 4 + 3] > 127;
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

  // Gallery geometry (matches the grid's padding/gap classes below)
  const pad = w >= 640 ? 12 : 8;
  const gGap = w >= 640 ? 12 : 8;
  const gw = (w - pad * 2 - gGap * 2) / 3;
  const gh = (h - pad * 2 - gGap * 2) / 3;

  const tiles = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const tx = offX + c * pitch;
      const ty = offY + r * pitch;
      // 4×4 samples — keep tiles at least ~20% on a letter
      let hits = 0;
      for (let sy = 0; sy < 4; sy += 1) {
        for (let sx = 0; sx < 4; sx += 1) {
          if (inside(tx + ((sx + 0.5) / 4) * cell, ty + ((sy + 0.5) / 4) * cell)) hits += 1;
        }
      }
      if (hits < 3) continue;

      // Fly to the gallery cell in the same region of the screen
      const cx = tx + cell / 2;
      const cy = ty + cell / 2;
      const gc = Math.min(2, Math.max(0, Math.floor(((cx - x0) / (x1 - x0)) * 3)));
      const gr = Math.min(2, Math.max(0, Math.floor(((cy - top) / blockH) * 3)));
      const targetSize = Math.min(gw, gh) * (0.28 + rand(r, c) * 0.18);
      const gx = pad + gc * (gw + gGap) + rand(c, r) * (gw - targetSize) + targetSize / 2;
      const gy = pad + gr * (gh + gGap) + rand(r + 7, c + 3) * (gh - targetSize) + targetSize / 2;

      tiles.push({
        key: `${r}-${c}`,
        x: tx,
        y: ty,
        // Steps of 5 across and 11 down: neighbours never share a photo
        src: thumb((r * 11 + c * 5) % THUMB_COUNT),
        dx: gx - cx,
        dy: gy - cy,
        k: targetSize / cell - 1,
        s: 0.07 + ((gc + gr) / 4) * 0.06 + rand(c + 1, r + 2) * 0.08,
      });
    }
  }

  return { fs, top, bottom: top + blockH, textLines, tiles, cell };
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
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
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
  const tilesRef = useRef(null);
  const clipId = `catalyst-clip-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const { w, h } = useStageSize(stageRef);
  const fontReady = useFontReady();
  const layout = useMemo(() => (fontReady ? buildLayout(w, h) : null), [w, h, fontReady]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Drive the tiles through CSS: --p on the stage, clip on/off on the tile layer
  useMotionValueEvent(progress, "change", (v) => {
    stageRef.current?.style.setProperty("--p", v.toFixed(4));
    const layer = tilesRef.current;
    if (layer) {
      const clip = v < CLIP_UNTIL ? `url(#${clipId})` : "none";
      if (layer.style.clipPath !== clip) {
        layer.style.clipPath = clip;
        layer.style.webkitClipPath = clip;
      }
    }
  });

  const introOpacity = useTransform(progress, [0.02, 0.08], [1, 0]);
  const outlineOpacity = useTransform(progress, [0.02, 0.07], [1, 0]);

  const titleOpacity = useTransform(progress, [0.68, 0.8], [0, 1]);
  const titleY = useTransform(progress, [0.68, 0.8], [30, 0]);
  const shadeOpacity = useTransform(progress, [0.62, 0.8], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="campus-life-heading" className="relative h-[400vh] bg-[#081830]">
      <div ref={stageRef} style={{ "--p": 0 }} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Gallery */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-2 sm:gap-3 sm:p-3">
          {photos.map((photo, index) => (
            <GalleryTile key={photo.src} photo={photo} index={index} progress={progress} />
          ))}
        </div>

        {layout && (
          <>
            {/* Letter shapes used as the clip */}
            <svg aria-hidden="true" width="0" height="0" className="absolute">
              <defs>
                <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                  {layout.textLines.map((l) => (
                    <text key={l.line} x={l.x} y={l.y} fontSize={layout.fs} fontWeight={FONT_WEIGHT} fontFamily={FONT_FAMILY}>
                      {l.line}
                    </text>
                  ))}
                </clipPath>
              </defs>
            </svg>

            {/* Photo tiles */}
            <div
              ref={tilesRef}
              aria-hidden="true"
              style={{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }}
              className="pointer-events-none absolute inset-0 z-10"
            >
              {layout.tiles.map((t) => (
                <img
                  key={t.key}
                  src={t.src}
                  alt=""
                  decoding="async"
                  draggable="false"
                  className="cl-tile"
                  style={{
                    left: t.x,
                    top: t.y,
                    width: layout.cell,
                    height: layout.cell,
                    "--s": t.s,
                    "--dx": `${t.dx}px`,
                    "--dy": `${t.dy}px`,
                    "--k": t.k,
                  }}
                />
              ))}
            </div>

            {/* Sharp outline of the letters */}
            <motion.svg
              aria-hidden="true"
              width={w}
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              style={{ opacity: outlineOpacity }}
              className="pointer-events-none absolute inset-0 z-10"
            >
              {layout.textLines.map((l) => (
                <text
                  key={l.line}
                  x={l.x}
                  y={l.y}
                  fontSize={layout.fs}
                  fontWeight={FONT_WEIGHT}
                  fontFamily={FONT_FAMILY}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={Math.max(1.5, layout.fs * 0.008)}
                  strokeLinejoin="miter"
                >
                  {l.line}
                </text>
              ))}
            </motion.svg>
          </>
        )}

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

        {/* Shade + title on the finished gallery */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: shadeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#081830]/90 via-[#081830]/25 to-transparent"
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
