
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

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  education: string;
  skills: Skill[];
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
      items: ["Firebase", "Cloud Architecture"]
    },
    {
      category: "Languages",
      items: ["C", "C++", "Python", "HTML", "CSS"]
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Firebase Console"]
    }
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
