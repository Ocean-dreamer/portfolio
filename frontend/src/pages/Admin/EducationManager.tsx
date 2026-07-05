// frontend/src/components/admin/EducationManager.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  startYear: number;
  endYear: number | null;
  description: string | null;
}

interface EducationFormData {
  degree: string;
  institution: string;
  startYear: number | string;
  endYear: number | string;
  description: string;
}

const EducationManager: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<EducationFormData>({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/education`);
      setEducationData(res.data);
    } catch (err) {
      console.error("Error fetching education:", err);
      alert("Failed to fetch education data");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      description: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.degree || !formData.institution || !formData.startYear) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      degree: formData.degree,
      institution: formData.institution,
      startYear: parseInt(formData.startYear.toString()),
      endYear: formData.endYear ? parseInt(formData.endYear.toString()) : null,
      description: formData.description || null,
    };

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${API_BASE_URL}/api/education/${editingId}`,
          payload
        );
        alert("Education updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/education`, payload);
        alert("Education added successfully!");
      }
      fetchEducation();
      resetForm();
    } catch (err) {
      console.error("Error saving education:", err);
      alert("Failed to save education");
    }
  };

  const handleEdit = (item: EducationItem) => {
    setFormData({
      degree: item.degree,
      institution: item.institution,
      startYear: item.startYear,
      endYear: item.endYear || "",
      description: item.description || "",
    });
    setIsEditing(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/education/${id}`);
      alert("Education deleted successfully!");
      fetchEducation();
    } catch (err) {
      console.error("Error deleting education:", err);
      alert("Failed to delete education");
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Education Manager</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Education"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Education" : "Add New Education"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., University Name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Year *
                  </label>
                  <input
                    type="number"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2020"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Year (leave empty if current)
                  </label>
                  <input
                    type="number"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional details about your education..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
                >
                  {isEditing ? "Update" : "Add"} Education
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

        {/* Education List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Current Education Entries</h2>
          {educationData.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No education entries yet. Add one to get started!
            </p>
          ) : (
            educationData.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-blue-400 text-sm mb-1">
                      @ {item.institution}
                    </p>
                    <p className="text-slate-400 text-xs mb-2">
                      {item.startYear} –{" "}
                      {item.endYear ? item.endYear : "Present"}
                    </p>
                    {item.description && (
                      <p className="text-slate-300 text-sm mt-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationManager;