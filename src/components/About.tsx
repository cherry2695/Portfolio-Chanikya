/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Briefcase, FileText, Award, User } from "lucide-react";
import { motion } from "motion/react";

interface AboutProps {
  onResumeDownload: () => void;
}

export default function About({ onResumeDownload }: AboutProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Bio, Education, Experience */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="mb-8 flex flex-col items-start gap-3">
              <motion.h2
                id="about-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
              >
                About Me
              </motion.h2>
              <div className="w-20 h-[3px] bg-[#FF3E00]" />
            </div>

            {/* Bio Capsule */}
            <motion.div
              id="about-bio-container"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 p-8 bg-[#0c0c0c] border border-white/10 rounded-none w-full"
            >
              <div className="p-3 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none shrink-0 mt-0.5">
                <User size={18} />
              </div>
              <div>
                <h3 className="font-mono uppercase tracking-[2px] text-xs font-bold text-white mb-2">
                  Bio
                </h3>
                <p className="font-sans text-white/60 leading-relaxed text-sm sm:text-base">
                  I am a Computer Science undergraduate with a strong passion for building modern, user-friendly digital
                  experiences through web development, design & emerging technologies. Alongside development, I
                  have a strong interest in UI/UX & graphic design which helps me craft clean & visually engaging interfaces.
                </p>
              </div>
            </motion.div>

            {/* Education and Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
              
              {/* Education Card */}
              <motion.div
                id="about-education-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 bg-[#0c0c0c] border border-white/10 rounded-none text-left flex flex-col gap-5 h-full"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2.5 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none">
                    <GraduationCap size={16} />
                  </div>
                  <h3 className="font-mono uppercase tracking-[2px] text-xs font-bold text-white">
                    Education
                  </h3>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                      MLR Institute of Technology
                    </h4>
                    <p className="font-sans text-sm text-white/50 mt-1">
                      B.Tech, Computer Science & Engineering
                    </p>
                    <span className="inline-block mt-2.5 bg-[#FF3E00]/10 text-[#FF3E00] border border-[#FF3E00]/20 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-none">
                      CGPA: 9.13
                    </span>
                  </div>

                  <hr className="border-white/5" />

                  <div>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                      Sri Chaitanya Junior College
                    </h4>
                    <p className="font-sans text-sm text-white/50 mt-1">
                      Intermediate, Telangana
                    </p>
                    <span className="inline-block mt-2.5 bg-[#FF3E00]/10 text-[#FF3E00] border border-[#FF3E00]/20 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-none">
                      Percentage: 98.1%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                id="about-experience-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 bg-[#0c0c0c] border border-white/10 rounded-none text-left flex flex-col gap-5 h-full"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2.5 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none">
                    <Briefcase size={16} />
                  </div>
                  <h3 className="font-mono uppercase tracking-[2px] text-xs font-bold text-white">
                    Experience
                  </h3>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                      Graphic Designer
                    </h4>
                    <p className="font-sans text-sm text-[#FF3E00] font-medium mt-1">
                      Centre for Innovation & Entrepreneurship
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-2.5">
                      <span className="inline-block bg-white/5 text-white/70 border border-white/10 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-none">
                        Aug 2025 &mdash; Present
                      </span>
                    </div>
                  </div>

                  <hr className="border-white/5" />

                  <div>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                      Frontend Developer & UI/UX Designer
                    </h4>
                    <p className="font-sans text-sm text-[#FF3E00] font-medium mt-1">
                      Apollo Pharmacies
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-2.5">
                      <span className="inline-block bg-white/5 text-white/70 border border-white/10 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-none">
                        June 2026 &mdash; Present
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column - Profile Card */}
          <motion.div
            id="about-profile-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-4 bg-[#0c0c0c] border border-white/10 rounded-none p-8 text-center flex flex-col items-center gap-6 w-full max-w-sm mx-auto shadow-2xl"
          >
            {/* Magazine style rectangular portrait container */}
            <div className="relative w-full aspect-[4/5] border border-white/10 overflow-hidden bg-[#111] group">
              <img
                id="about-profile-image"
                src="https://lh3.googleusercontent.com/d/1T-tgIiUULmbFVF-VFiIWpXxXBrqnjfzL"
                alt="A.Chanikya Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-1.5 w-full text-left">
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                A.Chanikya
              </h3>
              <p className="font-mono text-xs text-[#FF3E00] uppercase tracking-wider font-semibold">
                Computer Science Undergrad '27
              </p>
              <div className="h-[1px] bg-white/5 my-2 w-full" />
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                Full-Stack Web Developer, creative Graphic Designer, and curious Data Analyst specialized in modern tech systems.
              </p>
            </div>

            {/* Certification Badge */}
            <div
              id="about-certification-badge"
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-none w-full py-2.5 justify-center text-white/70 text-[10px] font-mono font-bold uppercase tracking-[2px]"
            >
              <Award size={13} />
              <span>CSA & CAD Certified</span>
            </div>

            {/* View Resume Action */}
            <button
              id="btn-about-view-resume"
              onClick={onResumeDownload}
              className="w-full flex items-center justify-center gap-2 bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono text-[11px] uppercase tracking-[2px] font-bold py-4 rounded-none transition-all duration-300"
            >
              <FileText size={14} />
              <span>View Resume</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
