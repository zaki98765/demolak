import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Header from "./User/Components/Header";
import Home from "./User/Page/Home";
import Footer from "./User/Components/Footer";
import FloatingContact from "./User/Components/FloatingContact";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main"
        className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-[#10294B] px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#70C7FF]/60"
      >
        Skip to content
      </a>

      <Header />
      <FloatingContact />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </MotionConfig>
  );
}

export default App;
