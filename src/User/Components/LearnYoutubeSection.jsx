import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiBell, FiCheck, FiPlay } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { YOUTUBE_CHANNEL_URL } from "../Data/videos";

/*
  LEARN WITH US ON YOUTUBE
  Left: a sticky channel card (logo, handle, subscribe + links) like a YouTube
  channel / subscriptions panel. Right: the videos, sliding in as you scroll.
  Thumbnails load from catalysthub.in. Each title is the line printed on its
  thumbnail. To link a video, add `url` to it below; otherwise it opens the channel.
*/

const SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

const lessons = [
  {
    id: 1,
    title: "എന്റെ ലൈഫിലെ Best Decision!",
    image: "https://catalysthub.in/img/yutube/11.png",
  },
  {
    id: 2,
    title: "CMA-IND: ഇന്ത്യയിലെ നമ്പർ 1 ROCC-യിൽ നിന്നും പഠിക്കാം",
    image: "https://catalysthub.in/img/yutube/12.png",
  },
  {
    id: 3,
    title: "ഒരു Accounting Course തിരഞ്ഞെടുക്കുമ്പോൾ എന്തൊക്കെ ശ്രദ്ധിക്കണം",
    image: "https://catalysthub.in/img/yutube/13.png",
  },
  {
    id: 4,
    title: "CATALYST കൂടെയുള്ളപ്പോൾ CMA എന്ന സ്വപ്നം നേടിയെടുക്കാൻ ഞാനിപ്പോൾ Confident ആണ്",
    image: "https://catalysthub.in/img/yutube/14.png",
  },
];

const links = [
  { label: "Subscribe to the channel", href: SUBSCRIBE_URL, external: true, icon: FaYoutube, red: true },
  { label: "Visit @catalysteduhub", href: YOUTUBE_CHANNEL_URL, external: true, icon: FiArrowUpRight },
  { label: "Talk to a mentor", href: "/enquiry", icon: FiArrowUpRight },
];

function Thumb({ lesson }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="relative block aspect-video h-full w-full overflow-hidden rounded-[16px] bg-[#10294B] sm:aspect-auto">
      {!failed && (
        <img
          src={lesson.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-[#10294B]/0 transition-colors duration-300 group-hover:bg-[#10294B]/25" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-[#FF0000] text-white opacity-0 shadow-lg transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
          <FiPlay size={22} className="translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </span>
      {/* YouTube-style red progress bar on hover */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
        <span className="block h-full w-0 bg-[#FF0000] transition-[width] duration-700 ease-out group-hover:w-full" />
      </span>
    </span>
  );
}

function ChannelCard() {
  const [bell, setBell] = useState(false);

  return (
    <div className="rounded-[28px] border border-[#E2EAF5] bg-white p-6 shadow-[0_16px_40px_rgba(16,41,75,0.07)] sm:p-7">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E2EAF5] bg-white p-2.5 shadow-sm">
          <img src="/images/catalyst-logo.webp" alt="Catalyst Education" className="h-full w-full object-contain" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-lg font-extrabold leading-tight text-[#10294B]">
            Catalyst Education
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52617D] text-white" aria-hidden="true">
              <FiCheck size={10} strokeWidth={4} />
            </span>
          </p>
          <p className="mt-0.5 text-sm text-[#52617D]">@catalysteduhub</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#52617D]">
        Free lessons and success stories from our faculty and students. Subscribe so you never miss a new video.
      </p>

      <div className="mt-5 flex items-center gap-2.5">
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#FF0000] px-5 text-sm font-bold text-white transition-[background-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:bg-[#D90000] hover:shadow-[0_10px_24px_rgba(255,0,0,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0000]/25"
        >
          <FaYoutube size={18} aria-hidden="true" />
          Subscribe
        </a>
        <button
          type="button"
          onClick={() => setBell((value) => !value)}
          aria-pressed={bell}
          aria-label={bell ? "Notifications on" : "Turn on notifications"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,scale] duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1762B5]/20 ${
            bell ? "border-[#10294B] bg-[#10294B] text-white" : "border-[#E2EAF5] bg-[#F4F8FD] text-[#10294B] hover:border-[#C5D3E6]"
          }`}
        >
          <FiBell size={18} className={bell ? "fill-current" : ""} aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-6 divide-y divide-[#E2EAF5] border-t border-[#E2EAF5]">
        {links.map(({ label, href, external, icon: Icon, red }) => {
          const className =
            "group flex items-center justify-between gap-3 py-3.5 text-sm font-semibold text-[#10294B] transition-colors hover:text-[#1762B5] focus-visible:outline-none focus-visible:text-[#1762B5]";
          const content = (
            <>
              <span className="flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${red ? "bg-[#FF0000]/10 text-[#FF0000]" : "bg-[#EAF3FF] text-[#1762B5]"}`}>
                  <Icon size={15} aria-hidden="true" />
                </span>
                {label}
              </span>
              <FiArrowUpRight
                size={16}
                className="text-[#9AA8C0] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          );
          return (
            <li key={label}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                  {content}
                </a>
              ) : (
                <Link to={href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function VideoCard({ lesson, index, total }) {
  return (
    <a
      href={lesson.url ?? YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid h-full grid-cols-[112px_1fr] items-center gap-3 overflow-hidden rounded-[24px] border border-[#E2EAF5] bg-white p-2.5 shadow-[0_16px_40px_rgba(16,41,75,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] sm:grid-cols-[260px_1fr] sm:gap-4"
    >
      <div className="sm:h-full">
        <Thumb lesson={lesson} />
      </div>

      <div className="flex h-full min-w-0 flex-col py-1 pr-2">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF0000]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D90000]">
            <FaYoutube size={12} aria-hidden="true" /> Video
          </span>
          <span className="text-[11px] font-black tracking-[0.18em] text-[#66758F]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-2.5 line-clamp-3 text-[15px] font-extrabold leading-snug tracking-tight text-[#10294B] group-hover:text-[#1762B5] sm:text-lg">
          {lesson.title}
        </h3>

        <p className="mt-auto hidden items-center gap-2 pt-3 text-xs font-semibold text-[#55679A] sm:flex">
          <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-[#E2EAF5] bg-white p-0.5">
            <img src="/images/catalyst-logo.webp" alt="" className="h-full w-full object-contain" />
          </span>
          Catalyst Education · Watch on YouTube
        </p>
      </div>
    </a>
  );
}

// Stacking-cards scroll effect (same as "News from Catalyst"): each card pins
// while the next slides up over it, and earlier cards ease back.
const STACK_TOP = 112; // px from the viewport top where the first card pins
const STACK_GAP = 7; // px between cards in the list
const STACK_OFFSET = 7; // px each following card sits lower in the stack

function StackItem({ lesson, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const isLast = index === total - 1;

  return (
    <div
      className="sticky"
      style={{
        top: `calc(${STACK_TOP}px + ${index * STACK_OFFSET}px)`,
        // Every slot is one card + a 7px gap, so before any scrolling the cards read as a plain list
        height: isLast ? "var(--yt-card-h)" : `calc(var(--yt-card-h) + ${STACK_GAP}px)`,
      }}
    >
      <motion.div style={{ scale }} className="h-[var(--yt-card-h)] origin-top">
        <VideoCard lesson={lesson} index={index} total={total} />
      </motion.div>
    </div>
  );
}

function VideoStack() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: [`start ${STACK_TOP}px`, "end 260px"] });

  return (
    <div ref={stackRef} className="relative [--yt-card-h:128px] sm:[--yt-card-h:168px]">
      {lessons.map((lesson, index) => (
        <StackItem key={lesson.id} lesson={lesson} index={index} total={lessons.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

// LEARN WITH US ON YOUTUBE
export default function LearnYoutubeSection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="learn-yt-heading" className="overflow-x-clip bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-[#52617D]">
            <FaYoutube className="text-[#FF0000]" size={20} aria-hidden="true" />
            Free lessons from our faculty
          </p>
          <h2 id="learn-yt-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl">
            Learn with us on YouTube
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-[#52617D]">
            Short videos that explain CMA, ACCA and commerce topics in plain language, with tips for the exam.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[340px_1fr] lg:items-start lg:gap-10">
          {/* Channel panel — stays in view while the videos scroll past */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:sticky lg:top-28"
          >
            <ChannelCard />
          </motion.div>

          {/* Videos stack up as you scroll */}
          {reduce ? (
            <div className="space-y-[7px]">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="h-[128px] sm:h-[168px]">
                  <VideoCard lesson={lesson} index={index} total={lessons.length} />
                </div>
              ))}
            </div>
          ) : (
            <VideoStack />
          )}
        </div>
      </div>
    </section>
  );
}
