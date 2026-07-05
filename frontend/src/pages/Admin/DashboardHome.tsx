import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface Stats {
  projects: number;
  skills: number;
  certifications: number;
  blogPosts: number;
}

const DashboardHome = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    certifications: 0,
    blogPosts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/stats`, {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Projects", value: stats.projects, color: "from-blue-500 to-cyan-500" },
    { label: "Skills", value: stats.skills, color: "from-purple-500 to-pink-500" },
    { label: "Certifications", value: stats.certifications, color: "from-orange-500 to-red-500" },
    { label: "Blog Posts", value: stats.blogPosts, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
          >
            <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg text-white font-medium hover:scale-105 transition-transform">
            + New Project
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:scale-105 transition-transform">
            + New Blog Post
          </button>
          <button className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-transform">
            + New Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
