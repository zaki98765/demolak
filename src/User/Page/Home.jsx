
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiAward,
  FiUsers,
  FiMapPin,
  FiCheckCircle,
  FiPlay,
  FiStar,
  FiTrendingUp,
  FiBriefcase,
  FiTarget,
  FiChevronRight,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-orange-600">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172554] sm:text-4xl lg:text-[44px]">
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

const courses = [
  {
    title: "CA Foundation",
    category: "CHARTERED ACCOUNTANCY",
    description:
      "Build a strong foundation in accounting, business laws, mathematics and economics.",
    duration: "4–6 Months",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900",
    path: "/courses/ca-foundation",
    tag: "Start Here",
  },
  {
    title: "CA Intermediate",
    category: "CHARTERED ACCOUNTANCY",
    description:
      "Develop professional knowledge and practical skills for your CA journey.",
    duration: "8–12 Months",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900",
    path: "/courses/ca-intermediate",
    tag: "Popular",
  },
  {
    title: "ACCA",
    category: "GLOBAL ACCOUNTING",
    description:
      "Explore an internationally recognised qualification in accounting and finance.",
    duration: "Flexible",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900",
    path: "/courses/acca",
    tag: "Global Career",
  },
  {
    title: "CMA",
    category: "MANAGEMENT ACCOUNTING",
    description:
      "Build expertise in financial planning, performance and strategic management.",
    duration: "Flexible",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900",
    path: "/courses/cma",
    tag: "Professional",
  },
];

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

const campuses = [
  {
    name: "Kozhikode",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=900",
    path: "/campuses/kozhikode",
  },
  {
    name: "Malappuram",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900",
    path: "/campuses/malappuram",
  },
  {
    name: "Kannur",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900",
    path: "/campuses/kannur",
  },
];

const employers = [
  "Deloitte",
  "EY",
  "KPMG",
  "PwC",
  "Accenture",
  "Amazon",
  "Microsoft",
  "Infosys",
];

const stories = [
  {
    name: "Student Success Story 01",
    role: "Commerce Graduate",
    qualification: "Professional Qualification",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    quote:
      "The right guidance and consistent preparation helped me move closer to my professional goals.",
  },
  {
    name: "Student Success Story 02",
    role: "Commerce Student",
    qualification: "Professional Qualification",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    quote:
      "The learning environment encouraged me to improve my confidence and develop my knowledge.",
  },
  {
    name: "Student Success Story 03",
    role: "Commerce Graduate",
    qualification: "Professional Qualification",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    quote:
      "Having a clear study plan and support made my learning journey more organised.",
  },
];

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

function Home() {
  const [selectedCourse, setSelectedCourse] = useState("CA Foundation");
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEnquiry = (e) => {
    e.preventDefault();
    // Connect this form to your backend/API later.
    alert("Demo enquiry submitted. Connect your backend to save enquiries.");
  };

  return (
    <div className="overflow-hidden bg-white">

      {/* HERO */}
      <section className="relative bg-[#F8FAFC]">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-28">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              YOUR FUTURE STARTS WITH THE RIGHT EDUCATION
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#172554] sm:text-5xl lg:text-[62px]"
            >
              Turn Your
              <span className="block text-orange-500">
                Ambition
              </span>
              Into Achievement.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              Build your future in commerce with expert guidance, structured
              learning and the confidence to achieve your professional goals.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Courses <FiArrowRight />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-[#172554] transition hover:border-orange-300 hover:text-orange-600"
              >
                Discover Lakshya <FiArrowUpRight />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" />
                Career-focused learning
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" />
                Expert guidance
              </span>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -left-5 -top-5 h-full w-full rounded-[32px] border-2 border-orange-200" />

            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src="https://lakshyacommerce.ae/_next/image?url=https%3A%2F%2Flakshyacommerce.s3.ap-south-1.amazonaws.com%2Flakshyacommerce%2Fae%2BWebsite%2Brevamp-39.webp&w=3840&q=75"
                alt="Students at a university campus"
                className="h-[390px] w-full object-cover sm:h-[510px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/65 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                  Your journey matters
                </p>
                <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Learn Today.
                  <br />
                  Lead Tomorrow.
                </h3>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl text-orange-600">
                  <FiAward />
                </div>
                <div>
                  <p className="font-extrabold text-[#172554]">
                    Your Success
                  </p>
                  <p className="text-xs text-slate-500">
                    Starts with the right step
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST / INTRODUCTION */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
          {[
            {
              icon: FiBookOpen,
              title: "Professional Courses",
              desc: "Explore your academic possibilities",
            },
            {
              icon: FiUsers,
              title: "Learning Community",
              desc: "Grow with a supportive environment",
            },
            {
              icon: FiTarget,
              title: "Career Direction",
              desc: "Prepare for your next opportunity",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#172554]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Explore our programmes"
            title="Find the right course for your future."
            description="Discover professional commerce programmes and choose the learning path that matches your ambitions."
          />

          <Link
            to="/courses"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            View all courses <FiArrowUpRight />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {courses.map((course) => (
            <motion.div
              key={course.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-orange-600 shadow-sm">
                  {course.tag}
                </span>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-extrabold tracking-[0.12em] text-orange-600">
                  {course.category}
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-[#172554]">
                  {course.title}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {course.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">
                    {course.duration}
                  </span>
                  <Link
                    to={course.path}
                    aria-label={`Explore ${course.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition hover:bg-orange-500 hover:text-white"
                  >
                    <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY LAKSHYA */}
      <section className="bg-[#F8FAFC] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1100"
                alt="Students learning in a classroom"
                className="h-[430px] w-full rounded-[28px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-7 -right-4 max-w-[240px] rounded-2xl bg-[#172554] p-6 text-white shadow-xl sm:-right-7">
                <FiAward className="text-3xl text-orange-400" />
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
              eyebrow="Why Lakshya"
              title="More than education. A pathway to your ambitions."
              description="A learning experience designed to help students strengthen their knowledge, build confidence and work towards professional goals."
            />

            <div className="mt-9 grid gap-7 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={feature.title}>
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#172554]">
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
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#172554] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Know More About Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
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
                <span className="text-4xl font-extrabold text-orange-200">
                  {number}
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#172554]">
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

      {/* CAMPUSES */}
      <section className="bg-[#172554] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our campuses"
              title="A place to learn, connect and grow."
              description="Explore our campus locations and find a learning environment that works for you."
            />
            <Link
              to="/campuses"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-orange-300 hover:text-white"
            >
              Explore campuses <FiArrowUpRight />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {campuses.map((campus) => (
              <Reveal key={campus.name}>
                <Link
                  to={campus.path}
                  className="group relative block h-[330px] overflow-hidden rounded-2xl"
                >
                  <img
                    src={campus.image}
                    alt={`${campus.name} campus`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1535]/90 via-[#172554]/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-orange-300">
                        <FiMapPin /> LAKSHYA CAMPUS
                      </p>
                      <h3 className="text-2xl font-extrabold">
                        {campus.name}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#172554] transition group-hover:bg-orange-500 group-hover:text-white">
                      <FiArrowUpRight />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER BRAND SHOWCASE */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Career possibilities"
            title="Build skills for a world of opportunities."
            description="Professional qualifications can open pathways into accounting, consulting, technology and business. Explore some examples of globally recognised employers."
            center
          />

          <Reveal>
            <div className="mt-12 rounded-3xl border border-slate-100 bg-[#F8FAFC] px-5 py-10 sm:px-10">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Examples of recognised global employers
              </p>
              <div className="mt-9 grid grid-cols-2 items-center gap-8 sm:grid-cols-4">
                {employers.map((employer) => (
                  <div
                    key={employer}
                    className="text-center text-xl font-extrabold tracking-tight text-slate-500 transition hover:text-[#172554] sm:text-2xl"
                  >
                    {employer}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                Illustrative employer examples only. These are not verified
                Lakshya placement partners or alumni employers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STUDENT STORIES */}
      <section className="bg-[#F8FAFC] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Student stories"
              title="Every achievement begins with a journey."
              description="Get inspired by student experiences and their learning journeys."
            />
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600"
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
                      <h3 className="font-extrabold text-[#172554]">
                        {story.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {story.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-1 text-orange-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar key={star} className="fill-current" />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    "{story.quote}"
                  </p>

                  <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold text-orange-600">
                    {story.qualification}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">
            Demo profiles and testimonials. Replace with approved real student
            stories before publishing.
          </p>
        </div>
      </section>

      {/* BLOGS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Knowledge hub"
            title="Ideas and insights for your next step."
            description="Explore useful articles, preparation tips and career guidance."
          />
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600"
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
                <p className="mt-5 text-xs font-extrabold tracking-[0.15em] text-orange-600">
                  {blog.category}
                </p>
                <h3 className="mt-3 text-xl font-extrabold leading-snug text-[#172554] transition group-hover:text-orange-600">
                  {blog.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-orange-600">
                  Read article <FiArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL ENQUIRY CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[30px] bg-[#172554] lg:grid-cols-2">
          <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

          <div className="relative flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">
              Take the first step
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              Your future deserves the right beginning.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
              Tell us about your goals. Our team can help you explore courses
              and understand your next steps.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-orange-300">
              <FiCheckCircle /> Find a learning path that suits you
            </div>
          </div>

          <div className="relative bg-white p-8 sm:p-12 lg:p-14">
            <h3 className="text-2xl font-extrabold text-[#172554]">
              Request a callback
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Share your details and we'll get in touch.
            </p>

            <form onSubmit={handleEnquiry} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Phone number
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Interested course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-orange-400"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
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

    </div>
  );
}

export default Home;
