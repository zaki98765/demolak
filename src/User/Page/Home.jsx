
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  FiArrowRight,
  FiGlobe,
  FiArrowUpRight,
  FiBookOpen,
  FiAward,
  FiUsers,
  FiMapPin,
  FiCheckCircle,
  FiMonitor,
  FiStar,
  FiTrendingUp,
  FiBriefcase,
  FiTarget,
  FiClock,
  FiDownload,
  FiSend,
} from "react-icons/fi";





const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
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

function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const duration = 1400;
    const steps = 40;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.min(value, Math.round(increment * current)));
      if (current >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count.toLocaleString("en-IN")}{suffix}</>;
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#6678A8]">
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


const courses = [
  {
    title: "CMA USA",
    category: "GLOBAL PROFESSIONAL QUALIFICATION",
    duration: "1 Year",
    eligibility: "+2 / Degree",
    description:
      "As the best CMA USA institute in India, our CMA USA course focuses on management accounting, financial strategy and industry-relevant skills. With expert mentoring and structured learning, we prepare students for global career opportunities.",
    tag: "GLOBAL QUALIFICATION",
    image: "/images/cma-usa.jpg",
    path: "/courses/cma-usa",
    brochure: "/brochures/cma-usa.pdf",
  },
  {
    title: "ACCA",
    category: "GLOBAL PROFESSIONAL QUALIFICATION",
    duration: "3 Years",
    eligibility: "+2 / Degree",
    description:
      "Our ACCA programme offers structured coaching with expert faculty, exam-focused training and practical learning to prepare students for global accounting careers.",
    tag: "INTERNATIONAL QUALIFICATION",
    image: "/images/acca.jpg",
    path: "/courses/acca",
    brochure: "/brochures/acca.pdf",
  },
  {
    title: "CMA India",
    category: "INDIAN PROFESSIONAL QUALIFICATION",
    duration: "3 Years",
    eligibility: "+2 / Degree",
    description:
      "Our CMA India course provides concept-based teaching, regular assessments and practical exposure to help students build strong careers in Indian corporates and beyond.",
    tag: "INDIAN QUALIFICATION",
    image: "/images/cma-india.jpg",
    path: "/courses/cma-india",
    brochure: "/brochures/cma-india.pdf",
  },
  {
    title: "Chartered Accountant",
    category: "INDIAN PROFESSIONAL QUALIFICATION",
    duration: "3 Years",
    eligibility: "+2 / Degree",
    description:
      "Our CA programme offers exam-focused coaching and academic support to develop successful careers in accounting, taxation and finance.",
    tag: "PROFESSIONAL QUALIFICATION",
    image: "/images/ca.jpg",
    path: "/courses/ca",
    brochure: "/brochures/ca.pdf",
  },
  {
    title: "Company Secretary",
    category: "INDIAN PROFESSIONAL QUALIFICATION",
    duration: "3 Years",
    eligibility: "+2 / Degree",
    description:
      "The CS course prepares students for careers in corporate law and governance through expert guidance and structured professional learning.",
    tag: "CORPORATE CAREER",
    image: "/images/cs.jpg",
    path: "/courses/cs",
    brochure: "/brochures/cs.pdf",
  },
  {
    title: "Enrolled Agent",
    category: "US PROFESSIONAL QUALIFICATION",
    duration: "1 Year",
    eligibility: "+2 / Degree",
    description:
      "Our EA programme prepares students for US taxation careers through structured training, practical understanding and expert academic guidance.",
    tag: "US TAXATION",
    image: "/images/ea.jpg",
    path: "/courses/ea",
    brochure: "/brochures/ea.pdf",
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
  { name: "Calicut", address: "Azhakodi Temple Road, near MGI International School", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/calicut" },
  { name: "Vadakara", address: "Edodi, Vadakara", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/vadakara" },
  { name: "Kannur", address: "5th Floor, Capitol Mall, Thana", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900", path: "/campuses/kannur" },
  { name: "Manjeri", address: "Manjeri Town, Malappuram", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/manjeri" },
  { name: "Kottakkal", address: "Pullat Tower, Parappur Main Road", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/kottakkal" },
  { name: "Perinthalmanna", address: "Moossakkutty Bus Stand Road", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900", path: "/campuses/perinthalmanna" },
  { name: "Thrissur", address: "Mahatma Nagar / East Fort area", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/thrissur" },
  { name: "Kochi", address: "Medical Centre Road, Vennala", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/kochi" },
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
  "Tata Consultancy Services",
  "Wipro",
  "HCLTech",
  "Cognizant",
  "Capgemini",
  "IBM",
  "Tech Mahindra",
];

const stories = [
  { name: "Student Story 01", role: "CMA Aspirant", qualification: "CMA Preparation", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500", quote: "The structured classes helped me understand difficult topics step by step." },
  { name: "Student Story 02", role: "ACCA Aspirant", qualification: "ACCA Preparation", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", quote: "Regular practice and mentor support made my preparation more organised." },
  { name: "Student Story 03", role: "Commerce Graduate", qualification: "Professional Course", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500", quote: "I gained clarity about the professional options available after commerce." },
  { name: "Student Story 04", role: "CA Aspirant", qualification: "CA Preparation", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", quote: "The learning plan gave me a better routine and helped me stay consistent." },
  { name: "Student Story 05", role: "CMA USA Aspirant", qualification: "CMA USA Preparation", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500", quote: "Concept-focused sessions helped me connect the lessons with practical examples." },
  { name: "Student Story 06", role: "Commerce Student", qualification: "Career Guidance", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500", quote: "The guidance helped me compare courses and choose a direction for my career." },
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



const heroSlides = [
  {
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: "Build Your Career With",
    highlight: "Global Qualifications",
    description:
      "Gain professional knowledge, learn from experienced mentors and prepare yourself for exciting opportunities in commerce and finance.",
    primary: "Explore Courses",
    primaryLink: "/courses",
    secondary: "Book Free Counselling",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-1.png",
    imageAlt: "Graduate representing Catalyst Education students",
    card1: "Global Qualifications",
    card1Sub: "Professional learning pathways",
    card2: "Expert Mentorship",
    card2Sub: "Guidance throughout your journey",
    tag: "GLOBAL CAREER PATHWAYS",
    icon: FiGlobe,
  },
  {
    eyebrow: "LEARN FROM THE BEST",
    title: "Your Ambition Deserves",
    highlight: "Expert Guidance",
    description:
      "Get structured coaching, personal mentorship and academic support to move confidently towards your professional goals.",
    primary: "Meet Our Mentors",
    primaryLink: "/about",
    secondary: "Talk to Our Team",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-2.png",
    imageAlt: "Student learning and preparing for a professional career",
    card1: "Experienced Faculty",
    card1Sub: "Learn with expert mentors",
    card2: "Personal Guidance",
    card2Sub: "Support throughout your journey",
    tag: "LEARN WITH CONFIDENCE",
    icon: FiUsers,
  },
  {
    eyebrow: "MAKE YOUR NEXT MOVE",
    title: "Turn Your Dreams Into",
    highlight: "A Successful Career",
    description:
      "Explore professional courses, develop practical skills and take confident steps towards a rewarding future in commerce.",
    primary: "Find Your Course",
    primaryLink: "/courses",
    secondary: "Get Career Guidance",
    secondaryLink: "/enquiry",
    image: "/images/catalyst-student-3.png",
    imageAlt: "Graduate celebrating an academic milestone",
    card1: "Career Focused",
    card1Sub: "Build practical knowledge",
    card2: "Career Support",
    card2Sub: "Guidance for your next step",
    tag: "SHAPE YOUR TOMORROW",
    icon: FiAward,
  },
];


function Home() {
  const [activeHero, setActiveHero] = useState(0);
  const currentHero = heroSlides[activeHero];
  const HeroFeatureIcon = currentHero.icon;
  const prefersReducedMotion = useReducedMotion();
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isHeroPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isHeroPaused]);

  const nextHero = () => {
    setActiveHero((current) => (current + 1) % heroSlides.length);
  };

  const prevHero = () => {
    setActiveHero((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };
  const [selectedCourse, setSelectedCourse] = useState(courses[0].title);
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEnquiry = (e) => {
    e.preventDefault();
    // Connect this form to your backend/API later.
    alert("Demo enquiry submitted. Connect your backend to save enquiries.");
  };

  return (
    <div className="overflow-hidden bg-white">

      {/* HERO CAROUSEL */}

      <section className="relative overflow-hidden bg-white pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">


          {/* HERO CAROUSEL */}
          <div
            className="relative overflow-hidden rounded-[28px] bg-[#10294B] shadow-[0_25px_70px_rgba(25,55,100,0.13)] sm:rounded-[36px]"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
            onFocus={() => setIsHeroPaused(true)}
            onBlur={() => setIsHeroPaused(false)}
          >



            {/* FIXED BEST ROCC CENTRE BADGE */}
            <div className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 sm:block lg:bottom-7">
              <div className="flex items-center gap-3 rounded-full border border-[#D5A943]/50 bg-[#17385F]/90 px-5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE8A3] to-[#D5A943] text-[#10294B]">
                  <FiAward size={17} />
                </div>

                <span className="text-xs font-extrabold tracking-wide text-white">
                  BEST ROCC CENTRE
                </span>

                <span className="h-5 w-px bg-white/30" />

                <span className="rounded-full bg-[#D5A943] px-3 py-1 text-[10px] font-black tracking-wider text-[#10294B]">
                  4 TIMES
                </span>
              </div>
            </div>



            {/* Background decorations */}
            <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -right-12 -top-20 h-[420px] w-[420px] rounded-full border border-white/10" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-full w-2/3 bg-gradient-to-l from-[#1762B5]/70 via-[#12447D]/40 to-transparent" />

            {/* Fixed-size slide container */}
            <div
              className="relative grid h-[960px] grid-cols-1 grid-rows-[560px_400px] sm:h-[900px] sm:grid-rows-[500px_400px] lg:h-[590px] lg:grid-cols-2 lg:grid-rows-1"
            >

              {/* LEFT CONTENT */}
              <div
                key={`content-${activeHero}`}
                className="relative z-20 flex h-full flex-col justify-center px-7 py-8 sm:px-12 lg:px-14 lg:py-12 animate-hero-content"
              >

                {/* Eyebrow */}
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#66D6FF]" />

                  <span className="text-[10px] font-bold tracking-[0.18em] text-blue-100 sm:text-xs">
                    {currentHero.eyebrow}
                  </span>
                </div>

                <p className="mb-3 text-sm font-semibold tracking-wide text-blue-200">
                  CATALYST EDUCATION
                </p>

                {/* Fixed title area */}
                <div className="flex h-[165px] flex-col justify-center sm:h-[175px]">
                  <h1 className="max-w-[560px] text-[34px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[40px] xl:text-[56px]">
                    {currentHero.title}
                    <span className="mt-1 block text-[#70C7FF]">
                      {currentHero.highlight}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <div className="mt-4 flex min-h-[100px] items-start">
                  <p className="max-w-[510px] text-sm leading-7 text-blue-100/85 sm:text-base sm:leading-8">
                    {currentHero.description}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={currentHero.primaryLink}
                    className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#12396B] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#DDF3FF]"
                  >
                    {currentHero.primary}

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1456A0] text-white transition-transform group-hover:translate-x-1">
                      <FiArrowUpRight />
                    </span>
                  </Link>

                  <Link
                    to={currentHero.secondaryLink}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  >
                    {currentHero.secondary}
                    <FiArrowUpRight />
                  </Link>
                </div>

                {/* Pagination */}
                <div className="mt-9 flex items-center gap-4">
                  <span className="text-xs font-bold tracking-widest text-white/60">
                    {String(activeHero + 1).padStart(2, "0")}
                  </span>

                  <div className="flex gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.eyebrow}
                        type="button"
                        onClick={() => setActiveHero(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-pressed={activeHero === index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeHero === index
                          ? "w-10 bg-[#70C7FF]"
                          : "w-5 bg-white/30 hover:bg-white/60"
                          }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-bold tracking-widest text-white/40">
                    {String(heroSlides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* RIGHT IMAGE AREA */}


              <div className="relative flex h-full min-h-0 items-end justify-center overflow-hidden lg:items-center">

                {/* Main decorative circle */}
                <div className="absolute bottom-5 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#BCEBFF] to-[#4C9CEB] opacity-90 sm:h-[350px] sm:w-[350px] lg:bottom-8 lg:left-auto lg:right-10 lg:h-[410px] lg:w-[410px] lg:translate-x-0" />

                {/* Outer circle border */}
                <div className="absolute bottom-8 left-1/2 h-[270px] w-[270px] -translate-x-1/2 rounded-full border-[16px] border-white/20 sm:h-[320px] sm:w-[320px] lg:bottom-12 lg:left-auto lg:right-[55px] lg:h-[370px] lg:w-[370px] lg:translate-x-0" />

                {/* Student image — positioned behind floating cards */}
                <img
                  key={`image-${activeHero}`}
                  src={currentHero.image}
                  alt={currentHero.imageAlt}
                  className="relative z-10 h-full max-h-[440px] w-auto max-w-[95%] translate-x-5 object-contain object-bottom animate-hero-image sm:max-h-[460px] sm:translate-x-8 lg:max-h-[510px] lg:translate-x-5"
                />

                {/* Feature card 1 — overlaps the student's shoulder */}
                <div className="absolute left-3 top-10 z-20 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:flex lg:left-0 lg:top-[22%]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                    <HeroFeatureIcon size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-[#26345C]">
                      {currentHero.card1}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {currentHero.card1Sub}
                    </p>
                  </div>
                </div>

                {/* Feature card 2 */}
                <div className="absolute bottom-16 right-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:flex lg:bottom-[18%] lg:right-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FF] text-[#1762B5]">
                    <FiBookOpen size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-[#26345C]">
                      {currentHero.card2}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {currentHero.card2Sub}
                    </p>
                  </div>
                </div>

                {/* Image tag */}
                <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-[#0D3767]/85 px-4 py-2 text-[9px] font-bold tracking-[0.16em] text-white backdrop-blur-md sm:bottom-8 lg:bottom-7 lg:left-auto lg:right-16 lg:translate-x-0">
                  {currentHero.tag}
                </div>

              </div>



              {/* Desktop arrows */}
              {/* <div className="absolute bottom-5 right-6 z-30 hidden items-center gap-2 sm:flex lg:bottom-7 lg:right-8">
                <button
                  type="button"
                  onClick={prevHero}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-[#12396B]"
                >
                  <FiArrowLeft />
                </button>

                <button
                  type="button"
                  onClick={nextHero}
                  aria-label="Next slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#12396B] transition hover:bg-[#70C7FF]"
                >
                  <FiArrowRight />
                </button>
              </div> */}
            </div>
          </div>

          {/* COURSE STRIP */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b border-gray-100 pb-7 sm:gap-x-12 lg:justify-between lg:px-8">
            <p className="w-full text-center text-[10px] font-bold tracking-[0.2em] text-gray-400 lg:w-auto lg:text-left">
              EXPLORE YOUR CAREER PATH
            </p>

            {["CMA USA", "CMA INDIA", "ACCA", "CA", "CS", "EA"].map(
              (course) => (
                <Link
                  key={course}
                  to="/courses"
                  className="text-sm font-extrabold tracking-wide text-[#52617D] transition hover:text-[#1762B5] sm:text-base"
                >
                  {course}
                </Link>
              )
            )}
          </div>
        </div>

        {/* ANIMATIONS */}
        <style>{`
        @keyframes heroContent {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroImage {
          from {
            opacity: 0;
            transform: translateX(25px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-hero-content {
          animation: heroContent 0.65s ease both;
        }

        .animate-hero-image {
          animation: heroImage 0.75s ease both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-content,
          .animate-hero-image {
            animation: none;
          }
        }
      `}</style>
      </section>


      {/* ------------------------------------------------------------------------------ */}


      {/* CATALYST AT A GLANCE */}


      <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#EAF4FF]/60 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-[#1762B5]">
                CATALYST EDUCATION
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#26345C] sm:text-4xl lg:text-5xl">
                Excellence That
                <span className="text-[#1762B5]"> Speaks For Itself</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: 500,
                suffix: "+",
                label: "EXPERT FACULTIES",
                icon: FiMonitor,
              },
              {
                value: 25000,
                suffix: "+",
                label: "STUDENTS YEARLY",
                icon: FiUsers,
              },
              {
                value: 30,
                suffix: "+",
                label: "SPECIALIZED COURSES",
                icon: FiBookOpen,
              },
              {
                value: 100,
                suffix: "%",
                label: "PLACEMENT SUPPORT",
                icon: FiBriefcase,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.label}>
                  <div
                    className="group relative h-full overflow-hidden rounded-[28px] border border-[#E7EDF5] bg-white/75 p-8 text-center shadow-[0_12px_45px_rgba(38,52,92,0.06)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#B9DFFF] hover:shadow-[0_20px_55px_rgba(23,98,181,0.12)]"
                  >
                    {/* Liquid glass highlight */}
                    <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#DCEEFF]/50 blur-3xl transition-all duration-500 group-hover:bg-[#B8DDFF]/70" />

                    {/* Icon */}
                    <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#DCEEFF] bg-gradient-to-br from-[#F1F8FF] to-[#DCEEFF] text-[#1456A0] shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_8px_20px_rgba(23,98,181,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={27} strokeWidth={2.3} />
                    </div>

                    {/* Animated counter */}
                    <h3 className="relative text-4xl font-black tracking-tight text-[#263B55] sm:text-5xl">
                      <CountUp
                        value={item.value}
                        suffix={item.suffix}
                      />
                    </h3>

                    {/* Caption */}
                    <p className="relative mt-3 text-xs font-extrabold tracking-[0.10em] text-[#697586] sm:text-sm">
                      {item.label}
                    </p>

                    {/* Bottom accent */}
                    <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#70C7FF] to-[#1762B5] transition-all duration-500 group-hover:w-20" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* COURSES - INFINITE AUTO SCROLL CAROUSEL */}
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


      {/* WHY CATALYST */}
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



      {/* CAMPUSES - INFINITE MOVING CAROUSEL */}
      <section className="overflow-hidden bg-[#F7F8FC] py-20 lg:py-28">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <SectionHeading
              eyebrow="Our campuses"
              title="A place to learn, connect and grow."
              description="Explore our campus locations and find a learning environment that works for you."
            />

            <Link
              to="/campuses"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#6678A8] transition hover:text-[#26345C]"
            >
              Explore campuses <FiArrowUpRight />
            </Link>

          </div>
        </div>

        {/* Campus carousel */}
        <div className="relative mt-12 overflow-hidden">

          {/* Left white fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#F7F8FC] via-[#F7F8FC]/90 to-transparent sm:w-28 lg:w-40" />

          {/* Moving cards */}
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >

            {[...campuses, ...campuses].map((campus, index) => (
              <motion.div
                key={`${campus.name}-${index}`}
                whileHover={{ y: -8, scale: 1.015 }}
                aria-hidden={index >= campuses.length ? true : undefined}
                className="group relative mr-6 h-[330px] w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl sm:h-[370px] sm:w-[340px]"
              >

                <Link
                  to={campus.path}
                  tabIndex={index >= campuses.length ? -1 : undefined}
                  className="absolute inset-0 block"
                  aria-label={`Explore ${campus.name} campus`}
                >

                  {/* Campus image */}
                  <img
                    src={campus.image}
                    alt={`${campus.name} campus`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233F]/90 via-[#26345C]/20 to-transparent transition-opacity duration-500 group-hover:from-[#18233F]/95" />

                  {/* Campus details */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-7">

                    <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D9DEEC]">
                      <FiMapPin className="text-sm" />
                      Catalyst Education Campus
                    </p>

                    <div className="flex items-end justify-between gap-3">

                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                          {campus.name}
                        </h3>

                        <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/80">
                          {campus.address}
                        </p>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#26345C] transition-all duration-300 group-hover:bg-[#6678A8] group-hover:text-white group-hover:rotate-45">
                        <FiArrowUpRight className="text-lg" />
                      </span>

                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}

          </motion.div>

          {/* Right white fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#F7F8FC] via-[#F7F8FC]/90 to-transparent sm:w-28 lg:w-40" />

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
            <div className="mt-12 rounded-3xl border border-slate-100 bg-[#F7F8FC] px-5 py-10 sm:px-10">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Examples of recognised global employers
              </p>
              <div className="relative mt-9 overflow-hidden">
                <motion.div
                  className="flex w-max items-center py-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                >
                  {[...employers, ...employers].map((employer, index) => (
                    <div key={`${employer}-${index}`} aria-hidden={index >= employers.length ? true : undefined} className="mr-14 min-w-[120px] text-center text-xl font-extrabold tracking-tight text-slate-400 transition hover:text-[#26345C] sm:text-2xl">
                      {employer}
                    </div>
                  ))}
                </motion.div>
              </div>
              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                Employer names are illustrative examples only and do not imply a verified placement partnership.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STUDENT STORIES */}
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

      {/* FINAL ENQUIRY CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[30px] bg-[#26345C] lg:grid-cols-2">
          <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-white/15 blur-3xl" />

          <div className="relative flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#AAB5D2]">
              Take the first step
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              Your future deserves the right beginning.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
              Tell us about your goals. Our team can help you explore courses
              and understand your next steps.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#AAB5D2]">
              <FiCheckCircle /> Find a learning path that suits you
            </div>
          </div>

          <div className="relative bg-white p-8 sm:p-12 lg:p-14">
            <h3 className="text-2xl font-extrabold text-[#26345C]">
              Request a callback
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Share your details and we'll get in touch.
            </p>

            <form onSubmit={handleEnquiry} className="mt-7 space-y-5">
              <div>
                <label htmlFor="enquiry-name" className="mb-2 block text-xs font-bold text-slate-600">
                  Your name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#1762B5] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
                />
              </div>

              <div>
                <label htmlFor="enquiry-phone" className="mb-2 block text-xs font-bold text-slate-600">
                  Phone number
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#1762B5] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
                />
              </div>

              <div>
                <label htmlFor="enquiry-course" className="mb-2 block text-xs font-bold text-slate-600">
                  Interested course
                </label>
                <select
                  id="enquiry-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-[#1762B5] focus-visible:ring-2 focus-visible:ring-[#1762B5]/25"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#26345C] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#26345C]/10 transition hover:bg-[#53658F]"
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
