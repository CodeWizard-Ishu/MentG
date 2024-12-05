import React, { useState, ReactNode } from "react";
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  MessageCircle,
  Settings,
  Edit,
  LogOut,
  // CreditCard
} from "lucide-react";

// Define interfaces for type safety
interface Stat {
  icon: ReactNode;
  title: string;
  value: string;
}

interface Meeting {
  client: string;
  date: string;
  duration: string;
  status: "Completed" | "Upcoming";
}

interface NavItem {
  name: string;
  icon: ReactNode;
  tab: string;
}

const ExpertDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const stats: Stat[] = [
    {
      icon: <DollarSign className="text-green-500" />,
      title: "Total Earnings",
      value: "$4,520",
    },
    {
      icon: <Calendar className="text-blue-500" />,
      title: "Upcoming Meetings",
      value: "12",
    },
    {
      icon: <User className="text-purple-500" />,
      title: "Total Clients",
      value: "42",
    },
  ];

  const recentMeetings: Meeting[] = [
    {
      client: "Sarah Johnson",
      date: "Dec 3, 2024",
      duration: "45 mins",
      status: "Completed",
    },
    {
      client: "Mike Anderson",
      date: "Dec 5, 2024",
      duration: "30 mins",
      status: "Upcoming",
    },
  ];

  const navItems: NavItem[] = [
    { name: "Overview", icon: <Clock />, tab: "overview" },
    { name: "Meetings", icon: <Calendar />, tab: "meetings" },
    { name: "Messages", icon: <MessageCircle />, tab: "messages" },
    { name: "Settings", icon: <Settings />, tab: "settings" },
  ];

  const handleEditPage = () => {
    // Placeholder for edit page functionality
    alert("Edit Page functionality to be implemented");
  };

  const handleLogOut = () => {
    // Placeholder for logout functionality
    alert("Logout functionality to be implemented");
    // Typically, this would involve:
    // 1. Clearing authentication tokens
    // 2. Redirecting to login page
    // 3. Resetting application state
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md border-r">
          <div className="space-x-2 top-0 z-50 bg-white/90 backdrop-blur-md flex items-center p-6 shadow-sm">
            <a href="/">
              <img
                src="/client/src/assets/logo.png"
                alt="Logo"
                className="h-10 w-10"
              />
            </a>
            <span className="font-bold text-xl">MentG</span>
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
        <div className="flex-1 p-8">
          <div className="p-6 border-b">
            <div className="flex items-start">
              <img
                src="https://img.freepik.com/free-vector/internship-job-illustration_52683-50829.jpg?t=st=1733331624~exp=1733335224~hmac=e3e9781622115c757183070a44cfee180c65ac111ac0ede0c3936c10971610df&w=900"
                alt="Expert Profile"
                className="w-30 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-500">Web Development Expert</p>
              </div>
              <div className="">
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white 
                       px-4 py-2 rounded-full 
                       flex items-center space-x-2 
                       hover:bg-red-600 transition-colors 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex items-center"
              >
                <div className="mr-4">{stat.icon}</div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Meetings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Meetings</h2>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Client", "Date", "Duration", "Status"].map((header) => (
                    <th
                      key={header}
                      className="text-left p-3 text-gray-500 font-medium"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentMeetings.map((meeting, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{meeting.client}</td>
                    <td className="p-3">{meeting.date}</td>
                    <td className="p-3">{meeting.duration}</td>
                    <td className="p-3">
                      <span
                        className={`
                      px-3 py-1 rounded-full text-xs 
                      ${
                        meeting.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    `}
                      >
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={handleEditPage}
        className="fixed bottom-6 left-6 bg-blue-600 text-white 
                   px-4 py-2 rounded-full shadow-lg 
                   flex items-center space-x-2 
                   hover:bg-blue-700 transition-colors 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Edit className="w-5 h-5" />
        <span>Edit Page</span>
      </button>
    </div>
  );
};

export default ExpertDashboard;
