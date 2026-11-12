import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

/*
  CATALYST EDUCATION — RESPONSIVE FOOTER

  Brand palette:
  Primary:      #26345C (soft navy)
  Accent:       #8293C8 (muted periwinkle)
  Soft Accent:  #EEF1FA
  Text:         #414653
  Background:   #FFFFFF

  Requirements:
  - Tailwind CSS (no separate stylesheet)
  - react-router-dom
  - motion/react
  - react-icons
*/

const footerLinks = {
  explore: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Our Campuses", path: "/campuses" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "Life at Campus", path: "/life-at-campus" },
  ],
  courses: [
    { name: "CA Foundation", path: "/courses/ca-foundation" },
    { name: "CA Intermediate", path: "/courses/ca-intermediate" },
    { name: "CA Final", path: "/courses/ca-final" },
    { name: "ACCA", path: "/courses/acca" },
    { name: "CMA", path: "/courses/cma" },
  ],
  campuses: [
    { name: "Kozhikode", path: "/campuses/kozhikode" },
    { name: "Malappuram", path: "/campuses/malappuram" },
    { name: "Kannur", path: "/campuses/kannur" },
    { name: "Thrissur", path: "/campuses/thrissur" },
  ],
};

const socialLinks = [
  { icon: FiInstagram, label: "Instagram", href: "#" },
  { icon: FiFacebook, label: "Facebook", href: "#" },
  { icon: FiYoutube, label: "YouTube", href: "#" },
  { icon: FiLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    // Demo only: connect this form to your newsletter API.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="overflow-hidden bg-white text-[#414653]">
      {/* Top call-to-action */}
      <section className="border-b border-[#E8EAF1] bg-gradient-to-r from-[#F7F8FC] via-[#F1F3FA] to-[#F8F9FC]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#7182B8] sm:text-xs">
              Take the next step
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Your ambition deserves the right guidance.
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-6 text-[#697080] sm:text-sm sm:leading-7">
              Discover your opportunities and start building your future with
              Catalyst Education.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-lg bg-[#26345C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#26345C]/10 transition duration-200 hover:-translate-y-1 hover:bg-[#1762B5] sm:w-auto sm:px-7 sm:py-4"
          >
            Talk to Our Team
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </section>

      {/* Main footer content */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-9 lg:gap-y-12">
          {/* Brand and social links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="sm:col-span-2 lg:col-span-4"
          >
            <Link
              to="/"
              className="inline-flex w-[170px] max-w-full items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8293C8] sm:w-[190px]"
            >
              <img
                src="/Catalyst_nobg_Logo.png"
                alt="Catalyst Education"
                className="h-auto w-full object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-xs leading-7 text-[#697080] sm:mt-6 sm:text-sm">
              Empowering students through quality education, professional
              guidance and a learning environment that inspires growth.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E8F0] bg-white text-lg text-[#626A7A] transition duration-200 hover:-translate-y-1 hover:border-[#8293C8] hover:bg-[#8293C8] hover:text-[#26345C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8293C8]"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Explore links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#30394F] sm:text-sm">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-2 text-xs text-[#697080] transition-colors hover:text-[#536795] sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Course links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#30394F] sm:text-sm">
              Our Courses
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs text-[#697080] transition-colors hover:text-[#536795] sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and campuses */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#30394F] sm:text-sm">
              Get in Touch
            </h3>

            <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="tel:+910000000000"
                className="flex min-w-0 items-start gap-3 text-xs text-[#697080] transition-colors hover:text-[#536795] sm:text-sm"
              >
                <FiPhone className="mt-0.5 shrink-0 text-base text-[#7182B8]" />
                <span className="break-all">+91 00000 00000</span>
              </a>

              <a
                href="mailto:info@example.com"
                className="flex min-w-0 items-start gap-3 text-xs text-[#697080] transition-colors hover:text-[#536795] sm:text-sm"
              >
                <FiMail className="mt-0.5 shrink-0 text-base text-[#7182B8]" />
                <span className="break-all">info@example.com</span>
              </a>

              <div className="flex min-w-0 items-start gap-3 text-xs leading-6 text-[#697080] sm:text-sm">
                <FiMapPin className="mt-0.5 shrink-0 text-base text-[#7182B8]" />
                <span>Kerala, India</span>
              </div>
            </div>

            <h4 className="mt-7 text-xs font-bold text-[#30394F] sm:mt-9 sm:text-sm">
              Our Campuses
            </h4>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              {footerLinks.campuses.map((campus) => (
                <Link
                  key={campus.name}
                  to={campus.path}
                  className="rounded-md border border-[#E5E8F0] bg-[#F8F9FC] px-3 py-2 text-[10px] text-[#626A7A] transition-colors hover:border-[#8293C8] hover:text-[#536795] sm:text-xs"
                >
                  {campus.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="mt-12 rounded-xl border border-[#E8EAF1] bg-[#F7F8FC] p-5 sm:mt-14 sm:p-7 md:mt-16 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7182B8] sm:text-xs">
                Stay connected
              </p>
              <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                Get updates that move you forward.
              </h3>
              <p className="mt-2 max-w-lg text-xs leading-6 text-[#697080] sm:text-sm">
                Subscribe for course updates, useful resources and educational
                insights.
              </p>
            </div>

            <div className="min-w-0">
              {subscribed ? (
                <div
                  role="status"
                  className="flex items-center gap-3 rounded-lg border border-[#8293C8]/25 bg-[#8293C8]/10 p-4 text-sm text-[#8CEBFF]"
                >
                  <FiCheckCircle className="shrink-0 text-xl" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex min-w-0 flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="h-12 min-w-0 flex-1 rounded-lg border border-[#DDE1EB] bg-white px-4 text-xs text-[#30394F] outline-none placeholder:text-[#30394F]/35 focus:border-[#8293C8] focus:ring-2 focus:ring-[#8293C8]/15 sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#8293C8] px-5 text-xs font-extrabold text-[#26345C] transition-colors hover:bg-[#EEF1FA] sm:px-6 sm:text-sm"
                  >
                    Subscribe <FiSend />
                  </button>
                </form>
              )}
              <p className="mt-3 text-[10px] leading-5 text-[#9298A5] sm:text-xs">
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8EAF1] bg-[#F8F9FC]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-5 text-center sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p className="m-0 text-[10px] leading-5 text-[#858B98] sm:text-xs">
            © {new Date().getFullYear()} Catalyst Education. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
            <Link
              to="/privacy-policy"
              className="text-[10px] text-[#7B8190] transition-colors hover:text-[#536795] sm:text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-[10px] text-[#7B8190] transition-colors hover:text-[#536795] sm:text-xs"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/contact"
              className="text-[10px] text-[#7B8190] transition-colors hover:text-[#536795] sm:text-xs"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
