import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiAward, FiCheck, FiUser } from "react-icons/fi";
import Reveal from "./shared/Reveal";
import { faculty } from "../Data/faculty";

/*
  FACULTY — "Meet our expert faculty"
  Portrait cards: the photo sits on a soft blue stage that turns navy on
  hover, so cut-out portraits "pop". Rectangular photos simply fill the frame.
*/

const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function Portrait({ member }) {
  const [failed, setFailed] = useState(false);

  if (!member.photo || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 text-3xl font-black text-[#1762B5] shadow-lg">
          {initialsOf(member.name) || <FiUser />}
        </span>
      </div>
    );
  }

  return (
    <img
      src={member.photo}
      alt={`${member.name}, ${member.role}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
    />
  );
}

function FacultyCard({ member, index }) {
  return (
    <article className="group relative flex flex-col rounded-[28px] border border-[#E2EAF5] bg-white p-2.5 shadow-[0_12px_32px_rgba(16,41,75,0.06)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[#9CCBF5] hover:shadow-[0_28px_55px_rgba(23,98,181,0.16)] motion-reduce:hover:translate-y-0">
      {/* Photo stage */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-gradient-to-b from-[#EAF3FF] to-[#CFE3FA]">
        {/* Navy stage fades in on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#10294B] via-[#133A6E] to-[#1762B5] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[18%] h-[78%] w-[118%] -translate-x-1/2 rounded-full border-[28px] border-white/40 transition-colors duration-500 group-hover:border-white/[0.07]"
        />

        <Portrait member={member} />

        {/* Index + verified */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black tracking-[0.16em] text-[#10294B] backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 p-1 sm:px-2.5 sm:py-1 text-[10px] font-bold uppercase tracking-wider text-[#1762B5] backdrop-blur">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1762B5] text-white">
            <FiCheck size={9} strokeWidth={4} />
          </span>
          <span className="hidden sm:inline">Verified</span>
        </span>

        {/* Bottom fade for legibility */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#10294B]/35 to-transparent" />
      </div>

      {/* Details */}
      <div className="flex items-end justify-between gap-3 px-2 pb-3 pt-4 sm:px-3 sm:pt-5">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-xl">
            {member.name}
          </h3>
          <p className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold leading-tight text-[#1762B5] sm:text-xs">
            <FiAward size={12} className="shrink-0" />
            <span>{member.role}</span>
          </p>
        </div>
      </div>
      <span className="mx-3 mb-2 block h-[3px] w-8 rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-500 group-hover:w-20" />
    </article>
  );
}

// FACULTY
export default function FacultySection() {
  if (faculty.length === 0) return null;

  return (
    <section aria-labelledby="faculty-heading" className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] -translate-x-1/2 rounded-full bg-[#EAF4FF]/70 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
                Our faculty
              </span>
              <h2
                id="faculty-heading"
                className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
              >
                Meet our
                <span className="text-[#1762B5]"> expert faculty</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#52617D] sm:text-base">
                Experienced mentors who guide Catalyst students through every
                stage of their professional qualification.
              </p>
            </div>

            <Link
              to="/enquiry"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#10294B] to-[#1762B5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(23,98,181,0.25)] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,98,181,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
            >
              Talk to a mentor
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:mt-10 gap-4 sm:gap-6 lg:grid-cols-4">
          {faculty.map((member, index) => (
            <Reveal key={member.name}>
              <FacultyCard member={member} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
