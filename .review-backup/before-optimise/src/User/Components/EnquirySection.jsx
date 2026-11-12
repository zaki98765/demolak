import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiAlertCircle,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiChevronDown,
  FiCompass,
  FiMapPin,
  FiPhone,
  FiPhoneCall,
  FiUser,
} from "react-icons/fi";
import { courses } from "../Data/courses";
import { campuses } from "../Data/campuses";

// POST { name, phone, course, campus, mode } — set VITE_ENQUIRY_ENDPOINT or serve /api/enquiries from Express
const ENQUIRY_ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || "/api/enquiries";

const CALL_NUMBER = "+919745200500";
const CALL_DISPLAY = "+91 97452 00500";
const WHATSAPP_URL = `https://wa.me/919745200500?text=${encodeURIComponent(
  "Hi Catalyst Education, I would like to know more about your courses."
)}`;

const perks = [
  { icon: FiCompass, title: "Free career counselling", text: "Find the course that fits your goals." },
  { icon: FiAward, title: "Expert faculty", text: "Learn from experienced mentors." },
  { icon: FiBriefcase, title: "Placement support", text: "Interview training and career guidance." },
];

const modes = ["Offline", "Online"];
const ease = [0.16, 1, 0.3, 1];

const fieldBase =
  "peer w-full rounded-2xl border border-[#E2EAF5] bg-[#F7F9FD] py-3.5 pl-11 pr-4 text-sm text-[#10294B] outline-none transition placeholder:text-[#9AA8BE] focus:border-[#1762B5] focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,98,181,0.10)]";

function Field({ id, label, icon: Icon, children, optional = false }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-xs font-bold text-[#26345C]">
        {label}
        {optional && <span className="font-medium text-[#9AA8BE]">Optional</span>}
      </label>
      <div className="relative">
        {children}
        {/* after the input so `peer-focus` can colour it */}
        <Icon
          aria-hidden="true"
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9AA8BE] transition-colors peer-focus:text-[#1762B5]"
        />
      </div>
    </div>
  );
}

// FINAL ENQUIRY CTA
export default function EnquirySection() {
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(courses[0].title);
  const [campus, setCampus] = useState("");
  const [mode, setMode] = useState(modes[0]);

  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = useState("idle");

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: studentName, phone, course: selectedCourse, campus, mode }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("sent");
      setStudentName("");
      setPhone("");
      setCampus("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0B2140] via-[#10294B] to-[#16478A] shadow-[0_40px_90px_rgba(16,41,75,0.30)] lg:grid-cols-[1fr_1.05fr]"
      >
        {/* Background: glows + grid */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#70C7FF]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#1762B5]/40 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 70% 80% at 20% 30%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 20% 30%, #000 20%, transparent 75%)",
          }}
        />

        {/* Left — pitch */}
        <div className="relative flex flex-col p-8 text-white sm:p-12 lg:p-14">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#DCEBFF] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#70C7FF] opacity-75 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-[#70C7FF]" />
            </span>
            Admissions open
          </span>

          <h2 id="enquiry-heading" className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Your future deserves
            <span className="block bg-gradient-to-r from-white via-[#BFE6FF] to-[#70C7FF] bg-clip-text text-transparent">
              the right beginning.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#C9D6EA] sm:text-base">
            Tell us about your goals. Our counsellors will help you explore courses
            and plan your next step — free of cost.
          </p>

          <ul className="mt-8 space-y-3">
            {perks.map(({ icon: Icon, title, text }, index) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease, delay: 0.2 + index * 0.12 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1762B5] to-[#70C7FF] text-white shadow-[0_8px_20px_rgba(23,98,181,0.4)]">
                  <Icon size={19} />
                </span>
                <span>
                  <span className="block text-sm font-bold">{title}</span>
                  <span className="block text-xs text-[#AFC0DA]">{text}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Direct contact */}
          <div className="mt-auto pt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8EA3C4]">Prefer to talk now?</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] py-2.5 pl-2.5 pr-5 transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#10294B]">
                  <FiPhoneCall size={16} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8EA3C4]">Call us</span>
                  <span className="block text-sm font-bold">{CALL_DISPLAY}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] py-2.5 pl-2.5 pr-5 transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  <FaWhatsapp size={18} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8EA3C4]">WhatsApp</span>
                  <span className="block text-sm font-bold">Chat with us</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right — form card */}
        <div className="relative p-3 sm:p-5 lg:py-8 lg:pl-0 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="relative h-full rounded-[28px] bg-white p-6 shadow-[0_30px_70px_rgba(8,24,48,0.35)] sm:p-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex h-full min-h-[460px] flex-col items-center justify-center text-center"
                  aria-live="polite"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#10294B] to-[#1762B5] text-white shadow-[0_16px_40px_rgba(23,98,181,0.4)] ring-8 ring-[#EAF3FF]"
                  >
                    <FiCheck size={36} strokeWidth={3} />
                  </motion.span>
                  <h3 className="mt-7 text-2xl font-extrabold text-[#10294B]">Thank you!</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#52617D]">
                    Your enquiry has been received. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-7 text-sm font-bold text-[#1762B5] underline-offset-4 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleEnquiry}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col justify-center space-y-5"
                >
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-[#10294B]">Request a free callback</h3>
                    <p className="mt-1.5 text-sm text-[#52617D]">Share your details and we&apos;ll get in touch.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="enquiry-name" label="Your name" icon={FiUser}>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Full name"
                        className={fieldBase}
                      />
                    </Field>

                    <Field id="enquiry-phone" label="Phone number" icon={FiPhone}>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className={fieldBase}
                      />
                    </Field>
                  </div>

                  <Field id="enquiry-course" label="Interested course" icon={FiBookOpen}>
                    <select
                      id="enquiry-course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className={`${fieldBase} appearance-none pr-10`}
                    >
                      {courses.map((course) => (
                        <option key={course.title} value={course.title}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6678A8]" />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="enquiry-campus" label="Preferred campus" icon={FiMapPin} optional>
                      <select
                        id="enquiry-campus"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                        className={`${fieldBase} appearance-none pr-10 ${campus ? "" : "text-[#9AA8BE]"}`}
                      >
                        <option value="">Any campus</option>
                        {campuses.map((c) => (
                          <option key={c.name} value={c.name} className="text-[#10294B]">
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6678A8]" />
                    </Field>

                    <fieldset>
                      <legend className="mb-2 text-xs font-bold text-[#26345C]">Class mode</legend>
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#E2EAF5] bg-[#F7F9FD] p-1">
                        {modes.map((m) => (
                          <label
                            key={m}
                            className={`cursor-pointer rounded-xl py-2.5 text-center text-sm font-bold transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1762B5]/40 ${
                              mode === m ? "bg-white text-[#1762B5] shadow-[0_4px_12px_rgba(16,41,75,0.10)]" : "text-[#6678A8] hover:text-[#10294B]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="enquiry-mode"
                              value={m}
                              checked={mode === m}
                              onChange={() => setMode(m)}
                              className="sr-only"
                            />
                            {m}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#10294B] via-[#1762B5] to-[#3A8DDE] px-5 py-4 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(23,98,181,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(23,98,181,0.40)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60 disabled:cursor-wait disabled:opacity-70"
                  >
                    {/* sheen */}
                    <span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[520%]" />
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Book my free counselling
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div aria-live="polite">
                    {status === "error" && (
                      <p className="flex items-start gap-2 rounded-xl bg-[#FDECEC] px-4 py-3 text-sm font-semibold text-[#B42318]">
                        <FiAlertCircle className="mt-0.5 shrink-0" />
                        Sorry, we couldn&apos;t send your enquiry. Please try again or call us on {CALL_DISPLAY}.
                      </p>
                    )}
                  </div>

                  <p className="text-center text-xs text-[#9AA8BE]">
                    By submitting, you agree to be contacted regarding your enquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
