
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
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

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Demo only: connect this to your newsletter API later.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#101D40] text-white">

      {/* Top CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 py-12 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-orange-400">
              Take the next step
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
              Your ambition deserves the right guidance.
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-100/70">
              Discover your opportunities and start building your future with
              Lakshya Commerce.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#F97316] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Talk to Our Team
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl font-extrabold text-white">
                L
              </div>

              <div className="leading-tight">
                <span className="block text-2xl font-extrabold tracking-tight">
                  LAKSHYA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">
                  Commerce Academy
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-blue-100/65">
              Empowering students through quality commerce education,
              professional guidance and a learning environment that inspires
              growth.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-blue-100 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Explore links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-2 text-sm text-blue-100/65 transition hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Our Courses
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-blue-100/65 transition hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Get in Touch
            </h3>

            <div className="mt-6 space-y-5">
              <a
                href="tel:+910000000000"
                className="flex items-start gap-3 text-sm text-blue-100/70 transition hover:text-orange-400"
              >
                <FiPhone className="mt-1 shrink-0 text-lg text-orange-400" />
                <span>+91 00000 00000</span>
              </a>

              <a
                href="mailto:info@example.com"
                className="flex items-start gap-3 text-sm text-blue-100/70 transition hover:text-orange-400"
              >
                <FiMail className="mt-1 shrink-0 text-lg text-orange-400" />
                <span>info@example.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm leading-6 text-blue-100/70">
                <FiMapPin className="mt-1 shrink-0 text-lg text-orange-400" />
                <span>Kerala, India</span>
              </div>
            </div>

            <h4 className="mt-9 text-sm font-bold">Our Campuses</h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {footerLinks.campuses.map((campus) => (
                <Link
                  key={campus.name}
                  to={campus.path}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-blue-100/70 transition hover:border-orange-500 hover:text-orange-400"
                >
                  {campus.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                Stay connected
              </p>

              <h3 className="mt-3 text-2xl font-extrabold">
                Get updates that move you forward.
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100/60">
                Subscribe for course updates, useful resources and educational
                insights.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-300">
                  <FiCheckCircle className="text-xl" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-blue-100/35 focus:border-orange-400"
                  />

                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
                  >
                    Subscribe <FiSend />
                  </button>
                </form>
              )}

              <p className="mt-3 text-xs text-blue-100/40">
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-6 text-xs text-blue-100/45 sm:px-8 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Lakshya Commerce. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/privacy-policy"
              className="transition hover:text-orange-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="transition hover:text-orange-400"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-orange-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
