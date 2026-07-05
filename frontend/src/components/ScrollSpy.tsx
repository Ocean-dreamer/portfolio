import { useEffect } from 'react';
import { useSection } from '../context/SectionContext';
import { SECTION_IDS } from '../constants/sections';

const ScrollSpy = () => {
  const { setActiveSection } = useSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible in the viewport
        let maxVisibleSection = null;
        let maxRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxVisibleSection = entry.target.id;
            }
          }
        });

        if (maxVisibleSection && SECTION_IDS.includes(maxVisibleSection as any)) {
          setActiveSection(maxVisibleSection as any);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Trigger when section is 20% into viewport
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] // More threshold points for better detection
      }
    );

    return () => observer.disconnect();
  }, [setActiveSection]);

  return null;
};

export default ScrollSpy;