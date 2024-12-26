/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "../endpoint";
import {
  Building2,
  Users,
  Globe,
  ChevronRight,
  CheckCircle,
  Search,
  ArrowRight,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import ProfileCard from "../components/ui/ProfileCard";
import ScrollToTop from "../components/ui/ScrollToTop";

interface LandingPageProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  loggedIn,
  mentor,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Technology");
  const [mentorsData, setMentorsData] = useState([]);

  useEffect(() => {}, [loggedIn, mentor]);

  useEffect(() => {
    fetchTopMentors([category]); // Call with an array containing the selected category
  }, [category]);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategory(e.currentTarget.innerText);
  };

  const fetchTopMentors = async (selectedDomainNames: any) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/topMentors?domainNames=${selectedDomainNames.join(
          ","
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].mentors) {
        setMentorsData(data[0].mentors); // Set mentors if available
      } else {
        setMentorsData([]);
      }
    } catch (error) {
      console.error("Error fetching top mentors:", error);
    }
  };

  const expertCategories = [
    "Technology",
    "Business",
    "Career",
    "Marketing",
    "Finance",
    "Health",
    "Engineering",
    "Medical",
    "Mental Fitness",
  ];

  const features = [
    {
      icon: <Building2 size={32} className="text-blue-500" />,
      title: "Professional Network",
      description: "Connect with experts across industries",
    },
    {
      icon: <Users size={32} className="text-green-500" />,
      title: "Direct Consultations",
      description: "Book 1:1 sessions with top professionals",
    },
    {
      icon: <Globe size={32} className="text-purple-500" />,
      title: "Global Reach",
      description: "Access talent from anywhere in the world",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
  };

  return (
    <div className="min-h-screen bg-sky-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src="https://i.ibb.co/tPzj54M/logo.png"
              alt="Logo"
              className="h-12 w-12"
            />
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

      <div className="container mx-auto px-4">
        <main className="container mx-auto px-4 pt-16 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Connect with Top
            <span className="text-yellow-700"> Professionals</span> Instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Book personalized consultation sessions with experts from tech,
            business, creative fields, and more.
          </p>

          {/* Search Section */}
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mb-8 relative"
          >
            <div className="flex items-center">
              <Search className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Find experts by name, category, or skill"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="ml-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex justify-center space-x-4">
            <a href="/all-mentors">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Start Exploring
              </button>
            </a>
            <a href="#benefits">
              <button className="border border-gray-400 text-black px-6 py-3 rounded-lg hover:border-black transition">
                Learn More
              </button>
            </a>
          </div>

          {/* Quick Category Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {expertCategories.map((category) => (
              <span
                onClick={handleCategory}
                key={category}
                className="text-black px-3 py-1 rounded-full text-sm hover: bg-gray-300 cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </main>

        <section className="container mx-auto px-16 py-8">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold">{category}</span>
              <a
                href={`/see-all/${category}`}
                className="flex items-center text-xl px-4 underline"
              >
                See all {<ArrowRight />}
              </a>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              {mentorsData.length > 0 &&
                mentorsData.map((mentor: any) => (
                  <Link
                    to={`/profile/${mentor.userId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProfileCard
                      key={mentor.id}
                      name={`${mentor.user.firstName} ${mentor.user.lastName}`}
                      imageUrl={
                        mentor.profilePicture ||
                        "https://via.placeholder.com/150"
                      }
                      desc={mentor.bio || "No bio available."}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-sky-200 py-16 rounded-2xl">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Our Platform
              </h2>
              <ul className="space-y-4">
                {[
                  "Verified Expert Profiles",
                  "Flexible Scheduling",
                  "Secure Payment System",
                  "Transparent Pricing",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://img.freepik.com/free-vector/internship-job-illustration_52683-50829.jpg?t=st=1733331624~exp=1733335224~hmac=e3e9781622115c757183070a44cfee180c65ac111ac0ede0c3936c10971610df&w=900"
                alt="Platform Benefits"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
          <div className="container mx-auto px-4 pt-16">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="bg-sky-200 text-white py-16 rounded-2xl">
            <h2 className="text-4xl font-bold mb-6 text-black">
              Start Your Professional Journey
            </h2>
            <p className="text-xl mb-8 text-black">
              Discover opportunities, gain insights, and accelerate your growth
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#">
                <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition flex items-center">
                  Get Started <ChevronRight className="ml-2" />
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>

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
                <MapPin size={28} className="mt-2 mr-4 text-white" /> Navi Mumbai, Maharashtra
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
                    <a href="/privacy" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/terms" className="hover:underline">
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

      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
