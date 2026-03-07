
export interface Experience {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
  imageUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SkillMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  education: string;
  skills: Skill[];
  skillMetrics: SkillMetric[];
  projects: Experience[];
}

export const initialPortfolioData: PortfolioData = {
  name: "Parth Boldhane",
  role: "Firebase Expert & CSE Student",
  bio: "Passionate Computer Science student at Jhulelal Institute of Technology with expertise in Firebase and cloud infrastructure. Dedicated to building efficient, scalable web applications and engaging gaming experiences.",
  email: "parthboldhane123@gmail.com",
  phone: "8956809276",
  linkedin: "https://www.linkedin.com/in/parth-boldhane-0a0726308",
  education: "Jhulelal Institute of Technology - Computer Science and Engineering",
  skills: [
    {
      category: "Expertise",
      items: ["Firebase", "Cloud Architecture", "Next.js", "React"]
    },
    {
      category: "Languages",
      items: ["C", "C++", "Python", "HTML", "CSS", "JavaScript"]
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Firebase Console", "Genkit AI"]
    }
  ],
  skillMetrics: [
    { subject: 'Firebase', A: 120, fullMark: 150 },
    { subject: 'React', A: 110, fullMark: 150 },
    { subject: 'C++', A: 130, fullMark: 150 },
    { subject: 'Cloud', A: 100, fullMark: 150 },
    { subject: 'Next.js', A: 115, fullMark: 150 },
    { subject: 'UI/UX', A: 90, fullMark: 150 },
  ],
  projects: [
    {
      id: "cpp-game",
      title: "Basic Game in C++",
      role: "Lead Developer",
      description: "A foundational arcade-style game developed using C++ logic, focusing on core programming concepts like loops, conditionals, and memory management.",
      tech: ["C++", "Standard Library"],
      imageUrl: "https://picsum.photos/seed/cppgame/600/400"
    },
    {
      id: "login-web",
      title: "Basic Login Webpage",
      role: "Full Stack Developer",
      description: "A functional login system demonstrating frontend design and backend integration, providing a secure entry point for users.",
      tech: ["HTML", "CSS", "Firebase Authentication"],
      imageUrl: "https://picsum.photos/seed/loginweb/600/400"
    }
  ]
};
