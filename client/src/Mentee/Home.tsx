import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Dropdown from "../components/ui/Dropdown";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import { Bounce, toast } from "react-toastify";

const Home = () => {
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("");
  const token = sessionStorage.getItem("userToken") ?? "";

  const options = [
    { label: "Technology", value: "Technology" },
    { label: "Business", value: "Business" },
    { label: "Career", value: "Career" },
    { label: "Marketing", value: "Marketing" },
    { label: "Finance", value: "Finance" },
    { label: "Engineering", value: "Engineering" },
    { label: "Health", value: "Health" },
    { label: "Fitness", value: "Fitness" },
    { label: "Mental Fitness", value: "Mental Fitness" },
  ];

  const fetchMentors = async (domain: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentee/getMentors?domain=${domain}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
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

  useEffect(() => {
    if (selectedDomain) {
      fetchMentors(selectedDomain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain, currentPage]);

  // Pagination controls
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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 lg:mb-12 text-center sm:text-left">
        Choose your Domain to get Top Mentors
      </h1>

      <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto sm:mx-0">
        <Dropdown
          options={options}
          onChange={(value) => {
            setSelectedDomain(value);
            setCurrentPage(1); // Reset to first page on new selection
          }}
        />
      </div>

      <div className="mt-8 sm:mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mentors.map((mentor: any, idx: any) => (
              <Link
                key={idx}
                to={`/profile/${mentor.userId}`}
                style={{ textDecoration: "none" }}
                className="transform transition-transform duration-300 hover:scale-105"
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
      </div>

      {/* Conditional Rendering of Pagination Controls */}
      {selectedDomain && totalPages > 0 && (
        <div className="flex flex-row justify-between items-center mt-8 sm:mt-12 gap-4 sm:gap-0">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className=" sm:w-auto px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 hover:bg-gray-400 transition-colors duration-300"
          >
            {"< Previous"}
          </button>

          <span className="text-sm sm:text-base">
            Page{" "}
            <strong>
              {currentPage} of {totalPages}
            </strong>
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="sm:w-auto px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 hover:bg-gray-400 transition-colors duration-300"
          >
            {"Next >"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
