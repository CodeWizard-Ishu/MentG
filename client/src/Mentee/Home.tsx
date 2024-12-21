import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ui/ProfileCard";
import Dropdown from "../components/ui/Dropdown";
import BACKEND_URL from "../endpoint";

const Home: React.FC = () => {
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("");

  // Define dropdown options without content property
  const options = [
    { label: "Technology", value: "Technology" },
    { label: "Business", value: "Business" },
    { label: "Career", value: "Career" },
    { label: "Marketing", value: "Marketing" },
    { label: "Finance", value: "Finance" },
    { label: "Health", value: "Health" },
    { label: "Engineering", value: "Engineering" },
    { label: "Medical", value: "Medical" },
    { label: "Mental Fitness", value: "Mental Fitness" },
  ];

  const fetchMentors = async (domain: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentee/getMentors?domain=${domain}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMentors(data.mentors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    if (selectedDomain) {
      fetchMentors(selectedDomain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain, currentPage]);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold mb-12">Choose your Domain</h1>

      <Dropdown
        options={options}
        onChange={(value) => {
          setSelectedDomain(value);
          setCurrentPage(1); // Reset to first page on new selection
        }}
      />
      <br/>
      <div className="grid md:grid-cols-5 gap-8">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mentors.map((mentor: any) => (
            <ProfileCard
              key={mentor.id} // Use mentor ID as key
              name={`${mentor.user.firstName} ${mentor.user.lastName}`}
              imageUrl={
                mentor.profilePicture || "https://i.ibb.co/tPzj54M/logo.png"
              }
              desc={mentor.bio || "No description available."}
            />
          ))
        }
      </div>
      <br/>
      <div className="pagination mt-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
