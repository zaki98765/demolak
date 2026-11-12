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
    image: "/images/catalyst-student-1.png",
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
    image: "/images/catalyst-student-2.png",
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
    image: "/images/catalyst-student-3.png",
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
  const currentHero = heroSlides[activeHero];
  const HeroFeatureIcon = currentHero.icon;
  const prefersReducedMotion = useReducedMotion();
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isHeroPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isHeroPaused]);

  const nextHero = () => {
    setActiveHero((current) => (current + 1) % heroSlides.length);
  };

  const prevHero = () => {
    setActiveHero((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">


        {/* HERO CAROUSEL */}
        <div
          className="relative overflow-hidden rounded-[28px] bg-[#10294B] shadow-[0_25px_70px_rgba(25,55,100,0.13)] sm:rounded-[36px]"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          onFocus={() => setIsHeroPaused(true)}
          onBlur={() => setIsHeroPaused(false)}
        >



          {/* FIXED BEST ROCC CENTRE BADGE */}
          <div className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 sm:block lg:bottom-7">
            <div className="flex items-center gap-3 rounded-full border border-[#D5A943]/50 bg-[#17385F]/90 px-5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE8A3] to-[#D5A943] text-[#10294B]">
                <FiAward size={17} />
              </div>

              <span className="text-xs font-extrabold tracking-wide text-white">
                BEST ROCC CENTRE
              </span>

              <span className="h-5 w-px bg-white/30" />

              <span className="rounded-full bg-[#D5A943] px-3 py-1 text-[10px] font-black tracking-wider text-[#10294B]">
                4 TIMES
              </span>
            </div>
          </div>



          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -right-12 -top-20 h-[420px] w-[420px] rounded-full border border-white/10" />

          <div className="pointer-events-none absolute bottom-0 right-0 h-full w-2/3 bg-gradient-to-l from-[#1762B5]/70 via-[#12447D]/40 to-transparent" />

          {/* Fixed-size slide container */}
          <div
            className="relative grid h-[960px] grid-cols-1 grid-rows-[560px_400px] sm:h-[900px] sm:grid-rows-[500px_400px] lg:h-[590px] lg:grid-cols-2 lg:grid-rows-1"
          >

            {/* LEFT CONTENT */}
            <div
              key={`content-${activeHero}`}
              className="relative z-20 flex h-full flex-col justify-center px-7 py-8 sm:px-12 lg:px-14 lg:py-12 animate-hero-content"
            >

              {/* Eyebrow */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#66D6FF]" />

                <span className="text-[10px] font-bold tracking-[0.18em] text-blue-100 sm:text-xs">
                  {currentHero.eyebrow}
                </span>
              </div>

              <p className="mb-3 text-sm font-semibold tracking-wide text-blue-200">
                CATALYST EDUCATION
              </p>

              {/* Fixed title area */}
              <div className="flex h-[165px] flex-col justify-center sm:h-[175px]">
                <h1 className="max-w-[560px] text-[34px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[40px] xl:text-[56px]">
                  {currentHero.title}
                  <span className="mt-1 block text-[#70C7FF]">
                    {currentHero.highlight}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className="mt-4 flex min-h-[100px] items-start">
                <p className="max-w-[510px] text-sm leading-7 text-blue-100/85 sm:text-base sm:leading-8">
                  {currentHero.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to={currentHero.primaryLink}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#12396B] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#DDF3FF]"
                >
                  {currentHero.primary}

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1456A0] text-white transition-transform group-hover:translate-x-1">
                    <FiArrowUpRight />
                  </span>
                </Link>

                <Link
                  to={currentHero.secondaryLink}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                >
                  {currentHero.secondary}
                  <FiArrowUpRight />
                </Link>
              </div>

              {/* Pagination */}
              <div className="mt-9 flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-white/60">
                  {String(activeHero + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      onClick={() => setActiveHero(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-pressed={activeHero === index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeHero === index
                        ? "w-10 bg-[#70C7FF]"
                        : "w-5 bg-white/30 hover:bg-white/60"
                        }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-bold tracking-widest text-white/40">
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE AREA */}


            <div className="relative flex h-full min-h-0 items-end justify-center overflow-hidden lg:items-center">

              {/* Main decorative circle */}
              <div className="absolute bottom-5 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#BCEBFF] to-[#4C9CEB] opacity-90 sm:h-[350px] sm:w-[350px] lg:bottom-8 lg:left-auto lg:right-10 lg:h-[410px] lg:w-[410px] lg:translate-x-0" />

              {/* Outer circle border */}
              <div className="absolute bottom-8 left-1/2 h-[270px] w-[270px] -translate-x-1/2 rounded-full border-[16px] border-white/20 sm:h-[320px] sm:w-[320px] lg:bottom-12 lg:left-auto lg:right-[55px] lg:h-[370px] lg:w-[370px] lg:translate-x-0" />

              {/* Student image — positioned behind floating cards */}
              <img
                key={`image-${activeHero}`}
                src={currentHero.image}
                alt={currentHero.imageAlt}
                className="relative z-10 h-full max-h-[440px] w-auto max-w-[95%] translate-x-5 object-contain object-bottom animate-hero-image sm:max-h-[460px] sm:translate-x-8 lg:max-h-[510px] lg:translate-x-5"
              />

              {/* Feature card 1 — overlaps the student's shoulder */}
              <div className="absolute left-3 top-10 z-20 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:flex lg:left-0 lg:top-[22%]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                  <HeroFeatureIcon size={22} />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-[#26345C]">
                    {currentHero.card1}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-500">
                    {currentHero.card1Sub}
                  </p>
                </div>
              </div>

              {/* Feature card 2 */}
              <div className="absolute bottom-16 right-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:flex lg:bottom-[18%] lg:right-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                  <FiBookOpen size={22} />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-[#26345C]">
                    {currentHero.card2}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-500">
                    {currentHero.card2Sub}
                  </p>
                </div>
              </div>

              {/* Image tag */}
              <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-[#0D3767]/85 px-4 py-2 text-[9px] font-bold tracking-[0.16em] text-white backdrop-blur-md sm:bottom-8 lg:bottom-7 lg:left-auto lg:right-16 lg:translate-x-0">
                {currentHero.tag}
              </div>

            </div>



            {/* Desktop arrows */}
            {/* <div className="absolute bottom-5 right-6 z-30 hidden items-center gap-2 sm:flex lg:bottom-7 lg:right-8">
              <button
                type="button"
                onClick={prevHero}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-[#12396B]"
              >
                <FiArrowLeft />
              </button>

              <button
                type="button"
                onClick={nextHero}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#12396B] transition hover:bg-[#70C7FF]"
              >
                <FiArrowRight />
              </button>
            </div> */}
          </div>
        </div>

        {/* COURSE STRIP */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b border-gray-100 pb-7 sm:gap-x-12 lg:justify-between lg:px-8">
          <p className="w-full text-center text-[10px] font-bold tracking-[0.2em] text-gray-400 lg:w-auto lg:text-left">
            EXPLORE YOUR CAREER PATH
          </p>

          {["CMA USA", "CMA INDIA", "ACCA", "CA", "CS", "EA"].map(
            (course) => (
              <Link
                key={course}
                to="/courses"
                className="text-sm font-extrabold tracking-wide text-[#52617D] transition hover:text-[#1762B5] sm:text-base"
              >
                {course}
              </Link>
            )
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
      @keyframes heroContent {
        from {
          opacity: 0;
          transform: translateY(18px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes heroImage {
        from {
          opacity: 0;
          transform: translateX(25px) scale(0.97);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      .animate-hero-content {
        animation: heroContent 0.65s ease both;
      }

      .animate-hero-image {
        animation: heroImage 0.75s ease both;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-hero-content,
        .animate-hero-image {
          animation: none;
        }
      }
    `}</style>
    </section>
  );
}
