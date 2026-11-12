import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FiArrowRight,
  FiBookOpen,
  FiClock,
  FiDownload,
  FiSend,
} from "react-icons/fi";
import { courses } from "../Data/courses";

// COURSES - INFINITE AUTO SCROLL CAROUSEL
export default function CoursesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FD] py-20 lg:py-28">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#70C7FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#1762B5]/10 blur-3xl" />

      {/* Section heading */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-5 sm:px-8">

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
              Explore our programmes
            </span>

            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-[#10294B] sm:text-4xl lg:text-5xl">
              Find the right course for
              <span className="text-[#1762B5]"> your future</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#52617D] sm:text-base">
              Discover industry-focused programmes designed to build your
              skills, strengthen your knowledge and prepare you for your career.
            </p>
          </div>

          <Link
            to="/courses"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#1762B5]/20 bg-white px-6 py-3 text-sm font-bold text-[#1762B5] shadow-sm transition-all duration-300 hover:border-[#1762B5] hover:bg-[#1762B5] hover:text-white"
          >
            View all courses
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>


      {/* Carousel */}
      <div className="relative z-10">

        {/* Side fades */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-12 bg-gradient-to-r from-[#F7F9FD] to-transparent sm:w-24" />

        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-12 bg-gradient-to-l from-[#F7F9FD] to-transparent sm:w-24" />

        {/* Extra vertical space prevents hover clipping */}
        <div className="course-marquee py-5">

          <div className="course-track flex w-max">

            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 gap-6 pr-6"
                aria-hidden={group === 1 ? true : undefined}
              >

                {courses.map((course, index) => (


                  <motion.div
                    key={`${group}-${course.title}-${index}`}
                    className="course-card group relative flex h-[450px] w-[290px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-[#E2EAF5] bg-gradient-to-br from-white to-[#F0F7FF] p-5 shadow-[0_8px_30px_rgba(16,41,75,0.06)] sm:w-[320px]"
                    whileHover={{
                      y: -8,
                      scale: 1.025,
                      boxShadow: "0px 20px 45px rgba(23,98,181,0.16)",
                      borderColor: "rgba(23,98,181,0.45)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {/* Top accent */}
                    <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#10294B] via-[#1762B5] to-[#70C7FF]" />

                    {/* Category */}
                    <div className="mb-5 flex shrink-0 items-center justify-between">
                      <span className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1762B5]">
                        {course.category}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-lg text-[#1762B5] transition-all duration-300 group-hover:bg-[#1762B5] group-hover:text-white">
                        <FiBookOpen />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="h-[56px] shrink-0">
                      <h3 className="line-clamp-2 text-lg font-extrabold leading-7 text-[#10294B] transition-colors group-hover:text-[#1762B5]">
                        {course.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="mt-2 h-[66px] shrink-0 overflow-hidden">
                      <p className="line-clamp-3 text-[13px] leading-[22px] text-[#52617D]">
                        {course.description}
                      </p>
                    </div>

                    {/* Course details */}
                    <div className="mt-4 shrink-0 space-y-2.5 border-t border-[#E2EAF5] pt-4">

                      <div className="flex min-h-8 items-center gap-3 text-[13px] text-[#52617D]">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#1762B5]">
                          <FiClock />
                        </span>
                        <span>
                          <span className="font-semibold text-[#10294B]">Duration:</span>{" "}
                          {course.duration}
                        </span>
                      </div>

                      <div className="flex min-h-8 items-center gap-3 text-[13px] text-[#52617D]">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#1762B5]">
                          <FiBookOpen />
                        </span>
                        <span>
                          <span className="font-semibold text-[#10294B]">Eligibility:</span>{" "}
                          {course.eligibility}
                        </span>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-auto shrink-0 pt-4">

                      <Link
                        to={course.path}
                        tabIndex={group === 1 ? -1 : undefined}
                        className="group/btn flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10294B] to-[#1762B5] text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg"
                      >
                        Learn More
                        <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>

                      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                        <a
                          href={course.brochure}
                          download
                          tabIndex={group === 1 ? -1 : undefined}
                          className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#DCE7F5] bg-white text-xs font-bold text-[#1762B5] transition-colors hover:bg-[#EAF3FF]"
                        >
                          <FiDownload />
                          Brochure
                        </a>

                        <Link
                          to="/enquiry"
                          tabIndex={group === 1 ? -1 : undefined}
                          className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#DCE7F5] bg-white text-xs font-bold text-[#10294B] transition-colors hover:bg-[#EAF3FF] hover:text-[#1762B5]"
                        >
                          <FiSend />
                          Apply Now
                        </Link>
                      </div>

                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-all duration-500 group-hover:w-full" />

                  </motion.div>


                ))}

              </div>
            ))}

          </div>
        </div>
      </div>


    </section>
  );
}
