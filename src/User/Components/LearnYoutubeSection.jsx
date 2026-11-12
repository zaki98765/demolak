import { useState } from "react";
import { motion } from "motion/react";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { YOUTUBE_CHANNEL_URL } from "../Data/videos";

/*
  LEARN WITH US ON YOUTUBE
  Laid out like a channel playlist: one featured lesson + an "Up next" list.
  Thumbnails load from catalysthub.in. To link a lesson to its own video,
  add `url` (and optionally `title`) to it below; otherwise it opens the channel.
*/

const SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

const lessons = [
  { id: 1, image: "https://catalysthub.in/img/yutube/11.png" },
  { id: 2, image: "https://catalysthub.in/img/yutube/12.png" },
  { id: 3, image: "https://catalysthub.in/img/yutube/13.png" },
  { id: 4, image: "https://catalysthub.in/img/yutube/14.png" },
];

const lessonLabel = (lesson) => lesson.title ?? `Lesson ${lesson.id}`;

function Thumb({ lesson, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`relative block overflow-hidden bg-[#10294B] ${className}`}>
      {!failed && (
        <img
          src={lesson.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      )}
    </span>
  );
}

// LEARN WITH US ON YOUTUBE
export default function LearnYoutubeSection() {
  const [featured, ...upNext] = lessons;

  return (
    <section aria-labelledby="learn-yt-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading row */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#E2EAF5] pb-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#52617D]">
              <FaYoutube className="text-[#FF0000]" size={20} aria-hidden="true" />
              Free lessons from our faculty
            </p>
            <h2 id="learn-yt-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#10294B] sm:text-4xl">
              Learn with us on YouTube
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#52617D]">
              Short lessons that explain CMA, ACCA and commerce topics in plain
              language, with tips for the exam.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FF0000] px-5 text-sm font-bold text-white transition-colors hover:bg-[#D90000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0000]/25"
            >
              <FaYoutube size={18} aria-hidden="true" />
              Subscribe
            </a>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#10294B] underline decoration-[#C5D3E6] underline-offset-4 transition-colors hover:decoration-[#10294B]"
            >
              @catalysteduhub <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Playlist */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* Featured */}
          <motion.a
            href={featured.url ?? YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group block focus-visible:outline-none"
          >
            <span className="relative block">
              <Thumb lesson={featured} className="aspect-video rounded-2xl" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#10294B] shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-[#70C7FF]">
                  <FiPlay size={24} className="translate-x-0.5 fill-current" aria-hidden="true" />
                </span>
              </span>
            </span>
            <span className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-lg font-bold text-[#10294B] group-hover:underline group-hover:underline-offset-4">
                {lessonLabel(featured)}
              </span>
              <span className="shrink-0 text-sm text-[#52617D]">Watch on YouTube</span>
            </span>
          </motion.a>

          {/* Up next */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#52617D]">Up next</p>
            <ol className="mt-4 divide-y divide-[#E2EAF5]">
              {upNext.map((lesson, index) => (
                <li key={lesson.id}>
                  <a
                    href={lesson.url ?? YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 first:pt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
                  >
                    <span className="w-5 shrink-0 text-sm tabular-nums text-[#52617D]">{index + 2}</span>
                    <Thumb lesson={lesson} className="aspect-video w-36 shrink-0 rounded-lg sm:w-40" />
                    <span className="min-w-0">
                      <span className="block font-semibold text-[#10294B] group-hover:underline group-hover:underline-offset-4">
                        {lessonLabel(lesson)}
                      </span>
                      <span className="mt-0.5 block text-sm text-[#52617D]">Catalyst Education</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
