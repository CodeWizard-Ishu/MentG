import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageCircle, Zap, Users, Star, Video } from "lucide-react";
import BACKEND_URL from "../endpoint";
import Logo from '../assets/logo.png';

interface Services {
  name: string;
  id: number;
  description: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("sessions");
  const [serviceTab, setServiceTab] = useState<string>("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/data/mentor/${userId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Set profile data and services
        setProfileData(data);
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleBook = () => {
    navigate("/availability");
  };

  if (!profileData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <header className="top-0 z-50 bg-sky-100 backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl">MentG</span>
          </a>
        </div>
      </header>

      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid grid-cols-3 overflow-hidden">
          {/* Sidebar Profile Section */}
          <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 relative">
            <div className="flex flex-col items-center">
              <img
                src="https://img.freepik.com/free-photo/portrait-handsome-hipster-man-glasses-3d-rendering_1142-51612.jpg?t=st=1733590809~exp=1733594409~hmac=9e08d769b04a2fdaf8018054b9eabb4bd1bb0fc810193338363431e4b0f3707c&w=740"
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white/30 mb-6 shadow-lg"
              />

              <h1 className="text-2xl font-bold mb-2">
                {profileData.fullName}
              </h1>
              <p className="text-sm text-purple-200 mb-4">{profileData.bio}</p>

              <div className="grid grid-cols-3 gap-4 w-full text-center mb-6">
                {[
                  {
                    icon: Users,
                    value: profileData.uniqueMentees,
                    label: "Mentees Guided",
                  },
                  {
                    icon: Star,
                    value: profileData.averageRating,
                    label: "Rating",
                  },
                  {
                    icon: Zap,
                    value: profileData.completedSessions,
                    label: "Sessions Taken",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/20 rounded-lg p-3">
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <stat.icon className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs text-purple-200">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t pt-4 pb-4">
              <span className="text-lg font-semibold mb-3">Domain : </span>
              <span className="text-xs">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  profileData.domains.map((domain: any, idx: any) => (
                    <span
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 text-xs mx-2 px-3 py-1 rounded-full"
                    >
                      {domain}
                    </span>
                  ))
                }
              </span>
            </div>

            <div className="border-t pt-4">
              {" "}
              <h3 className="text-lg font-semibold mb-3">Expertise</h3>{" "}
              <div className="flex flex-wrap gap-2">
                {" "}
                {services.map((service) => (
                  <span
                    key={service.id}
                    className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full"
                  >
                    {" "}
                    {service.name}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2 bg-white">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {["sessions", "about", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-md font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "sessions" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Available Services
                  </h2>

                  {services &&
                    services.map((service) => (
                      <div key={service.id} className="mb-8 space-y-4">
                        <button
                          onClick={() => setServiceTab(service.name)}
                          className={`flex items-center justify-between w-full p-4 rounded-xl transition-colors ${
                            serviceTab === service.name
                              ? "bg-indigo-500 text-black"
                              : "bg-sky-100"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                              <Video className="w-6 h-6 text-black" />
                            </div>
                            <div className="text-left">
                              {" "}
                              {/* Added text-left for left alignment */}
                              <h3 className="text-sm font-semibold text-black">
                                {service.name}
                              </h3>
                              <p className="text-xs text-black">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-black">Free</span>
                        </button>
                      </div>
                    ))}

                  {/* Book Session Button */}
                  <div className="p-8">
                    <button
                      disabled={!serviceTab}
                      className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-700 disabled:opacity-50"
                      onClick={handleBook}
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Book a Session
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Bio</h2>
                  {profileData.bio}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center text-gray-500 py-12">
                  No reviews yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
