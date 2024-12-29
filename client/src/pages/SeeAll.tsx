import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import { Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";
import Logo from "../assets/logo.png";
import BACKEND_URL from "../endpoint";
import { Bounce, toast } from "react-toastify";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}


const SeeAll: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  const { domain } = useParams();
  const domainName: string = domain || 'Technology'; 
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
        })
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
      })
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
      <header className="sticky top-0 z-50 backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-12" />
            <span className="font-bold text-2xl">MentG</span>
          </a>
        </div>
        {!loggedIn ? (
          <div className="space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-black border rounded-lg hover:border-black transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700">
                Join Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/">
              <button
                onClick={onLogout}
                className="px-4 py-2 text-black border rounded-lg hover:border-black transition"
              >
                Logout
              </button>
            </Link>
            {mentor ? (
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/mentee">
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        )}
      </header>

      <section>
        <div className="container mx-auto px-16 py-16 min-h-screen bg-sky-100">
          <h1 className="text-5xl font-bold underline">{domain} :</h1>
          <div className="mt-24 mb-24">
            <div className="grid md:grid-cols-5 gap-8">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img
                  src="https://i.ibb.co/B4LTdRP/logo-light.png"
                  className="h-12 me-3"
                  alt="MentG Logo"
                />
                <span className="self-center text-3xl font-semibold whitespace-nowrap">
                  MentG
                </span>
              </a>
              <address className="flex justify-between text-gray-500 not-italic mt-9">
                <MapPin size={28} className="mt-2 mr-4 text-white" /> Navi
                Mumbai, Maharashtra
                <br />
                India
              </address>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-20 sm:grid-cols-2">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Company
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="/about" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Platform
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">
                      Pricing
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2024{" "}
              <a href="/" className="hover:underline">
                MentG™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-6">
              <a href="https://www.linkedin.com/company/mentg/">
                <Linkedin />
              </a>
              <a href="#">
                <Instagram />
              </a>
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SeeAll;
