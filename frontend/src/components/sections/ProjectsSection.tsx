// // frontend/src/components/sections/ProjectsSection.tsx
// import React, { useState } from "react";

// interface ProjectItem {
//   title: string;
//   description: string;
//   status: "finished" | "working on" | "planning";
//   technologies: string[];
//   link?: string;
// }

// const allProjects: ProjectItem[] = [

//   {
//     title: "AI Voice-Controlled Smart Car",
//     description: "Integrating Raspberry Pi, camera navigation, voice assistants, and IoT controls for a smart vehicle experience.",
//     status: "planning",
//     technologies: ["Python", "Raspberry Pi", "OpenCV", "Voice AI"]
//   },
//   {
//     title: "Smart Room & Door Lock System",
//     description: "Using ESP32 microcontrollers to create a connected door lock integrated with a smart room device for security and automation. Designed to control access, monitor environment, and serve as a foundation for home IoT.",
//     status: "planning",
//     technologies: ["ESP32", "IoT", "C++", "MQTT"]
//   },
//   {
//     title: "Kraa Talib Platform",
//     description: "A web and mobile platform designed to support students and learners by providing resources, collaboration tools, and opportunities. Starting with a web app, followed by mobile app development.",
//     status: "working on",
//     technologies: ["Next.js", "TypeScript", "TailwindCSS", "MongoDB", "React Native"]
//   },
//   {
//     title: "Octopus & Fish Processing Platform",
//     description: "A digital solution for fish processing and export companies. Features include live monitoring of IoT devices (temperature, automation, quality control), administrative dashboards for stock and workers, notifications for schedules or emergencies, and future IoT product integration with ESP32.",
//     status: "working on",
//     technologies: ["Next.js", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "ESP32", "IoT"]
//   },
//   {
//     title: "Personal Finance Tracker",
//     description: "A full-stack web app to track income, expenses, and savings using clean charts and filters. Built with a React + TypeScript frontend, Dockerized PostgreSQL database, and Express backend.",
//     status: "working on",
//     technologies: ["React", "TypeScript", "TailwindCSS", "Express", "PostgreSQL", "Docker"],
//     link: "https://naciri-finance-tracker.vercel.app/"
//   },
//   {
//     title: "Recruitment Platform (Drivers & Recruiters)",
//     description: "A platform where recruiters post job offers and drivers apply. Includes profiles for both parties to showcase credibility and skills. Designed for simplicity, clarity, and efficiency.",
//     status: "working on",
//     technologies: ["Next.js", "MongoDB", "TailwindCSS"],
//     link: "#" // update when live
//   },
//   {
//     title: "Al-Wifaq Taekwondo Academy Website",
//     description: "A modern, multilingual website for a taekwondo academy featuring program showcases, coach profiles, image gallery, and weekly schedules. Supports Arabic, English, and French with responsive design and smooth animations.",
//     status: "working on",
//     technologies: ["React", "TypeScript", "TailwindCSS", "Vite", "i18next"],
//     link: "https://your-taekwondo-site.vercel.app/"
//   }

// ];

// const ProjectsSection: React.FC = () => {
//   const [filter, setFilter] = useState<"all" | "finished" | "working on" | "planning">("all");

//   const filtered =
//     filter === "all" ? allProjects : allProjects.filter(p => p.status === filter);

//   return (
//     <section id="projects" className="py-16 px-6 text-white">
//       <div className="text-center mb-10">
//         <h2 className="text-2xl md:text-3xl font-bold mb-2">Projects</h2>
//         <p className="text-sm text-gray-400">Personal and freelance projects in various stages</p>
//       </div>

//       <div className="flex justify-center mb-10 gap-4 flex-wrap">
//         {["all", "finished", "working on", "planning"].map((key) => (
//           <button
//             key={key}
//             onClick={() => setFilter(key as any)}
//             className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
//               filter === key
//                 ? "bg-blue-600 border-blue-600 text-white"
//                 : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
//             }`}
//           >
//             {key.charAt(0).toUpperCase() + key.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//         {filtered.map((project, i) => (
//           <div
//             key={i}
//             className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:shadow-slate-800 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
//             <p className="text-sm text-slate-300 mb-4">{project.description}</p>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {project.technologies.map((tech, i) => (
//                 <span
//                   key={i}
//                   className="bg-slate-700 px-3 py-1 text-sm rounded-full text-slate-200"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//             {project.link && (
//               <a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm text-blue-400 hover:underline"
//               >
//                 View Project ↗
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;


// frontend/src/components/sections/ProjectsSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  status: "finished" | "working on" | "planning";
  technologies: string[];
  link?: string | null;
}

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "finished" | "working on" | "planning">("all");
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setAllProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setLoading(false);
    }
  };

  const filtered =
    filter === "all" ? allProjects : allProjects.filter(p => p.status === filter);

  if (loading) {
    return (
      <section id="projects" className="py-16 px-6 text-white flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-6 text-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Projects</h2>
        <p className="text-sm text-gray-400">Personal and freelance projects in various stages</p>
      </div>

      <div className="flex justify-center mb-10 gap-4 flex-wrap">
        {["all", "finished", "working on", "planning"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
              filter === key
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No projects found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:shadow-slate-800 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-slate-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-slate-700 px-3 py-1 text-sm rounded-full text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View Project ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;