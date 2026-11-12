import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { courses } from "../Data/courses";

// FINAL ENQUIRY CTA
export default function EnquirySection() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].title);
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEnquiry = (e) => {
    e.preventDefault();
    // Connect this form to your backend/API later.
    alert("Demo enquiry submitted. Connect your backend to save enquiries.");
  };

  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[30px] bg-[#26345C] lg:grid-cols-2">
        <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-white/15 blur-3xl" />

        <div className="relative flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#AAB5D2]">
            Take the first step
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
            Your future deserves the right beginning.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
            Tell us about your goals. Our team can help you explore courses
            and understand your next steps.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#AAB5D2]">
            <FiCheckCircle /> Find a learning path that suits you
          </div>
        </div>

        <div className="relative bg-white p-8 sm:p-12 lg:p-14">
          <h3 className="text-2xl font-extrabold text-[#26345C]">
            Request a callback
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Share your details and we'll get in touch.
          </p>

          <form onSubmit={handleEnquiry} className="mt-7 space-y-5">
            <div>
              <label htmlFor="enquiry-name" className="mb-2 block text-xs font-bold text-slate-600">
                Your name
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                autoComplete="name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#1762B5] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
              />
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="mb-2 block text-xs font-bold text-slate-600">
                Phone number
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#1762B5] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
              />
            </div>

            <div>
              <label htmlFor="enquiry-course" className="mb-2 block text-xs font-bold text-slate-600">
                Interested course
              </label>
              <select
                id="enquiry-course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-[#1762B5] focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
              >
                {courses.map((course) => (
                  <option key={course.title} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#26345C] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#26345C]/10 transition hover:bg-[#53658F]"
            >
              Submit Enquiry <FiArrowRight />
            </button>

            <p className="text-center text-xs text-slate-400">
              By submitting, you agree to be contacted regarding your enquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
