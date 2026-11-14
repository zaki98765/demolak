import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiChevronDown,
  FiChevronRight,
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { campuses } from "../Data/campuses";

/*
  CATALYST EDUCATION — FOOTER
  Replace every "#" below with the real social / app-store URLs before launch.
*/

const tagline =
  "India’s leading commerce platform, built to shape a better future.";

const headquarters = {
  title: "Head Quarters",
  address: "Happy Tower, Bypass Junction, Mankave, Kozhikode, Kerala 673007",
};

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
  { label: "Get it on Google Play", icon: FaGooglePlay, href: "#" },
  { label: "Download on the App Store", icon: FaApple, href: "#" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Blog & Insights", path: "/blogs" },
  { name: "Campus Gallery", path: "/campus-gallery" },
  { name: "Contact Support", path: "/contact" },
];

const courseLinks = [
  { name: "CMA USA", path: "/courses/cma-usa" },
  { name: "CMA India", path: "/courses/cma-india" },
  { name: "ACCA", path: "/courses/acca" },
  { name: "Chartered Accountant", path: "/courses/ca" },
  { name: "Company Secretary", path: "/courses/cs" },
  { name: "Enrolled Agent", path: "/courses/ea" },
];

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

function ColumnTitle({ children }) {
  return (
    <h3 className="relative pb-3 text-base font-bold tracking-wide text-white sm:text-lg">
      {children}
      <span className="absolute bottom-0 left-0 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF]" />
    </h3>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex min-h-7 items-center gap-2 rounded text-sm text-[#AFC0DA] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF] sm:text-[15px] lg:whitespace-nowrap lg:text-sm xl:text-[15px]"
      >
        <FiChevronRight className="shrink-0 text-xs text-[#70C7FF]/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#70C7FF]" />
        <span className="bg-gradient-to-r from-[#70C7FF] to-[#70C7FF] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
          {children}
        </span>
      </Link>
    </li>
  );
}

function CampusAccordion() {
  const [openCampus, setOpenCampus] = useState(null);

  return (
    <ul className="mt-5 grid gap-x-6 border-t border-white/10 sm:grid-cols-2">
      {campuses.map((campus) => {
        const isOpen = openCampus === campus.name;
        const panelId = `footer-campus-${campus.name.toLowerCase()}`;

        return (
          <li key={campus.name} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpenCampus(isOpen ? null : campus.name)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="group flex w-full items-center gap-3 py-2 text-left sm:py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF]"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${isOpen
                    ? "bg-[#1762B5] text-white"
                    : "bg-white/[0.06] text-[#70C7FF] group-hover:bg-white/10"
                  }`}
              >
                <FiMapPin size={14} />
              </span>
              <span
                className={`flex-1 text-[15px] font-semibold transition-colors duration-300 ${isOpen
                    ? "text-white"
                    : "text-[#DCE6F5] group-hover:text-white"
                  }`}
              >
                {campus.name}
              </span>
              <FiChevronDown
                className={`shrink-0 text-[#8EA3C4] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#70C7FF]" : ""
                  }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-3 pl-10">
                    {campus.address && (
                      <p className="text-sm leading-6 text-[#AFC0DA]">
                        {campus.address}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
                      <Link
                        to={campus.path}
                        className="inline-flex items-center gap-1 text-[#70C7FF] transition-colors hover:text-white"
                      >
                        View campus <FiArrowUpRight />
                      </Link>
                      <a
                        href={mapsUrl(
                          `Catalyst Education ${campus.name} ${campus.address}`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#70C7FF] transition-colors hover:text-white"
                      >
                        Directions <FiNavigation size={11} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#0B1F3A] text-white">
      {/* Brand gradient top rule */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#10294B] via-[#1762B5] to-[#70C7FF]" />

      {/* Background: navy gradient, glow and fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#10294B] via-[#0D2342] to-[#081830]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[460px] w-[460px] rounded-full bg-[#1762B5]/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-[380px] w-[380px] rounded-full bg-[#70C7FF]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 75%)",
        }}
      />

      {/* Main content */}
      <div className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-9 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-x-8 lg:pb-14 lg:pt-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF]"
            >
              <img
                src="/images/catalyst-logo-white.webp"
                alt="Catalyst Education"
                width="340"
                height="112"
                className="h-12 w-auto sm:h-14"
              />
            </Link>

            <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#C9D6EA]">
              {tagline}
            </p>

            <div className="mt-5 flex max-w-sm gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1762B5] to-[#70C7FF] text-white shadow-[0_8px_20px_rgba(23,98,181,0.35)]">
                <FiMapPin size={20} />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">
                  {headquarters.title}
                </h3>
                <address className="mt-1.5 text-sm not-italic leading-6 text-[#AFC0DA]">
                  {headquarters.address}
                </address>
                <a
                  href={mapsUrl(`Catalyst Education ${headquarters.address}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-[#70C7FF] transition-colors hover:text-white"
                >
                  Get directions <FiArrowUpRight />
                </a>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#DCE6F5] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-[#1762B5] hover:to-[#70C7FF] hover:text-white hover:shadow-[0_10px_24px_rgba(23,98,181,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF]"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="col-span-1 lg:col-span-2">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </nav>

          {/* Courses */}
          <nav aria-label="Our courses" className="col-span-1 lg:col-span-2">
            <ColumnTitle>Our Courses</ColumnTitle>
            <ul className="mt-5 space-y-2.5">
              {courseLinks.map((course) => (
                <FooterLink key={course.name} to={course.path}>
                  {course.name}
                </FooterLink>
              ))}
            </ul>
          </nav>

          {/* Campuses */}
          <div className="col-span-2 lg:col-span-4">
            <ColumnTitle>Campuses</ColumnTitle>
            <CampusAccordion />
          </div>
        </div>

        {/* Oversized watermark wordmark — sits behind the content, adds no height */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[24%] select-none text-center text-[15vw] font-black uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(112,199,255,0.10)] lg:text-[140px]"
        >
          Catalyst
        </p>
      </div>

      {/* Bottom bar — right padding on mobile keeps text clear of the floating contact buttons */}
      <div className="relative border-t border-white/10 bg-[#061327]/80 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 py-4 pl-5 pr-24 text-xs text-[#8EA3C4] sm:grid-cols-[1fr_auto_1fr] sm:px-8 sm:text-sm">
          <p className="col-start-1 row-start-1">
            © {year} Catalyst Hub. All Rights Reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="col-start-2 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#DCE6F5] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-[#1762B5] hover:to-[#70C7FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF] sm:row-span-1"
          >
            <FiArrowUp size={16} />
          </button>

          <p className="col-start-1 row-start-2 sm:col-start-3 sm:row-start-1 sm:text-right">
            Developed by{" "}
            <span className="font-semibold text-[#DCE6F5]">
              BRAND HACKERS
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
