import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import BACKEND_URL from "../endpoint";
import defaultImage from "../assets/defautProfilePic.jpg";
import { Bounce, toast } from "react-toastify";

interface MenteeDashboardContextType {
  profilePicture: string;
  fullName: string;
  getMenteeDetails: () => Promise<void>;
  updateProfilePicture: (newPicture: string) => void;
  updateFullName: (newName: string) => void;
}

const MenteeDashboardContext = createContext<MenteeDashboardContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useMenteeDashboardContext = () => {
  const context = useContext(MenteeDashboardContext);
  if (!context) {
    throw new Error("useMenteeDashboardContext must be used within a MenteeDashboardProvider");
  }
  return context;
};

interface MenteeDashboardProviderProps {
  children: ReactNode;
  userId: string | null;
  token: string;
}

export const MenteeDashboardProvider: React.FC<MenteeDashboardProviderProps> = ({
  children,
  userId,
  token,
}) => {
  const [profilePicture, setProfilePicture] = useState<string>(defaultImage);
  const [fullName, setFullName] = useState<string>(
    localStorage.getItem("fullName") || "Mentee"
  );

  const getMenteeDetails = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/menteeDetails/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.profilePicture) setProfilePicture(data.profilePicture);
      const capitalize = (string: string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      };
      const formattedName = `${capitalize(data.user.firstName)} ${capitalize(
        data.user.lastName
      )}`;
      localStorage.setItem("fullName", formattedName);
      setFullName(formattedName);
    } catch (error) {
      console.error("Error fetching mentee details:", error);
      toast.error("Failed to fetch profile details", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
  }, [userId, token]);

  const updateProfilePicture = (newPicture: string) => {
    setProfilePicture(newPicture);
  };

  const updateFullName = (newName: string) => {
    setFullName(newName);
    localStorage.setItem("fullName", newName);
  };

  return (
    <MenteeDashboardContext.Provider
      value={{
        profilePicture,
        fullName,
        getMenteeDetails,
        updateProfilePicture,
        updateFullName,
      }}
    >
      {children}
    </MenteeDashboardContext.Provider>
  );
};