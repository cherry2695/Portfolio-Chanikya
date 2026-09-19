/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, FileText, Copy, Check, Calendar, Mail, MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DRIVE_URL } from "../utils/pdfGenerator";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  const copyContact = () => {
    navigator.clipboard.writeText("chanikya955@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            id="modal-card"
            key="modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-[#0c0c0c] rounded-none w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl relative flex flex-col border border-white/10 text-white z-10 cursor-default"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0e0e0e]">
              <div className="flex items-center gap-2 text-white">
                <FileText size={18} className="text-[#FF3E00]" />
                <span className="font-mono font-bold uppercase tracking-[1.5px] text-xs">Curriculum Vitae</span>
              </div>
              <button
                id="btn-close-modal"
                onClick={onClose}
                className="p-1.5 hover:bg-white/5 rounded-none text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 text-left font-sans text-sm text-white/70 bg-[#0c0c0c]">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 border-b border-white/5">
                <div>
                  <h2 className="font-display font-black text-2xl text-white leading-tight uppercase tracking-[-1px]">
                    A.Chanikya
                  </h2>
                  <p className="font-mono font-bold text-[#FF3E00] mt-1.5 uppercase tracking-wider text-[10px]">
                    Full Stack Developer & Computer Science Undergrad
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-white/50 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="text-[#FF3E00]" />
                    <span>chanikya955@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#FF3E00]" />
                    <span>Hyderabad, Telangana</span>
                  </div>
                </div>
              </div>

              {/* Education Block */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-white border-l-2 border-[#FF3E00] pl-2.5 uppercase tracking-wider text-xs">
                  Education
                </h3>
                <div className="flex flex-col gap-5 pl-3">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-sans font-bold text-white">
                        MLR Institute of Technology
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-white/40 shrink-0 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={11} />
                        2023 - 2027
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">B.Tech, Computer Science & Engineering</p>
                    <p className="text-xs font-mono font-bold text-[#FF3E00] mt-1">CGPA: 9.13</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-sans font-bold text-white">
                        Sri Chaitanya Junior College
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-white/40 shrink-0 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={11} />
                        2021 - 2023
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">Intermediate, Telangana Board</p>
                    <p className="text-xs font-mono font-bold text-[#FF3E00] mt-1">Percentage: 98.1%</p>
                  </div>
                </div>
              </div>

              {/* Experience Block */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-white border-l-2 border-[#FF3E00] pl-2.5 uppercase tracking-wider text-xs">
                  Experience
                </h3>
                <div className="flex flex-col gap-5 pl-3">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-sans font-bold text-white">
                        Graphic Designer
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-white/40 shrink-0 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={11} />
                        Aug 2025 - Present
                      </span>
                    </div>
                    <p className="text-xs text-[#FF3E00] font-mono font-bold mt-1 uppercase tracking-wider">Centre for Innovation & Entrepreneurship</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-sans font-bold text-white">
                        Frontend Developer & UI/UX Designer
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-white/40 shrink-0 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={11} />
                        June 2026 &mdash; Present
                      </span>
                    </div>
                    <p className="text-xs text-[#FF3E00] font-mono font-bold mt-1 uppercase tracking-wider">Apollo Pharmacies</p>
                  </div>
                </div>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-white border-l-2 border-[#FF3E00] pl-2.5 uppercase tracking-wider text-xs">
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-3">
                  <div>
                    <h4 className="font-mono font-bold text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Languages & Frontend
                    </h4>
                    <p className="text-xs leading-relaxed text-white/80">
                      C, Python, Java, JavaScript, SQL, HTML5, CSS3, Bootstrap, Tailwind CSS, React
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Backend & Databases
                    </h4>
                    <p className="text-xs leading-relaxed text-white/80">
                      Node.js, Express.js, REST API's, MySQL, MongoDB, OracleDB
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h4 className="font-mono font-bold text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Tools & Design
                    </h4>
                    <p className="text-xs leading-relaxed text-white/80">
                      Git, VS Code, GitHub, Postman, Notion, WordPress, Canva, Figma, Adobe Photoshop, Sketch, Picsart
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#0e0e0e] flex flex-col sm:flex-row justify-end items-center gap-3">
              <button
                id="btn-copy-contact"
                onClick={copyContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-transparent border border-white/10 text-white/80 hover:text-white hover:border-[#FF3E00] rounded-none text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied ? "Copied Email!" : "Copy Contact"}</span>
              </button>

              <a
                id="btn-view-drive-resume"
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer"
              >
                <ExternalLink size={12} />
                <span>Open in Drive</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
