/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import AllProjectsPage from "./components/AllProjectsPage";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import DevLoader from "./components/DevLoader";
import { motion } from "motion/react";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentView, setCurrentView] = useState<"portfolio" | "projects-page">("portfolio");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/portfolio-data");
        setPortfolioData(response.data);
      } catch (error) {
        console.warn("Failed to fetch custom portfolio data from server API, using local fallbacks.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let lastClientX = 0;
    let lastClientY = 0;

    const updatePosition = () => {
      setMousePos({
        x: lastClientX + window.scrollX,
        y: lastClientY + window.scrollY,
      });
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      updatePosition();
      if (!isHovered) setIsHovered(true);
    };

    const handleScroll = () => {
      updatePosition();
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  const handleScrollToSection = (id: string) => {
    if (currentView !== "portfolio") {
      setCurrentView("portfolio");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  const handleHeaderNavClick = (href: string) => {
    if (href === "#") {
      setCurrentView("portfolio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetId = href.substring(1);
    handleScrollToSection(targetId);
  };

  if (showLoader) {
    return <DevLoader onComplete={() => setShowLoader(false)} />;
  }

  return (
    <>
      <motion.div 
        id="portfolio-app-root" 
        initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-[#050505] text-white antialiased font-sans flex flex-col selection:bg-[#FF3E00]/20 selection:text-[#FF3E00] relative overflow-hidden"
      >
      {/* Persistent Dot Matrix Background (resembling stitch.google.com) */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Interactive Viewport-Space Ambient Radial Glow tracking the cursor */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-500 ease-out opacity-100 mix-blend-screen hidden md:block z-[1]"
          style={{
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle at center, rgba(255,75,0,0.22) 0%, rgba(255,100,0,0.05) 45%, rgba(0,0,0,0) 70%)",
            left: `${mousePos.x - 175}px`,
            top: `${mousePos.y - 175}px`,
          }}
        />
      )}

      {/* Header element with toggle callbacks */}
      <Header onResumeClick={() => setIsResumeOpen(true)} onNavClick={handleHeaderNavClick} />

      {/* Main Container */}
      <main className="flex-grow relative z-10">
        {currentView === "portfolio" ? (
          <>
            {/* Hero Section */}
            <Hero
              onContactClick={() => handleScrollToSection("contact")}
              onProjectsClick={() => handleScrollToSection("projects")}
            />

            {/* About Section */}
            <About onResumeDownload={() => setIsResumeOpen(true)} />

            {/* Skills Section */}
            <Skills skillsData={portfolioData?.skills} />

            {/* Projects Section */}
            <Projects 
              projects={portfolioData?.projects} 
              onViewMoreClick={() => {
                setCurrentView("projects-page");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            />

            {/* Achievements Section */}
            <Achievements achievements={portfolioData?.achievements} />

            {/* Certifications Section */}
            <Certifications />

            {/* Contact Form Section */}
            <Contact />
          </>
        ) : (
          <AllProjectsPage 
            onBackToHome={() => {
              setCurrentView("portfolio");
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            fullStackProjects={portfolioData?.projects}
          />
        )}
      </main>

      {/* Footer element */}
      <Footer />
    </motion.div>

    {/* Interactive Printable/Downloadable Resume Modal */}
    <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
  </>
);
}
