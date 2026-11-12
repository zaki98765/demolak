import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FiArrowRight, FiPhoneCall, FiPlus } from "react-icons/fi";
import { faqs } from "../Data/faqs";

/*
  FAQ — split layout with a sticky help card (desktop).
  Left: heading + "Still have questions?" card (pins while you read).
  Right: numbered accordion — one question open at a time, smooth height
  animation, + rotates to ×. Rows fade up one by one on scroll.
*/

const CALL_NUMBER = "+919745200500";
const ease = [0.16, 1, 0.3, 1];

function FaqItem({ faq, index, isOpen, onToggle }) {
  const baseId = useId();
  const buttonId = `${baseId}-q`;
  const panelId = `${baseId}-a`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease, delay: Math.min(index, 4) * 0.06 }}
      className="border-b border-[#E2EAF5]"
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center gap-4 rounded-xl px-1 py-5 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/50 sm:py-6"
        >
          <span
            className={`w-7 shrink-0 text-xs font-black tracking-[0.16em] transition-colors duration-300 ${
              isOpen ? "text-[#1762B5]" : "text-[#B8C7DB] group-hover:text-[#6678A8]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`flex-1 text-[15px] font-bold leading-snug transition-colors duration-300 sm:text-base ${
              isOpen ? "text-[#1762B5]" : "text-[#10294B] group-hover:text-[#1762B5]"
            }`}
          >
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? "rotate-45 bg-[#1762B5] text-white shadow-[0_8px_20px_rgba(23,98,181,0.3)]"
                : "bg-[#EAF3FF] text-[#1762B5] group-hover:bg-[#DCEBFF]"
            }`}
          >
            <FiPlus size={16} />
          </span>
        </button>
      </h3>

      {/* Smooth height: grid rows 0fr → 1fr */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`pb-6 pl-11 pr-12 text-sm leading-7 text-[#52617D] transition-opacity duration-500 sm:text-[15px] ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

// FAQ
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="relative bg-white py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#70C7FF]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left — sticky on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl">
            Frequently asked
            <span className="block text-[#1762B5]">questions</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#52617D] sm:text-base">
            Everything you need to know about courses, admissions and careers at Catalyst.
          </p>

          {/* Help card */}
          <div className="relative mt-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5] p-6 text-white shadow-[0_24px_55px_rgba(16,41,75,0.25)] sm:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#70C7FF]/25 blur-3xl" />
            <p className="relative text-lg font-bold">Still have questions?</p>
            <p className="relative mt-1.5 text-sm leading-6 text-[#C9D6EA]">
              Talk to our counsellors — we&apos;ll help you choose the right course.
            </p>
            <div className="relative mt-5 flex flex-wrap gap-2.5">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#10294B] transition-colors duration-300 hover:bg-[#DDF3FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
              >
                <FiPhoneCall size={15} /> Talk to our team
              </a>
              <Link
                to="/enquiry"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
              >
                Enquire now
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right — accordion */}
        <ul className="border-t border-[#E2EAF5]">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
