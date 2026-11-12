import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";
import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";

const blogs = [
  {
    category: "CAREER GUIDANCE",
    title: "Career opportunities after studying commerce",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
    path: "/blogs",
  },
  {
    category: "STUDENT GUIDE",
    title: "How to plan your CA preparation effectively",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    path: "/blogs",
  },
  {
    category: "PROFESSIONAL COURSES",
    title: "CA vs ACCA: Understanding your career options",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    path: "/blogs",
  },
];

// BLOGS
export default function BlogsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Knowledge hub"
          title="Ideas and insights for your next step."
          description="Explore useful articles, preparation tips and career guidance."
        />
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6678A8]"
        >
          Explore all articles <FiArrowUpRight />
        </Link>
      </div>

      <div className="mt-12 grid gap-7 md:grid-cols-3">
        {blogs.map((blog) => (
          <Reveal key={blog.title}>
            <Link to={blog.path} className="group block">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs font-extrabold tracking-[0.15em] text-[#6678A8]">
                {blog.category}
              </p>
              <h3 className="mt-3 text-xl font-extrabold leading-snug text-[#26345C] transition group-hover:text-[#6678A8]">
                {blog.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-[#6678A8]">
                Read article <FiArrowRight />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
