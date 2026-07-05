// frontend/src/pages/Admin/CertificationsManager.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  link: string | null;
  createdAt: string;
}

interface CertificationFormData {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

const CertificationsManager: React.FC = () => {
  const [certificationsData, setCertificationsData] = useState<CertificationItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CertificationFormData>({
    title: "",
    issuer: "",
    date: "",
    description: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/certifications`);
      setCertificationsData(res.data);
    } catch (err) {
      console.error("Error fetching certifications:", err);
      alert("Failed to fetch certifications data");
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
      title: "",
      issuer: "",
      date: "",
      description: "",
      image: "",
      link: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.issuer || !formData.date || !formData.description || !formData.image) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      title: formData.title,
      issuer: formData.issuer,
      date: formData.date,
      description: formData.description,
      image: formData.image,
      link: formData.link || null,
    };

    try {
      if (isEditing && editingId) {
        await axios.put(
          `${API_BASE_URL}/api/certifications/${editingId}`,
          payload
        );
        alert("Certification updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/certifications`, payload);
        alert("Certification added successfully!");
      }
      fetchCertifications();
      resetForm();
    } catch (err) {
      console.error("Error saving certification:", err);
      alert("Failed to save certification");
    }
  };

  const handleEdit = (item: CertificationItem) => {
    setFormData({
      title: item.title,
      issuer: item.issuer,
      date: item.date.split("T")[0], // Format date for input
      description: item.description,
      image: item.image,
      link: item.link || "",
    });
    setIsEditing(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this certification?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/certifications/${id}`);
      alert("Certification deleted successfully!");
      fetchCertifications();
    } catch (err) {
      console.error("Error deleting certification:", err);
      alert("Failed to delete certification");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Certifications Manager</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Certification"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Certification" : "Add New Certification"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Responsive Web Design"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Issuer *
                  </label>
                  <input
                    type="text"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., freeCodeCamp, Coursera"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Earned *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of what you learned..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image Path *
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., images/certs/certificate-name.png"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Place certificate images in: frontend/public/images/certs/
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Certificate Link (Optional)
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/certificate"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
                >
                  {isEditing ? "Update" : "Add"} Certification
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

        {/* Certifications List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Current Certifications ({certificationsData.length})
          </h2>

          {certificationsData.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No certifications yet. Add one to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors"
                >
                  <div className="relative h-40 bg-slate-700">
                    <img
                      src={`/${cert.image}`}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Certificate";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-blue-400 mb-2">{cert.issuer}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      {formatDate(cert.date)}
                    </p>
                    <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                      {cert.description}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline block mb-3"
                      >
                        View Certificate ↗
                      </a>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cert)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManager;