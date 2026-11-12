import { Suspense, lazy } from "react";
import HeroSection from "../Components/HeroSection";
import StatsSection from "../Components/StatsSection";
import CoursesSection from "../Components/CoursesSection";

/*
  Above-the-fold sections load with the main bundle; everything below is
  split into separate chunks so phones can paint and respond sooner.
  Order here = order on the page.
*/
const EmployersSection = lazy(() => import("../Components/EmployersSection"));
const StudentStoriesSection = lazy(() => import("../Components/StudentStoriesSection"));
const CampusesSection = lazy(() => import("../Components/CampusesSection"));
const FacultySection = lazy(() => import("../Components/FacultySection"));
const WhyCatalystSection = lazy(() => import("../Components/WhyCatalystSection"));
const WhyChooseSection = lazy(() => import("../Components/WhyChooseSection"));
const NewsSection = lazy(() => import("../Components/NewsSection"));
const SuccessVideosSection = lazy(() => import("../Components/SuccessVideosSection"));
const LearnYoutubeSection = lazy(() => import("../Components/LearnYoutubeSection"));
const BlogsSection = lazy(() => import("../Components/BlogsSection"));
const FaqSection = lazy(() => import("../Components/FaqSection"));
const EnquirySection = lazy(() => import("../Components/EnquirySection"));
const CampusLifeSection = lazy(() => import("../Components/CampusLifeSection"));

// Reserves space while a chunk loads so the page doesn't jump
function SectionFallback() {
  return <div aria-hidden="true" className="min-h-[60vh]" />;
}

function Home() {
  return (
    <div className="overflow-x-clip bg-white">
      <HeroSection />
      <StatsSection />
      <CoursesSection />

      <Suspense fallback={<SectionFallback />}>
        <EmployersSection />
        <StudentStoriesSection />
        <CampusesSection />
        <FacultySection />
        <WhyCatalystSection />
        <WhyChooseSection />
        <NewsSection />
        <SuccessVideosSection />
        <LearnYoutubeSection />
        <BlogsSection />
        <FaqSection />
        <EnquirySection />
        <CampusLifeSection />
      </Suspense>
    </div>
  );
}

export default Home;
