import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiGlobe, FiTrendingUp } from "react-icons/fi";
import Reveal from "./shared/Reveal";

/*
  EMPLOYER LOGO WALL
  ------------------
  Logos live in /public/images/employers/ as transparent PNGs, trimmed
  to the mark. `size` balances visual weight between square marks and
  long wordmarks so every card looks equally full.
*/
const logoSizes = {
  square: "h-12 sm:h-14", // AXA, EY, Philips, Tata
  medium: "h-9 sm:h-10", // AIG, Aon, KPMG
  wide: "h-8 sm:h-9", // Maersk, MetLife, Capgemini
  wordmark: "h-6 sm:h-7", // Caterpillar, JPMorgan Chase
};

const employers = [
  { name: "EY", logo: "/images/employers/ey.png", size: "square" },
  { name: "JPMorgan Chase", logo: "/images/employers/jpmorgan-chase.png", size: "wordmark" },
  { name: "KPMG", logo: "/images/employers/kpmg.png", size: "medium" },
  { name: "Aon", logo: "/images/employers/aon.png", size: "medium" },
  { name: "AXA", logo: "/images/employers/axa.png", size: "square" },
  { name: "Caterpillar", logo: "/images/employers/caterpillar.png", size: "wordmark" },
  { name: "Maersk", logo: "/images/employers/maersk.png", size: "wide" },
  { name: "MetLife", logo: "/images/employers/metlife.png", size: "wide" },
  { name: "Philips", logo: "/images/employers/philips.png", size: "square" },
  { name: "Tata", logo: "/images/employers/tata.png", size: "square" },
  { name: "AIG", logo: "/images/employers/aig.png", size: "medium" },
  { name: "Capgemini", logo: "/images/employers/capgemini.png", size: "wide" },
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

function LogoCard({ employer }) {
  return (
    <li className="group flex h-[84px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-[#E2EAF5] bg-white px-5 shadow-[0_6px_20px_rgba(16,41,75,0.04)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.06] hover:border-[#9CCBF5] hover:shadow-[0_18px_40px_rgba(23,98,181,0.16)] motion-reduce:transform-none sm:h-[96px] sm:w-[200px]">
      <img
        src={employer.logo}
        alt={employer.name}
        loading="lazy"
        draggable="false"
        className={`${logoSizes[employer.size]} w-auto max-w-full select-none object-contain opacity-60 grayscale transition duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:group-hover:scale-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:grayscale-0`}
      />
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
