import { toast } from 'react-toastify';
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
          localStorage.clear();
          onLogout();
        }

        toast.info("Your session has expired. Please log in again.", {
          pauseOnHover: false,
          draggable: true,
        });

        navigate("/login");
        return false;
      }
      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`,{
        pauseOnHover: false,
        draggable: true,
      })
      // navigate("/login");
      return false;
    }
  };

  return { checkAuthStatus };
};