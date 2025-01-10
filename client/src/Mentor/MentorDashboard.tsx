import React, { useState, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "../endpoint";
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
import Home from "./Home";
import Meetings from "./Meetings";
import Messages from "./Messages";
import ProfileDetails from "./ProfileDetails";
import Testimonials from "./Testimonials";
import Analytics from "./Analytics";
import Calender from "./Calender";
import Payments from "./Payments";
import Services from "./Services";
import Logo from "../assets/logo.png";
import { Bounce, toast } from "react-toastify";

interface NavItem {
  name: string;
  icon: ReactNode;
  tab: string;
}

interface MentorDashboardProps {
  onLogout: () => void;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://shorturl.at/XCudT"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const [fullName, setFullName] = useState<string>(() => {
    const savedName = sessionStorage.getItem("fullName");
    if (savedName) return savedName;
    return "Mentor";
  });
  const token = sessionStorage.getItem("userToken") ?? "";

  const refreshDashboardData = async () => {
    // Fetch updated user data
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentorDetails/${userId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProfilePicture(data.profilePicture);
      const newFullName = `${data.user.firstName} ${
        data.user.lastName || ""
      }`.trim();
      setFullName(newFullName);
    } catch (error) {
      toast.error(`Error refreshing dashboard data: ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    refreshDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", icon: <HomeIcon />, tab: "home" },
    { name: "Messages", icon: <MessageCircle />, tab: "messages" },
    { name: "Bookings", icon: <PhoneCall />, tab: "meetings" },
    { name: "Services", icon: <Building2 />, tab: "services" },
    { name: "Testimonials", icon: <MessageCircleHeart />, tab: "testimonials" },
    { name: "Calendar", icon: <Calendar />, tab: "calendar" },
    { name: "Analytics", icon: <ChartLine />, tab: "analytics" },
    { name: "Payments", icon: <Wallet />, tab: "payments" },
    { name: "Profile", icon: <UserPen />, tab: "settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home getProfilePicture={setProfilePicture} />;
      case "messages":
        return <Messages />;
      case "meetings":
        return <Meetings />;
      case "services":
        return <Services />;
      case "testimonials":
        return <Testimonials />;
      case "calendar":
        return <Calender />;
      case "analytics":
        return <Analytics />;
      case "payments":
        return <Payments />;
      case "settings":
        return <ProfileDetails onProfileUpdate={refreshDashboardData} />;
      default:
        return <div>404 Not Found...</div>;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
              {navItems.find((item) => item.tab === activeTab)?.name || "Home"}
            </h2>
            <div>
              <Link to={`/profile/${userId}`}>
                <button className="px-2 py-1 text-black bg-white hover:bg-sky-200 rounded-lg flex items-center">
                  <ExternalLink size={20} /> Go to Profile
                </button>
              </Link>
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
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                  activeTab === item.tab
                    ? "bg-gray-400 text-black"
                    : "hover:bg-sky-200 text-gray-900"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            ))}
            {isMobileMenuOpen ? (
              <hr className="my-4 md:my-6 lg:my-8 border-gray-600 sm:mx-auto" />
            ) : (
              ""
            )}

            <Link to={"/"}>
              <button
                onClick={onLogout}
                className="w-full mt-5 text-red-500 bg-white hover:bg-red-100  rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <span className="ml-3 p-2 flex items-center">
                    <LogOut size={20} />
                    Log Out
                  </span>
                ) : (
                  ""
                )}
              </button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1  relative">
          {/* Desktop Header */}
          <div className="hidden md:block p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center">
                <img
                  src={profilePicture}
                  alt="User Image"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold p-2">
                    {fullName}
                  </h2>
                </div>
              </div>
              <div className="md:absolute md:flex md:justify-between md:space-x-4 md:top-4 md:right-4 space-y-2 md:space-y-0">
                <a href={`/profile/${userId}`} className="block">
                  <button className="w-full md:w-auto text-black px-4 py-2 border-2 border-black rounded-lg flex items-center justify-center space-x-2 hover:transition-all hover:shadow-gray-700 hover:shadow-md hover:text-gray-700">
                    <ExternalLink className="w-5 h-5" />
                    <span>Go to Profile</span>
                  </button>
                </a>
                <Link to="/" className="block">
                  <button
                    onClick={onLogout}
                    className="w-full md:w-auto text-red-500 px-4 py-2 border-2 border-red-500 rounded-lg flex items-center justify-center space-x-2 hover:transition-all hover:shadow-red-500 hover:shadow-md hover:text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area with padding for mobile header */}
          <div className="mt-28 md:mt-5 p-2 md:p-8">{renderTabContent()}</div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MentorDashboard;
