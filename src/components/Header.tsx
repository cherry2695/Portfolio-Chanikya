/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onResumeClick: () => void;
  onNavClick?: (href: string) => void;
}

export default function Header({ onResumeClick, onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: item.href,
            top: rect.top + window.scrollY - 100,
            bottom: rect.bottom + window.scrollY - 100,
          };
        }
        return null;
      }).filter(Boolean);

      const scrollPos = window.scrollY;
      const current = sections.find(
        section => section && scrollPos >= section.top && scrollPos < section.bottom
      );

      if (current) {
        setActiveSection(current.id);
      } else if (scrollPos < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (onNavClick) {
      onNavClick(href);
    } else {
      // Smooth scroll
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
        setActiveSection(href);
      }
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          id="logo-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavClick) {
              onNavClick("#");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-display font-black text-lg tracking-[3px] text-white uppercase group leading-none py-1 inline-flex items-center gap-1 -translate-y-[0.5px]"
        >
          <span>A.</span>
          <span className="text-[#FF3E00] transition-colors duration-300">Chanikya</span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              id={`nav-item-${item.name.toLowerCase()}`}
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`font-mono text-[11px] uppercase tracking-[2px] font-medium transition-colors duration-200 relative py-1 leading-none ${
                activeSection === item.href
                  ? "text-[#FF3E00]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.name}
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF3E00]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            id="btn-desktop-resume"
            onClick={onResumeClick}
            className="flex items-center gap-2 bg-transparent border border-white/20 hover:border-[#FF3E00] hover:bg-[#FF3E00] text-white font-mono text-[10px] uppercase tracking-[2px] font-bold px-6 py-2.5 rounded-none transition-all duration-300"
          >
            <FileText size={13} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-none text-white/80 hover:text-[#FF3E00] hover:bg-white/5 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#0c0c0c] border-b border-white/10 shadow-2xl absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  id={`mobile-nav-item-${item.name.toLowerCase()}`}
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-mono text-xs uppercase tracking-[2px] font-semibold py-2.5 px-3 rounded-none transition-colors duration-200 ${
                    activeSection === item.href
                      ? "bg-[#FF3E00]/10 text-[#FF3E00] border-l-2 border-[#FF3E00]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <hr className="border-white/5 my-1" />
              <button
                id="btn-mobile-resume"
                onClick={() => {
                  setIsOpen(false);
                  onResumeClick();
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#FF3E00] hover:bg-[#ff5511] text-white font-mono text-xs uppercase tracking-[2px] py-3.5 rounded-none transition-colors duration-200"
              >
                <FileText size={15} />
                <span>View Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
