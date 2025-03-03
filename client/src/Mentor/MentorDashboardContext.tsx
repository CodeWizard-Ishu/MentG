import { createContext, useContext } from "react";

interface MentorDashboardContextType {
  onProfileUpdate: () => Promise<void>;
}

const MentorDashboardContext = createContext<MentorDashboardContextType | undefined>(undefined);

export const MentorDashboardContextProvider = ({ children, value }: { children: React.ReactNode; value: MentorDashboardContextType }) => (
  <MentorDashboardContext.Provider value={value}>{children}</MentorDashboardContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useMentorDashboardContext = () => {
  const context = useContext(MentorDashboardContext);
  if(!context) {
    throw new Error("useMentorDashboardContext must be used within a MentorDashboardContextProvider");
  }
  return context;
}