/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, Award, ShieldCheck, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Achievement } from "../types";

interface AchievementsProps {
  achievements?: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const defaultAchievements: Achievement[] = [
    {
      year: "2023",
      title: "Innovation Challenge - Winner",
      description: "Secured First Prize in my section at the Innovation Challenge for developing an efficient, low-cost Bucket Air Conditioner prototype addressing sustainable cooling solutions.",
      tag: "INNOVATION",
      type: "COMPETITION",
      link: "https://www.linkedin.com/in/amancha-chanikya/details/honors/",
    },
    {
      year: "2025",
      title: "INIT SAGA Hackathon - Runner",
      description: "Secured Runner-Up position at the INIT Saga Hackathon conducted by SCOPE Club, MLRIT for developing a healthcare application with an alarm-based medicine reminder, price comparison and voice assistant feature.",
      tag: "HACKATHON",
      type: "HACKATHON",
      link: "https://www.linkedin.com/posts/amancha-chanikya_initabrsaga-hackathonexperience-healthcaretech-activity-7324843900018319360-pVfo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
    },
    {
      year: "2025",
      title: "Project Expo - Runner",
      description: "Successfully mentored the team to secure the Runner-up position in the Innovation Challenge 2025, demonstrating leadership, technical guidance and effective mentorship.",
      tag: "MENTORSHIP",
      type: "ACADEMIC",
      link: "https://www.linkedin.com/posts/amancha-chanikya_mentorship-innovationchallenge2k25-ciemlrit-activity-7347672850180325376-nlTO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
    },
    {
      year: "2025",
      title: "Student Coordinator – Zignasa 2K25",
      description: "Awarded in recognition of commitment, leadership, and significant contributions as a Student Coordinator for Zignasa 2K25, organized by the Department of Computer Science and Engineering at MLR Institute of Technology, Hyderabad.",
      tag: "LEADERSHIP",
      type: "ACADEMIC",
      link: "https://www.linkedin.com/in/amancha-chanikya/details/honors/",
    },
    {
      year: "2026",
      title: "Servicenow Virtual Internship Program",
      description: "Successfully completed the ServiceNow Virtual Internship Program, organized by ServiceNow, AICTE and SmartBridge. It has enhanced my problem-solving skills and provided valuable industry insights into enterprise digital transformation.",
      tag: "INTERNSHIP",
      type: "ACADEMIC",
      link: "https://www.linkedin.com/posts/amancha-chanikya_servicenow-virtualinternship-microcertification-activity-7468000821931253760-6E4n?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
    },
  ];

  const displayAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements;
  
  // Double the achievements to create a seamless infinite loop
  const doubledAchievements = [...displayAchievements, ...displayAchievements];

  // Auto-scroll logic with requestAnimationFrame
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const halfWidth = scrollWidth / 2;
      
      // Seamless loop reset
      if (scrollLeft >= halfWidth) {
        scrollRef.current.scrollLeft = scrollLeft - halfWidth;
      }

      const totalScroll = halfWidth;
      if (totalScroll > 0) {
        setScrollProgress(((scrollLeft % halfWidth) / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  const startAutoScroll = () => {
    if (animationRef.current) return;
    
    const scrollStep = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const elapsed = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (scrollRef.current) {
        const speed = 0.075; // Increased speed for a more dynamic continuous scrolling motion
        const scrollContainer = scrollRef.current;
        const currentScroll = scrollContainer.scrollLeft;
        const halfWidth = scrollContainer.scrollWidth / 2;

        let nextScroll = currentScroll + speed * elapsed;
        if (nextScroll >= halfWidth) {
          nextScroll = nextScroll - halfWidth;
        }
        
        scrollContainer.scrollLeft = nextScroll;
      }
      animationRef.current = requestAnimationFrame(scrollStep);
    };
    
    animationRef.current = requestAnimationFrame(scrollStep);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTimeRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [isHovered, doubledAchievements.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getIcon = (type: string) => {
    return <Trophy size={18} className="text-[#FF3E00]" />;
  };

  const getTagStyles = () => {
    return "bg-[#FF3E00]/10 text-[#FF3E00] border-[#FF3E00]/20";
  };

  return (
    <section id="achievements" className="py-24 px-6 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading with Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="text-left max-w-2xl flex flex-col items-start gap-3">
            <motion.h2
              id="achievements-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
            >
              Achievements
            </motion.h2>
            <div className="w-20 h-[3px] bg-[#FF3E00]" />
            <p className="font-sans text-white/50 text-sm sm:text-base leading-relaxed mt-1">
              A collection of my professional accomplishments, competitive coding awards, and recognition earned throughout my journey.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              id="achievements-prev-btn"
              onClick={() => scroll("left")}
              className="p-3 bg-[#0c0c0c] border border-white/10 text-white/60 hover:text-white hover:border-[#FF3E00]/50 hover:bg-[#FF3E00]/5 transition-all duration-200 rounded-none cursor-pointer"
              aria-label="Previous Achievement"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              id="achievements-next-btn"
              onClick={() => scroll("right")}
              className="p-3 bg-[#0c0c0c] border border-white/10 text-white/60 hover:text-white hover:border-[#FF3E00]/50 hover:bg-[#FF3E00]/5 transition-all duration-200 rounded-none cursor-pointer"
              aria-label="Next Achievement"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable container of cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-row overflow-x-auto gap-8 pb-6 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {doubledAchievements.map((achievement, index) => (
            <motion.div
              id={`achievement-card-${index}`}
              key={`${achievement.title}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: (index % displayAchievements.length) * 0.1 }}
              className="w-[310px] sm:w-[420px] md:w-[460px] shrink-0 bg-[#0c0c0c] border border-white/10 rounded-none p-8 flex flex-col justify-between items-start text-left gap-6 relative group hover:border-[#FF3E00]/30 hover:bg-[#0e0e0e] transition-all duration-300 shadow-2xl h-[380px]"
            >
              {/* Top Row: Year Badge and Type Icon */}
              <div className="flex items-center justify-between w-full border-b border-white/5 pb-4">
                <span className="font-mono text-[10px] font-bold text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-none uppercase tracking-wider">
                  {achievement.year}
                </span>
                <div className="p-2 bg-white/5 rounded-none group-hover:bg-[#FF3E00]/10 transition-colors duration-300">
                  {getIcon(achievement.type)}
                </div>
              </div>

              {/* Middle Row: Title and Description */}
              <div className="flex flex-col gap-2.5 flex-grow overflow-hidden w-full">
                <h3 className="font-display font-bold text-base sm:text-lg text-white leading-tight group-hover:text-[#FF3E00] transition-colors duration-200 uppercase tracking-tight line-clamp-2">
                  {achievement.title}
                </h3>
                <p className="font-sans text-white/60 text-xs sm:text-sm leading-relaxed overflow-y-auto pr-1 select-text scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                  {achievement.description}
                </p>
              </div>

              {/* Bottom Row: Category Tag & Link */}
              <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-white/5 gap-4">
                <span
                  className={`font-mono text-[9px] font-bold px-2.5 py-1 rounded-none border tracking-wider select-none ${getTagStyles()}`}
                >
                  {achievement.tag}
                </span>

                {achievement.link && (
                  <a
                    id={`achievement-link-${index}`}
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-white/40 hover:text-[#FF3E00] transition-colors duration-200 uppercase tracking-wider py-1 border-b border-transparent hover:border-[#FF3E00]"
                  >
                    <span>View Post</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Progress Bar Indicator */}
        <div className="flex justify-start mt-4">
          <div className="w-40 bg-white/5 h-[3px] relative rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#FF3E00] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${Math.max(8, scrollProgress)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
