import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Logo from "../assets/logo.png";
import BACKEND_URL from "../endpoint";
import { Bounce, toast } from "react-toastify";
import Footer from "../components/Footer";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const SeeAll: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  const { domain } = useParams();
  const domainName: string = domain || "Technology";
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMentors(domainName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const fetchMentors = async (domain: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/getMentors?domain=${domain}&page=${currentPage}`
      );
      if (!response.ok) {
        // throw new Error("Network response was not ok");
        toast.error("Network response was not ok", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
      }
      const data = await response.json();
      setMentors(data.mentors);
      setTotalPages(data.totalPages);
    } catch (error) {
      // console.error("Error fetching mentors:", error);
      toast.error(`${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
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

  return (
    <div className="min-h-screen bg-sky-100">
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
            <Link to="/">
              <button
                onClick={onLogout}
                className="px-2 md:px-4 py-1.5 md:py-2 text-white text-sm md:text-base lg:text-base border rounded-lg hover:border-gray-500 transition"
              >
                Logout
              </button>
            </Link>
            {mentor ? (
              <Link to="/dashboard">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/mentee">
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold underline">{domain} :</h1>
          <div className="mt-12 md:mt-16 lg:mt-24 mb-12 md:mb-16 lg:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
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
                      name={`${mentor.user.firstName} ${mentor.user.lastName}`}
                      imageUrl={mentor.profilePicture || Logo}
                      desc={mentor.bio || "No description available."}
                    />
                  </Link>
                ))
              }
            </div>
            {domain && totalPages > 0 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm md:text-base bg-gray-300 rounded disabled:bg-gray-200"
                >
                  {"< Previous"}
                </button>

                <span>
                  Page{" "}
                  <strong>
                    {currentPage} of {totalPages}
                  </strong>
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 text-sm md:text-base bg-gray-300 rounded disabled:bg-gray-200"
                >
                  {"Next >"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default SeeAll;
