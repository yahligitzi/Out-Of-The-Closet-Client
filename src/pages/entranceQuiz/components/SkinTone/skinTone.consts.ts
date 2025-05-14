export const skinTones = [
  { value: "very-light", color: "#F5D0C5", label: "Very Light" },
  { value: "light", color: "#E6B8A2", label: "Light" },
  { value: "medium-light", color: "#D19774", label: "Medium Light" },
  { value: "medium", color: "#B67B65", label: "Medium" },
  { value: "medium-dark", color: "#8D5A4C", label: "Medium Dark" },
  { value: "dark", color: "#634832", label: "Dark" },
  { value: "very-dark", color: "#483024", label: "Very Dark" },
] as const;

export type SkinToneValue = (typeof skinTones)[number]["value"];
