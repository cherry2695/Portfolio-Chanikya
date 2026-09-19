/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) return "Please enter a subject.";
    if (!formData.message.trim()) return "Please enter your message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await axios.post("/api/contact", formData);
      
      if (response.data.success) {
        setStatus({
          type: "success",
          message: response.data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: response.data.error || "Failed to send message.",
        });
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      const errMsg = err.response?.data?.error || "Unable to send message at this moment. Please try again later.";
      setStatus({ type: "error", message: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left lg:h-full gap-8">
            <div className="flex flex-col items-start gap-3">
              <motion.h2
                id="contact-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
              >
                Get In Touch
              </motion.h2>
              <div className="w-20 h-[3px] bg-[#FF3E00]" />
              <p className="font-sans text-white/50 text-sm sm:text-base leading-relaxed mt-1">
                Have a question, an opportunity, or want to work together? Feel free to drop me a message. I'd love to hear from you!
              </p>
            </div>

            {/* Visual Info Block */}
            <div className="flex flex-col gap-5 w-full mt-2">
              {/* Email */}
              <div
                id="contact-info-email"
                className="flex items-center gap-5 p-6 bg-[#0c0c0c] border border-white/10 rounded-none hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <div className="p-3 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-wider">
                    Email
                  </span>
                  <a
                    href="mailto:chanikya955@gmail.com"
                    className="font-sans text-sm sm:text-base text-white/80 hover:text-[#FF3E00] font-medium transition-colors duration-150 mt-1"
                  >
                    chanikya955@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div
                id="contact-info-location"
                className="flex items-center gap-5 p-6 bg-[#0c0c0c] border border-white/10 rounded-none hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <div className="p-3 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-wider">
                    Location
                  </span>
                  <span className="font-sans text-sm sm:text-base text-white/80 font-medium mt-1">
                    Hyderabad, Telangana
                  </span>
                </div>
              </div>

              {/* Medium */}
              <div
                id="contact-info-medium"
                className="flex items-center gap-5 p-6 bg-[#0c0c0c] border border-white/10 rounded-none hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <div className="p-3 bg-[#FF3E00]/10 text-[#FF3E00] rounded-none shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-wider">
                    Medium
                  </span>
                  <a
                    href="https://medium.com/@chanikya95"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm sm:text-base text-white/80 hover:text-[#FF3E00] font-medium transition-colors duration-150 mt-1"
                  >
                    @chanikya95
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 w-full lg:h-full">
            <motion.div
              id="contact-form-container"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#0c0c0c] border border-white/10 rounded-none p-6 sm:p-8 shadow-2xl lg:h-full flex flex-col"
            >
              {/* Form State feedback Banner */}
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-none mb-6 flex items-start gap-3 border ${
                      status.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/25 text-rose-400"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {status.type === "success" ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={16} className="text-rose-500" />
                      )}
                    </div>
                    <span className="font-sans text-sm font-medium text-left">
                      {status.message}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form element */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left flex-grow">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="w-full px-4.5 py-3.5 border border-white/10 rounded-none font-sans text-sm bg-black/30 text-white placeholder-white/20 focus:outline-none focus:border-[#FF3E00] focus:bg-[#0c0c0c] transition-all duration-150"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className="w-full px-4.5 py-3.5 border border-white/10 rounded-none font-sans text-sm bg-black/30 text-white placeholder-white/20 focus:outline-none focus:border-[#FF3E00] focus:bg-[#0c0c0c] transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can I help you?"
                    disabled={isSubmitting}
                    className="w-full px-4.5 py-3.5 border border-white/10 rounded-none font-sans text-sm bg-black/30 text-white placeholder-white/20 focus:outline-none focus:border-[#FF3E00] focus:bg-[#0c0c0c] transition-all duration-150"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 flex-grow">
                  <label htmlFor="message" className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    disabled={isSubmitting}
                    className="w-full flex-grow min-h-[140px] px-4.5 py-3.5 border border-white/10 rounded-none font-sans text-sm bg-black/30 text-white placeholder-white/20 focus:outline-none focus:border-[#FF3E00] focus:bg-[#0c0c0c] transition-all duration-150 resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  id="btn-contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF3E00] hover:bg-white disabled:bg-white/10 text-white hover:text-black font-mono text-[11px] uppercase tracking-[2px] font-bold py-4 rounded-none transition-all duration-300 mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
