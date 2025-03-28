import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Logo from "../assets/logo.png";
import DefaultImage from "../assets/defautProfilePic.jpg";
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import GridLoadingSkeleton from "../components/ui/Skeletons/GridLoadingSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
}

const AllMentors: React.FC<AboutUsProps> = ({ loggedIn, mentor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current page from URL or default to 1
  const getPageFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(getPageFromUrl());
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const capitalize = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Update URL when page changes
  const updatePageUrl = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    setCurrentPage(getPageFromUrl());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    fetchMentors();
    updatePageUrl(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchMentors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/allMentors?page=${currentPage}`
      );
      if (!response.ok) {
        toast.error("Network response was not ok", {
          pauseOnHover: false,
          draggable: true,
        });
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
    } catch (error) {
      toast.error(`${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-sky-200">
      {/* Sticky Header */}
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
        {!loggedIn ? (
          <div className="space-x-2 md:space-x-4">
            <Link to="/login">
              <button className="px-2 md:px-4 py-1.5 md:py-2 text-white text-sm md:text-base lg:text-base border rounded-lg hover:border-gray-500 transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-sm md:text-base lg:text-base text-black rounded-md hover:bg-gray-300 transition-colors">
                Join Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-2 md:space-x-4">
            {mentor ? (
              <Link to="/dashboard/">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/mentee/">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        )}
      </header>

      <section>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 min-h-screen bg-sky-100">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold underline">
            Our Mentors
          </h1>
          <div className="mt-12 md:mt-16 lg:mt-24 ">
            <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
              {isLoading || mentors.length === 0 ? (
                <GridLoadingSkeleton />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    mentors.map((mentor: any, idx: any) => (
                      <Link
                        key={idx}
                        to={`/profile/${mentor.userId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ProfileCard
                          key={idx}
                          name={`${capitalize(mentor.firstName)} ${capitalize(mentor.lastName)}`}
                          imageUrl={mentor.profilePicture || DefaultImage}
                          desc={mentor.bio || "No bio available."}
                        />
                      </Link>
                    ))
                  }
                </div>
              )}
            </div>
            {totalPages > 0 && (
              <div className="mt-8">
                {/* Mobile View (Small Screens) */}
                <div className="sm:hidden flex flex-col gap-2">
                  <div className="flex justify-center gap-14 w-full">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="flex p-2 w-28 justify-center text-white text-sm bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
                    >
                      <ChevronLeft size={22}/> Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage >= totalPages}
                      className="flex p-2 w-28 justify-center text-white text-sm bg-[#08286b] hover:bg-[#08276bcc] rounded disabled:opacity-50 transition-colors duration-300"
                    >
                      Next <ChevronRight size={22}/>
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
                            : 'bg-gray-400 hover:bg-gray-300 transition-colors duration-300'
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllMentors;
