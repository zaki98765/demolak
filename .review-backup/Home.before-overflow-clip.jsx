import HeroSection from "../Components/HeroSection";
import StatsSection from "../Components/StatsSection";
import CoursesSection from "../Components/CoursesSection";
import WhyCatalystSection from "../Components/WhyCatalystSection";
import LearningJourneySection from "../Components/LearningJourneySection";
import CampusesSection from "../Components/CampusesSection";
import EmployersSection from "../Components/EmployersSection";
import StudentStoriesSection from "../Components/StudentStoriesSection";
import BlogsSection from "../Components/BlogsSection";
import EnquirySection from "../Components/EnquirySection";

function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <EmployersSection />
      <StudentStoriesSection />
      <CampusesSection />
      <WhyCatalystSection />
      <LearningJourneySection />
      
      <BlogsSection />
      <EnquirySection />
    </div>
  );
}

export default Home;
