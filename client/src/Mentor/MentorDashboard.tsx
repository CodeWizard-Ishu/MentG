import React, { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
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

// Define interfaces for type safety
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

  const navItems: NavItem[] = [
    { name: "Home", icon: <HomeIcon />, tab: "home" },
    { name: "Messages", icon: <MessageCircle />, tab: "messages" },
    { name: "Bookings", icon: <PhoneCall />, tab: "meetings" },
    { name: "Services", icon: <Building2 />, tab: "services" },
    { name: "Testimonials", icon: <MessageCircleHeart />, tab: "testimonials" },
    { name: "Calender", icon: <Calendar />, tab: "calender" },
    { name: "Analytics", icon: <ChartLine />, tab: "analytics" },
    { name: "Payments", icon: <Wallet />, tab: "payments" },
    { name: "Profile", icon: <UserPen />, tab: "settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "messages":
        return <Messages />;
      case "meetings":
        return <Meetings />;
      case "services":
        return <Services />;
      case "testimonials":
        return <Testimonials />;
      case "calender":
        return <Calender />;
      case "analytics":
        return <Analytics />;
      case "payments":
        return <Payments />;
      case "settings":
        return <ProfileDetails />;
      default:
        return <div>404 Not Found...</div>;
    }
  };

  return (
    <div>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-sky-100 shadow-md border-r fixed left-0 top-0 bottom-0 overflow-y-auto">
          <div className="space-x-2 top-0 z-50 bg-sky-100 backdrop-blur-md flex items-center p-6 shadow-sm">
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/tPzj54M/logo.png"
                alt="Logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold">MentG</span>
            </a>
          </div>
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
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
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 relative">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <img
                src="https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14000.jpg"
                alt="User Image"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-3xl font-bold p-2">Mentor</h2>
              </div>
              <div className="absolute top-4 right-4">
                <Link to="/">
                  <button
                    onClick={onLogout}
                    className="text-red-500 px-4 py-2 border-2 border-red-500 rounded-md flex items-center space-x-2 hover:transition-all hover:shadow-red-200 hover:shadow-md hover:text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
