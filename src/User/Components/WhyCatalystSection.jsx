import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiCompass,
  FiEye,
  FiStar,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";

/*
  ABOUT CATALYST (replaces the old "Why Catalyst" block)
  Condensed from https://catalysthub.in/about — headings, numbers and images
  from that page. Images load from the live site; to self-host, save them in
  /public/images/about/ and update `aboutImages`.
*/

const aboutImages = {
  main: {
    src: "https://catalysthub.in/img/banner/p4.jpg",
    alt: "Students at Catalyst Education",
  },
  secondary: {
    src: "https://catalysthub.in/img/banner/event.jpg",
    alt: "Catalyst Education student event",
  },
  ceo: {
    src: "https://catalysthub.in/img/team/catalyst-ceo.jpg",
    alt: "Salman E V, CEO, Catalyst Education",
  },
};

const pillars = [
  {
    icon: FiAward,
    title: "Our Values",
    text: "Integrity, innovation and excellence — shaping ethical professionals who lead with confidence.",
  },
  {
    icon: FiEye,
    title: "Our Vision",
    text: "To be a premier global destination for commerce education.",
  },
  {
    icon: FiCompass,
    title: "Our Mission",
    text: "World-class knowledge, practical skills and the mindset for global financial qualifications.",
  },
];

const highlights = [
  { value: "10+", label: "Years of experience" },
  { value: "30,000+", label: "Enrollments" },
  { value: "5k+", label: "Alumni" },
];

function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

// ABOUT CATALYST
export default function WhyCatalystSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#F7F8FC] py-14 sm:py-16 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#70C7FF]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <Reveal>
          <div className="relative pb-10 pr-4 sm:pb-12 sm:pr-10">
            <div className="relative h-[320px] overflow-hidden rounded-[30px] bg-gradient-to-br from-[#10294B] to-[#1762B5] shadow-[0_24px_60px_rgba(16,41,75,0.18)] sm:h-[440px]">
              <SafeImage
                {...aboutImages.main}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#10294B]/40 via-transparent to-transparent" />

              {/* Rating chip */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-lg backdrop-blur">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBBC05] text-white">
                  <FiStar className="fill-current" size={15} />
                </span>
                <span className="text-sm font-extrabold text-[#10294B]">4.9</span>
                <span className="text-xs font-semibold text-[#52617D]">Google rating</span>
              </div>
            </div>

            {/* Secondary image */}
            <div className="absolute -bottom-2 left-6 hidden h-36 w-48 overflow-hidden rounded-2xl border-[6px] border-[#F7F8FC] bg-[#EAF3FF] shadow-xl sm:block">
              <SafeImage {...aboutImages.secondary} className="h-full w-full object-cover" />
            </div>

            {/* CEO quote card */}
            <figure className="absolute -bottom-2 right-0 w-[78%] max-w-[300px] rounded-2xl bg-[#10294B] p-5 text-white shadow-[0_20px_45px_rgba(16,41,75,0.35)] sm:right-2">
              <span aria-hidden="true" className="absolute -top-5 right-5 font-serif text-6xl leading-none text-[#70C7FF]">
                &ldquo;
              </span>
              <blockquote className="text-sm font-medium leading-6 text-[#DCE6F5]">
                Our vision is to redefine commerce education in India.
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#1762B5] ring-2 ring-[#70C7FF]/50">
                  <SafeImage {...aboutImages.ceo} className="h-full w-full object-cover object-top" />
                </span>
                <span>
                  <span className="block text-sm font-bold">Salman E V</span>
                  <span className="block text-xs text-[#8EA3C4]">CEO, Catalyst Education</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
              Who we are
            </span>
            <h2
              id="about-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-[44px]"
            >
              Top-rated Commerce &amp; Accounting Institute
              <span className="text-[#1762B5]"> Trusted by Thousands</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#52617D] sm:text-base">
              Catalyst Education builds careers in commerce and accounting through
              expert faculty, practical learning and personal mentoring — from
              commerce fundamentals to advanced accounting, taxation, auditing and
              business finance, with interview training and placement support.
            </p>
          </Reveal>

          {/* Philosophy pillars */}
          <Reveal>
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="group flex items-start gap-3 rounded-2xl border border-[#E2EAF5] bg-white p-4 transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] sm:block duration-300 hover:-translate-y-1 hover:border-[#9CCBF5] hover:shadow-[0_14px_30px_rgba(23,98,181,0.10)] motion-reduce:hover:translate-y-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1762B5] transition-colors duration-300 group-hover:bg-[#1762B5] group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#10294B] sm:mt-3">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#52617D]">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Highlights */}
          <Reveal>
            <dl className="mt-6 grid grid-cols-3 divide-x divide-[#E2EAF5] rounded-2xl border border-[#E2EAF5] bg-white py-4">
              {highlights.map((item) => (
                <div key={item.label} className="px-3 text-center sm:px-5">
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="text-2xl font-black tracking-tight text-[#10294B] sm:text-3xl">{item.value}</dd>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#55679A] sm:text-xs">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Actions */}
          <Reveal>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/enquiry"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#10294B] to-[#1762B5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,98,181,0.25)] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,98,181,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
              >
                Book a free career counselling
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full border border-[#DCE7F5] bg-white px-6 py-3.5 text-sm font-bold text-[#1762B5] transition-colors duration-300 hover:border-[#1762B5] hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
              >
                More about us <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
