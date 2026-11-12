import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiAlertCircle, FiArrowRight, FiCheck, FiChevronDown, FiMapPin, FiPhone } from "react-icons/fi";
import { courses } from "../Data/courses";
import { campuses } from "../Data/campuses";

// POST { name, phone, course, campus, mode } — set VITE_ENQUIRY_ENDPOINT or serve /api/enquiries from Express
const ENQUIRY_ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || "/api/enquiries";

const CALL_NUMBER = "+919745200500";
const CALL_DISPLAY = "+91 97452 00500";
const WHATSAPP_URL = `https://wa.me/919745200500?text=${encodeURIComponent(
  "Hi Catalyst Education, I would like to know more about your courses."
)}`;
const HQ_ADDRESS = "Happy Tower, Bypass Junction, Mankave, Kozhikode, Kerala 673007";

const modes = ["Offline", "Online"];

const inputClass =
  "w-full rounded-lg border border-[#CFD9E8] bg-white px-4 py-3 text-[15px] text-[#10294B] outline-none transition placeholder:text-[#7D8BA3] hover:border-[#A9BBD3] focus:border-[#1762B5] focus:ring-4 focus:ring-[#1762B5]/10";

function Label({ htmlFor, children, hint }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-[#26345C]">
      {children}
      {hint && <span className="text-xs font-normal text-[#5F6F8C]">{hint}</span>}
    </label>
  );
}

// ENQUIRY
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
    <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-[#F4F7FB] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Left — who you'll talk to, and other ways to reach us */}
        <div>
          <p className="text-sm font-semibold text-[#1762B5]">Admissions</p>
          <h2 id="enquiry-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-[#10294B] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Not sure which course is right for you?
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-[#52617D]">
            Leave your number and one of our counsellors will call you back. The
            first conversation is free, and there&apos;s no pressure to enrol.
          </p>

          {/* Campus photo */}
          <figure className="mt-8 overflow-hidden rounded-2xl">
            <img
              src="/images/campuses/calicut.webp"
              alt="Catalyst Education campus in Calicut"
              width="500"
              height="300"
              loading="lazy"
              decoding="async"
              className="aspect-[16/8] w-full object-cover"
            />
          </figure>
          <p className="mt-3 text-sm text-[#52617D]">
            Our Calicut campus. We have {campuses.length} campuses across Kerala.
          </p>

          {/* Direct contact */}
          <dl className="mt-8 divide-y divide-[#DCE4EF] border-y border-[#DCE4EF]">
            <div className="flex items-center gap-4 py-4">
              <dt className="sr-only">Phone</dt>
              <FiPhone className="shrink-0 text-[#1762B5]" size={18} aria-hidden="true" />
              <dd className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                <a href={`tel:${CALL_NUMBER}`} className="font-semibold text-[#10294B] hover:underline hover:underline-offset-4">
                  {CALL_DISPLAY}
                </a>
                <span className="text-sm text-[#52617D]">Call admissions</span>
              </dd>
            </div>
            <div className="flex items-center gap-4 py-4">
              <dt className="sr-only">WhatsApp</dt>
              <FaWhatsapp className="shrink-0 text-[#1FA855]" size={19} aria-hidden="true" />
              <dd className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#10294B] hover:underline hover:underline-offset-4">
                  Message us on WhatsApp
                </a>
                <span className="text-sm text-[#52617D]">Same number</span>
              </dd>
            </div>
            <div className="flex items-start gap-4 py-4">
              <dt className="sr-only">Head office</dt>
              <FiMapPin className="mt-1 shrink-0 text-[#1762B5]" size={18} aria-hidden="true" />
              <dd className="text-[15px] leading-6 text-[#26345C]">
                <span className="font-semibold text-[#10294B]">Head office</span>
                <br />
                {HQ_ADDRESS}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right — form */}
        <div className="self-start rounded-2xl border border-[#DCE4EF] bg-white p-6 sm:p-9 lg:sticky lg:top-28">
          {status === "sent" ? (
            <div className="py-10 text-center" aria-live="polite">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F7EE] text-[#1E7A46]">
                <FiCheck size={26} strokeWidth={3} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#10294B]">Thanks, we&apos;ve got your details</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] leading-6 text-[#52617D]">
                A counsellor will call you shortly. If it&apos;s urgent, call us on {CALL_DISPLAY}.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-[#1762B5] underline underline-offset-4"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquiry}>
              <h3 className="text-xl font-bold text-[#10294B]">Request a call back</h3>
              <p className="mt-1 text-sm text-[#52617D]">Takes less than a minute.</p>

              <div className="mt-7 space-y-5">
                <div>
                  <Label htmlFor="enquiry-name">Your name</Label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <Label htmlFor="enquiry-phone" hint="10-digit mobile">Phone number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-lg border border-r-0 border-[#CFD9E8] bg-[#F4F7FB] px-3 text-[15px] text-[#52617D]">
                      +91
                    </span>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={`${inputClass} rounded-l-none`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="enquiry-course">Course you&apos;re interested in</Label>
                  <div className="relative">
                    <select
                      id="enquiry-course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {courses.map((course) => (
                        <option key={course.title} value={course.title}>{course.title}</option>
                      ))}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52617D]" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="enquiry-campus" hint="Optional">Nearest campus</Label>
                    <div className="relative">
                      <select
                        id="enquiry-campus"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">No preference</option>
                        {campuses.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52617D]" />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-1.5 text-sm font-semibold text-[#26345C]">Classes</legend>
                    <div className="flex gap-5 pt-2.5">
                      {modes.map((m) => (
                        <label key={m} className="inline-flex cursor-pointer items-center gap-2 text-[15px] text-[#10294B]">
                          <input
                            type="radio"
                            name="enquiry-mode"
                            value={m}
                            checked={mode === m}
                            onChange={() => setMode(m)}
                            className="h-4 w-4 accent-[#1762B5]"
                          />
                          {m}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#10294B] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[#1762B5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1762B5]/30 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : (
                  <>Call me back <FiArrowRight aria-hidden="true" /></>
                )}
              </button>

              <div aria-live="polite">
                {status === "error" && (
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-[#FDECEC] px-4 py-3 text-sm text-[#B42318]">
                    <FiAlertCircle className="mt-0.5 shrink-0" />
                    We couldn&apos;t send that. Please try again, or call {CALL_DISPLAY}.
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs leading-5 text-[#5F6F8C]">
                We&apos;ll only use your number to contact you about this enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
