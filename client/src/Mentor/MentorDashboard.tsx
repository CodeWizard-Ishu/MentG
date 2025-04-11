import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import BACKEND_URL from "../endpoint";
import defaultImage from "../assets/defautProfilePic.jpg";
import {
  Calendar,
  MessageCircle,
  LogOut,
  HomeIcon,
  Building2,
  MessageCircleHeart,
  PhoneCall,
  ChartLine,
  Wallet,
  UserPen,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { MentorDashboardContextProvider } from "./MentorDashboardContext";
import { CheckAuth } from "../utils/CheckAuth";
import Spinner from "../components/ui/Spinner";

const navItems = [
  { name: "Home", icon: <HomeIcon />, path: ".", exact: true },
  { name: "Messages", icon: <MessageCircle />, path: "messages" },
  { name: "Bookings", icon: <PhoneCall />, path: "meetings" },
  { name: "Services", icon: <Building2 />, path: "services" },
  { name: "Testimonials", icon: <MessageCircleHeart />, path: "testimonials" },
  { name: "Calendar", icon: <Calendar />, path: "calendar" },
  { name: "Analytics", icon: <ChartLine />, path: "analytics" },
  { name: "Payments", icon: <Wallet />, path: "payments" },
  { name: "Profile", icon: <UserPen />, path: "settings" },
];

const capitalize = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

interface MentorDashboardProps {
  onLogout: () => void;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ onLogout }) => {
  const [profilePicture, setProfilePicture] = useState<string>(defaultImage);
  const [fullName, setFullName] = useState<string>(localStorage.getItem("fullName") || "Mentor");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("userToken") ?? "";
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const onProfileUpdate = useCallback(async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentorDetails/${userId}`,
        {
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      const data = await response.json();

      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }

      const formattedName = `${capitalize(data.user.firstName)} ${capitalize(data.user.lastName) || ""}`.trim();
      localStorage.setItem("fullName", formattedName);
      setFullName(formattedName);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
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
    <MentorDashboardContextProvider value = {{ onProfileUpdate }}>
      <div>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-[#08286b] z-30 shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <a href="/">
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
              <div>
              <NavLink to={`/profile/${username}`}>
                <button className="px-2 py-1 text-black bg-white hover:bg-sky-200 rounded-lg flex items-center">
                  <ExternalLink size={20} /> Go to Profile
                </button>
              </NavLink>
              </div>
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
              <div className="flex items-center">
                {isMobileMenuOpen ? (
                  <h2 className="text-white font-semibold text-lg">
                    Navigate to:
                  </h2>
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
            </div>
            <nav className="p-4 flex flex-col h-[calc(100vh-80px)]">
              <div className="flex-grow">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={`/dashboard/${item.path}`}
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
                <div className="md:absolute md:flex md:justify-between md:space-x-4 md:top-4 md:right-4 space-y-2 md:space-y-0">
                  <NavLink to={`/profile/${username}`}>
                    <button className="w-full md:w-auto text-black px-4 py-2 border-2 border-black rounded-lg flex items-center justify-center gap-1 hover:transition-all hover:shadow-gray-700 hover:shadow-md hover:text-gray-700">
                      <ExternalLink className="w-5 h-5" /> Go to Profile
                    </button>
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      onLogout();
                    }}
                    className="w-full md:w-auto text-red-500 px-4 py-2 border-2 border-red-500 rounded-lg flex items-center justify-center gap-1 hover:transition-all hover:shadow-red-500 hover:shadow-md hover:text-red-500"
                  >
                    <LogOut className="w-5 h-5" /> Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area with padding for mobile header */}
            <div className="mt-28 md:mt-5 p-2 md:p-8"><Outlet/></div>
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
    </MentorDashboardContextProvider>
  );
};

export default MentorDashboard;
