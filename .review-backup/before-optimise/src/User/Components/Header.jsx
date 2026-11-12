
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Campuses", path: "/campuses" },
  { name: "About Us", path: "/about-us" },
  { name: "Success Stories", path: "/success-stories" },
  { name: "Blogs", path: "/blogs" },
];

export default function CatalystNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const glassStyle = {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(238,241,250,0.58))",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.85)",
    boxShadow:
      "0 12px 40px rgba(38,52,92,0.10), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(255,255,255,0.30)",
  };

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path + "/"));

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-4 sm:px-6">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? 1050 : 1280,
            y: scrolled ? 4 : 0,
            borderRadius: scrolled ? 999 : 24,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 30,
          }}
          style={glassStyle}
          className="pointer-events-auto relative mx-auto w-full overflow-visible"
        >
          {/* Glass reflection */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          <div className="relative flex h-[72px] items-center justify-between gap-4 px-5 lg:px-7">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="relative z-20 flex shrink-0 items-center"
            >
              <img
                src="/Catalyst_nobg_Logo.png"
                alt="Catalyst Education"
                className="h-11 w-auto max-w-[155px] object-contain"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold transition-colors xl:px-3.5 xl:text-[13px]"
                >
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="catalyst-active-nav"
                      className="absolute inset-0 rounded-full bg-[#E5EAF7]/85"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${isActive(item.path)
                        ? "text-[#26345C]"
                        : "text-[#596681] group-hover:text-[#26345C]"
                      }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <Link
              to="/enquiry"
              className="group relative hidden shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#26345C] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_5px_16px_rgba(38,52,92,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6678A8] lg:inline-flex"
            >
              <span>Enquire Now</span>
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="catalyst-mobile-menu"
              className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[#26345C] ring-1 ring-white/80 lg:hidden"
            >
              {mobileOpen ? (
                <FiX size={22} />
              ) : (
                <FiMenu size={22} />
              )}
            </button>
          </div>

          {/* Mobile glass dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                id="catalyst-mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-[26px] border border-white/80 bg-[#F7F8FC]/90 shadow-[0_20px_60px_rgba(38,52,92,0.15)] backdrop-blur-3xl lg:hidden"
              >
                <div className="flex flex-col gap-1 p-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04,
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-2xl px-5 py-3.5 text-sm font-semibold transition-colors ${isActive(item.path)
                            ? "bg-[#E5EAF7] text-[#26345C]"
                            : "text-[#596681] hover:bg-white/70 hover:text-[#26345C]"
                          }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    to="/enquiry"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#26345C] px-5 py-4 text-sm font-bold text-white"
                  >
                    Enquire Now
                    <FiArrowUpRight />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
}
