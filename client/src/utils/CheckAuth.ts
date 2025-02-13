import { Bounce, toast } from 'react-toastify';
import BACKEND_URL from '../endpoint';

interface CheckAuthProps {
    onLogout: () => void;
    navigate: (path: string) => void;
}

export const CheckAuth = ({onLogout, navigate}: CheckAuthProps) => {

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const checkAuthStatus = async () => {
    try {
      const authResponse = await fetch(`${BACKEND_URL}/auth/verify/${userId}`, {
        headers:{
          "Authorization" : token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!authResponse.ok) {
        const logoutResponse = await fetch(`${BACKEND_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (logoutResponse.ok) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("isActive");
          localStorage.removeItem("mentor");
          localStorage.removeItem("userId");
          localStorage.removeItem("fullName");
          localStorage.removeItem("booking-store");
          onLogout();
        }

        toast.info("Your session has expired. Please log in again.", {
          position: "top-center",
          pauseOnHover: true,
          transition: Bounce,
        });

        navigate("/login");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Auth check failed:", error);
      navigate("/login");
      return false;
    }
  };

  return { checkAuthStatus };
};