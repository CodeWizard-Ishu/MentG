import React, { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  LogOut,
  HomeIcon,
  UserPen,
} from "lucide-react";
import Home from "./Home";
import Meetings from "./Meetings";
import Messages from "./Messages";
import Settings from "./ProfileSettings";
import Logo from '../assets/logo.png';

interface NavItem {
  name: string;
  icon: ReactNode;
  tab: string;
}

interface MenteeDashboardProps {
  onLogout: () => void;
}
const MenteeDashboard: React.FC<MenteeDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [profilePicture] = useState<string>("https://shorturl.at/Pfj9i");

  const navItems: NavItem[] = [
    { name: "Home", icon: <HomeIcon />, tab: "home" },
    { name: "All Meetings", icon: <Calendar />, tab: "meetings" },
    { name: "Messages", icon: <MessageCircle />, tab: "messages" },
    { name: "Profile", icon: <UserPen />, tab: "settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "meetings":
        return <Meetings />;
      case "messages":
        return <Messages />;
      case "settings":
        return <Settings />;
      default:
        return <div>404 Not Found...</div>;
    }
  };
  const fullName = localStorage.getItem('fullName') || "Mentee";
  return (
    <div>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-sky-100 shadow-md border-r fixed left-0 top-0 bottom-0 overflow-y-auto">
          <div className="space-x-2 top-0 z-50 bg-sky-100 backdrop-blur-md flex items-center p-6 shadow-md">
            <a href="/" className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 w-full"
              />
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
        <div className="flex-1 ml-64 relative bg-white">
          <div className="border-b p-6">
            <div className="flex items-center">
              <img
                src={profilePicture}
                alt="User Image"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold p-2">{fullName}</h1>
              </div>
              <div className="absolute top-6 right-6">
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

export default MenteeDashboard;
