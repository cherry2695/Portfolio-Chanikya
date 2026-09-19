/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../types";
import lexisShowcase from "../assets/images/lexis_ai_showcase.png";

const shopzyMockup = "https://lh3.googleusercontent.com/d/1tuIzgOpn8eIykiBN5hX9sIU-rmOUy_QC=w1920";
const medicareMockup = "https://lh3.googleusercontent.com/d/1fL7t-meiYIwEaGJYdyfgsPqzmS3dklVL=w1920";

interface ProjectsProps {
  projects?: Project[];
  onViewMoreClick?: () => void;
}

export default function Projects({ projects, onViewMoreClick }: ProjectsProps) {
  const defaultProjects: Project[] = [
    {
      title: "Shopzy – AI Powered Ecommerce Platform",
      description: "Shopzy is a modern AI-powered full-stack E-commerce application built to provide an intelligent and seamless online shopping experience. The platform combines traditional E-commerce functionalities with AI-driven product recommendations, enabling users to discover products more efficiently and make informed purchasing decisions.",
      tags: ["React.js", "TypeScript", "MongoDB", "Node.js", "Express.js", "Google Gemini"],
      githubUrl: "https://github.com/cherry2695/Shopzy-FullStack-Ecommerce-Application",
      liveUrl: "https://shopzy.ai.studio/",
      imageUrl: shopzyMockup,
    },
    {
      title: "Medicare Assistant – Smart Healthcare Platform",
      description: "A modern full-stack healthcare platform that helps patients manage prescriptions, receive voice-based medication reminders, compare medicine prices across multiple pharmacies and stay informed through real-time notifications. The application is designed to improve medication adherence and simplify healthcare management with a responsive user interface.",
      tags: ["React.js", "TypeScript", "MySQL", "Node.js", "Express.js", "Drizzle ORM"],
      githubUrl: "https://github.com/cherry2695/MediCare-FullStack-Healthcare-Platform",
      liveUrl: "https://health-hub-pro--z4developer95.replit.app",
      imageUrl: medicareMockup,
    },
    {
      title: "Wanderlust-Vacation Rental Booking Platform",
      description: "A modern full-stack vacation rental booking platform designed to connect travelers with unique and vibrant lodging options. Featuring rich interactive UI, booking workflows, reviews, and detailed host listings, it offers a seamless and responsive user experience.",
      tags: ["Bootstrap", "Javascript", "MongoDB", "EJS", "Node.js", "Express.js", "REST APIS", "Cloudinary"],
      githubUrl: "https://github.com/cherry2695/Wanderlust-VacationRental-Booking-Platform",
      liveUrl: "https://wanderlust-vacationrental-booking-qugt.onrender.com/",
      imageUrl: "https://drive.google.com/thumbnail?id=1gkV8M5X-ahAyPKMWB49VXF0IAZeZ342c&sz=w1600",
    },
    {
      title: "VaultPad – Secure Code & File Storage Platform",
      description: "A modern full-stack file and code management platform designed to help users securely store, organize and manage their media files and code snippets in one centralized workspace. Featuring session-based data isolation, dynamic image optimization using sharp multi-format file previewing",
      tags: ["Bootstrap", "Javascript", "MongoDB", "EJS", "Node.js", "Express.js", "REST APIS", "Cloudinary"],
      githubUrl: "https://github.com/cherry2695",
      liveUrl: "https://vaultpad-secure-code-file-storage.onrender.com",
      imageUrl: "https://drive.google.com/thumbnail?id=1newbcyqgzW5m4KNmu7a1JBH8bZmD6dY7&sz=w1600",
    },
    {
      title: "Cafe Biblio – Blend of Beans & Books",
      description: "Cafe Biblio is a premium full-stack café website inspired by modern specialty coffee houses and cozy libraries. The platform blends an elegant café experience with a digital presence, allowing visitors to explore the café, browse the menu, discover opening hours, read customer reviews and contact the café through a beautifully designed responsive interface.",
      tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
      githubUrl: "https://github.com/cherry2695/CafeBiblio-FullStack-Cafe-Website",
      liveUrl: "https://cafe-biblio-full-stack-cafe-website.vercel.app/",
      imageUrl: "https://drive.google.com/thumbnail?id=1i1UxJrxRbSKu-HiFpjppih3GVvcAWJCX&sz=w1600",
    },
    {
      title: "Lexis AI- Smart Notes and RAG platform",
      description: "Lexis AI is an AI-powered knowledge management platform that combines Retrieval-Augmented Generation (RAG) with NotebookLM-style AI notes and summarization. Users can upload PDF, DOCX and TXT documents, build personalized knowledge workspaces, ask context-aware questions and generate structured summaries, key points, definitions, action items and study materials.",
      tags: ["Python", "RAG", "FastAPI", "Streamlit", "React", "VectorDB", "Gemini API", "Embeddings"],
      githubUrl: "https://github.com/cherry2695/Lexis-AI-Smart-Notes-RAG-Platform",
      liveUrl: "https://lexis-ai-gilt.vercel.app/",
      imageUrl: lexisShowcase,
    },
  ];

  // We want to display all 6 main featured projects on the main page
  const displayProjects = (projects && projects.length > 0 ? projects : defaultProjects).filter(
    (p) => !p.title.toLowerCase().includes("flowboard")
  );

  const renderProjectMock = (project: Project) => {
    let src = project.imageUrl;
    if (src === "/src/assets/images/shopzy_banner_1782640902612.jpg" || src?.includes("shopzy_banner")) {
      src = shopzyMockup;
    } else if (src === "/src/assets/images/medicare_banner_1782642361387.jpg" || src?.includes("medicare_banner")) {
      src = medicareMockup;
    } else if (project.title.toLowerCase().includes("lexis")) {
      src = lexisShowcase;
    }

    if (src) {
      return (
        <div className="w-full aspect-[16/7.8] relative overflow-hidden bg-[#0c0c0c] border-b border-white/10 group select-none">
          <img
            src={src}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top block"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = "true";
                if (project.title.toLowerCase().includes("lexis")) {
                  target.src = "https://lh3.googleusercontent.com/d/1G0FWURquLVhxW1Mff3qelTPf-nWvvQCP=w1920";
                }
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>
      );
    }

    return null;
  };

  return (
    <section id="projects" className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-14 flex flex-col items-start gap-3">
          <motion.h2
            id="projects-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
          >
            Projects
          </motion.h2>
          <div className="w-20 h-[3px] bg-[#FF3E00]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {displayProjects.map((project, index) => (
            <motion.div
              id={`project-card-${index}`}
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.15 }}
              className="group bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden hover:border-[#FF3E00]/40 transition-colors duration-300 flex flex-col text-left w-full h-full shadow-2xl"
            >
              {renderProjectMock(project)}

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-[#FF3E00] transition-colors duration-200 tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5 mt-auto">
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] sm:text-[11px] font-semibold text-white/90 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded-none uppercase tracking-wider select-none hover:bg-white/[0.08] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.githubUrl || project.liveUrl) && (
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                      {project.liveUrl ? (
                        <a
                          id={`project-live-link-${index}`}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#FF3E00] hover:text-[#FF3E00]/80 transition-colors duration-200 uppercase tracking-wider py-1 border-b border-transparent hover:border-[#FF3E00]"
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3E00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3E00]"></span>
                          </span>
                          <ExternalLink size={12} />
                          <span>LIVE SITE</span>
                        </a>
                      ) : (
                        <div />
                      )}

                      {project.githubUrl && (
                        <a
                          id={`project-github-link-${index}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider py-1 border-b border-transparent hover:border-white"
                        >
                          <Github size={13} />
                          <span>GITHUB REPOSITORY</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {onViewMoreClick && (
          <div className="mt-16 flex justify-center">
            <button
              id="btn-view-more-projects"
              onClick={onViewMoreClick}
              className="group flex items-center gap-3 bg-[#FF3E00]/10 hover:bg-[#FF3E00] text-white font-mono text-[11px] uppercase tracking-[2px] font-bold px-8 py-4.5 border border-[#FF3E00]/30 hover:border-[#FF3E00] transition-all duration-300 shadow-lg hover:shadow-[#FF3E00]/20 cursor-pointer"
            >
              <span>View More Projects</span>
              <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-0.5px]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
