/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Train, 
  CalendarDays, 
  Layers, 
  Laptop,
  Mail,
  Landmark
} from "lucide-react";
import { Project } from "../types";
import lexisShowcase from "../assets/images/lexis_ai_showcase.png";

interface AllProjectsPageProps {
  onBackToHome: () => void;
  fullStackProjects?: Project[];
}

const shopzyMockup = "https://lh3.googleusercontent.com/d/1tuIzgOpn8eIykiBN5hX9sIU-rmOUy_QC=w1920";
const medicareMockup = "https://lh3.googleusercontent.com/d/1fL7t-meiYIwEaGJYdyfgsPqzmS3dklVL=w1920";

export default function AllProjectsPage({ onBackToHome, fullStackProjects }: AllProjectsPageProps) {
  // Define fallback full-stack projects in case they aren't passed
  const defaultFullStack: Project[] = [
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

  const listFullStack = fullStackProjects && fullStackProjects.length > 0 ? fullStackProjects : defaultFullStack;

  // Java Full Stack Projects
  const javaFullStackProjects: (Project & { type: string })[] = [
    {
      title: "SmartBank - Secure Banking Management System",
      description: "SmartBank is a robust desktop-based banking platform engineered using Core Java and Java Swing to deliver a secure and intuitive graphical user interface. The system streamlines core financial operations and account balance tracking. It features a secure authentication and credential validation module powered by JDBC to safely verify user PINs.",
      tags: ["Java", "Spring Boot", "Java Swing", "MySQL", "JWT", "JDBC"],
      githubUrl: "https://github.com/cherry2695",
      type: "smartbank",
    },
    {
      title: "AI MailCraft Intelligent - Email Generation Platform",
      description: "Smart AI Email Assistant is a full-stack AI writing tool that helps users reply to emails faster. It ships as two clients, a Chrome extension that injects an AI Reply button directly into Gmail's compose window and a standalone React web app. Both backed by the same Spring Boot REST API, which integrates with Google's Gemini API to generate the actual reply text.",
      tags: ["Java", "Spring Boot", "React.js", "Javascript", "REST API's", "Google Gemini"],
      githubUrl: "https://github.com/cherry2695/AI-MailCraft-Intelligent-Email-Generation-Platform",
      type: "mailcraft",
    },
  ];

  // ServiceNow Projects
  const servicenowProjects: (Project & { type: string })[] = [
    {
      title: "Metro Ticket Generating System",
      description: "An automated ServiceNow portal system enabling automated metro pass provisioning, custom QR code generation, fare table algorithms, and interactive admin ticket status tracking workflows.",
      tags: ["ServiceNow", "Service Portal", "Client Scripts", "Business Rules", "Flow Designer"],
      githubUrl: "https://github.com/cherry2695/Metro-Ticket-Generating-System-ServiceNow",
      type: "metro",
      imageUrl: "https://drive.google.com/thumbnail?id=1g7XvJXQdOXC7zS39v4M6V1h5CNF8rY1u&sz=w1600",
    },
    {
      title: "Leave Management System",
      description: "An enterprise ServiceNow HR application designed to automate holiday request lifecycles. Includes hierarchical multi-stage approval routings, leave balance ledgers, and dynamic calendar integrations.",
      tags: ["Servicenow", "Service Portal", "Client Scripts", "Business Rules", "Flow Designer"],
      githubUrl: "https://github.com/cherry2695/Leave-Management-System-Servicenow",
      type: "leave",
      imageUrl: "https://drive.google.com/thumbnail?id=1jBLwrCrtNiHnUIcpMzGI7IdgBy9glotY&sz=w1600",
    },
  ];

  // Render visual placeholders for non-image projects
  const renderVisualHeader = (type: string, title: string, imageUrl?: string, aspectRatioClass: string = "aspect-[16/7.8]") => {
    let src = imageUrl;
    if (src === "/src/assets/images/shopzy_banner_1782640902612.jpg" || src?.includes("shopzy_banner")) {
      src = shopzyMockup;
    } else if (src === "/src/assets/images/medicare_banner_1782642361387.jpg" || src?.includes("medicare_banner")) {
      src = medicareMockup;
    } else if (title.toLowerCase().includes("lexis")) {
      src = lexisShowcase;
    }

    if (src) {
      return (
        <div className="w-full aspect-[16/7.8] relative overflow-hidden bg-[#0c0c0c] border-b border-white/10 group select-none">
          <img
            src={src}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full block object-cover object-top"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = "true";
                if (title.toLowerCase().includes("lexis")) {
                  target.src = "https://lh3.googleusercontent.com/d/1G0FWURquLVhxW1Mff3qelTPf-nWvvQCP=w1920";
                }
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>
      );
    }
    switch (type) {
      case "mailcraft":
        return (
          <div className={`w-full ${aspectRatioClass} bg-gradient-to-br from-blue-950/40 via-indigo-950/40 to-slate-900/40 flex flex-col justify-center items-center border-b border-white/5 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-10" />
            <div className="flex items-center gap-3 relative z-10 bg-[#111111]/90 border border-white/10 px-4 py-3 rounded-none shadow-2xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              <Mail className="text-blue-400 animate-pulse" size={28} />
              <div className="text-left">
                <div className="text-xs font-bold font-mono text-white tracking-tight flex items-center gap-1.5">
                  <span>AI MAILCRAFT</span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 font-semibold">Spring Boot & Gemini</span>
                </div>
                <div className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-0.5">Gmail Extension + React Client</div>
              </div>
            </div>
          </div>
        );
      case "smartbank":
        return (
          <div className={`w-full ${aspectRatioClass} bg-gradient-to-br from-emerald-950/40 via-teal-950/40 to-slate-900/40 flex flex-col justify-center items-center border-b border-white/5 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(#10B981_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-10" />
            <div className="flex items-center gap-3 relative z-10 bg-[#111111]/90 border border-white/10 px-4 py-3 rounded-none shadow-2xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              <Landmark className="text-emerald-400 animate-pulse" size={28} />
              <div className="text-left">
                <div className="text-xs font-bold font-mono text-white tracking-tight flex items-center gap-1.5">
                  <span>SMARTBANK</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 font-semibold">Java & Spring Boot</span>
                </div>
                <div className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-0.5">Desktop Application + JDBC Auth</div>
              </div>
            </div>
          </div>
        );
      case "metro":
        return (
          <div className={`w-full ${aspectRatioClass} bg-gradient-to-br from-emerald-950/30 to-slate-900/40 flex flex-col justify-center items-center border-b border-white/5 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(#FF3E00_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-10" />
            <div className="w-48 bg-[#111111]/95 border border-white/10 rounded-none p-3.5 flex flex-col gap-2 relative z-10 shadow-2xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="font-mono text-[9px] font-bold text-[#FF3E00] tracking-wider flex items-center gap-1">
                  <Train size={10} />
                  METRO PASS
                </span>
                <span className="text-[7px] font-mono text-white/40">SYS-0922</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div className="text-left">
                  <div className="text-[7px] text-white/40 font-mono">FROM</div>
                  <div className="text-[10px] font-bold text-white font-mono">STATION A</div>
                </div>
                <div className="text-right">
                  <div className="text-[7px] text-white/40 font-mono">TO</div>
                  <div className="text-[10px] font-bold text-white font-mono">STATION B</div>
                </div>
              </div>
              <div className="h-4 bg-white/5 border border-white/5 rounded-none flex items-center justify-between px-2 text-[7px] font-mono text-emerald-400">
                <span>STATUS: VERIFIED</span>
                <span>FARE: ₹45.00</span>
              </div>
            </div>
          </div>
        );
      case "leave":
        return (
          <div className={`w-full ${aspectRatioClass} bg-gradient-to-br from-amber-950/30 to-slate-900/40 flex flex-col justify-center items-center border-b border-white/5 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(#FF3E00_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-10" />
            <div className="w-48 bg-[#111111]/95 border border-white/10 rounded-none p-3.5 flex flex-col gap-2 relative z-10 shadow-2xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="font-mono text-[9px] font-bold text-amber-500 tracking-wider flex items-center gap-1">
                  <CalendarDays size={10} />
                  HR SERVICE PORTAL
                </span>
                <span className="text-[7px] font-mono text-white/40">REQ-0814</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div className="text-left">
                  <div className="text-[7px] text-white/40 font-mono">LEAVE TYPE</div>
                  <div className="text-[10px] font-bold text-white font-mono">Annual Paid Leave</div>
                </div>
                <div className="text-right">
                  <div className="text-[7px] text-white/40 font-mono">DAYS</div>
                  <div className="text-[10px] font-bold text-white font-mono">5 Days</div>
                </div>
              </div>
              <div className="h-4 bg-white/5 border border-white/5 rounded-none flex items-center justify-between px-2 text-[7px] font-mono text-amber-400">
                <span>APPROVAL: STAGE 2</span>
                <span>STATUS: PENDING</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`w-full ${aspectRatioClass} bg-gradient-to-br from-zinc-950 to-slate-900 flex items-center justify-center border-b border-white/5`}>
            <Layers className="text-white/20 animate-pulse" size={32} />
          </div>
        );
    }
  };

  return (
    <div className="px-6 bg-transparent w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-32 pb-24 max-w-7xl mx-auto text-left relative z-10 w-full"
      >
        {/* Navigation Header */}
        <div className="mb-12 pb-8">
          <div>
            <button
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2 text-white/60 hover:text-[#FF3E00] transition-colors duration-200 font-mono text-[11px] uppercase tracking-[2px] mb-4 cursor-pointer"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:translate-x-[-3px]" />
              <span>Back to Portfolio</span>
            </button>
            
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-[-2px] leading-none">
              Projects <span className="text-[#FF3E00]">Showcase</span>
            </h1>
            <p className="font-sans text-white/50 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
              A comprehensive catalog of my engineering endeavors, spanning robust full-stack platforms, AI-driven solutions, and specialized enterprise ServiceNow architectures.
            </p>
          </div>
        </div>

      {/* SECTION 1: FULL STACK PROJECTS (2-grid responsive cards) */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
            Full Stack Projects
          </h2>
          <div className="h-[1px] bg-white/10 flex-grow" />
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">06 Engineered</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {listFullStack.map((project, index) => {
            let src = project.imageUrl;
            if (src === "/src/assets/images/shopzy_banner_1782640902612.jpg" || src?.includes("shopzy_banner")) {
              src = shopzyMockup;
            } else if (src === "/src/assets/images/medicare_banner_1782642361387.jpg" || src?.includes("medicare_banner")) {
              src = medicareMockup;
            } else if (project.title.toLowerCase().includes("lexis")) {
              src = lexisShowcase;
            }

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden hover:border-[#FF3E00]/40 transition-colors duration-300 flex flex-col text-left w-full h-full shadow-2xl"
              >
                {src && (
                  <div className="w-full aspect-[16/7.8] relative overflow-hidden bg-[#0c0c0c] border-b border-white/10 group select-none">
                    <img
                      src={src}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full block object-cover object-top"
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
                )}

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
                          className="font-mono text-[10px] font-semibold text-white/90 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-none uppercase tracking-wider select-none hover:bg-white/[0.08] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(project.githubUrl || project.liveUrl) && (
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                        {project.liveUrl ? (
                          <a
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
            );
          })}
        </div>
      </div>

      {/* SECTION 2: JAVA FULL STACK PROJECTS */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
            Java Full Stack Projects
          </h2>
          <div className="h-[1px] bg-white/10 flex-grow" />
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">02 Java Solutions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {javaFullStackProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden hover:border-[#FF3E00]/40 transition-colors duration-300 flex flex-col text-left w-full h-full shadow-2xl"
            >
              {renderVisualHeader(project.type, project.title, project.imageUrl)}

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
                        className="font-mono text-[10px] font-semibold text-white/90 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-none uppercase tracking-wider select-none hover:bg-white/[0.08] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <div className="pt-4 border-t border-white/5 flex items-center justify-end">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider py-1 border-b border-transparent hover:border-white"
                      >
                        <Github size={13} />
                        <span>GITHUB REPOSITORY</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 3: SERVICENOW PROJECTS (2-grid layout) */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
            ServiceNow Projects
          </h2>
          <div className="h-[1px] bg-white/10 flex-grow" />
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">02 Enterprise</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicenowProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden hover:border-amber-500/40 transition-colors duration-300 flex flex-col text-left w-full h-full shadow-2xl"
            >
              {renderVisualHeader(project.type, project.title, project.imageUrl)}

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
                        className="font-mono text-[10px] font-semibold text-white/90 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-none uppercase tracking-wider select-none hover:bg-white/[0.08] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <div className="pt-4 border-t border-white/5 flex items-center justify-end">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-wider py-1 border-b border-transparent hover:border-white"
                      >
                        <Github size={13} />
                        <span>ServiceNow Files</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Return Home */}
      <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center border-t border-white/5 pt-12">
        <p className="font-sans text-xs text-white/40 uppercase tracking-widest">
          Looking for custom architectures or specialized ServiceNow integrations?
        </p>
        <button
          onClick={onBackToHome}
          className="flex items-center gap-3 bg-[#FF3E00] hover:bg-[#ff5511] text-white font-mono text-xs uppercase tracking-[2px] font-bold px-8 py-4.5 rounded-none transition-all duration-300 shadow-xl hover:shadow-[#FF3E00]/20 cursor-pointer"
        >
          <ArrowLeft size={13} />
          <span>Return to Primary Portfolio</span>
        </button>
      </div>
    </motion.div>
  </div>
  );
}
