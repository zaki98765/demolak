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

  Campus photos are served from the live site (catalysthub.in/img/centers).
  To self-host, download them into /public/images/campuses/ and update the paths.
*/

const campusImages = {
  Calicut: "https://catalysthub.in/img/centers/calicut.jpeg",
  Vadakara: "https://catalysthub.in/img/centers/vadakara.jpg.jpeg",
  Kannur: "https://catalysthub.in/img/centers/kaanur-campus-storefrontphoto.jpg.jpeg",
  Manjeri: "https://catalysthub.in/img/centers/manjeri.jpg.jpeg",
  Kottakkal: "https://catalysthub.in/img/centers/kottakkal2.webp",
  Perinthalmanna: "https://catalysthub.in/img/centers/perinthalmanna2.jpeg",
  Thrissur: "https://catalysthub.in/img/centers/catalyst-education-thrissur-campus.webp",
  Kochi: "https://catalysthub.in/img/centers/kochi2.jpeg",
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
      aria-label={`Explore ${campus.name} campus`}
      className={`group relative block shrink-0 overflow-hidden rounded-[28px] bg-[#10294B] shadow-[0_16px_40px_rgba(16,41,75,0.14)] transition-shadow duration-500 hover:shadow-[0_28px_60px_rgba(16,41,75,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60 ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={`Catalyst Education ${campus.name} campus`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-115"
        />
      ) : (
        // No photo yet: branded navy panel
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5]">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#70C7FF]/25 blur-3xl" />
          <FiMapPin className="absolute -right-6 top-14 h-48 w-48 -rotate-12 text-white/[0.06]" strokeWidth={1} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#081830] via-[#10294B]/35 to-transparent" />

      {/* Index */}
      <span className="absolute left-6 top-5 text-sm font-black tracking-[0.2em] text-white/80">
        {pad(index + 1)}
      </span>

      {/* Arrow */}
      <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#10294B]">
        <FiArrowUpRight size={18} />
      </span>

      {/* Details */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#70C7FF]">
          <FiMapPin size={12} /> Catalyst Campus
        </p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-tight">{campus.name}</h3>
        {campus.address && (
          <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-6 text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100">
            {campus.address}
          </p>
        )}
        <span className="mt-4 block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-all duration-500 group-hover:w-24" />
      </div>
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
      <span className="text-sm font-bold tabular-nums text-[#8EA3C4]">{pad(campuses.length)}</span>
    </div>
  );

  return (
    <div ref={outerRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-7xl px-8">
          <Heading counter={counter} />
        </div>

        <div ref={viewportRef} className="mx-auto mt-10 w-full max-w-7xl px-8">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 will-change-transform">
            <IntroCard className="h-[min(460px,56vh)] w-[320px]" />
            {campuses.map((campus, index) => (
              <CampusCard
                key={campus.name}
                campus={campus}
                index={index}
                className={`h-[min(460px,56vh)] w-[340px] ${index % 2 === 0 ? "lg:translate-y-6" : "lg:-translate-y-6"}`}
              />
            ))}
            {/* breathing room at the end of the track */}
            <span aria-hidden="true" className="w-8 shrink-0" />
          </motion.div>
        </div>

        <p className="mx-auto mt-10 flex w-full max-w-7xl items-center gap-2 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#8EA3C4]">
          Scroll to explore <FiArrowRight />
        </p>
      </div>
    </div>
  );
}

/* ---------- mobile / reduced motion: swipe row ---------- */
function SwipeGallery() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Heading
            counter={
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8EA3C4]">
                Swipe to explore <FiArrowRight />
              </p>
            }
          />
        </Reveal>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-4 sm:scroll-px-8 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        <IntroCard className="h-[400px] w-[78vw] max-w-[320px] snap-start" />
        {campuses.map((campus, index) => (
          <CampusCard
            key={campus.name}
            campus={campus}
            index={index}
            className="h-[400px] w-[78vw] max-w-[320px] snap-start"
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
