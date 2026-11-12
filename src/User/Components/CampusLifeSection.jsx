import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/*
  LIFE AT CATALYST — scroll-driven "mark → gallery" reveal.

  The section is ~3.4 screens tall with a sticky full-screen stage inside.
  0%  – the Catalyst mark fills the screen.
  ~15–45% – the mark dissolves while photos fly out from the centre.
  ~45–75% – photos settle into a full-bleed 3×3 collage.
  75–100% – the collage holds with the section title, then the page moves on.

  Photos: Catalyst's own gallery (catalysthub.in "Gallery & Events"), saved in
  /public/images/campus-life/. Order = grid order (index 4 is the centre tile).
*/

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

// Ring order: centre first, then edges, then corners — drives the stagger
const revealOrder = [4, 1, 3, 5, 7, 0, 2, 6, 8];

function Tile({ photo, index, progress }) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const isCenter = index === 4;
  const step = revealOrder.indexOf(index);

  const start = isCenter ? 0.1 : 0.2 + step * 0.025;
  const end = isCenter ? 0.42 : 0.55 + step * 0.02;

  // Start stacked on the centre tile, then travel to its own cell
  const x = useTransform(progress, [start, end], [`${(1 - col) * 102}%`, "0%"]);
  const y = useTransform(progress, [start, end], [`${(1 - row) * 102}%`, "0%"]);
  const scale = useTransform(progress, [start, end], [isCenter ? 0.18 : 0.35, 1]);
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const radius = useTransform(progress, [start, end], [isCenter ? 220 : 40, 18]);
  // Slow Ken-Burns drift inside each frame
  const imgScale = useTransform(progress, [start, 1], [1.25, 1.02]);

  return (
    <motion.figure
      style={{ x, y, scale, opacity, borderRadius: radius, zIndex: isCenter ? 2 : 1 }}
      className="relative h-full w-full overflow-hidden bg-[#10294B] will-change-transform"
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

// LIFE AT CATALYST
export default function CampusLifeSection() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Mark
  const markScale = useTransform(progress, [0, 0.35], [1, 2.4]);
  const markOpacity = useTransform(progress, [0.12, 0.32], [1, 0]);
  const markBlur = useTransform(progress, [0.12, 0.32], ["blur(0px)", "blur(14px)"]);
  const introOpacity = useTransform(progress, [0, 0.1], [1, 0]);

  // Title over the finished collage
  const titleOpacity = useTransform(progress, [0.68, 0.8], [0, 1]);
  const titleY = useTransform(progress, [0.68, 0.8], [30, 0]);
  const shadeOpacity = useTransform(progress, [0.62, 0.8], [0, 1]);

  if (prefersReducedMotion) return <StaticGallery />;

  return (
    <section ref={ref} aria-labelledby="campus-life-heading" className="relative h-[340vh] bg-[#081830]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Gallery */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-2 sm:gap-3 sm:p-3">
          {photos.map((photo, index) => (
            <Tile key={photo.src} photo={photo} index={index} progress={progress} />
          ))}
        </div>

        {/* Mark */}
        <motion.div
          aria-hidden="true"
          style={{ scale: markScale, opacity: markOpacity, filter: markBlur }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <img
            src="/images/campus-life/catalyst-logo-white-lg.webp"
            alt=""
            width="1400"
            height="461"
            className="w-[86vw] max-w-[980px] select-none"
            draggable="false"
          />
        </motion.div>

        {/* Intro line + scroll cue */}
        <motion.div style={{ opacity: introOpacity }} className="pointer-events-none absolute inset-x-0 z-10">
          <p className="absolute left-1/2 top-[18svh] -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.32em] text-[#AFC0DA] sm:top-[20svh]">
            Life at campus
          </p>
          <div className="absolute left-1/2 top-[82svh] flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8EA3C4]">
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.6s_ease-in-out_infinite] bg-white/70" />
            </span>
          </div>
        </motion.div>

        {/* Shade + title on the finished collage */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: shadeOpacity }}
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#081830]/90 via-[#081830]/25 to-transparent"
        />
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="campus-life-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Life at Catalyst
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-7 text-white/80 sm:text-base">
                Classrooms, convocations and Onam on campus. A few moments from our
                students&apos; year across 9 campuses in Kerala.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
