import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

const heroSlides = [
  {
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: "Build Your Career With",
    highlight: "Global Qualifications",
    description:
      "Gain professional knowledge, learn from experienced mentors and prepare yourself for exciting opportunities in commerce and finance.",
    primary: "Explore Courses",
    primaryLink: "/courses",
    secondary: "Book Free Counselling",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-1.webp",
    imageAlt: "Graduate representing Catalyst Education students",
    card1: "Global Qualifications",
    card1Sub: "Professional learning pathways",
    card2: "Expert Mentorship",
    card2Sub: "Guidance throughout your journey",
    tag: "GLOBAL CAREER PATHWAYS",
    icon: FiGlobe,
  },
  {
    eyebrow: "LEARN FROM THE BEST",
    title: "Your Ambition Deserves",
    highlight: "Expert Guidance",
    description:
      "Get structured coaching, personal mentorship and academic support to move confidently towards your professional goals.",
    primary: "Meet Our Mentors",
    primaryLink: "/about",
    secondary: "Talk to Our Team",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-2.webp",
    imageAlt: "Student learning and preparing for a professional career",
    card1: "Experienced Faculty",
    card1Sub: "Learn with expert mentors",
    card2: "Personal Guidance",
    card2Sub: "Support throughout your journey",
    tag: "LEARN WITH CONFIDENCE",
    icon: FiUsers,
  },
  {
    eyebrow: "MAKE YOUR NEXT MOVE",
    title: "Turn Your Dreams Into",
    highlight: "A Successful Career",
    description:
      "Explore professional courses, develop practical skills and take confident steps towards a rewarding future in commerce.",
    primary: "Find Your Course",
    primaryLink: "/courses",
    secondary: "Get Career Guidance",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-3.webp",
    imageAlt: "Graduate celebrating an academic milestone",
    card1: "Career Focused",
    card1Sub: "Build practical knowledge",
    card2: "Career Support",
    card2Sub: "Guidance for your next step",
    tag: "SHAPE YOUR TOMORROW",
    icon: FiAward,
  },
];

// HERO CAROUSEL
export default function HeroSection() {
  const [activeHero, setActiveHero] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const currentHero = heroSlides[activeHero];
  const HeroFeatureIcon = currentHero.icon;

  useEffect(() => {
    if (prefersReducedMotion || isHeroPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isHeroPaused]);

  // Preload the other slide images so changes never flash
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-24 sm:pt-28 lg:pb-14 lg:pt-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Page heading for search engines & screen readers (slide titles change) */}
        <h1 className="sr-only">
          Catalyst Education — CMA USA, CMA India, ACCA, CA, CS and EA coaching in Kerala
        </h1>

        {/* HERO CAROUSEL */}
        <div
          className="relative isolate overflow-hidden rounded-[28px] bg-[#10294B] shadow-[0_25px_70px_rgba(25,55,100,0.13)] sm:rounded-[36px]"
          // Pause only for a real mouse hover or keyboard focus — touch taps
          // also fire mouseenter on phones and used to freeze autoplay.
          onPointerEnter={(e) => e.pointerType === "mouse" && setIsHeroPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setIsHeroPaused(false)}
          onFocus={(e) => e.target.matches(":focus-visible") && setIsHeroPaused(true)}
          onBlur={() => setIsHeroPaused(false)}
          aria-roledescription="carousel"
          aria-label="Catalyst Education highlights"
        >
          {/* Background decorations */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[520px] w-[520px] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 -z-10 h-[420px] w-[420px] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 -z-10 h-full w-full bg-gradient-to-t from-[#1762B5]/60 via-[#12447D]/30 to-transparent lg:w-2/3 lg:bg-gradient-to-l" />

          <div className="grid lg:min-h-[600px] lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT CONTENT — all slides share one grid cell, so the height
                always fits the longest slide (no overlap, no layout jump) */}
            <div className="relative z-20 flex flex-col justify-center px-5 pb-2 pt-7 sm:px-12 sm:pt-12 lg:px-14 lg:py-14">
              <div className="grid">
                {heroSlides.map((slide, index) => {
                  const isActive = index === activeHero;
                  return (
                    <div
                      key={slide.eyebrow}
                      aria-hidden={!isActive}
                      inert={!isActive ? true : undefined}
                      className={`[grid-area:1/1] transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                        isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                      }`}
                    >
                      {/* Eyebrow */}
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-[#66D6FF]" />
                        <span className="text-[10px] font-bold tracking-[0.18em] text-blue-100 sm:text-xs">
                          {slide.eyebrow}
                        </span>
                      </div>

                      <p className="mt-5 max-w-[580px] sm:mt-6 text-[clamp(1.85rem,1.1rem+3.2vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                        {slide.title}
                        <span className="block text-[#70C7FF]">{slide.highlight}</span>
                      </p>

                      <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-blue-100/85 sm:mt-5 sm:text-base sm:leading-8">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
                        <Link
                          to={slide.primaryLink}
                          tabIndex={isActive ? undefined : -1}
                          className="group inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-sm font-bold text-[#12396B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DDF3FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
                        >
                          {slide.primary}
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1456A0] text-white transition-transform group-hover:translate-x-0.5">
                            <FiArrowUpRight />
                          </span>
                        </Link>
                        <Link
                          to={slide.secondaryLink}
                          tabIndex={isActive ? undefined : -1}
                          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3.5 text-sm sm:px-6 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
                        >
                          {slide.secondary}
                          <FiArrowUpRight />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination — 44px tall hit areas around slim bars */}
              <div className="mt-4 flex items-center gap-3 sm:mt-8">
                <span className="text-xs font-bold tabular-nums tracking-widest text-white/80">
                  {String(activeHero + 1).padStart(2, "0")}
                </span>
                <div className="flex">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      onClick={() => setActiveHero(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={activeHero === index ? "true" : undefined}
                      className="group flex h-11 items-center px-1 focus-visible:outline-none"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#70C7FF] ${
                          activeHero === index ? "w-10 bg-[#70C7FF]" : "w-5 bg-white/35 group-hover:bg-white/60"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold tabular-nums tracking-widest text-white/70">
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE AREA */}
            <div className="relative flex h-[300px] items-end justify-center overflow-hidden sm:h-[440px] lg:h-auto lg:items-end">
              {/* Decorative circles */}
              <div aria-hidden="true" className="absolute bottom-6 left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#BCEBFF] to-[#4C9CEB] opacity-90 sm:h-[340px] sm:w-[340px] lg:bottom-12 lg:h-[400px] lg:w-[400px]" />
              <div aria-hidden="true" className="absolute bottom-9 left-1/2 h-[222px] w-[222px] -translate-x-1/2 rounded-full border-[14px] border-white/20 sm:h-[306px] sm:w-[306px] lg:bottom-[66px] lg:h-[360px] lg:w-[360px]" />

              {/* Student image */}
              <img
                key={`image-${activeHero}`}
                src={currentHero.image}
                srcSet={`${currentHero.image.replace(".webp", "-sm.webp")} 470w, ${currentHero.image} 917w`}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 370px, 250px"
                alt={currentHero.imageAlt}
                width="917"
                height="1100"
                fetchPriority={activeHero === 0 ? "high" : undefined}
                decoding="async"
                className="relative z-10 h-[94%] w-auto max-w-[92%] object-contain object-bottom animate-hero-image lg:h-[540px]"
              />

              {/* Feature card 1 */}
              <div className="absolute left-4 top-6 z-20 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:flex lg:left-2 lg:top-[20%]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                  <HeroFeatureIcon size={22} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#26345C]">{currentHero.card1}</p>
                  <p className="mt-0.5 text-[11px] text-[#52617D]">{currentHero.card1Sub}</p>
                </div>
              </div>

              {/* Feature card 2 */}
              <div className="absolute bottom-20 right-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:flex lg:bottom-[24%] lg:right-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                  <FiBookOpen size={22} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#26345C]">{currentHero.card2}</p>
                  <p className="mt-0.5 text-[11px] text-[#52617D]">{currentHero.card2Sub}</p>
                </div>
              </div>

              {/* ROCC badge */}
              <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 sm:bottom-6">
                <div className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-[#D5A943]/50 bg-[#17385F]/90 py-2 pl-2 pr-4 shadow-[0_8px_25px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:gap-3 sm:pr-5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE8A3] to-[#D5A943] text-[#10294B] sm:h-8 sm:w-8">
                    <FiAward size={15} />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wide text-white sm:text-xs">BEST ROCC CENTRE</span>
                  <span className="h-4 w-px bg-white/30" />
                  <span className="rounded-full bg-[#D5A943] px-2.5 py-0.5 text-[10px] font-black tracking-wider text-[#10294B]">4 TIMES</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COURSE STRIP */}
        <nav aria-label="Popular courses" className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-[#E2EAF5] pb-6 sm:gap-x-6 lg:justify-between lg:px-8">
          <p className="w-full pb-1 text-center text-[11px] font-bold tracking-[0.2em] text-[#52617D] lg:w-auto lg:pb-0 lg:text-left">
            EXPLORE YOUR CAREER PATH
          </p>
          {["CMA USA", "CMA INDIA", "ACCA", "CA", "CS", "EA"].map((course) => (
            <Link
              key={course}
              to="/courses"
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-extrabold tracking-wide text-[#26345C] transition hover:bg-[#EAF3FF] hover:text-[#1762B5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] sm:text-base"
            >
              {course}
            </Link>
          ))}
        </nav>
      </div>

      {/* ANIMATIONS */}
      <style>{`
      @keyframes heroImage {
        from { opacity: 0; transform: translateX(25px) scale(0.97); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      .animate-hero-image { animation: heroImage 0.75s cubic-bezier(0.16, 1, 0.3, 1) both; }
      @media (prefers-reduced-motion: reduce) {
        .animate-hero-image { animation: none; }
      }
    `}</style>
    </section>
  );
}
