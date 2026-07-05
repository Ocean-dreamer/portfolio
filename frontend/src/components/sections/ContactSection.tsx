import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

type Status = "idle" | "sending" | "sent" | "error";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 px-6 text-white">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Me</h2>
        <p className="text-sm text-gray-400">I'd love to hear from you! Feel free to reach out.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-md p-8 rounded-xl border border-slate-700/50"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm text-slate-400 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm text-slate-400 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm text-slate-400 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-300 border border-gray-600 hover:border-gray-500 hover:shadow-lg flex items-center justify-center w-full"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p className="text-green-400 text-sm mt-4 text-center">Message sent — I'll get back to you soon!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-4 text-center">
            Something went wrong. Please email me directly at{" "}
            <a href="mailto:work.naciri@gmail.com" className="underline">work.naciri@gmail.com</a>.
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;
