// frontend/src/components/sections/CertificationsSection.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface Certification {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string | null;
}

const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/certifications`);
      setCertifications(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching certifications:", err);
      setLoading(false);
    }
  };

  // Duplicate certifications for infinite scroll effect
  const duplicatedCertifications = [...certifications, ...certifications];

  if (loading) {
    return (
      <section id="certifications" className="text-white py-16 px-6">
        <div className="text-center">
          <div className="text-xl">Loading certifications...</div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return (
      <section id="certifications" className="text-white py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Certifications</h2>
          <p className="text-sm text-gray-400">No certifications yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="text-white py-16 px-6 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Certifications</h2>
        <p className="text-sm text-gray-400">Hover to learn more or view in full</p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-6xl overflow-hidden">
          <div className="flex gap-6 animate-scroll-x w-max">
            {duplicatedCertifications.map((cert, i) => (
              <div
                key={`${cert.id}-${i}`}
                className="relative w-72 h-44 flex-shrink-0 rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 bg-slate-800 group"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:blur-sm transition duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Certificate";
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 text-center px-4">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">{cert.title}</h3>
                  <p className="text-sm text-slate-300 mb-4">{cert.description}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;