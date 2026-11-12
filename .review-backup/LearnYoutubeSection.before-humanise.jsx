import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiBookOpen, FiCheck, FiPlay } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { YOUTUBE_CHANNEL_URL } from "../Data/videos";

/*
  LEARN WITH US ON YOUTUBE — free lessons
  Content from the "Learn With Us on YouTube" block on catalysthub.in.
  Lesson cards link to the channel for now; to open specific videos, add a
  `url` to each lesson below. Thumbnails load from the live site; to self-host,
  save them in /public/images/youtube/ and update `image`.
*/

const SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

const lessons = [
  { id: 1, image: "https://catalysthub.in/img/yutube/11.png" },
  { id: 2, image: "https://catalysthub.in/img/yutube/12.png" },
  { id: 3, image: "https://catalysthub.in/img/yutube/13.png" },
  { id: 4, image: "https://catalysthub.in/img/yutube/14.png" },
];

const subjects = ["CMA", "ACCA", "Commerce"];

const ease = [0.16, 1, 0.3, 1];

function LessonThumb({ lesson, index, y }) {
  const [failed, setFailed] = useState(false);
  const label = `Lesson ${String(lesson.id).padStart(2, "0")}`;

  return (
    <motion.li
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
    >
      <a
        href={lesson.url ?? YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${label} on YouTube`}
        className="group block overflow-hidden rounded-[24px] border border-[#E2EAF5] bg-white p-2 shadow-[0_12px_32px_rgba(16,41,75,0.08)] transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-1.5 hover:border-[#9CCBF5] hover:shadow-[0_24px_50px_rgba(23,98,181,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
      >
        <span className="relative block aspect-video overflow-hidden rounded-[18px] bg-gradient-to-br from-[#10294B] to-[#1762B5]">
          {!failed && (
            <img
              src={lesson.image}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-[#10294B]/0 transition-colors duration-500 group-hover:bg-[#10294B]/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-gradient-to-br from-[#10294B] to-[#1762B5] text-white opacity-90 shadow-[0_10px_24px_rgba(23,98,181,0.45)] ring-4 ring-white/80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
              <FiPlay size={18} className="translate-x-[1px] fill-current" />
            </span>
          </span>
        </span>
        <span className="flex items-center justify-between px-2 pb-1 pt-3">
          <span className="flex items-center gap-2 text-sm font-extrabold text-[#10294B] transition-colors duration-300 group-hover:text-[#1762B5]">
            <FaYoutube size={18} className="text-[#FF0000]" aria-hidden="true" />
            {label}
          </span>
          <FiArrowUpRight className="text-[#6678A8] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1762B5]" />
        </span>
      </a>
    </motion.li>
  );
}

// LEARN WITH US ON YOUTUBE
export default function LearnYoutubeSection() {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  // Two columns drift in opposite directions while scrolling
  const colA = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const colB = useTransform(scrollYProgress, [0, 1], [-10, 50]);

  return (
    <section aria-labelledby="learn-yt-heading" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Content panel — premium: animated glow border + YouTube badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="relative rounded-[34px] p-[1.5px] shadow-[0_34px_80px_rgba(16,41,75,0.32)]"
        >
          {/* Rotating light around the border */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[34px]">
            <div className="absolute -inset-[60%] animate-[yt-border-spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#70C7FF_60deg,transparent_120deg,transparent_200deg,#FF0033_250deg,transparent_310deg)] opacity-70 motion-reduce:animate-none" />
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B2140] via-[#10294B] to-[#16478A] p-8 text-white sm:p-10">
            {/* Ambient light + fine grid */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#70C7FF]/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#FF0033]/10 blur-3xl" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
                maskImage: "radial-gradient(ellipse 80% 70% at 90% 0%, #000 20%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 90% 0%, #000 20%, transparent 70%)",
              }}
            />
            <FaYoutube aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-10 h-60 w-60 -rotate-12 text-white/[0.04]" />

            {/* Top row: YouTube badge + channel */}
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative isolate flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(255,0,51,0.35)]"
                >
                  <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-2xl bg-[#FF0033]/40 blur-xl" />
                  <FaYoutube size={34} className="relative text-[#FF0000]" aria-label="YouTube" />
                </motion.span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-bold">
                    Catalyst Education
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#70C7FF] text-[#10294B]">
                      <FiCheck size={10} strokeWidth={4} />
                    </span>
                  </p>
                  <p className="text-xs text-[#AFC0DA]">@catalysteduhub</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#DCEBFF] backdrop-blur">
                <FiBookOpen className="text-[#70C7FF]" /> Free Learning
              </span>
            </div>

            <h2 id="learn-yt-heading" className="relative mt-8 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              Learn With Us on
              <span className="block bg-gradient-to-r from-white via-[#BFE6FF] to-[#70C7FF] bg-clip-text text-transparent">
                YouTube
              </span>
            </h2>

            <p className="relative mt-4 text-sm leading-7 text-[#C9D6EA] sm:text-base">
              Discover engaging YouTube lessons that make commerce courses easier to
              understand — simple explanations and real exam guidance for CMA, ACCA
              and commerce studies.
            </p>

            <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Subjects covered">
              {subjects.map((subject) => (
                <li key={subject} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-bold text-[#DCEBFF] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#70C7FF]" />
                  {subject}
                </li>
              ))}
            </ul>

            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-5">
              <p className="text-sm font-semibold text-white">Don&apos;t miss out on free lessons!</p>
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#10294B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF0000] hover:text-white hover:shadow-[0_14px_30px_rgba(255,0,0,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
              >
                <FaYoutube size={20} className="text-[#FF0000] transition-colors duration-300 group-hover:text-white" />
                Subscribe Now
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Lesson grid */}
        <ul ref={gridRef} className="grid grid-cols-2 gap-4 sm:gap-6" aria-label="Free YouTube lessons">
          {lessons.map((lesson, index) => (
            <LessonThumb key={lesson.id} lesson={lesson} index={index} y={index % 2 === 0 ? colA : colB} />
          ))}
        </ul>
      </div>
    </section>
  );
}
