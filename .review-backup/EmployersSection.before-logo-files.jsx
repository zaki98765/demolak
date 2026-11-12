import { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiGlobe, FiTrendingUp } from "react-icons/fi";
import Reveal from "./shared/Reveal";

/*
  EMPLOYER LOGO WALL
  ------------------
  Logos load from /public/images/employers/<file>. Use each company's
  official logo from its press / brand-assets page and follow its brand
  guidelines. Until a file exists, the company name is shown instead.
  Prefer SVG; PNG with a transparent background also works.
*/
const employers = [
  { name: "EY", logo: "/images/employers/ey.svg" },
  { name: "JPMorgan Chase", logo: "/images/employers/jpmorgan-chase.svg" },
  { name: "KPMG", logo: "/images/employers/kpmg.svg" },
  { name: "Aon", logo: "/images/employers/aon.svg" },
  { name: "AYA", logo: "/images/employers/aya.svg" },
  { name: "Caterpillar", logo: "/images/employers/caterpillar.svg" },
  { name: "Maersk", logo: "/images/employers/maersk.svg" },
  { name: "MetLife", logo: "/images/employers/metlife.svg" },
  { name: "Philips", logo: "/images/employers/philips.svg" },
  { name: "Tata", logo: "/images/employers/tata.svg" },
  { name: "AIG", logo: "/images/employers/aig.svg" },
  { name: "Capgemini", logo: "/images/employers/capgemini.svg" },
];

const rows = [
  { items: employers.slice(0, 6), direction: "normal", duration: "38s" },
  { items: employers.slice(6), direction: "reverse", duration: "42s" },
];

const highlights = [
  { icon: FiGlobe, label: "Global organisations" },
  { icon: FiBriefcase, label: "Finance, audit & risk roles" },
  { icon: FiTrendingUp, label: "Career guidance from day one" },
];

function EmployerLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span className="px-2 text-center text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#52617D] transition-colors duration-300 group-hover:text-[#1762B5]">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-8 w-[120px] object-contain opacity-70 grayscale sm:h-9 sm:w-[136px] transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  );
}

const tiltSpring = { stiffness: 220, damping: 18, mass: 0.6 };

function LogoCard({ employer }) {
  const prefersReducedMotion = useReducedMotion();

  // Pointer position inside the card, -0.5 → 0.5
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [16, -16]), tiltSpring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-20, 20]), tiltSpring);
  const glareX = useTransform(pointerX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(180px circle at ${glareX}% ${glareY}%, rgba(112, 199, 255, 0.28), transparent 65%)`;

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <li className="shrink-0 [perspective:700px]">
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="logo-card group relative flex h-[84px] w-[170px] items-center justify-center rounded-2xl border border-[#E2EAF5] bg-white shadow-[0_6px_20px_rgba(16,41,75,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#9CCBF5] hover:shadow-[0_22px_45px_rgba(23,98,181,0.18)] sm:h-[92px] sm:w-[200px]"
      >
        {/* Pointer-following glare */}
        <motion.span
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Logo pops forward in 3D */}
        <span
          className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ transform: "translateZ(36px)" }}
        >
          <EmployerLogo {...employer} />
        </span>
      </motion.div>
    </li>
  );
}

// EMPLOYER BRAND SHOWCASE
export default function EmployersSection() {
  return (
    <section
      aria-labelledby="employers-heading"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] -translate-x-1/2 rounded-full bg-[#EAF3FF]/70 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading row */}
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
                Career outcomes
              </span>

              <h2
                id="employers-heading"
                className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
              >
                Where Catalyst students
                <span className="text-[#1762B5]"> build global careers</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#52617D] sm:text-base">
                From the Big Four to global banks, insurers and multinationals,
                professional qualifications open doors to organisations around
                the world.
              </p>
            </div>

            <Link
              to="/success-stories"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#10294B] to-[#1762B5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,98,181,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,98,181,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
            >
              See success stories
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Logo wall */}
        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-[32px] border border-[#E2EAF5] bg-[#F7F9FD] py-8 sm:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(23,98,181,0.13) 1px, transparent 1.3px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 80%)",
              }}
            />

            <p className="relative text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#6678A8]">
              Our students&apos; career destinations
            </p>

            <div className="relative mt-4 space-y-1 sm:mt-6 sm:space-y-2">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="logo-marquee py-5">
                  <div
                    className="logo-track flex"
                    data-direction={row.direction}
                    style={{ "--duration": row.duration }}
                  >
                    {[0, 1].map((copy) => (
                      <ul
                        key={copy}
                        aria-hidden={copy === 1 ? true : undefined}
                        className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
                      >
                        {row.items.map((employer) => (
                          <LogoCard
                            key={`${copy}-${employer.name}`}
                            employer={employer}
                          />
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Highlights */}
        <Reveal>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[#E2EAF5] bg-white px-4 py-2 text-xs font-semibold text-[#26345C] shadow-sm sm:text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1762B5]">
                  <Icon size={13} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
