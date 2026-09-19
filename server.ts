/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
let isConnectedToDB = false;

if (MONGODB_URI) {
  console.log("Attempting to connect to MongoDB...");
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB Atlas successfully.");
      isConnectedToDB = true;
      seedDatabase();
    })
    .catch((err) => {
      console.error("MongoDB Atlas connection failed. Falling back to local data.", err);
    });
} else {
  console.log("No MONGODB_URI found in environment variables. Running with local data fallback.");
}

// Schemas & Models
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  githubUrl: String,
  imageUrl: String,
  liveUrl: String,
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

const achievementSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  type: { type: String, enum: ["COMPETITION", "HACKATHON", "ACADEMIC"], required: true },
});

const Achievement = mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);

// Initial/Seed Data
const defaultSkills = [
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

const defaultProjects = [
  {
    title: "Shopzy – AI Powered Ecommerce Platform",
    description: "Shopzy is a modern AI-powered full-stack E-commerce application built to provide an intelligent and seamless online shopping experience. The platform combines traditional E-commerce functionalities with AI-driven product recommendations, enabling users to discover products more efficiently and make informed purchasing decisions.",
    tags: ["React.js", "TypeScript", "MongoDB", "Node.js", "Express.js", "Google Gemini"],
    githubUrl: "https://github.com/cherry2695/Shopzy-FullStack-Ecommerce-Application",
    liveUrl: "https://shopzy.ai.studio/",
    imageUrl: "/src/assets/images/shopzy_banner_1782640902612.jpg",
  },
  {
    title: "Medicare Assistant – Smart Healthcare Platform",
    description: "A modern full-stack healthcare platform that helps patients manage prescriptions, receive voice-based medication reminders, compare medicine prices across multiple pharmacies and stay informed through real-time notifications. The application is designed to improve medication adherence and simplify healthcare management with a responsive user interface.",
    tags: ["React.js", "TypeScript", "MySQL", "Node.js", "Express.js", "Drizzle ORM"],
    githubUrl: "https://github.com/cherry2695/MediCare-FullStack-Healthcare-Platform",
    liveUrl: "https://health-hub-pro--z4developer95.replit.app",
    imageUrl: "/src/assets/images/medicare_banner_1782642361387.jpg",
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
    imageUrl: "https://drive.google.com/thumbnail?id=1G0FWURquLVhxW1Mff3qelTPf-nWvvQCP&sz=w1600",
  },
];

const defaultAchievements: any[] = [
  {
    year: "2023",
    title: "Innovation Challenge - Winner",
    description: "Secured First Prize in my section at the Innovation Challenge for developing an efficient, low-cost Bucket Air Conditioner prototype addressing sustainable cooling solutions.",
    tag: "INNOVATION",
    type: "COMPETITION",
    link: "https://www.linkedin.com/in/amancha-chanikya/details/honors/",
  },
  {
    year: "2025",
    title: "INIT SAGA Hackathon - Runner",
    description: "Secured Runner-Up position at the INIT Saga Hackathon conducted by SCOPE Club, MLRIT for developing a healthcare application with an alarm-based medicine reminder, price comparison and voice assistant feature.",
    tag: "HACKATHON",
    type: "HACKATHON",
    link: "https://www.linkedin.com/posts/amancha-chanikya_initabrsaga-hackathonexperience-healthcaretech-activity-7324843900018319360-pVfo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
  },
  {
    year: "2025",
    title: "Project Expo - Runner",
    description: "Successfully mentored the team to secure the Runner-up position in the Innovation Challenge 2025, demonstrating leadership, technical guidance and effective mentorship.",
    tag: "MENTORSHIP",
    type: "ACADEMIC",
    link: "https://www.linkedin.com/posts/amancha-chanikya_mentorship-innovationchallenge2k25-ciemlrit-activity-7347672850180325376-nlTO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
  },
  {
    year: "2025",
    title: "Student Coordinator – Zignasa 2K25",
    description: "Awarded in recognition of commitment, leadership, and significant contributions as a Student Coordinator for Zignasa 2K25, organized by the Department of Computer Science and Engineering at MLR Institute of Technology, Hyderabad.",
    tag: "LEADERSHIP",
    type: "ACADEMIC",
    link: "https://www.linkedin.com/in/amancha-chanikya/details/honors/",
  },
  {
    year: "2026",
    title: "Servicenow Virtual Internship Program",
    description: "Successfully completed the ServiceNow Virtual Internship Program, organized by ServiceNow, AICTE and SmartBridge. It has enhanced my problem-solving skills and provided valuable industry insights into enterprise digital transformation.",
    tag: "INTERNSHIP",
    type: "ACADEMIC",
    link: "https://www.linkedin.com/posts/amancha-chanikya_servicenow-virtualinternship-microcertification-activity-7468000821931253760-6E4n?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvX4U4BKcwBOvAKHey1z_40viwJKoJxVVE",
  },
];

// Seed Database helper
async function seedDatabase() {
  try {
    // Clear and re-seed projects to ensure MongoDB always has exactly this one project
    await Project.deleteMany({});
    await Project.insertMany(defaultProjects);
    console.log("Database seeded with default projects.");

    // Clear and re-seed achievements to ensure MongoDB has the updated set
    await Achievement.deleteMany({});
    await Achievement.insertMany(defaultAchievements);
    console.log("Database seeded with default achievements.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

// Express Middlewares
app.use(cors());

// Configure Helmet to allow Vite resources in development and iframe embedding in AI Studio
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());

// API Routes
app.get("/api/portfolio-data", async (req, res) => {
  try {
    let projects = defaultProjects;
    let achievements = defaultAchievements;

    if (isConnectedToDB) {
      try {
        const dbProjects = await (Project.find() as any);
        if (dbProjects && dbProjects.length > 0) {
          projects = dbProjects;
        }

        const dbAchievements = await (Achievement.find() as any);
        if (dbAchievements && dbAchievements.length > 0) {
          achievements = dbAchievements;
        }
      } catch (err) {
        console.error("Failed to fetch from DB, using fallback data", err);
      }
    }

    res.json({
      name: "A.Chanikya",
      title: "Full Stack Developer",
      bio: "I am a Computer Science undergraduate with a strong passion for building modern, user-friendly digital experiences through web development, design & emerging technologies. Alongside development, I have a strong interest in UI/UX & graphic design which helps me craft clean & visually engaging interfaces.",
      education: [
        {
          institution: "MLR Institute of Technology",
          degree: "B.Tech, Computer Science & Engineering",
          grade: "CGPA : 9.13",
        },
        {
          institution: "Sri Chaitanya Junior College",
          degree: "Intermediate, Telangana",
          grade: "Percentage : 98.1%",
        },
      ],
      experience: [
        {
          role: "Graphic Designer",
          organization: "Centre for Innovation & Entrepreneurship",
          duration: "Aug 2025 - Present",
        },
        {
          role: "Frontend Developer & UI/UX Designer",
          organization: "Apollo Pharmacies",
          duration: "June 2026 - Present",
        },
      ],
      skills: defaultSkills,
      projects,
      achievements,
      isDatabaseConnected: isConnectedToDB,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    let savedMessage = null;
    if (isConnectedToDB) {
      try {
        const newMessage = new Contact({ name, email, subject, message });
        savedMessage = await newMessage.save();
        console.log("Contact message saved to MongoDB.");
      } catch (dbErr) {
        console.error("Failed to save contact message to MongoDB:", dbErr);
      }
    } else {
      console.log(`[Local Fallback Mode] Contact Message Received from ${name} (${email}): [${subject}] - ${message}`);
    }

    // Try Nodemailer if configured
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: email,
          to: EMAIL_USER,
          subject: `Portfolio Contact: ${subject} from ${name}`,
          text: `You have received a new contact submission from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Nodemailer: Email sent successfully.");
      } catch (emailErr) {
        console.error("Nodemailer could not send email:", emailErr);
      }
    } else {
      console.log("Nodemailer credentials not configured. Skipping email delivery.");
    }

    res.json({
      success: true,
      message: "Your message has been sent successfully! Thank you for getting in touch.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({ error: "An error occurred while saving your message." });
  }
});

// Configure Vite or production static file serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode. Setting up Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in production mode. Serving static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start full stack Express/Vite server:", err);
});
