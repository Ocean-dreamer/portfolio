import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const ProfileManager = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/profile`, {
        withCredentials: true,
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/profile`, profile, {
        withCredentials: true,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Personal Information</h1>
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Professional Title</label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-400 mb-2">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">GitHub</label>
              <input
                type="text"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg text-white font-bold hover:scale-105 transition-transform"
          >
            💾 Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManager;