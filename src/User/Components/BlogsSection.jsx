import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiCompass,
  FiEdit3,
  FiTrendingUp,
} from "react-icons/fi";
import { BLOGS_PATH, blogs } from "../Data/blogs";

/*
  BLOGS — "Knowledge hub"
  Four posts in a compact 2x2 grid. Cards use real cover images when `cover`
  is set in Data/blogs.js, otherwise a branded navy cover.
  Scroll animation: tied to scroll position — left cards slide in from the left,
  right cards from the right, rising and scaling up as they enter.
*/

const ease = [0.16, 1, 0.3, 1];

const categoryIcons = {
  "Career guidance": FiCompass,
  "Professional courses": FiTrendingUp,
  "Course guide": FiBookOpen,
  "Student guide": FiEdit3,
};

function Cover({ post, large = false }) {
  const Icon = categoryIcons[post.category] ?? FiBookOpen;

  if (post.cover) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#10294B]">
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Brand tint for legibility */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081830]/75 via-[#10294B]/15 to-transparent" />
        <div className={`absolute ${large ? "bottom-6 left-6" : "bottom-2.5 left-2.5"}`}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full bg-white/15 font-bold text-white ring-1 ring-white/25 backdrop-blur-md ${
              large ? "px-3.5 py-1.5 text-sm" : "px-2 py-1 text-[10px]"
            }`}
          >
            <Icon size={large ? 15 : 11} className="text-[#70C7FF]" />
            {post.coverLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0B2140] via-[#10294B] to-[#1762B5]">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#70C7FF]/25 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: large ? "40px 40px" : "24px 24px",
        }}
      />
      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className={`absolute -rotate-12 text-white/[0.08] transition-transform duration-700 ease-out group-hover:-rotate-3 group-hover:scale-110 ${
          large ? "-bottom-10 -right-6 h-64 w-64" : "-bottom-5 -right-4 h-28 w-28"
        }`}
      />
      <div className={`absolute ${large ? "bottom-7 left-7" : "bottom-3 left-3"}`}>
        <span
          className={`flex items-center justify-center rounded-2xl bg-white/10 text-[#70C7FF] ring-1 ring-white/15 backdrop-blur ${
            large ? "mb-4 h-12 w-12" : "mb-2 h-8 w-8 rounded-xl"
          }`}
        >
          <Icon size={large ? 22 : 15} />
        </span>
        <p className={`font-black tracking-tight text-white ${large ? "text-3xl sm:text-4xl" : "text-sm"}`}>
          {post.coverLabel}
        </p>
      </div>
    </div>
  );
}

function CategoryChip({ children }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1762B5]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#1762B5]" />
      {children}
    </span>
  );
}

function BlogCard({ post, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 98%", "start 62%"] });

  const fromLeft = index % 2 === 0;
  const x = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : fromLeft ? -60 : 60, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [reduce ? 1 : 0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);

  return (
    <motion.li ref={ref} style={{ x, y, opacity, scale }} className="will-change-transform">
      <Link
        to={post.path}
        className="group grid h-full grid-cols-[104px_1fr] items-center gap-3 rounded-[22px] border border-[#E2EAF5] bg-white p-2 shadow-[0_8px_24px_rgba(16,41,75,0.06)] transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-1 hover:border-[#9CCBF5] hover:shadow-[0_18px_40px_rgba(23,98,181,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60 motion-reduce:hover:translate-y-0 sm:grid-cols-[148px_1fr] sm:gap-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-[16px] sm:aspect-[5/4]">
          <Cover post={post} />
        </div>

        <div className="min-w-0 py-1 pr-2">
          <CategoryChip>{post.category}</CategoryChip>
          <h3 className="mt-2 line-clamp-2 text-[15px] font-extrabold leading-snug tracking-tight text-[#10294B] transition-colors duration-300 group-hover:text-[#1762B5] sm:text-base">
            {post.title}
          </h3>
          <p className="mt-1 hidden text-[13px] leading-5 text-[#52617D] sm:block">
            <span className="line-clamp-2">{post.excerpt}</span>
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1762B5] sm:text-[13px]">
            Read article<span className="sr-only">: {post.title}</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

// BLOGS
export default function BlogsSection() {
  if (blogs.length === 0) return null;
  const posts = blogs.slice(0, 4);

  return (
    <section aria-labelledby="blogs-heading" className="relative overflow-x-clip bg-gradient-to-b from-white to-[#F7FAFF] py-10 sm:py-12 lg:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#70C7FF]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
              Knowledge hub
            </span>
            <h2 id="blogs-heading" className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl">
              Ideas and insights for
              <span className="text-[#1762B5]"> your next step</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#52617D] sm:text-base">
              Career guidance, course explainers and study tips from the Catalyst team.
            </p>
          </div>

          <Link
            to={BLOGS_PATH}
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#DCE7F5] bg-white px-6 py-3 text-sm font-bold text-[#1762B5] transition-colors duration-300 hover:border-[#1762B5] hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
          >
            Explore all articles
            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <ul className="mt-6 grid gap-[7px] sm:mt-8 lg:grid-cols-2">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
