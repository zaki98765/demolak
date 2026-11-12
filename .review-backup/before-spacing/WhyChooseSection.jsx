import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCreditCard,
  FiHeadphones,
  FiLayers,
  FiMonitor,
  FiUserCheck,
} from "react-icons/fi";

/*
  WHY CATALYST — six reasons, revealed on scroll.
  Cards rise in one after another as the grid enters the viewport; the
  background glow drifts with page scroll. Motion is reduced automatically
  for users who prefer it (MotionConfig in App.jsx).
*/

const reasons = [
  { icon: FiUserCheck, title: "Expert Faculty Pool" },
  { icon: FiBriefcase, title: "100% Placement Support" },
  { icon: FiBookOpen, title: "Integrated B.Com with Professional Courses" },
  { icon: FiLayers, title: "Industrial Standard Projects" },
  { icon: FiMonitor, title: "Advanced Infrastructure & Digital Campus" },
  { icon: FiCreditCard, title: "Affordable Fees and EMI Options" },
];

const ease = [0.16, 1, 0.3, 1];

const headingVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

const iconVariants = {
  hidden: { scale: 0.4, rotate: -25, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 16, delay: 0.15 },
  },
};

function ReasonCard({ reason, index }) {
  const Icon = reason.icon;

  return (
    <motion.li
      variants={cardVariants}
      className="group relative isolate flex h-full flex-row items-center gap-4 overflow-hidden rounded-[22px] border border-[#E2EAF5] bg-white px-5 py-5 text-left sm:flex-col sm:gap-0 sm:rounded-[26px] sm:px-6 sm:pb-8 sm:pt-9 sm:text-center shadow-[0_10px_30px_rgba(16,41,75,0.05)] transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-1.5 hover:border-[#9CCBF5] hover:shadow-[0_24px_50px_rgba(23,98,181,0.14)] motion-reduce:hover:translate-y-0"
    >
      {/* Hover wash */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#EAF3FF] to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Index */}
      <span className="absolute right-4 top-3 text-xs font-black sm:left-5 sm:right-auto sm:top-4 tracking-[0.18em] text-[#66758F] transition-colors duration-300 group-hover:text-[#1762B5]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <motion.span variants={iconVariants} className="relative shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-100 rounded-full bg-[#70C7FF]/25 opacity-0 blur-md transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
        />
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1762B5] ring-[6px] ring-[#F4F8FE] sm:h-[72px] sm:w-[72px] sm:ring-8 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#10294B] group-hover:to-[#1762B5] group-hover:text-white group-hover:ring-[#EAF3FF]">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
      </motion.span>

      <h3 className="pr-6 text-[15px] font-extrabold leading-snug text-[#10294B] sm:mt-6 sm:max-w-[16rem] sm:pr-0 sm:text-lg">
        {reason.title}
      </h3>

      <span className="mt-4 hidden h-[3px] w-8 rounded-full sm:block bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-all duration-500 group-hover:w-16" />
    </motion.li>
  );
}

// WHY CATALYST
export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFF] to-white py-20 lg:py-28"
    >
      {/* Scroll-linked background glows */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#70C7FF]/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: glowY2 }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#1762B5]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
            Why choose us
          </span>
          <h2
            id="why-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
          >
            Why <span className="text-[#1762B5]">Catalyst</span> Is a Top-Rated Commerce
            Institute in India
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#52617D] sm:text-base">
            We create an environment where students grow into confident commerce
            professionals in every way. As a top-rated commerce institute in India,
            Catalyst supports learning, guidance, and personal growth to help build
            strong and lasting careers in the commerce field.
          </p>
        </motion.div>

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/enquiry"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#10294B] via-[#1762B5] to-[#3A8DDE] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_32px_rgba(23,98,181,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(23,98,181,0.40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2 sm:px-9"
          >
            <FiHeadphones size={18} />
            Book a free career counseling now
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
