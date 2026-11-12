import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight, FiPlay, FiX } from "react-icons/fi";
import { YOUTUBE_CHANNEL_URL, successVideos } from "../Data/videos";

/*
  SUCCESS STORIES — YouTube testimonials
  Cards glide right → left (CSS marquee, pauses on hover/focus). Clicking a
  card opens a modal player; the YouTube iframe only loads at that moment.
*/

const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function PlayBadge({ size = "lg" }) {
  const box = size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const icon = size === "lg" ? 26 : 20;
  return (
    <span className={`relative flex ${box} shrink-0 items-center justify-center`}>
      <span aria-hidden="true" className="absolute inset-0 animate-[fab-pulse_2.6s_ease-out_infinite] rounded-full bg-[#1762B5] motion-reduce:hidden" />
      <span className={`relative flex ${box} items-center justify-center rounded-full bg-gradient-to-br from-[#10294B] to-[#1762B5] text-white shadow-[0_12px_30px_rgba(23,98,181,0.45)] ring-4 ring-white/80`}>
        <FiPlay size={icon} className="translate-x-[2px] fill-current" />
      </span>
    </span>
  );
}

function VideoCard({ video, onPlay, hidden }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={() => onPlay(video)}
        tabIndex={hidden ? -1 : undefined}
        aria-label={`Play video: ${video.label}`}
        title={video.title}
        className="group block w-[300px] overflow-hidden rounded-[26px] border border-[#E2EAF5] bg-white p-2.5 text-left shadow-[0_12px_32px_rgba(16,41,75,0.07)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#9CCBF5] hover:shadow-[0_24px_50px_rgba(23,98,181,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60 sm:w-[380px]"
      >
        <span className="relative block aspect-video overflow-hidden rounded-[20px] bg-gradient-to-br from-[#10294B] to-[#1762B5]">
          <img
            src={thumb(video.id)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.02] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081830]/70 via-[#10294B]/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <PlayBadge />
          </span>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1762B5] backdrop-blur">
            {video.tag}
          </span>
        </span>
        <span className="flex items-center justify-between gap-3 px-2 pb-1.5 pt-4">
          <span className="line-clamp-2 min-h-[2.6rem] text-[15px] font-extrabold leading-snug text-[#10294B] transition-colors duration-300 group-hover:text-[#1762B5]">
            {video.label}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1762B5] transition-all duration-300 group-hover:bg-[#1762B5] group-hover:text-white">
            <FiPlay size={14} className="translate-x-[1px] fill-current" />
          </span>
        </span>
      </button>
    </li>
  );
}

function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!video) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#081830]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.label}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#10294B] shadow-lg transition-transform hover:rotate-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
            >
              <FiX size={20} />
            </button>
            <div className="aspect-video overflow-hidden rounded-[22px] bg-black shadow-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-white/90">{video.label}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// SUCCESS STORIES (VIDEOS)
export default function SuccessVideosSection() {
  const [active, setActive] = useState(null);
  const closeVideo = useCallback(() => setActive(null), []);
  if (successVideos.length === 0) return null;

  // Repeat so each half of the loop is wider than the screen
  const loop = Array.from({ length: Math.max(2, Math.ceil(8 / successVideos.length)) }, () => successVideos).flat();

  return (
    <section aria-labelledby="videos-heading" className="relative overflow-hidden bg-[#F7F8FC] py-14 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#70C7FF]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="flex items-center gap-5">
            <PlayBadge />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1762B5]">Watch on YouTube</p>
              <h2
                id="videos-heading"
                className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
              >
                Success <span className="text-[#1762B5]">Stories</span>
              </h2>
            </div>
          </div>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#10294B] to-[#1762B5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,98,181,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,98,181,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
          >
            More on our channel
            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Right → left stream */}
      <div className="video-marquee relative mt-8 py-4 sm:mt-10">
        <div className="video-track flex" style={{ "--duration": "48s" }}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 gap-6 pr-6">
              {loop.map((video, index) => (
                <VideoCard
                  key={`${copy}-${index}-${video.id}`}
                  video={video}
                  onPlay={setActive}
                  hidden={copy === 1 || index >= successVideos.length}
                />
              ))}
            </ul>
          ))}
        </div>
      </div>

      <VideoModal video={active} onClose={closeVideo} />
    </section>
  );
}
