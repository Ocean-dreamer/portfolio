// frontend/src/pages/Admin/SkillsManager.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface SkillItem {
  id: number;
  name: string;
  category: string;
  level: number;
  color: string;
  iconPath: string | null;
  createdAt: string;
}

interface SkillFormData {
  name: string;
  category: string;
  level: string;
  color: string;
  iconPath: string;
}

const SkillsManager: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    category: "frontend",
    level: "50",
    color: "#61DAFB",
    iconPath: "",
  });

  const categories = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "database", label: "Database" },
    { value: "programming", label: "Programming" },
    { value: "tools", label: "Tools" },
    { value: "networking", label: "Networking" },
    { value: "design", label: "Design" },
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/skills`);
      setSkillsData(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
      alert("Failed to fetch skills data");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "frontend",
      level: "50",
      color: "#61DAFB",
      iconPath: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      level: parseInt(formData.level),
      color: formData.color,
      iconPath: formData.iconPath || null,
    };

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${API_BASE_URL}/api/skills/${editingId}`,
          payload
        );
        alert("Skill updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/skills`, payload);
        alert("Skill added successfully!");
      }
      fetchSkills();
      resetForm();
    } catch (err) {
      console.error("Error saving skill:", err);
      alert("Failed to save skill");
    }
  };

  const handleEdit = (item: SkillItem) => {
    setFormData({
      name: item.name,
      category: item.category,
      level: item.level.toString(),
      color: item.color,
      iconPath: item.iconPath || "",
    });
    setIsEditing(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/skills/${id}`);
      alert("Skill deleted successfully!");
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill");
    }
  };

  // Group skills by category
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Skills Manager</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Skill"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Skill" : "Add New Skill"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React, Python, Docker"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Proficiency Level (%) *
                  </label>
                  <input
                    type="number"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${formData.level}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Color *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-16 h-10 bg-slate-700 border border-slate-600 rounded-md cursor-pointer"
                      required
                    />
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#61DAFB"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Icon SVG Path (Optional)
                </label>
                <textarea
                  name="iconPath"
                  value={formData.iconPath}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  placeholder="Paste SVG path data here (e.g., M14.23 12.004a2.236...)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Find SVG icons at{" "}
                  <a
                    href="https://simpleicons.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    simpleicons.org
                  </a>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
                >
                  {isEditing ? "Update" : "Add"} Skill
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List - Grouped by Category */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-4">
            Current Skills ({skillsData.length})
          </h2>

          {skillsData.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No skills yet. Add one to get started!
            </p>
          ) : (
            Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-blue-400 mb-3 capitalize">
                  {category} ({skills.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {item.iconPath ? (
                            <div
                              className="w-10 h-10 flex items-center justify-center"
                              style={{ color: item.color }}
                            >
                              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                <path d={item.iconPath} />
                              </svg>
                            </div>
                          ) : (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: item.color }}
                            >
                              <span className="text-white font-bold text-lg">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="text-white font-semibold">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-400 capitalize">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{item.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all"
                            style={{
                              width: `${item.level}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsManager;