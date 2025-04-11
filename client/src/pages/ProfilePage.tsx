import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Zap, Users, Star, Video, MessageCircleMore, MessageSquareMore, Tv, ChevronLeft, ChevronRight } from "lucide-react";
import useBookingStore from "../Hooks/useBookingStore";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import Instagram from "../assets/instagram.png";
import LinkedIn from "../assets/linkedin.png";
import Twitter from "../assets/twitter.png";
import defaultImage from "../assets/defautProfilePic.jpg";
import { toast } from "react-toastify";
import ProfilePageSkeleton from "../components/ui/Skeletons/ProfilePageSkeleton";
import TestimonialCard from "../components/ui/TestimonialCard";

interface Testimonial {
  id: number;
  mentorId: number;
  menteeId: number;
  score: number;
  feedback: string;
  createdAt: string;
  mentee: {
    user: {
      firstName: string;
      lastName: string;
    }
  };
}

interface PaginatedTestimonials {
  ratings: Testimonial[];
  totalPages: number;
  currentPage: number;
  totalRatings: number;
}

interface Services {
  name: string;
  id: number;
  description: string;
  price: number;
}

interface ProfileData {
  userId: number,
  fullName : string,
  bio : string,
  linkedin : string,
  instagram: string,
  twitter : string,
  profilePicture : string,
  uniqueMentees : number,
  completedSessions : number,
  averageRating : string,
  domains : string[],
  services : Services[],
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [serviceTab, setServiceTab] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData>();
  const [services, setServices] = useState<Services[]>([]);
  const [testimonialData, setTestimonialData] = useState<PaginatedTestimonials>({
    ratings: [],
    totalPages: 0,
    currentPage: 1,
    totalRatings: 0
  });
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(defaultImage);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("most-recent");
  const { setSelectedService, setMentorDetails } = useBookingStore();
  
  const { username } = useParams();
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const capitalize = (string : string) => {
    return string.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/data/mentor/${username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok){
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            pauseOnHover: false,
            draggable: true,
          });
          return;
        }
        const data = await response.json();
        setProfileData(data);
        if (data.profilePicture) setProfilePicture(data.profilePicture);
        setServices(data.services);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(`Error, Check your Connection: ${error.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
      }
    };

    fetchProfileData();
  }, [username]);

  useEffect(() => {
    if (activeTab === "reviews") {
      fetchRatings();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, activeTab, currentPage, ratingFilter, sortOrder]);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "4"
      });
      
      // Add filter and sort params if they exist
      if (ratingFilter !== null) {
        queryParams.append('rating', ratingFilter.toString());
      }
      
      if (sortOrder) {
        queryParams.append('sort', sortOrder);
      }
      
      const response = await fetch(
        `${BACKEND_URL}/api/getRating/${username}?${queryParams.toString()}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if(!response.ok){
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }
      
      const data = await response.json();
      setTestimonialData(data);
    } catch (error) {
      toast.error(`${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const statsData = useMemo(() => [
    {
      icon: Users,
      value: profileData?.uniqueMentees || 0,
      label: "Mentees Guided",
    },
    {
      icon: Star,
      value: profileData?.averageRating || "0",
      label: "Rating",
    },
    {
      icon: Zap,
      value: profileData?.completedSessions || 0,
      label: "Sessions Taken",
    },
  ], [profileData?.uniqueMentees, profileData?.averageRating, profileData?.completedSessions]);

  const getServiceIcon = (serviceName: string) => {
    switch(serviceName) {
      case "1:1 Sessions": return Video;
      case "Quick Chat": return MessageCircleMore;
      case "Priority DMs": return MessageSquareMore;
      case "Webinars": return Tv;
      default: return Video;
    }
  };

  const formattedServices = useMemo(() => {
    return services.map(service => ({
      ...service,
      formattedPrice: formatCurrency(service.price),
      icon: getServiceIcon(service.name)
    }));
  }, [services]);

  const handleBook = () => {
    if (localStorage.getItem("mentor") === "true" || localStorage.getItem("loggedIn") === "false") {
      toast.error("Login as Mentee to book", {
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    const selectedServiceData = services.find((s) => s.name === serviceTab);

    if (selectedServiceData?.name === "Quick Chat" || selectedServiceData?.name === "Priority DMs" || selectedServiceData?.name === "Webinars") {
      toast.info("This service is coming soon! Meantime, you can book 1:1 sessions.", {
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    if (selectedServiceData) {
      setSelectedService({
        name: selectedServiceData.name,
        price: selectedServiceData.price,
      });

      setMentorDetails({
        name: profileData?.fullName || "",
      });
    }
    if (localStorage.getItem("loggedIn") === "true")
      navigate(`/availability/${username}`);
    else navigate(`/login`);
    setLoading(false);
  };

  const handleFilterChange = (rating: number | null) => {
    setRatingFilter(rating);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= testimonialData.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!profileData) {
    return <ProfilePageSkeleton/>;
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
          <div className="col-span-1 bg-gradient-to-br from-[#C33764] to-[#08286b] text-white p-4 md:p-8 relative">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={profilePicture}
                  alt="Profile"
                  title={profileData.fullName}
                  className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full border-4 border-white/30 mb-4 md:mb-6 shadow-lg"
                />

                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {profileData.fullName}
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full text-center mb-4 md:mb-6">
                {statsData.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/20 rounded-lg p-2 md:p-3"
                  >
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                      <p className="text-xs md:text-sm font-semibold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-[10px] md:text-xs text-white">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex mb-4 space-x-2">
                <h2 className="font-semibold mt-1">Connect with me:</h2>
                {profileData.linkedin ? (
                  <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                    <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8" />
                  </a>
                ) : (
                  ""
                )}
                {profileData.instagram ? (
                  <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" title="Instagram">
                    <img src={Instagram} alt="Instagram" className="w-8 h-8" />
                  </a>
                ) : (
                  ""
                )}
                {profileData.twitter ? (
                  <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter profile" title="Twitter/X">
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
                    profileData.domains.map((domain: string, idx: number) => (
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

                  {formattedServices.map((service) => (
                    <div key={service.id} className="mb-4 md:mb-8 space-y-4">
                      <button
                        title="Click to select one"
                        onClick={() => setServiceTab(service.name)}
                        className={`flex items-center justify-between w-full p-3 md:p-4 rounded-xl transition-colors ${
                          serviceTab === service.name
                            ? "bg-blue-400 text-black"
                            : "bg-sky-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="bg-indigo-100 p-2 md:p-3 rounded-full">
                            {React.createElement(service.icon, { className: "w-5 h-5 md:w-6 md:h-6 text-black" })}
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
                            {service.formattedPrice}
                          </span>{" "}
                          <span className="text-black">Free</span>
                          <div className="text-[10px] md:text-[12px] text-black">Limited time offer</div>
                        </span>
                      </button>
                    </div>
                  ))}

                  {/* Book Session Button */}
                  <div className="p-4 md:p-8">
                    <button
                      disabled={!serviceTab || loading}
                      className="w-full bg-[#08286b] text-white font-semibold text-base md:text-lg py-3 md:py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-[#08276bcc] disabled:opacity-50"
                      onClick={handleBook}
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
                        (sentence: string, index: number) =>
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      Mentee Feedback
                    </h2>
                    {testimonialData.totalRatings > 0 && (
                      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold">{profileData?.averageRating || "0"}</span>
                        <span className="text-xs text-gray-500">({testimonialData.totalRatings} reviews)</span>
                      </div>
                    )}
                  </div>
                  
                  {loading && testimonialData.ratings?.length === 0 ? (
                    <div className="flex justify-center items-center h-40">
                      <Spinner />
                    </div>
                  ) : testimonialData.totalRatings === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl">
                      <MessageCircleMore className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 text-center">No feedback available yet</p>
                      <p className="text-sm text-gray-400 text-center mt-1">Be the first to leave a review after your session</p>
                    </div>
                  ) : (
                    <>                      
                      {/* Filter and sort controls */}
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => handleFilterChange(null)}
                            className={`px-3 py-1 text-xs font-medium ${
                              ratingFilter === null 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } rounded-full`}
                          >
                            All Reviews
                          </button>
                          <button 
                            onClick={() => handleFilterChange(5)}
                            className={`px-3 py-1 text-xs font-medium ${
                              ratingFilter === 5 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } rounded-full`}
                          >
                            5 Star Only
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">Sort by:</span>
                          <select 
                            className="text-xs border rounded p-1"
                            value={sortOrder}
                            onChange={handleSortChange}
                          >
                            <option value="most-recent">Most Recent</option>
                            <option value="highest-rating">Highest Rating</option>
                            <option value="lowest-rating">Lowest Rating</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Testimonials grid */}
                      {loading ? (
                        <div className="flex justify-center items-center h-40">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {testimonialData.ratings?.map((testimonial) => (
                              <TestimonialCard
                                key={testimonial.id}
                                name={`${capitalize(testimonial.mentee.user.firstName)} ${capitalize(testimonial.mentee.user.lastName)}`}
                                testimonial={testimonial.feedback}
                                rating={testimonial.score}
                                createdAt={new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              />
                            ))}
                          </div>
                          
                          {/* Pagination controls */}
                          {testimonialData.totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-6">
                              <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full bg-gray-100 text-gray-700 disabled:opacity-40"
                                aria-label="Previous page"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              
                              <div className="flex space-x-1">
                                {Array.from({ length: testimonialData.totalPages }, (_, i) => i + 1).map((page) => (
                                  <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                      currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    {page}
                                  </button>
                                ))}
                              </div>
                              
                              <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === testimonialData.totalPages}
                                className="p-2 rounded-full bg-gray-100 text-gray-700 disabled:opacity-40"
                                aria-label="Next page"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
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