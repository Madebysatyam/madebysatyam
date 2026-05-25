import { createContext, useContext } from "react";

const MatIntroContext = createContext(null);

export function MatIntroProvider({ value, children }) {
  return <MatIntroContext.Provider value={value}>{children}</MatIntroContext.Provider>;
}

export function useMatIntro() {
  const ctx = useContext(MatIntroContext);
  if (!ctx) {
    throw new Error("useMatIntro must be used within MatIntroProvider");
  }
  return ctx;
}
