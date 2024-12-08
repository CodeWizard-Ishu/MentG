import React, { useState, ReactNode } from "react";
import {
  Calendar,
  MessageCircle,
  LogOut,
  HomeIcon,
  UserPen,
} from "lucide-react";
import Overview from "./Overview";
import Meetings from "./Meetings";
import Messages from "./Messages";
import Settings from "./Settings";

interface NavItem {
  name: string;
  icon: ReactNode;
  tab: string;
}

const MenteeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const navItems: NavItem[] = [
    { name: "Home", icon: <HomeIcon />, tab: "overview" },
    { name: "All Meetings", icon: <Calendar />, tab: "meetings" },
    { name: "Messages", icon: <MessageCircle />, tab: "messages" },
    { name: "Profile", icon: <UserPen />, tab: "settings" },
  ];

  const handleLogOut = () => {
    alert("Logout functionality to be implemented");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
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
  
  

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md border-r fixed left-0 top-0 bottom-0 overflow-y-auto">
          <div className="space-x-2 top-0 z-50 bg-white/90 backdrop-blur-md flex items-center p-6 shadow-sm">
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/tPzj54M/logo.png"
                alt="Logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-gray-800">MentG</span>
            </a>
          </div>
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center p-3 rounded-lg mb-2 ${
                  activeTab === item.tab
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-gray-600"
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
                src="https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg"
                alt="User Image"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold p-2">Mentee</h1>
              </div>
              <div className="absolute top-6 right-6">
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
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
