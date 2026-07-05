// frontend/src/components/sections/ExperienceSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/experience`);
        const parsed = res.data.map((item: any) => ({
          ...item,
          technologies: JSON.parse(item.technologies || "[]"),
          highlights: JSON.parse(item.highlights || "[]"),
        }));
        setExperiences(parsed);
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };
    fetchExperience();

    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="min-h-screen relative overflow-hidden text-white">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Professional Experience
          </h2>
          <p
            className={`text-md text-gray-400 transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            A journey through my professional growth and key contributions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-slate-600"></div>

            {experiences.map((item, index) => (
              <div
                key={item.id}
                className={`relative group hover:scale-[1.02] transition-all duration-500 ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200 + 400}ms` }}
              >
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-blue-500/50 group-hover:animate-pulse"></div>

                <div className="ml-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 group-hover:bg-slate-800/60">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-300 mb-2 group-hover:text-white transition-colors duration-300">
                        {item.role}
                      </h3>
                      {item.company && (
                        <p className="text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium mb-2">
                          @ {item.company}
                        </p>
                      )}
                    </div>
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-slate-200 font-medium text-sm">
                      {item.duration}
                    </div>
                  </div>

                  <p className="text-base md:text-lg text-slate-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                          Key Achievements
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent"></div>
                      </div>
                      <ul className="space-y-3">
                        {item.highlights.map((highlight, i) => (
                          <li key={i} className="text-slate-400 text-base flex items-start leading-relaxed">
                            <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="group flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover:scale-110 transition-transform duration-300"></div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                          {tech}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
