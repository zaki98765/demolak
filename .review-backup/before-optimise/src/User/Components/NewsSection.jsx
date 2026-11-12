import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiAward, FiCalendar, FiStar, FiSun } from "react-icons/fi";
import { news } from "../Data/news";

/*
  NEWS & HIGHLIGHTS — stacking-cards scroll effect.
  Each card pins near the top while the next one slides up over it; earlier
  cards ease back (scale down) as you keep scrolling. Static list for
  reduced-motion users.
*/

const categoryIcons = {
  Achievement: FiAward,
  "Student success": FiStar,
  "Campus life": FiSun,
};

function NewsImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-full min-h-[200px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5]">
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081830]/40 to-transparent" />
    </div>
  );
}

function NewsCard({ item, index, total }) {
  const Icon = categoryIcons[item.category] ?? FiStar;

  return (
    <article className="group grid h-full overflow-hidden rounded-[30px] border border-[#E2EAF5] bg-white p-3 shadow-[0_24px_60px_rgba(16,41,75,0.12)] sm:grid-cols-[1.05fr_1fr] sm:gap-2">
      <div className="h-52 sm:h-auto">
        <NewsImage src={item.image} alt={item.imageAlt} />
      </div>

      <div className="flex flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1762B5]">
            <Icon size={12} /> {item.category}
          </span>
          <span className="text-xs font-black tracking-[0.18em] text-[#C5D3E6]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-[#10294B] sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#52617D]">{item.summary}</p>

        <div className="mt-auto pt-5">
          {item.date && (
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#6678A8]">
              <FiCalendar size={13} /> {item.date}
            </p>
          )}
          <span className="block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-all duration-500 group-hover:w-24" />
        </div>
      </div>
    </article>
  );
}

const STACK_TOP = 96; // px from the viewport top where the first card pins
const STACK_OFFSET = 26; // px each following card sits lower in the stack

function StackItem({ item, index, total, progress }) {
  // Earlier cards shrink a little more so the stack reads as layered
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  // Each slot = card height + the offset still to come, so every card's
  // (top + slot height) is identical: all cards release together and the
  // section ends with the stack in its final layered position.
  const remaining = total - 1 - index;

  return (
    <div
      className="sticky"
      style={{
        top: `calc(${STACK_TOP}px + ${index * STACK_OFFSET}px)`,
        height: `calc(var(--news-card-h) + ${remaining * STACK_OFFSET}px)`,
      }}
    >
      <motion.div style={{ scale }} className="h-[var(--news-card-h)] origin-top">
        <NewsCard item={item} index={index} total={total} />
      </motion.div>
    </div>
  );
}

function NewsStack() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <div ref={stackRef} className="relative [--news-card-h:480px] sm:[--news-card-h:340px]">
      {news.map((item, index) => (
        <StackItem
          key={item.id}
          item={item}
          index={index}
          total={news.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

// NEWS & HIGHLIGHTS
export default function NewsSection() {
  const prefersReducedMotion = useReducedMotion();
  if (news.length === 0) return null;

  return (
    <section
      aria-labelledby="news-heading"
      className="relative overflow-x-clip bg-gradient-to-b from-white to-[#F7FAFF] py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#70C7FF]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Heading — stays in view on desktop while the cards stack */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
              News &amp; highlights
            </span>
            <h2
              id="news-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
            >
              News from
              <span className="text-[#1762B5]"> Catalyst</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#52617D] sm:text-base">
              Recognitions, student successes and campus moments we&apos;re proud of.
            </p>
            <Link
              to="/news-events"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#DCE7F5] bg-white px-6 py-3 text-sm font-bold text-[#1762B5] transition-colors duration-300 hover:border-[#1762B5] hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
            >
              View all news &amp; events
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        {prefersReducedMotion ? (
          <div className="space-y-6">
            {news.map((item, index) => (
              <div key={item.id} className="sm:h-[340px]">
                <NewsCard item={item} index={index} total={news.length} />
              </div>
            ))}
          </div>
        ) : (
          <NewsStack />
        )}
      </div>
    </section>
  );
}
