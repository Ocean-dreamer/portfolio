// frontend/src/pages/Admin/ProjectsManager.tsx
// frontend/src/pages/Admin/ProjectsManager.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  status: string;
  technologies: string[];
  link: string | null;
  createdAt: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  status: string;
  technologies: string;
  link: string;
}

const ProjectsManager: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    status: "planning",
    technologies: "",
    link: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjectsData(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      alert("Failed to fetch projects data");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "planning",
      technologies: "",
      link: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Parse technologies from comma-separated string
    const techArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      technologies: techArray,
      link: formData.link || null,
    };

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${API_BASE_URL}/api/projects/${editingId}`,
          payload
        );
        alert("Project updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, payload);
        alert("Project added successfully!");
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project");
    }
  };

  const handleEdit = (item: ProjectItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      status: item.status,
      technologies: item.technologies.join(", "),
      link: item.link || "",
    });
    setIsEditing(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "finished":
        return "bg-green-600";
      case "working on":
        return "bg-blue-600";
      case "planning":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "finished":
        return "bg-green-600/20 text-green-400 border-green-600";
      case "working on":
        return "bg-blue-600/20 text-blue-400 border-blue-600";
      case "planning":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600";
    }
  };

  // Group projects by status
  const groupedProjects = {
    finished: projectsData.filter((p) => p.status === "finished"),
    "working on": projectsData.filter((p) => p.status === "working on"),
    planning: projectsData.filter((p) => p.status === "planning"),
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects Manager</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Project"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., E-commerce Platform"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your project..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="planning">Planning</option>
                    <option value="working on">Working On</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Separate each technology with a comma
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
                >
                  {isEditing ? "Update" : "Add"} Project
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

        {/* Projects List - Grouped by Status */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-4">
            Current Projects ({projectsData.length})
          </h2>

          {projectsData.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No projects yet. Add one to get started!
            </p>
          ) : (
            Object.entries(groupedProjects).map(([status, projects]) =>
              projects.length > 0 ? (
                <div key={status}>
                  <h3 className="text-lg font-semibold capitalize mb-3 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        status
                      )}`}
                    />
                    {status} ({projects.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-slate-800 p-5 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {project.title}
                            </h4>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                                project.status
                              )}`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 mb-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-slate-700 px-2 py-1 text-xs rounded text-slate-200"
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
                            className="text-sm text-blue-400 hover:underline block mb-3"
                          >
                            View Project ↗
                          </a>
                        )}

                        <div className="flex gap-2 pt-3 border-t border-slate-600">
                          <button
                            onClick={() => handleEdit(project)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsManager;