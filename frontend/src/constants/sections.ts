export const SECTION_IDS = [
  "about",
  "experience", 
  "skills",
  "education",
  "certifications",
  "projects",
  "contact"
] as const;

export type SectionId = typeof SECTION_IDS[number];