import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiMapPin,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";
import CountUp from "./shared/CountUp";
import { courses } from "../Data/courses";
import { campuses } from "../Data/campuses";

/*
  CATALYST AT A GLANCE — BENTO GRID
  Layout: one large "students" card (2×2) + faculty, courses and a wide
  placement card. Supporting details come from shared data (campuses,
  courses) so they stay accurate when that data changes.
*/

const shortCourseNames = {
  "Chartered Accountant": "CA",
  "Company Secretary": "CS",
  "Enrolled Agent": "EA",
};
const courseChips = courses.map((course) => shortCourseNames[course.title] ?? course.title);

const supportSteps = ["Resume building", "Interview preparation", "Placement assistance"];

const avatarTones = [
  "from-[#70C7FF] to-[#1762B5]",
  "from-[#6678A8] to-[#26345C]",
  "from-[#BCEBFF] to-[#4C9CEB]",
  "from-[#1762B5] to-[#10294B]",
];

const cardBase =
  "group relative isolate overflow-hidden rounded-[26px] border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0";

const lightCard = `${cardBase} border-[#E2EAF5] hover:border-[#9CCBF5] hover:shadow-[0_22px_45px_rgba(23,98,181,0.13)]`;

function IconTile({ icon: Icon, tone = "light" }) {
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
        tone === "light"
          ? "bg-[#EAF3FF] text-[#1762B5] group-hover:bg-[#1762B5] group-hover:text-white"
          : "bg-white text-[#1762B5] shadow-sm group-hover:bg-[#1762B5] group-hover:text-white"
      }`}
    >
      <Icon size={22} />
    </span>
  );
}

function Watermark({ icon: Icon, className = "" }) {
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={1}
      className={`pointer-events-none absolute -z-10 -rotate-12 transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-105 ${className}`}
    />
  );
}

function StatLabel({ children, light = false }) {
  return (
    <p
      className={`mt-2 text-xs font-bold uppercase tracking-[0.12em] sm:text-[13px] ${
        light ? "text-[#AFC0DA]" : "text-[#52617D]"
      }`}
    >
      {children}
    </p>
  );
}

/* Large feature card — 25,000+ students */
function StudentsCard() {
  return (
    <article
      className={`${cardBase} col-span-2 flex min-h-[380px] flex-col border-transparent bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5] p-6 text-white shadow-[0_24px_60px_rgba(16,41,75,0.28)] hover:shadow-[0_30px_70px_rgba(16,41,75,0.36)] sm:p-8 lg:row-span-2`}
    >
      {/* Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 70% at 85% 10%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 85% 10%, #000 20%, transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#70C7FF]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 -z-10 h-80 w-80 rounded-full border-[44px] border-[#70C7FF]/[0.08]" />
      <Watermark icon={FiUsers} className="-right-6 top-16 h-56 w-56 text-white/[0.05] sm:h-64 sm:w-64" />

      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#DCEBFF] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#70C7FF]" />
          Student community
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#10294B] shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <FiMapPin className="text-[#1762B5]" />
          {campuses.length} campuses in Kerala
        </span>
      </div>

      {/* Headline number */}
      <div className="mt-8 sm:mt-10">
        <p className="text-[64px] font-black leading-[0.9] tracking-tight sm:text-[88px] xl:text-[104px]">
          <CountUp value={25000} />
          <span className="align-top text-[0.5em] text-[#70C7FF]">+</span>
        </p>
        <p className="mt-3 max-w-sm text-base font-medium text-[#C9D6EA] sm:text-lg">
          Students learn with Catalyst Education every year
        </p>
      </div>

      {/* Campus strip */}
      <div className="logo-marquee mt-auto pt-8" aria-label="Our campuses">
        <div className="logo-track flex" style={{ "--duration": "28s" }}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 gap-2.5 pr-2.5"
            >
              {campuses.map((campus) => (
                <li
                  key={`${copy}-${campus.name}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold text-[#DCEBFF]"
                >
                  <FiMapPin className="text-[#70C7FF]" size={12} />
                  {campus.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Community row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {avatarTones.map((tone) => (
              <span
                key={tone}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${tone} text-white ring-2 ring-[#133A6E]`}
              >
                <FiUser size={15} />
              </span>
            ))}
          </div>
          <p className="text-sm leading-5 text-[#C9D6EA]">
            Join a growing community
            <br className="hidden sm:block" /> of commerce learners
          </p>
        </div>

        <Link
          to="/enquiry"
          className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#10294B] shadow-lg transition-all duration-300 hover:bg-[#DDF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70C7FF]"
        >
          Start your journey
          <FiArrowUpRight className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/* 500+ faculties */
function FacultyCard() {
  return (
    <article className={`${lightCard} col-span-1 bg-white p-5 sm:p-7`}>
      <Watermark icon={FiUserCheck} className="-bottom-8 -right-8 h-36 w-36 text-[#1762B5]/[0.05]" />
      <div className="flex items-start justify-between">
        <IconTile icon={FiUserCheck} />
        <span className="hidden rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1762B5] sm:inline-block">
          Mentors
        </span>
      </div>
      <p className="mt-5 text-4xl font-black leading-none tracking-tight text-[#10294B] sm:mt-6 sm:text-5xl">
        <CountUp value={500} suffix="+" />
      </p>
      <StatLabel>Expert Faculties</StatLabel>
      <p className="mt-3 text-sm leading-6 text-[#52617D]">
        Experienced mentors guiding every programme.
      </p>
    </article>
  );
}

/* 30+ courses */
function CoursesCard() {
  return (
    <article className={`${lightCard} col-span-1 bg-[#EAF3FF] p-5 sm:p-7`}>
      <Watermark icon={FiBookOpen} className="-bottom-8 -right-8 h-36 w-36 text-[#1762B5]/[0.07]" />
      <IconTile icon={FiBookOpen} tone="tint" />
      <p className="mt-5 text-4xl font-black leading-none tracking-tight text-[#10294B] sm:mt-6 sm:text-5xl">
        <CountUp value={30} suffix="+" />
      </p>
      <StatLabel>Specialized Courses</StatLabel>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Featured programmes">
        {courseChips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-[#CFE2F8] bg-white px-2.5 py-1 text-[11px] font-bold text-[#10294B] transition-colors duration-300 group-hover:border-[#9CCBF5]"
          >
            {chip}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* 100% placement support */
function PlacementCard() {
  return (
    <article className={`${lightCard} col-span-2 bg-white p-6 sm:p-7`}>
      <Watermark icon={FiBriefcase} className="-bottom-10 -right-6 h-40 w-40 text-[#1762B5]/[0.05]" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <IconTile icon={FiBriefcase} />
          <div>
            <p className="text-5xl font-black leading-none tracking-tight text-[#10294B]">
              <CountUp value={100} suffix="%" />
            </p>
            <StatLabel>Placement Support</StatLabel>
          </div>
        </div>

        <ul className="space-y-2">
          {supportSteps.map((step) => (
            <li key={step} className="flex items-center gap-2.5 text-sm font-semibold text-[#26345C]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1762B5] text-white">
                <FiCheck size={11} strokeWidth={3.5} />
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

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

        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            <StudentsCard />
            <FacultyCard />
            <CoursesCard />
            <PlacementCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
