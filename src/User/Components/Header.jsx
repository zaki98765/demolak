
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronDown,
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiPhone,
  FiBookOpen,
  FiMapPin,
} from "react-icons/fi";
import logo from "../../../public/logo.png"

const courses = [
  { name: "CA Foundation", path: "/courses/ca-foundation" },
  { name: "CA Intermediate", path: "/courses/ca-intermediate" },
  { name: "CA Final", path: "/courses/ca-final" },
  { name: "ACCA", path: "/courses/acca" },
  { name: "CMA", path: "/courses/cma" },
];

const campuses = [
  { name: "Kozhikode", path: "/campuses/kozhikode" },
  { name: "Malappuram", path: "/campuses/malappuram" },
  { name: "Kannur", path: "/campuses/kannur" },
  { name: "Thrissur", path: "/campuses/thrissur" },
];

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Success Stories", path: "/success-stories" },
  { name: "Blogs", path: "/blogs" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const dropdowns = [
    { name: "Courses", icon: FiBookOpen, items: courses },
    { name: "Campuses", icon: FiMapPin, items: campuses },
  ];

  const closeMenus = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? "text-orange-600"
        : "text-slate-700 hover:text-orange-600"
    }`;

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#172554] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:px-8">
          <p className="font-medium">
            Your journey towards a successful commerce career starts here.
          </p>

          <a
            href="tel:+910000000000"
            className="hidden items-center gap-2 text-orange-300 transition hover:text-white sm:flex"
          >
            <FiPhone />
            Talk to our counsellor
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-2"
          >
            {/* <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172554] text-xl font-extrabold text-white"> */}
              <img src={logo} alt="" srcset="" className="w-40" />
            {/* </div> */}

            {/* <div className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight text-[#172554]">
                LAKSHYA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-orange-600">
                Commerce Academy
              </span>
            </div> */}
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.slice(0, 1).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={navLinkClass}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Dropdowns */}
            {dropdowns.map((dropdown) => {
              const Icon = dropdown.icon;
              const isOpen = activeDropdown === dropdown.name;

              return (
                <div
                  key={dropdown.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(dropdown.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(isOpen ? null : dropdown.name)
                    }
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-orange-600"
                  >
                    {dropdown.name}
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-5"
                      >
                        <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-900/10">
                          <div className="mb-2 flex items-center gap-2 border-b border-slate-100 px-3 pb-3">
                            <Icon className="text-orange-500" />
                            <span className="text-sm font-bold text-[#172554]">
                              Explore {dropdown.name}
                            </span>
                          </div>

                          {dropdown.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={closeMenus}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              {item.name}
                              <FiArrowUpRight />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {navItems.slice(1).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={navLinkClass}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/contact"
              className="rounded-lg bg-[#F97316] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Enquire Now <FiArrowUpRight className="ml-1 inline" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl text-[#172554] lg:hidden"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
            >
              <div className="max-h-[75vh] space-y-1 overflow-y-auto px-5 py-5">

                {navItems.slice(0, 1).map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-orange-50 text-orange-600"
                          : "text-slate-700"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {dropdowns.map((dropdown) => (
                  <div key={dropdown.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === dropdown.name
                            ? null
                            : dropdown.name
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-700"
                    >
                      {dropdown.name}
                      <FiChevronDown
                        className={`transition ${
                          mobileSubmenu === dropdown.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileSubmenu === dropdown.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-5"
                        >
                          {dropdown.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={closeMenus}
                              className="block py-2.5 text-sm text-slate-500 hover:text-orange-600"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {navItems.slice(1).map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-orange-50 text-orange-600"
                          : "text-slate-700"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <Link
                  to="/contact"
                  onClick={closeMenus}
                  className="mt-4 flex items-center justify-center rounded-lg bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white"
                >
                  Enquire Now <FiArrowUpRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Header;
