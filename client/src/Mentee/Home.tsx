import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Dropdown from "../components/ui/Dropdown";
import BACKEND_URL from "../endpoint";
import DefaultImage from "../assets/defautProfilePic.jpg";
import { toast } from "react-toastify";
import { Calendar, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import Spinner from "../components/ui/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current page from URL or default to 1
  const getPageFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  interface Mentor{
    id : number,
    userId : number,
    firstName : string,
    lastName : string,
    username: string,
    bio : string,
    profilePicture : string
  }

  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(getPageFromUrl());
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const menteeId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";
  const userName = localStorage.getItem("fullName");

  const updatePageUrl = (page : number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    if (selectedDomain) {
      searchParams.set('domain', selectedDomain);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    setCurrentPage(getPageFromUrl());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const capitalize = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const options = [
    { label: "Technology", value: "Technology" },
    { label: "Business", value: "Business" },
    { label: "Career", value: "Career" },
    { label: "Marketing", value: "Marketing" },
    { label: "Finance", value: "Finance" },
    { label: "Engineering", value: "Engineering" },
    { label: "Mental Fitness", value: "Mental Fitness" },
    { label: "Fintech", value: "Fintech" },
    { label: "Operations", value: "Operations" },
    { label: "Compliance", value: "Compliance" },
    { label: "Legal", value: "Legal" },
    { label: "Tax", value: "Tax" },
  ];

  const fetchMentors = async (domain: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentee/getMentors/${menteeId}?domain=${domain}&page=${currentPage}`,
        {
          method: "GET",
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sortedMentors = data.mentors.sort((a: any, b: any) => {
        const aHasPicture = a.profilePicture !== null;
        const bHasPicture = b.profilePicture !== null;
        return aHasPicture === bHasPicture ? 0 : aHasPicture ? -1 : 1;
      });

      setMentors(sortedMentors);
      setTotalPages(data.totalPages);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDomain) {
      fetchMentors(selectedDomain);
      updatePageUrl(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain, currentPage]);

  // Handle pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage === 2) endPage = Math.min(4, totalPages - 1);
      if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);
      
      if (startPage > 2) pageNumbers.push('...');
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) pageNumbers.push('...');
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#C33764] to-[#08286b] text-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getGreeting()}, {(userName || "Mentee")}!
            </h1>
            <p className="text-white mb-4">
              Welcome to your dashboard. Find your perfect mentor and start your journey today.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Link to="/dashboard/mentee/meetings" className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg">
                <Calendar size={18} className="mr-2" />
                <span>View Meetings</span>
              </Link>
              <Link to="/dashboard/mentee/settings" className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg">
                <Star size={18} className="mr-2" />
                <span>Complete Profile</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 p-4 bg-white/10 rounded-lg">
            <h3 className="font-medium text-lg mb-2 flex items-center">
              <Clock size={18} className="mr-2" /> Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-blue-100">Upcoming Meetings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-blue-100">Completed Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 lg:mb-12 text-center sm:text-left">
          Choose your Domain to get Top Mentors
        </h1>

        <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto sm:mx-0">
          <Dropdown
            options={options}
            onChange={(value) => {
              setSelectedDomain(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {isLoading ? (
              <p className="col-span-full text-center py-10"><Spinner/>Loading mentors...</p>
            ) : (
              mentors.map((mentor: Mentor) => (
                <Link
                  key={mentor.id}
                  to={`/profile/${mentor.username}`}
                  style={{ textDecoration: "none" }}
                  className="transform transition-transform duration-300 hover:scale-105"
                >
                  <ProfileCard
                    key={mentor.userId}
                    name={`${capitalize(mentor.firstName)} ${capitalize(mentor.lastName)}`}
                    imageUrl={mentor.profilePicture || DefaultImage}
                    desc={mentor.bio || "No bio available."}
                  />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {selectedDomain && totalPages > 0 && (
          <div className="mt-8">
            {/* Mobile View (Small Screens) */}
            <div className="sm:hidden flex flex-col gap-2">
              <div className="flex justify-center gap-4 w-full">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
                >
                  <ChevronLeft size={18}/> Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
                >
                  Next <ChevronRight size={18}/>
                </button>
              </div>
              <div className="flex justify-center items-center space-x-2 overflow-x-auto py-2">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? 
                  <span key={`ellipsis-${index}`} className="px-2">...</span> :
                  <button
                    key={`page-${page}`}
                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      currentPage === page 
                        ? 'bg-[#08286b] text-white font-semibold transition-colors duration-300' 
                        : 'bg-gray-400 hover:bg-gray-500 transition-colors duration-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Desktop View (Medium screens and up) */}
            <div className="hidden sm:flex items-center justify-center gap-20">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
              >
                <ChevronLeft/> Previous
              </button>

              <div className="flex items-center space-x-2">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? 
                  <span key={`ellipsis-${index}`} className="px-2">...</span> :
                  <button
                    key={`page-${page}`}
                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      currentPage === page 
                        ? 'bg-[#08286b] text-white font-semibold transition-colors duration-300' 
                        : 'bg-gray-400 hover:bg-gray-500 transition-colors duration-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="flex p-2 w-28 justify-center text-white text-sm md:text-base bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
              >
                Next <ChevronRight/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
