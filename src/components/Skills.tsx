/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  PenTool,
  BarChart3,
  Cloud,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsProps {
  skillsData?: SkillCategory[];
}

export default function Skills({ skillsData }: SkillsProps) {
  // Custom categories requested by the user
  const defaultSkills: SkillCategory[] = [
    {
      category: "Programming Languages",
      items: ["C", "Python", "Java", "JavaScript"],
    },
    {
      category: "Frontend Development",
      items: ["HTML5", "CSS3", "Bootstrap 5", "Tailwind CSS", "React.js"],
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "Spring Boot", "RESTful APIs"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB", "Oracle Database"],
    },
    {
      category: "Design",
      items: ["Figma", "Adobe Photoshop", "Canva", "Picsart"],
    },
    {
      category: "Data Analytics",
      items: ["Microsoft Excel", "Tableau", "Claude AI", "Perplexity AI"],
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Notion", "WordPress"],
    },
    {
      category: "Deployment",
      items: ["AWS", "Vercel", "Netlify", "Render", "Cloudinary"],
    },
    {
      category: "CS Fundamentals",
      items: ["OOP", "DBMS", "OS", "Computer Networks", "Cloud Computing"],
    },
  ];

  const categories = skillsData || defaultSkills;

  // Custom Icon Selector for the Card Headers matching the mockup
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "programming languages":
        return <Code2 size={20} className="text-[#FF3E00]" />;
      case "frontend development":
      case "frontend":
        return <Monitor size={20} className="text-[#FF3E00]" />;
      case "backend development":
      case "backend":
        return <Server size={20} className="text-[#FF3E00]" />;
      case "databases":
        return <Database size={20} className="text-[#FF3E00]" />;
      case "design":
        return <PenTool size={20} className="text-[#FF3E00]" />;
      case "data analytics":
        return <BarChart3 size={20} className="text-[#FF3E00]" />;
      case "developer tools":
      case "tools":
        return <Wrench size={20} className="text-[#FF3E00]" />;
      case "deployment":
        return <Cloud size={20} className="text-[#FF3E00]" />;
      case "cs fundamentals":
      case "core concepts":
        return <Cpu size={20} className="text-[#FF3E00]" />;
      default:
        return <Code2 size={20} className="text-[#FF3E00]" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-transparent text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading matching mock exactly */}
        <div className="text-left mb-14 flex flex-col items-start gap-3">
          <motion.h2
            id="skills-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-[-2px]"
          >
            SKILLS
          </motion.h2>
          <div className="w-20 h-[3px] bg-[#FF3E00]" />
          <motion.p
            id="skills-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-white/50 text-sm mt-1 max-w-xl"
          >
            Technologies and tools I use to build modern, scalable and efficient solutions.
          </motion.p>
        </div>

        {/* 6-Card Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((categoryObj, index) => {
            return (
              <motion.div
                id={`skills-category-${categoryObj.category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                key={categoryObj.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                className="p-6 h-full rounded-none border border-white/10 bg-[#0c0c0c] flex flex-col gap-5 hover:border-[#FF3E00]/30 hover:shadow-[0_0_30px_rgba(255,62,0,0.08)] transition-all duration-300 shadow-2xl relative group overflow-hidden"
              >
                {/* Accent hover side bar indicator */}
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-[#FF3E00] group-hover:h-full transition-all duration-300" />

                {/* Card Header */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <div className="p-2.5 rounded-none bg-[#FF3E00]/10 text-[#FF3E00] shrink-0">
                    {getCategoryIcon(categoryObj.category)}
                  </div>
                  <h3 className="font-mono uppercase tracking-[2px] text-xs font-bold text-white">
                    {categoryObj.category}
                  </h3>
                </div>

                {/* Skill Badges Wrapper */}
                <div className="flex flex-wrap gap-2">
                  {categoryObj.items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-center px-3 py-1.5 rounded-none border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 text-xs font-semibold text-white/90 select-none"
                    >
                      <span className="font-sans text-[12px] font-semibold text-white/90">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
