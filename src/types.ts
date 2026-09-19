/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  imageUrl?: string;
  liveUrl?: string;
}

export interface Achievement {
  _id?: string;
  year: string;
  title: string;
  description: string;
  tag: string;
  type: "COMPETITION" | "HACKATHON" | "ACADEMIC";
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  grade: string;
  duration?: string;
}

export interface Experience {
  role: string;
  organization: string;
  duration: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}
