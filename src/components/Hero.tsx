/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export default function Hero({ onContactClick, onProjectsClick }: HeroProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const phrases = [
    { white: "Full Stack ", orange: "Developer" },
    { white: "Graphic ", orange: "Designer" },
    { white: "Data ", orange: "Analyst" }
  ];

  useEffect(() => {
    const currentPhrase = phrases[wordIndex];
    const fullText = currentPhrase.white + currentPhrase.orange;
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (text !== fullText) {
        timer = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 100);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (text !== "") {
        timer = setTimeout(() => {
          setText(fullText.slice(0, text.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  const currentPhrase = phrases[wordIndex];
  const whiteLength = currentPhrase.white.length;
  const whiteTyped = text.slice(0, whiteLength);
  const orangeTyped = text.slice(whiteLength);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const codeContent = `const developer = {
  name: 'A.Chanikya',
  skills: ['Java', 'Node.js', 'Python'],
  focus: ['Full-Stack', 'UI/UX', 'Data Analyst'],
  learning: ['Always']
};`;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-16 px-6 overflow-hidden bg-transparent flex items-center group/hero cursor-default"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column - Hero Text */}
        <motion.div
          id="hero-intro"
          className="lg:col-span-6 flex flex-col items-start gap-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            id="hero-badge"
            variants={itemVariants}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-none font-mono text-[10px] sm:text-[11px] uppercase tracking-[2px] font-semibold border border-white/20 shadow-lg shadow-black/10"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
            <span className="text-white/90">HELLO I AM</span>
          </motion.div>

          {/* Heading Name */}
          <motion.h1
            id="hero-name"
            variants={itemVariants}
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-[-1px] leading-tight uppercase min-h-[2.2em] sm:min-h-[1.8em] md:min-h-[1.4em] lg:min-h-[1.2em] w-full"
          >
            <span className="inline-flex flex-wrap items-center">
              <span className="text-white mr-2 sm:mr-3">
                {whiteTyped}
              </span>
              <span className="text-[#FF3E00] inline-flex items-center">
                {orangeTyped}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                  className="text-[#FF3E00] ml-1 font-light inline-block"
                >
                  |
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            id="hero-title"
            variants={itemVariants}
            className="font-mono font-bold text-xs sm:text-sm text-[#FF3E00] uppercase tracking-[3px]"
          >
            A. CHANIKYA &mdash; PORTFOLIO
          </motion.h2>

          {/* Description */}
          <motion.p
            id="hero-description"
            variants={itemVariants}
            className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-xl"
          >
            Designing, developing and analyzing modern digital products. Driven by clean code, creative graphics and insightful data visualization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            id="hero-ctas"
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center w-full sm:w-auto"
          >
            <button
              id="btn-hero-contact"
              onClick={onContactClick}
              className="w-full sm:w-auto bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono text-[11px] uppercase tracking-[2px] font-bold py-4 px-8 rounded-none transition-all duration-300"
            >
              Contact Me
            </button>
            <button
              id="btn-hero-projects"
              onClick={onProjectsClick}
              className="w-full sm:w-auto border border-white/20 hover:border-white bg-transparent text-white font-mono text-[11px] uppercase tracking-[2px] font-bold py-4 px-8 rounded-none transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View Projects</span>
              <ArrowRight size={13} />
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            id="hero-socials"
            variants={itemVariants}
            className="flex items-center gap-3 mt-2"
          >
            <a
              id="social-link-github"
              href="https://github.com/cherry2695"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-transparent border border-white/10 hover:border-[#FF3E00] text-white/60 hover:text-white rounded-none transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              id="social-link-linkedin"
              href="https://www.linkedin.com/in/amancha-chanikya/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-transparent border border-white/10 hover:border-[#FF3E00] text-white/60 hover:text-white rounded-none transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              id="social-link-email"
              href="mailto:chanikya955@gmail.com"
              className="p-3.5 bg-transparent border border-white/10 hover:border-[#FF3E00] text-white/60 hover:text-white rounded-none transition-all duration-300"
              aria-label="Email Address"
            >
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Mock IDE Editor */}
        <motion.div
          id="hero-ide"
          className="lg:col-span-6 w-full flex justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          whileHover={{ y: -6, scale: 1.01 }}
        >
          <div className="w-full max-w-xl md:max-w-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#FF3E00]/30 rounded-none shadow-2xl overflow-hidden font-mono text-xs sm:text-sm relative group transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,62,0,0.1)] cursor-pointer">
            {/* Ambient background glow inside the card */}
            <div className="absolute -inset-10 bg-gradient-to-r from-[#FF3E00]/5 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

            {/* Header / Mac dots */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#080808] border-b border-white/10 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold select-none group-hover:text-[#FF3E00]/60 transition-colors duration-500">developer.js</span>
            </div>

            {/* Code Body */}
            <div className="p-8 text-white/80 leading-relaxed text-left overflow-x-auto select-none relative z-10">
              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">1</span>
                <span>
                  <span className="text-[#FF3E00]">const</span> <span className="text-white">developer</span> <span className="text-[#FF3E00]">=</span> <span className="text-[#FF3E00]">&#123;</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">2</span>
                <span>
                  &nbsp;&nbsp;<span className="text-[#00E5FF]">name</span><span className="text-white/40">:</span>{" "}
                  <span className="text-[#00FF66]">"A. Chanikya"</span>
                  <span className="text-white/40">,</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">3</span>
                <span>
                  &nbsp;&nbsp;<span className="text-[#00E5FF]">skills</span><span className="text-white/40">:</span>{" "}
                  <span className="text-white/40">[</span>
                  <span className="text-[#00FF66]">"Java"</span>
                  <span className="text-white/40">,</span>{" "}
                  <span className="text-[#00FF66]">"Figma"</span>
                  <span className="text-white/40">,</span>{" "}
                  <span className="text-[#00FF66]">"Wordpress"</span>
                  <span className="text-white/40">]</span>
                  <span className="text-white/40">,</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">4</span>
                <span>
                  &nbsp;&nbsp;<span className="text-[#00E5FF]">interests</span><span className="text-white/40">:</span>{" "}
                  <span className="text-white/40">[</span>
                  <span className="text-[#00FF66]">"Graphic Design"</span>
                  <span className="text-white/40">,</span>{" "}
                  <span className="text-[#00FF66]">"Web Dev"</span>
                  <span className="text-white/40">,</span>{" "}
                  <span className="text-[#00FF66]">"Data Analyst"</span>
                  <span className="text-white/40">]</span>
                  <span className="text-white/40">,</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">5</span>
                <span>
                  &nbsp;&nbsp;<span className="text-[#00E5FF]">exploring</span><span className="text-white/40">:</span>{" "}
                  <span className="text-white/40">[</span>
                  <span className="text-[#00FF66]">"ServiceNow"</span>
                  <span className="text-white/40">,</span>{" "}
                  <span className="text-[#00FF66]">"Oracle Cloud"</span>
                  <span className="text-white/40">]</span>
                  <span className="text-white/40">,</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">6</span>
                <span>
                  &nbsp;&nbsp;<span className="text-[#00E5FF]">mentorship</span><span className="text-white/40">:</span>{" "}
                  <span className="text-[#FF9F1C]">true</span>
                </span>
              </div>

              <div className="flex">
                <span className="text-white/20 w-6 shrink-0 select-none text-right pr-3">7</span>
                <span>
                  <span className="text-[#FF3E00]">&#125;;</span>
                </span>
              </div>
            </div>

            {/* Glowing active glow border */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FF3E00] group-hover:bg-[#FF3E00] transition-colors duration-500 shadow-[0_-2px_10px_rgba(255,62,0,0.4)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
