import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  MessageCircle,
  LogOut,
  HomeIcon,
  UserPen,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/logo.png";
import defaultImage from "../assets/defautProfilePic.jpg";
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CheckAuth } from "../utils/CheckAuth";
import Spinner from "../components/ui/Spinner";
import { MenteeDashboardContextProvider } from "./MenteeDashboardContext";

const navItems = [
  { name: "Home", icon: <HomeIcon />, path: ".", exact: true },
  { name: "All Meetings", icon: <Calendar />, path: "meetings" },
  { name: "Messages", icon: <MessageCircle />, path: "messages" },
  { name: "Profile", icon: <UserPen />, path: "settings" },
];

const capitalize = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

interface MenteeDashboardProps {
  onLogout: () => void;
}

const MenteeDashboard: React.FC<MenteeDashboardProps> = ({ onLogout }) => {
  const [profilePicture, setProfilePicture] = useState<string>(defaultImage);
  const [fullName, setFullName] = useState<string>(localStorage.getItem("fullName") || "Mentee");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const onProfileUpdate = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/menteeDetails/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if(!response.ok) {
        throw new Error("Failed fetching mentee details");
      }
  
      const data = await response.json();
  
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }
  
      const formattedName = `${capitalize(data.user.firstName)} ${capitalize(data.user.lastName)}`;
      localStorage.setItem("fullName", formattedName);
      setFullName(formattedName);
    } catch (error) {
      toast.error(`${error}`, {
        pauseOnHover: false,
        draggable: true,
      })
    }
  }, [token, userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        localStorage.clear();
        toast.success("Logged out successfully", {
          pauseOnHover: false,
          draggable: true,
        });
        navigate("/");
      }
      else{
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error(`${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      const auth = CheckAuth({ onLogout, navigate });
      auth.checkAuthStatus().then((isValid) => {
        setIsAuthenticated(isValid);
      });
    } else {
      setIsAuthenticated(false);
    }
  }, [ navigate, onLogout ]);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      onProfileUpdate();
    } else {
      navigate("/login");
    }
  }, [navigate, onProfileUpdate]);

  if (isAuthenticated === null) {
    return <Spinner clasName="min-h-screen content-center" />;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <MenteeDashboardContextProvider value = {{ onProfileUpdate }}>
      <div>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-[#08286b] z-30 shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <a href="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
                />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={profilePicture}
                alt="User Image"
                className="w-8 h-8 rounded-full"
              />
              <button
                className="p-2 text-white rounded-lg"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          <div className="px-4 pb-2">
            <div className="flex justify-between">
              <h2 className="text-lg text-white font-semibold">
                {navItems.find((item) => location.pathname.endsWith(item.path))?.name || "Home"}
              </h2>
            </div>
          </div>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Sidebar */}
          <div
            className={`
          w-64 bg-sky-200 shadow-md border-r overflow-y-auto
          fixed md:relative
          ${isMobileMenuOpen ? "left-0" : "-left-64"}
          md:left-0
          top-0 bottom-0
          transition-all duration-300 ease-in-out
          z-40 md:z-auto
        `}
          >
            <div className="space-x-2 top-0 z-50 bg-[#08286b] backdrop-blur-md flex items-center p-6 shadow-sm">
              {isMobileMenuOpen ? (
                <h2 className="text-white font-semibold text-lg">Navigate to:</h2>
              ) : (
                <a href="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
                  />
                </a>
              )}
            </div>
            <nav className="p-4 flex flex-col h-[calc(100vh-80px)]">
              <div className="flex-grow">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={`/dashboard/mentee/${item.path}`}
                    end={item.exact}
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 rounded-lg mb-2 ${
                        isActive ? "bg-gray-400 text-black" : "hover:bg-sky-200 text-gray-900"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </NavLink>
                ))}
              </div>
              
              {isMobileMenuOpen && (
                <div className="mt-auto">
                  <hr className="my-4 border-gray-600" />
                  <button
                    onClick={() => {
                      handleLogout();
                      onLogout();
                    }}
                    className="w-full p-3 text-red-500 bg-white hover:bg-red-100 rounded-lg flex items-center"
                  >
                    <LogOut size={20} />
                    <span className="ml-3">Log Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>

          <div className="flex-1 relative">
            {/* Desktop Header */}
            <div className="hidden md:block p-4 md:p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
                <div className="flex items-center">
                  <img
                    src={profilePicture}
                    alt="User Image"
                    className="object-cover w-16 h-16 md:w-20 md:h-20 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold p-2">
                      {fullName}
                    </h2>
                  </div>
                </div>
                <div className="md:absolute md:space-x-4 md:top-4 md:right-4 space-y-2 md:space-y-0">
                  <button
                    onClick={() => {
                      handleLogout();
                      onLogout();
                    }}
                    className="w-full md:w-auto text-red-500 px-4 py-2 border-2 border-red-500 rounded-lg flex items-center justify-center space-x-2 hover:transition-all hover:shadow-red-500 hover:shadow-md hover:text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area with padding for mobile header */}
            <div className="pt-28 md:pt-5 p-2 md:p-8"><Outlet/></div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </MenteeDashboardContextProvider>
  );
};

export default MenteeDashboard;