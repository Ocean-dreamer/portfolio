import React, { createContext, useContext, useState } from "react";
import type { SectionId } from "../constants/sections";

interface SectionContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};