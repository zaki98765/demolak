import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";

const features = [
  {
    icon: FiUsers,
    title: "Expert Mentorship",
    description:
      "Learn with experienced mentors who guide you throughout your academic journey.",
  },
  {
    icon: FiBookOpen,
    title: "Structured Learning",
    description:
      "Follow a clear learning path with classroom sessions, practice and assessments.",
  },
  {
    icon: FiTarget,
    title: "Career Guidance",
    description:
      "Get guidance to understand career opportunities and prepare for your next step.",
  },
  {
    icon: FiTrendingUp,
    title: "Growth Focused",
    description:
      "Build knowledge, confidence and the professional skills needed for your future.",
  },
];

// WHY CATALYST
export default function WhyCatalystSection() {
  return (
    <section className="bg-[#F7F8FC] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1100"
              alt="Students learning in a classroom"
              className="h-[430px] w-full rounded-[28px] object-cover shadow-xl"
            />
            <div className="absolute -bottom-7 -right-4 max-w-[240px] rounded-2xl bg-[#26345C] p-6 text-white shadow-xl sm:-right-7">
              <FiAward className="text-3xl text-[#8293C8]" />
              <h3 className="mt-3 text-xl font-extrabold">
                Learn with Purpose
              </h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Build the knowledge and confidence to move forward.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Why Catalyst Education"
            title="More than education. A pathway to your ambitions."
            description="A learning experience designed to help students strengthen their knowledge, build confidence and work towards professional goals."
          />

          <div className="mt-9 grid gap-7 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF1FA] text-xl text-[#6678A8]">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#26345C]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#26345C] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#53658F]"
          >
            Know More About Us <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
