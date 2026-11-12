import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";

// LEARNING JOURNEY
export default function LearningJourneySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Your learning journey"
        title="From your first step to your next big achievement."
        description="A clear process that helps you understand your options and move towards your goals."
        center
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["01", "Choose Your Course", "Discover a programme that matches your interests and ambitions."],
          ["02", "Learn with Guidance", "Build your knowledge with a structured learning approach."],
          ["03", "Practice and Improve", "Strengthen your understanding through practice and assessment."],
          ["04", "Move Forward", "Prepare for professional opportunities and your next milestone."],
        ].map(([number, title, desc]) => (
          <Reveal key={number}>
            <div className="relative rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
              <span className="text-4xl font-extrabold text-[#D9DEEC]">
                {number}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-[#26345C]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
