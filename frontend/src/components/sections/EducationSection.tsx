import React, { useEffect, useState } from "react";
import axios from "axios";
import JourneyMap from "../JourneyMap";
import { API_BASE_URL } from "../../config/api";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  startYear: number;
  endYear: number | null;
  description: string | null;
}

const EducationSection: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  const [showJourney, setShowJourney] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/education`);
        setEducationData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEducation();
  }, []);

  const formatDuration = (start: number, end: number | null) => {
    return end ? `${start} – ${end}` : `${start} – Present`;
  };

  return (
    <section id="education" className="py-16 px-6 text-white">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Education</h2>
        <p className="text-md text-gray-400">A brief overview of my academic background</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {educationData.map((item) => (
          <div key={item.id}>
            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-slate-800/40 rounded-md hover:bg-slate-800/60 transition-colors duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-white">{item.degree}</h3>
              <p className="text-sm text-blue-400 font-medium">@ {item.institution}</p>
              <p className="text-xs text-slate-400 mb-2">{formatDuration(item.startYear, item.endYear)}</p>
              {item.description && (
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              )}
                          
              { item.degree.includes("1337") && (
                <button
                  onClick={() => setShowJourney(!showJourney)}
                  className="mt-4 group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🗺️ {showJourney ? 'Hide' : 'View'} My Journey
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${showJourney ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            )}
            </div>

            { item.degree.includes("1337") && (
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                showJourney ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0'
              }`}>
                <div className="border border-white/10 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    42 Network Journey
                  </h3>
                  <JourneyMap />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;