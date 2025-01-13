import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Zap, Users, Star, Video } from "lucide-react";
import useBookingStore from "../Hooks/useBookingStore";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import Instagram from "../assets/instagram.png";
import LinkedIn from "../assets/linkedin.png";
import Twitter from "../assets/twitter.png";
import defaultImage from "../assets/defautProfilePic.jpg";
import { Bounce, toast } from "react-toastify";

interface Services {
  name: string;
  id: number;
  description: string;
  price: number;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [serviceTab, setServiceTab] = useState<string>("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  const { setSelectedService, setMentorDetails } = useBookingStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(defaultImage);
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (sessionStorage.getItem("mentor") === "true") {
      toast.error("Login as Mentee to book", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/data/mentor/${userId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProfileData(data);
        if (data.profilePicture) setProfilePicture(data.profilePicture);
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBook = () => {
    const selectedServiceData = services.find((s) => s.name === serviceTab);
    if (selectedServiceData) {
      setSelectedService({
        name: selectedServiceData.name,
        price: selectedServiceData.price,
        description: selectedServiceData.description,
      });

      setMentorDetails({
        id: userId!,
        name: profileData.fullName,
        profilePicture: profilePicture,
      });
    }
    if (sessionStorage.getItem("loggedIn")) navigate(`/availability/${userId}`);
    else navigate(`/login`);
    setLoading(false);
  };

  if (!profileData) {
    return <Spinner clasName="min-h-screen content-center" />;
  }

  return (
    <div className="min-h-screen bg-sky-200">
      <header className="sticky top-0 z-50 bg-[#08286b] flex justify-between items-center p-3 md:p-4 lg:p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
            />
          </a>
        </div>
      </header>

      <div className="min-h-full flex justify-center items-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
          {/* Sidebar Profile Section */}
          <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 md:p-8 relative">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full border-4 border-white/30 mb-4 md:mb-6 shadow-lg"
                />

                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {profileData.fullName}
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full text-center mb-4 md:mb-6">
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
                  <div
                    key={stat.label}
                    className="bg-white/20 rounded-lg p-2 md:p-3"
                  >
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      <p className="text-xs md:text-sm font-semibold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-[10px] md:text-xs text-purple-200">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex mb-4 space-x-2">
                <h2 className="font-semibold mt-1">Connect with me:</h2>
                {profileData.linkedin ? (
                  <a href={profileData.linkedin} target="_blank">
                    <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8" />
                  </a>
                ) : (
                  ""
                )}
                {profileData.instagram ? (
                  <a href={profileData.instagram} target="_blank">
                    <img src={Instagram} alt="Instagram" className="w-8 h-8" />
                  </a>
                ) : (
                  ""
                )}
                {profileData.twitter ? (
                  <a href={profileData.twitter} target="_blank">
                    <img
                      src={Twitter}
                      alt="Twitter/X"
                      className="w-8 h-8 bg-white rounded-lg"
                    />
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="border-t pt-4 pb-4">
              <div className="flex flex-col space-y-2">
                <span className="text-base md:text-lg font-semibold">
                  Domain:
                </span>
                <div className="flex flex-wrap gap-2">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    profileData.domains.map((domain: any, idx: any) => (
                      <span
                        key={idx}
                        className="bg-indigo-50 text-indigo-700 text-xs px-2 md:px-3 py-1 rounded-full"
                      >
                        {domain}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-base md:text-lg font-semibold mb-3">
                Services:
              </h3>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <span
                    key={service.id}
                    className="bg-indigo-50 text-indigo-700 text-xs px-2 md:px-3 py-1 rounded-full"
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-2 bg-white">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {["services", "about", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 md:py-4 text-sm md:text-md font-medium border-b-2 transition-colors ${
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
            <div className="p-4 md:p-8">
              {activeTab === "services" && (
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
                    Available Services
                  </h2>

                  {services &&
                    services.map((service) => (
                      <div key={service.id} className="mb-4 md:mb-8 space-y-4">
                        <button
                          onClick={() => setServiceTab(service.name)}
                          className={`flex items-center justify-between w-full p-3 md:p-4 rounded-xl transition-colors ${
                            serviceTab === service.name
                              ? "bg-indigo-500 text-black"
                              : "bg-sky-100"
                          }`}
                        >
                          <div className="flex items-center space-x-3 md:space-x-4">
                            <div className="bg-indigo-100 p-2 md:p-3 rounded-full">
                              <Video className="w-5 h-5 md:w-6 md:h-6 text-black" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-xs md:text-sm font-semibold text-black">
                                {service.name}
                              </h3>
                              <p className="text-[10px] md:text-xs text-black">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs md:text-sm font-semibold text-black">
                            <span className="line-through text-red-500">
                              {" "}
                              {formatCurrency(service.price)}{" "}
                            </span>{" "}
                            Free
                          </span>
                        </button>
                      </div>
                    ))}

                  {/* Book Session Button */}
                  {/* --------BOOKING BUTTON DISABLED-------- */}
                  <div className="p-4 md:p-8">
                    <button
                      disabled={
                        !serviceTab ||
                        loading ||
                        sessionStorage.getItem("mentor") === "true"
                      }
                      className="w-full bg-[#08286b] text-white font-semibold text-base md:text-lg py-3 md:py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-[#08276bcc] disabled:opacity-50"
                      onClick={() => {
                        // eslint-disable-next-line no-constant-condition
                        if (true) {
                          toast("Coming Soon!", {
                            position: "bottom-right",
                            pauseOnHover: false,
                            transition: Bounce,
                          });
                        } else {
                          handleBook();
                        }
                      }}
                    >
                      {loading ? <Spinner /> : "Book Service"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                    Bio
                  </h2>
                  <ul className="list-disc pl-5">
                    {profileData.bio ? (
                      profileData.bio.split(".").map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (sentence: any, index: any) =>
                          sentence.trim() && (
                            <li key={index}>{sentence.trim()}.</li>
                          )
                      )
                    ) : (
                      <li>No bio available</li>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center text-gray-500 py-8 md:py-12 text-sm md:text-base">
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
