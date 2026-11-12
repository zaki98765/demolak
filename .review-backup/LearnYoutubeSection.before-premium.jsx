import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiBookOpen, FiPlay, FiYoutube } from "react-icons/fi";
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
          <span className="text-sm font-extrabold text-[#10294B] transition-colors duration-300 group-hover:text-[#1762B5]">
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
        {/* Content panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5] p-8 text-white shadow-[0_30px_70px_rgba(16,41,75,0.28)] sm:p-10"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#70C7FF]/25 blur-3xl" />
          <FiYoutube aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 -rotate-12 text-white/[0.06]" />

          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#DCEBFF]">
            <FiBookOpen className="text-[#70C7FF]" /> Free Learning
          </span>

          <h2 id="learn-yt-heading" className="relative mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Learn With Us on
            <span className="text-[#70C7FF]"> YouTube</span>
          </h2>

          <p className="relative mt-4 text-sm leading-7 text-[#C9D6EA] sm:text-base">
            Discover engaging YouTube lessons that make commerce courses easier to
            understand — simple explanations and real exam guidance for CMA, ACCA
            and commerce studies.
          </p>

          <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Subjects covered">
            {subjects.map((subject) => (
              <li key={subject} className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-xs font-bold text-[#DCEBFF]">
                {subject}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold text-white">Don&apos;t miss out on free lessons!</p>
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#10294B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DDF3FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
            >
              <FiYoutube size={18} className="text-[#1762B5]" />
              Subscribe Now
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
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
