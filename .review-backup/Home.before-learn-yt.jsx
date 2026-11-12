import HeroSection from "../Components/HeroSection";
import StatsSection from "../Components/StatsSection";
import CoursesSection from "../Components/CoursesSection";
import WhyCatalystSection from "../Components/WhyCatalystSection";
import WhyChooseSection from "../Components/WhyChooseSection";
import LearningJourneySection from "../Components/LearningJourneySection";
import FacultySection from "../Components/FacultySection";
import CampusesSection from "../Components/CampusesSection";
import EmployersSection from "../Components/EmployersSection";
import StudentStoriesSection from "../Components/StudentStoriesSection";
import NewsSection from "../Components/NewsSection";
import SuccessVideosSection from "../Components/SuccessVideosSection";
import BlogsSection from "../Components/BlogsSection";
import EnquirySection from "../Components/EnquirySection";

function Home() {
  return (
    <div className="overflow-x-clip bg-white">
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <EmployersSection />
      <StudentStoriesSection />
      <CampusesSection />
      <FacultySection />
      <WhyCatalystSection />
      <WhyChooseSection />

      <NewsSection />
      <SuccessVideosSection />

      
      <LearningJourneySection />
      
      
      <BlogsSection />
      <EnquirySection />
    </div>
  );
}

export default Home;
