/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#050505] text-white/50 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Branding & Subtitle */}
        <div className="flex flex-col gap-2.5 max-w-md text-left">
          <h3 className="font-display font-black text-lg text-white tracking-[2px] uppercase">
            A.<span className="text-[#FF3E00]">Chanikya</span>
          </h3>
          <p className="font-sans text-xs text-white/40 leading-relaxed">
            Building meaningful digital experiences through innovation, creativity and continuous learning. Open to internships, freelance opportunities, and exciting collaborations.
          </p>
        </div>

        {/* Links and Social Block */}
        <div className="flex flex-col items-start md:items-end gap-4">
          {/* Social Row */}
          <div className="flex items-center gap-2.5">
            <a
              id="footer-social-github"
              href="https://github.com/cherry2695"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-[#FF3E00] rounded-none transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={15} />
            </a>
            <a
              id="footer-social-linkedin"
              href="https://www.linkedin.com/in/amancha-chanikya/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-[#FF3E00] rounded-none transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>
            <a
              id="footer-social-email"
              href="mailto:chanikya955@gmail.com"
              className="p-3 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-[#FF3E00] rounded-none transition-all duration-300"
              aria-label="Email Address"
            >
              <Mail size={15} />
            </a>
          </div>

          {/* Copyright text */}
          <span className="font-mono text-[10px] text-white/30 tracking-wider uppercase">
            &copy; 2026 A.Chanikya. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
