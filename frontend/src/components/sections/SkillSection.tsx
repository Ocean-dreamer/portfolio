// frontend/src/components/sections/SkillSection.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  color: string;
  iconPath: string | null;
}

type Category = 'all' | 'frontend' | 'backend' | 'database' | 'programming' | 'tools' | 'design';

const SkillSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [showMore, setShowMore] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/skills`);
      setSkills(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setLoading(false);
    }
  };

  const categories: Category[] = [
    'all', 'frontend', 'backend', 'database', 'programming', 'tools', 'design'
  ];

  const filteredSkills = selectedCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const displayedSkills = showMore ? filteredSkills : filteredSkills.slice(0, 10);
  const hasMoreSkills = filteredSkills.length > 10;

  const renderIcon = (skill: Skill) => {
    if (skill.iconPath) {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d={skill.iconPath} />
        </svg>
      );
    }

    return (
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: skill.color }}
      />
    );
  };

  if (loading) {
    return (
      <div id="skills" className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading skills...</div>
      </div>
    );
  }

  return (
    <div id="skills" className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills
          </h2>
          <p className="text-gray-400">
            Technologies I work with
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25"
                  : "text-gray-300 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid - icon + name + category only, no fabricated percentages */}
        {displayedSkills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No skills found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {displayedSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/25 aspect-square flex flex-col items-center justify-center text-center group"
              >
                <div
                  className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-700/70 transition-colors duration-300"
                  style={{ color: skill.color }}
                >
                  {renderIcon(skill)}
                </div>

                <h3 className="text-white font-semibold text-sm mb-1 leading-tight">
                  {skill.name}
                </h3>

                <p className="text-xs text-gray-400 capitalize">
                  {skill.category}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Show More/Less Button */}
        {hasMoreSkills && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 border border-gray-600 hover:border-gray-500 hover:shadow-lg"
            >
              {showMore ? 'Show Less' : `Show ${filteredSkills.length - 10} More`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;