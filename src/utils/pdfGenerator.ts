import { jsPDF } from "jspdf";

export const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1YOyKGIiRqopycMiGdEqRoED5J61FYYBp/view?usp=sharing";
export const RESUME_DIRECT_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1YOyKGIiRqopycMiGdEqRoED5J61FYYBp";
export const RESUME_LOCAL_FILE = "/Chanikya_Amancha_Resume.pdf";

/**
 * Downloads the user's authentic resume provided via Google Drive.
 * Automatically triggers direct file download of the uploaded resume PDF,
 * with graceful fallback to opening the Drive document in a new tab if blocked.
 */
export function downloadResumeFile() {
  try {
    const link = document.createElement("a");
    link.href = RESUME_LOCAL_FILE;
    link.setAttribute("download", "Chanikya_Amancha_Resume.pdf");
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.warn("Direct local download failed, opening Drive direct URL:", err);
    window.open(RESUME_DIRECT_DOWNLOAD_URL, "_blank");
  }
}

export function generateResumePDF() {
  // A4 size: 210mm x 297mm
  let doc: jsPDF;
  try {
    doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  } catch (err) {
    console.warn("Standard jsPDF named import instantiation failed, trying default export fallback.", err);
    const FallbackjsPDF = (jsPDF as any).default || jsPDF;
    doc = new FallbackjsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  }

  // Set metadata
  doc.setProperties({
    title: "Chanikya_Amancha_Resume",
    subject: "Chanikya Amancha - Resume",
    author: "Chanikya Amancha",
    keywords: "resume, cv, developer, data analyst",
    creator: "Chanikya Amancha Portfolio App",
  });

  const pageWidth = 210;
  const leftMargin = 15;
  const rightMargin = 15;
  const contentWidth = pageWidth - leftMargin - rightMargin; // 180mm
  let y = 15; // Current Y cursor position

  // Helper function to print bold/normal text inline or handle section titles
  const drawSectionHeader = (title: string) => {
    y += 4;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17); // Dark charcoal grey
    doc.text(title, leftMargin, y);
    y += 1.5;
    // Draw thin elegant line below header
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(leftMargin, y, pageWidth - rightMargin, y);
    y += 4.5;
  };

  const drawBulletPoint = (text: string, indent = 4) => {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    doc.circle(leftMargin + indent - 1.5, y - 1, 0.45, "F");
    const bulletWidth = contentWidth - indent;
    const lines = doc.splitTextToSize(text, bulletWidth);
    doc.text(lines, leftMargin + indent, y);
    y += lines.length * 4.2 + 1;
  };

  // 1. Header (Name & Contact Info)
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  const name = "CHANIKYA AMANCHA";
  doc.text(name, pageWidth / 2, y, { align: "center" });
  y += 6.5;

  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  const contact = "Hyderabad, India | +91 9381745778 | chanikya955@gmail.com | linkedin.com/in/chanikya-amancha | github.com/cherry2695";
  doc.text(contact, pageWidth / 2, y, { align: "center" });
  y += 4;

  // 2. Professional Summary
  drawSectionHeader("PROFESSIONAL SUMMARY");
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  const summary = "Results-driven Full-Stack Web Developer and UI/UX Designer with a strong foundation in modern web frameworks (React.js, Node.js, Express, MongoDB, MySQL, Python, and Java). Certified in ServiceNow (CSA & CAD), with hands-on experience building enterprise workflow automation portals, high-performance web applications, and AI-grounded platforms. Dedicated to writing clean, maintainable code with precision user interface engineering.";
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, leftMargin, y);
  y += summaryLines.length * 4.2 + 2;

  // 3. Education
  drawSectionHeader("EDUCATION");
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("MLR Institute of Technology - Bachelor of Technology in Information Technology", leftMargin, y);
  doc.text("2023 - 2027", pageWidth - rightMargin - doc.getTextWidth("2023 - 2027"), y);
  y += 4.5;
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text("Hyderabad, India | CGPA: 7.82/10.0", leftMargin, y);
  y += 5;

  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Sri Chaitanya Junior Kalasala - Intermediate (MPC)", leftMargin, y);
  doc.text("2021 - 2023", pageWidth - rightMargin - doc.getTextWidth("2021 - 2023"), y);
  y += 4.5;
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text("Hyderabad, India | Percentage: 91.6%", leftMargin, y);
  y += 5.5;

  // 4. Projects
  drawSectionHeader("PROJECTS");

  // Project 1: Shopzy
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Shopzy - AI Powered Ecommerce Platform", leftMargin, y);
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const p1Tech = "React.js, TypeScript, MongoDB, Node.js, Express.js, Google Gemini AI";
  doc.text(p1Tech, pageWidth - rightMargin - doc.getTextWidth(p1Tech), y);
  y += 4.5;
  drawBulletPoint("Engineered a full-stack e-commerce platform with AI-driven personalized product discovery, cart workflows, and secure checkout.");
  drawBulletPoint("Integrated Google Gemini API for natural language conversational shopping suggestions and catalog filtering.");

  // Project 2: MediCare Assistant
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("MediCare Assistant - Smart Healthcare Platform", leftMargin, y);
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const p2Tech = "React.js, TypeScript, MySQL, Node.js, Express.js, Drizzle ORM";
  doc.text(p2Tech, pageWidth - rightMargin - doc.getTextWidth(p2Tech), y);
  y += 4.5;
  drawBulletPoint("Built a digital healthcare portal for managing prescription schedules, comparison of pharmacy prices, and adherence tracking.");
  drawBulletPoint("Implemented voice-based reminder synthesizers and real-time push alert notifications to enhance patient adherence.");

  // Project 3: Lexis AI
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Lexis AI - Smart Notes & RAG Platform", leftMargin, y);
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const p3Tech = "Python, RAG, FastAPI, Streamlit, React, VectorDB, Gemini API, Embeddings";
  doc.text(p3Tech, pageWidth - rightMargin - doc.getTextWidth(p3Tech), y);
  y += 4.5;
  drawBulletPoint("Architected a knowledge base platform with RAG retrieval over PDF, DOCX, and TXT files using Google Gemini AI.");
  drawBulletPoint("Built vector database index pipelines providing grounded document Q&A and automated NotebookLM-style note synthesis.");

  // Project 4: ServiceNow Metro Ticket
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Metro Ticket Generating System - ServiceNow HR & Portals", leftMargin, y);
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const p4Tech = "ServiceNow Portal, Client Scripts, Flow Designer";
  doc.text(p4Tech, pageWidth - rightMargin - doc.getTextWidth(p4Tech), y);
  y += 4.5;
  drawBulletPoint("Developed an end-to-end ServiceNow service portal automating ticket booking, QR code generation, and multi-tier approval flows.");

  // 5. Experience
  drawSectionHeader("EXPERIENCE");

  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Centre for Innovation & Entrepreneurship - Graphic Designer", leftMargin, y);
  doc.text("Aug 2025 - Present", pageWidth - rightMargin - doc.getTextWidth("Aug 2025 - Present"), y);
  y += 5.5;

  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Apollo Pharmacies - Frontend Developer & UI/UX Designer", leftMargin, y);
  doc.text("June 2026 - Present", pageWidth - rightMargin - doc.getTextWidth("June 2026 - Present"), y);
  y += 6.5;

  // 6. Skills
  drawSectionHeader("TECHNICAL SKILLS");
  const skillsData = [
    { label: "Frontend:", list: "React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Figma" },
    { label: "Backend:", list: "Node.js, Express.js, Python, FastAPI, Java, Spring Boot, RESTful APIs, JWT Auth" },
    { label: "Databases:", list: "MongoDB, MySQL, Vector Databases (Pinecone/ChromaDB), JDBC" },
    { label: "Cloud & Tools:", list: "Git, GitHub, Docker, Postman, Vercel, Render, ServiceNow (CSA, CAD, Flow Designer)" },
    { label: "AI & ML:", list: "Google Gemini API, Retrieval-Augmented Generation (RAG), Document Embeddings" }
  ];

  skillsData.forEach(skill => {
    doc.setFont("times", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    const labelWidth = 28;
    doc.text(skill.label, leftMargin, y);
    
    doc.setFont("times", "normal");
    doc.setTextColor(60, 60, 60);
    const textWidth = contentWidth - labelWidth;
    const splitSkill = doc.splitTextToSize(skill.list, textWidth);
    doc.text(splitSkill, leftMargin + labelWidth, y);
    y += splitSkill.length * 4.2 + 1;
  });
  y += 3.5;

  // 7. Certifications
  drawSectionHeader("CERTIFICATIONS");
  
  drawBulletPoint("Certified in Python Essentials by Cisco Networking Academy in 2024.", 3);
  drawBulletPoint("Achieved certification in SQL from HackerRank in 2025.", 3);
  drawBulletPoint("Certified in Oracle Cloud Infrastructure Foundation Associate by Oracle University in 2025.", 3);
  drawBulletPoint("Certified in Fundamentals of Generative AI by Google Skills in 2025.", 3);

  // Save the document
  doc.save("Chanikya_Amancha_Resume.pdf");
}
