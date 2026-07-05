import { useState } from 'react';
import { useSection } from '../../context/SectionContext';
import { SECTION_IDS } from '../../constants/sections';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection } = useSection();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl font-bold text-primary"
              onClick={() => scrollToSection("about")}
            >
              AN
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {SECTION_IDS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="relative flex flex-col items-center text-textDark hover:text-secondary transition-colors capitalize cursor-pointer"
              >
                <span>{link}</span>
                {activeSection === link && (
                  <span className="absolute -bottom-1 h-[2px] w-6 bg-primary rounded transition-all duration-300"></span>
                )}

              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {SECTION_IDS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-textDark hover:bg-gray-100 capitalize"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;