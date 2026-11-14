import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import Reveal from "./shared/Reveal";
import { campuses } from "../Data/campuses";

/*
  CAMPUSES — SCROLL-DRIVEN GALLERY
  Desktop (≥1024px): the section pins while the page scrolls and the campus
  cards travel horizontally, with a progress bar and counter.
  Mobile / reduced motion: a native swipe row with scroll-snap.

  Campus photos: /public/images/campuses/<slug>.webp (from the Catalyst
  resources Drive folder "Campus Photos"). Add a file + entry for new campuses.
*/

const campusImages = {
  Calicut: "/images/campuses/calicut.webp",
  Vadakara: "/images/campuses/vadakara.webp",
  Kannur: "/images/campuses/kannur.webp",
  Manjeri: "/images/campuses/manjeri.webp",
  Kottakkal: "/images/campuses/kottakkal.webp",
  Perinthalmanna: "/images/campuses/perinthalmanna.webp",
  Thrissur: "/images/campuses/thrissur.webp",
  Kochi: "/images/campuses/kochi.webp",
  Edappal: "/images/campuses/edappal.webp",
};

const pad = (n) => String(n).padStart(2, "0");

/* ---------- media query hook ---------- */
function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ---------- cards ---------- */
function IntroCard({ className = "" }) {
  return (
    <div
      className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5] p-7 text-white shadow-[0_24px_60px_rgba(16,41,75,0.25)] ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#70C7FF]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[40px] border-white/[0.05]" />

      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#DCEBFF]">
        <FiMapPin className="text-[#70C7FF]" /> Across Kerala
      </span>

      <div className="relative">
        <p className="text-7xl font-black leading-none tracking-tight">
          {pad(campuses.length)}
        </p>
        <p className="mt-3 text-xl font-bold">Campuses near you</p>
        <p className="mt-2 text-sm leading-6 text-[#C9D6EA]">
          The same quality of teaching and mentorship at every Catalyst campus.
        </p>
      </div>

      <Link
        to="/campuses"
        className="group/cta relative inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#10294B] transition-colors hover:bg-[#DDF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF]"
      >
        Explore campuses
        <FiArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
      </Link>
    </div>
  );
}

function CampusCard({ campus, index, className = "" }) {
  const image = campusImages[campus.name];

  return (
    <Link
      to={campus.path}
      className={`group relative flex shrink-0 flex-col overflow-hidden rounded-[28px] border border-[#E2EAF5] bg-white p-2.5 shadow-[0_16px_40px_rgba(16,41,75,0.08)] transition-[box-shadow,border-color] duration-500 hover:border-[#9CCBF5] hover:shadow-[0_28px_60px_rgba(23,98,181,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60 ${className}`}
    >
      {/* Photo — shown at its natural 5:3 ratio */}
      <div className="relative aspect-[5/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#10294B] to-[#1762B5]">
        {image && (
          <img
            src={image}
            alt={`Catalyst Education ${campus.name} campus`}
            width="500"
            height="300"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081830]/45 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black tracking-[0.16em] text-[#10294B] backdrop-blur">
          {pad(index + 1)}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#10294B]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
          <FiMapPin size={11} className="text-[#70C7FF]" /> Catalyst Campus
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 items-start gap-4 px-3 pb-3 pt-5">
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-extrabold tracking-tight text-[#10294B] transition-colors duration-300 group-hover:text-[#1762B5]">
            {campus.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 min-h-[3rem] text-sm leading-6 text-[#52617D]">
            {campus.address || "Address coming soon"}
          </p>
        </div>
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1762B5] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-500 group-hover:rotate-45 group-hover:bg-gradient-to-br group-hover:from-[#10294B] group-hover:to-[#1762B5] group-hover:text-white">
          <FiArrowUpRight size={18} />
        </span>
      </div>

      <span className="mx-3 mb-2 block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-500 group-hover:w-24" />
    </Link>
  );
}

function Heading({ counter }) {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
          Our campuses
        </span>
        <h2
          id="campuses-heading"
          className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
        >
          A place to learn,
          <span className="text-[#1762B5]"> connect and grow.</span>
        </h2>
      </div>
      {counter}
    </div>
  );
}

/* ---------- desktop: pinned horizontal scroll ---------- */
const INTRO_W = 300; // the fixed "09 campuses" card
const CARD_W = 380;
const GAP = 24;
const LEAD = INTRO_W + GAP; // where the first card starts

// A card in the moving row. As it reaches the fixed intro card it shrinks and
// fades, so it looks like it slips inside that card.
function TrackCard({ campus, index, x }) {
  const left = LEAD + index * (CARD_W + GAP);
  const t = useTransform(x, (v) => Math.min(1, Math.max(0, (LEAD - (left + v)) / CARD_W)));
  const scale = useTransform(t, [0, 1], [1, 0.88]);
  const opacity = useTransform(t, [0, 1], [1, 0.35]);
  return (
    <motion.div style={{ scale, opacity, transformOrigin: "left center" }} className="shrink-0">
      <CampusCard campus={campus} index={index} className="h-full w-[380px]" />
    </motion.div>
  );
}

function PinnedGallery() {
  const outerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(1);

  // Measure how far the track must travel (ResizeObserver also fires on first observe)
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return undefined;

    const observer = new ResizeObserver(() => {
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    });
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 140, damping: 30, mass: 0.35 });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(campuses.length, Math.max(1, Math.round(value * (campuses.length - 1)) + 1)));
  });

  const counter = (
    <div className="flex w-full max-w-xs items-center gap-4" aria-hidden="true">
      <span className="text-sm font-black tabular-nums text-[#10294B]">{pad(active)}</span>
      <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#DCE6F3]">
        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF]"
        />
      </span>
      <span className="text-sm font-bold tabular-nums text-[#5F6F8C]">{pad(campuses.length)}</span>
    </div>
  );

  return (
    <div ref={outerRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-7xl px-8">
          <Heading counter={counter} />
        </div>

        <div ref={viewportRef} className="relative mx-auto mt-10 w-full max-w-7xl px-8">
          {/* Fixed card: stays put while every campus slides in behind it */}
          <div className="absolute bottom-0 left-8 top-0 z-20 w-[300px]">
            <IntroCard className="h-full w-full" />
          </div>

          {/* Clip on the left edge of the intro card only (the row may bleed off the right) */}
          <div className="[clip-path:inset(-40px_-100vw_-40px_0)]">
            <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-6 will-change-transform">
              <span aria-hidden="true" className="w-[300px] shrink-0" />
              {campuses.map((campus, index) => (
                <TrackCard key={campus.name} campus={campus} index={index} x={x} />
              ))}
              {/* breathing room at the end of the track */}
              <span aria-hidden="true" className="w-8 shrink-0" />
            </motion.div>
          </div>
        </div>

        <p className="mx-auto mt-10 flex w-full max-w-7xl items-center gap-2 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6F8C]">
          Scroll to explore <FiArrowRight />
        </p>
      </div>
    </div>
  );
}

/* ---------- mobile / reduced motion: swipe row ---------- */
function SwipeGallery() {
  return (
    <div className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Heading
            counter={
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6F8C]">
                Swipe to explore <FiArrowRight />
              </p>
            }
          />
        </Reveal>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory sm:mt-10 scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-4 sm:scroll-px-8 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        <IntroCard className="w-[82vw] max-w-[340px] snap-start" />
        {campuses.map((campus, index) => (
          <CampusCard
            key={campus.name}
            campus={campus}
            index={index}
            className="w-[82vw] max-w-[340px] snap-start"
          />
        ))}
        <span aria-hidden="true" className="w-1 shrink-0" />
      </div>
    </div>
  );
}

// CAMPUSES
export default function CampusesSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="campuses-heading"
      className="relative overflow-x-clip bg-[#F7F8FC]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#70C7FF]/10 blur-3xl" />
      {isDesktop && !prefersReducedMotion ? <PinnedGallery /> : <SwipeGallery />}
    </section>
  );
}
