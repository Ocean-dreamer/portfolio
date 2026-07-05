
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div id="about" className="min-h-screen relative overflow-hidden text-white">
      {/* Main content */}
      <div className="container mx-auto px-6 py-20 min-h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left side - Content */}
          <div className="text-left space-y-8">
            {/* Badge */}
            <div 
              className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-slate-200 font-medium text-sm transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="relative overflow-hidden rounded-full">
                ✨ Available for new opportunities
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 
                className={`text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-slate-300 transition-all duration-1000 delay-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                Hi, I'm 
              </h1>
              
              <h2 
                className={`text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                Athmane Naciri
              </h2>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-2xl md:text-3xl text-slate-400 font-light leading-relaxed transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              Full-Stack Developer & 
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium"> UI/UX Designer</span>
            </p>

            {/* Description */}
            <p 
              className={`text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              I craft exceptional digital experiences with clean code and thoughtful design. 
              Passionate about building scalable solutions that make a real impact.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-6 items-start transition-all duration-1000 delay-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <button className="group relative overflow-hidden bg-gradient-to-r from-white to-slate-100 text-slate-900 px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              onClick={() => scrollToSection("projects")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <button className="group flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-500 px-10 py-4 rounded-xl border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-800/50 hover:shadow-xl hover:-translate-y-1"
               onClick={() => scrollToSection("contact")}
              >
                <span className="font-medium">Get In Touch</span>
                <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <a
                href="https://github.com/Ocean-dreamer"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-500 px-10 py-4 rounded-xl border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-800/50 hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.37.823 1.1.823 2.22 0 1.606-.015 2.896-.015 3.286 0 .32.217.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="font-medium">GitHub</span>
              </a>
            </div>

            {/* Tech Stack */}
            <div 
              className={`pt-8 transition-all duration-1000 delay-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Main Tech Stack</span>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'React', color: 'from-blue-500 to-blue-600' },
                  { name: 'Node.js', color: 'from-green-500 to-green-600' },
                  { name: 'TypeScript', color: 'from-blue-600 to-purple-600' },
                  { name: 'Next.js', color: 'from-slate-600 to-slate-700' }
                ].map((tech, index) => (
                  <div 
                    key={tech.name}
                    className={`group flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1200 + index * 100}ms` }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tech.color} group-hover:scale-110 transition-transform duration-300`}></div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - GIF */}
          <div className="flex justify-center items-center">
            <div className="relative animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-96 h-96 bg-gradient-to-br from-slate-800/30 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-slate-700/30 flex items-center justify-center shadow-2xl">
                {!imageError ? (
                  <img 
                    src="/images/herosection.gif" 
                    alt="Animated geometry shape"
                    className="w-full h-full object-contain rounded-2xl brightness-110 contrast-105 saturate-110"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="w-20 h-20 border-2 border-slate-600 rounded-xl mb-4 mx-auto flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-medium">Animation Loading...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;