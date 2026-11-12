import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiStar,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";

const stories = [
  { name: "Student Story 01", role: "CMA Aspirant", qualification: "CMA Preparation", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500", quote: "The structured classes helped me understand difficult topics step by step." },
  { name: "Student Story 02", role: "ACCA Aspirant", qualification: "ACCA Preparation", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", quote: "Regular practice and mentor support made my preparation more organised." },
  { name: "Student Story 03", role: "Commerce Graduate", qualification: "Professional Course", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500", quote: "I gained clarity about the professional options available after commerce." },
  { name: "Student Story 04", role: "CA Aspirant", qualification: "CA Preparation", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", quote: "The learning plan gave me a better routine and helped me stay consistent." },
  { name: "Student Story 05", role: "CMA USA Aspirant", qualification: "CMA USA Preparation", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500", quote: "Concept-focused sessions helped me connect the lessons with practical examples." },
  { name: "Student Story 06", role: "Commerce Student", qualification: "Career Guidance", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500", quote: "The guidance helped me compare courses and choose a direction for my career." },
];

// STUDENT STORIES
export default function StudentStoriesSection() {
  return (
    <section className="bg-[#F7F8FC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Student stories"
            title="Every achievement begins with a journey."
            description="Get inspired by student experiences and their learning journeys."
          />
          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6678A8]"
          >
            View all stories <FiArrowUpRight />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <Reveal key={story.name}>
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-extrabold text-[#26345C]">
                      {story.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {story.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-1 text-[#8293C8]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="fill-current" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  "{story.quote}"
                </p>

                <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold text-[#6678A8]">
                  {story.qualification}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">
          Review cards currently contain sample placeholder copy. Replace with verified student testimonials and consented photos before publishing.
        </p>
      </div>
    </section>
  );
}
