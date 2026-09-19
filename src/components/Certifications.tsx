/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function Certifications() {
  const certs = [
    {
      title: "Python Essentials",
      authority: "Cisco",
      image: "https://drive.google.com/thumbnail?id=1F3GZ1wZpQ95EFtj3x-fcKg0PNd6W8WyI&sz=w1000",
      verifyLink: "https://www.credly.com/badges/3ffd5f6c-ea8f-48ec-a3f4-a90f47a9ddf7/public_url",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "SQL Certification",
      authority: "HackerRank",
      image: "https://drive.google.com/thumbnail?id=1FLoixxU0oJ4DHVMFpDznhcy66To9OGuH&sz=w1000",
      verifyLink: "https://www.hackerrank.com/certificates/7c768ab283ec",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "WordPress for Web Development",
      authority: "Coursera",
      image: "https://drive.google.com/thumbnail?id=1PYE74pV9WDKa-X4YToNhShLMkELAchWi&sz=w1000",
      verifyLink: "https://www.coursera.org/account/accomplishments/verify/QXUCQI768B5O",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "Artificial Intelligence Foundations",
      authority: "IBM",
      image: "https://drive.google.com/thumbnail?id=1Epsa9WNsfNsVKTWrIkxiw1C9wd5oQv8P&sz=w1000",
      verifyLink: "https://www.credly.com/badges/d381c3dd-6d7e-47ba-9949-12e32b90b6ff/linked_in_profile",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "ServiceNow Certified System Administrator (CSA)",
      authority: "ServiceNow",
      image: "https://drive.google.com/thumbnail?id=1j4EOghQYmnLcYlN1e8NnM2-Ib6L2Jfr_&sz=w1000",
      verifyLink: "https://www.credly.com/badges/67a578f6-e47b-4136-8397-3ac316cf183f/linked_in_profile",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "Oracle Cloud Infrastructure Certified Foundations Associate",
      authority: "Oracle",
      image: "https://drive.google.com/thumbnail?id=15OWTSxE6y6Nb8A3Ez2KNzJRczRo0ObAl&sz=w1000",
      verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0601530F00AE81176759A71822A4195116B5D3B87067D635E87B69BB5D7F59C7",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "Digital Marketing Certification Course",
      authority: "Hubspot Academy",
      image: "https://drive.google.com/thumbnail?id=1ymNst7VxYyuJr_r-hsz-cdaJ2LYzcPHm&sz=w1000",
      verifyLink: "https://app-na2.hubspot.com/academy/achievements/lkpzw97d/en/1/amancha-chanikya/digital-marketing-certified",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "Web Development Fundamentals",
      authority: "IBM",
      image: "https://drive.google.com/thumbnail?id=1Epsa9WNsfNsVKTWrIkxiw1C9wd5oQv8P&sz=w1000",
      verifyLink: "https://www.credly.com/badges/2d9b9226-34c0-41c4-9dcd-75af030f9344/linked_in_profile",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    },
    {
      title: "ServiceNow Certified Application Developer (CAD)",
      authority: "ServiceNow",
      image: "https://drive.google.com/thumbnail?id=1j4EOghQYmnLcYlN1e8NnM2-Ib6L2Jfr_&sz=w1000",
      verifyLink: "https://www.credly.com/badges/60bf4320-fbd0-479c-9d57-41c39192f180/linked_in_profile",
      badgeColor: "from-[#FF3E00]/20 to-[#FF3E00]/5",
    }
  ];

  return (
    <section id="certifications" className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left mb-14 max-w-2xl flex flex-col items-start gap-3">
          <motion.h2
            id="certifications-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
          >
            Certifications
          </motion.h2>
          <div className="w-20 h-[3px] bg-[#FF3E00]" />
          <p className="font-sans text-white/50 text-sm sm:text-base leading-relaxed mt-1">
            Industry-recognized professional certifications demonstrating expertise in cloud infrastructure, enterprise platforms, application development, and digital strategies.
          </p>
        </div>

        {/* Certifications Grid - 3 per row on lg screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {certs.map((cert, index) => (
            <motion.div
              id={`cert-card-${index}`}
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-none flex flex-col justify-between items-start text-left h-full relative group hover:border-[#FF3E00]/30 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              {/* Background Ambient Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cert.badgeColor} filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />

              {/* Elegant Certificate Image Frame */}
              <div
                className="w-full relative overflow-hidden bg-[#0c0c0c] border-b border-white/10 group select-none"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>

              <div className="p-8 flex flex-col gap-4 w-full flex-grow">
                {/* Authority & Badge */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] font-bold text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-3 py-1 rounded-none uppercase tracking-wider">
                    {cert.authority}
                  </span>
                </div>

                {/* Certification Title */}
                <h3 className="font-display font-black text-lg sm:text-xl text-white group-hover:text-[#FF3E00] transition-colors duration-200 uppercase tracking-wider leading-tight">
                  {cert.title}
                </h3>
              </div>

              {/* Verified Badge / External Link footer */}
              <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="flex items-center justify-between w-full p-8 pt-4 pb-5 border-t border-white/5 text-white/50 hover:text-[#FF3E00] transition-colors duration-200 bg-[#0e0e0e]/50"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF3E00]" />
                  <span className="font-mono text-[9px] tracking-wider uppercase font-semibold">Verify Credential</span>
                </div>
                <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
