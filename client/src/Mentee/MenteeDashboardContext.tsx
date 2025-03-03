import { createContext, useContext } from "react";

interface MenteeDashboardContextType {
  onProfileUpdate: () => Promise<void>;
}

const MenteeDashboardContext = createContext<MenteeDashboardContextType | undefined>(undefined);

export const MenteeDashboardContextProvider = ({ children, value }: { children: React.ReactNode; value: MenteeDashboardContextType }) => (
  <MenteeDashboardContext.Provider value={value}>{children}</MenteeDashboardContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useMenteeDashboardContext = () => {
  const context = useContext(MenteeDashboardContext);
  if(!context) {
    throw new Error("useMenteeDashboardContext must be used within a MenteeDashboardContextProvider");
  }
  return context;
}