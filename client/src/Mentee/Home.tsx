import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Dropdown from "../components/ui/Dropdown";
import BACKEND_URL from "../endpoint";
import Logo from '../assets/logo.png';
import { Bounce, toast } from "react-toastify";

const Home: React.FC = () => {
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("");
  const token = localStorage.getItem('userToken')??"";

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
        `${BACKEND_URL}/api/mentee/getMentors?domain=${domain}&page=${currentPage}`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
      if (!response.ok) {
        // throw new Error("Network response was not ok");
        toast.error("Network response was not ok",{
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        })
      }
      const data = await response.json();
      setMentors(data.mentors);
      setTotalPages(data.totalPages);
    } catch (error) {
      // console.error("Error fetching mentors:", error);
      toast.error(`${error}`,{
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })
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
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold mb-12">Choose your Domain to get Top Mentors</h1>

      <Dropdown
        options={options}
        onChange={(value) => {
          setSelectedDomain(value);
          setCurrentPage(1); // Reset to first page on new selection
        }}
      />
      <br />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mentors.map((mentor: any,idx:any) => (
            <Link
              key={idx}
              to={`/profile/${mentor.userId}`}
              style={{ textDecoration: "none" }}
            >
              <ProfileCard
                key={idx}
                name={`${mentor.user.firstName} ${mentor.user.lastName}`}
                imageUrl={
                  mentor.profilePicture || Logo
                }
                desc={mentor.bio || "No description available."}
              />
            </Link>
          ))
        }
      </div>

      <br />

      {/* Conditional Rendering of Pagination Controls */}
      {selectedDomain && totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
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
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {"Next >"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
