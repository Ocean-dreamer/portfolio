import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi"; // Blog icon from react-icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">About Me</h3>
          <p className="text-sm text-slate-400">
            I'm a passionate developer building modern web and IoT projects. This portfolio showcases my work and skills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">Quick Links</h3>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>
              <a href="#projects" className="hover:text-white transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">Contact</h3>
          <p className="text-sm text-slate-400">Email: work.naciri@gmail.com</p>
          <p className="text-sm text-slate-400">Phone: +212 6 50 47 05 80</p>
          <div className="flex mt-3 gap-4">
            <a
              href="https://github.com/Ocean-dreamer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/naciriathmane"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FiBookOpen size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-slate-700 pt-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Athmane Naciri. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
