import {
  FiBookOpen,
  FiBriefcase,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";
import CountUp from "./shared/CountUp";

const stats = [
  {
    value: 500,
    suffix: "+",
    strong: "Expert",
    label: "Faculties",
    icon: FiUserCheck,
  },
  {
    value: 25000,
    suffix: "+",
    strong: "Students",
    label: "Yearly",
    icon: FiUsers,
  },
  {
    value: 30,
    suffix: "+",
    strong: "Specialized",
    label: "Courses",
    icon: FiBookOpen,
  },
  {
    value: 100,
    suffix: "%",
    strong: "Placement",
    label: "Support",
    icon: FiBriefcase,
  },
];

// CATALYST AT A GLANCE
export default function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#EAF4FF]/60 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#1762B5]">
              Catalyst Education
            </p>

            <h2
              id="stats-heading"
              className="text-3xl font-extrabold tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
            >
              Excellence That
              <span className="text-[#1762B5]"> Speaks For Itself</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <article className="group relative isolate flex h-full min-h-[190px] items-center overflow-hidden rounded-[24px] border border-[#D7E6F7] bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF5FF] px-6 py-8 shadow-[0_10px_35px_rgba(16,41,75,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#9CCBF5] hover:shadow-[0_18px_45px_rgba(23,98,181,0.12)] sm:min-h-[230px] sm:px-10">
                {/* Large watermark icon */}
                <stat.icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="pointer-events-none absolute -bottom-16 -right-16 -z-10 h-56 w-56 -rotate-12 text-[#1762B5]/[0.05] transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-105 sm:h-72 sm:w-72"
                />

                <div className="flex w-full items-center justify-between gap-5">
                  <div className="min-w-0">
                    <p className="text-[40px] font-black leading-none tracking-tight text-[#10294B] sm:text-6xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>

                    <h3 className="mt-4 text-sm uppercase tracking-[0.06em] text-[#10294B] sm:mt-5 sm:text-lg">
                      <span className="font-extrabold">{stat.strong}</span>{" "}
                      <span className="font-medium">{stat.label}</span>
                    </h3>

                    <span className="mt-5 block h-1 w-12 rounded-full bg-[#1762B5] transition-all duration-500 group-hover:w-20" />
                  </div>

                  {/* Icon tile */}
                  <div aria-hidden="true" className="relative mr-2 shrink-0 sm:mr-6">
                    <span className="absolute -inset-3 rounded-[28px] border border-[#1762B5]/15 transition-all duration-500 group-hover:-inset-4 sm:-inset-4 sm:rounded-[34px] sm:group-hover:-inset-5" />
                    <span className="absolute -inset-6 rounded-[36px] border border-[#1762B5]/[0.07] transition-all duration-500 group-hover:-inset-7 sm:-inset-8 sm:rounded-[44px] sm:group-hover:-inset-10" />

                    <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-[#10294B] via-[#16478A] to-[#1762B5] text-white shadow-[0_18px_35px_rgba(23,98,181,0.35)] transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105 sm:h-24 sm:w-24 sm:rounded-[28px]">
                      <span className="absolute -top-1/2 left-0 h-full w-full rounded-full bg-white/15 blur-md" />
                      <stat.icon className="relative h-7 w-7 sm:h-10 sm:w-10" strokeWidth={1.8} />
                    </span>

                    <span className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full bg-[#70C7FF] ring-4 ring-white sm:h-4 sm:w-4" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
