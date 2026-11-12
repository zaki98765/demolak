import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#55679A]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#26345C] sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
