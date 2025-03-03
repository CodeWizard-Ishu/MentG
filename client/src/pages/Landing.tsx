import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import jobImage from "../assets/job-image.jpg";
import defaultImage from "../assets/defautProfilePic.jpg";
import {
  Building2,
  Users,
  ChevronRight,
  CheckCircle,
  Search,
  ArrowRight,
  TabletSmartphone,
} from "lucide-react";
import ProfileCard from "../components/ui/ProfileCard";
import Footer from "../components/Footer";
import LandingSkeleton from "../components/ui/Skeletons/LandingSkeleton";

interface LandingPageProps {
  loggedIn: boolean;
  mentor: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn, mentor }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Technology");
  const [mentorsData, setMentorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const capitalize = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  useEffect(() => {}, [loggedIn, mentor]);

  useEffect(() => {
    fetchTopMentors([category]); // Call with an array containing the selected category
  }, [category]);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategory(e.currentTarget.innerText);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchTopMentors = async (selectedDomainNames: any) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/topMentors?domainNames=${selectedDomainNames.join(
          ","
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sortedMentors = data[0].mentors.sort((a: any, b: any) => {
        const aHasPicture = a.profilePicture !== null;
        const bHasPicture = b.profilePicture !== null;
        return aHasPicture === bHasPicture ? 0 : aHasPicture ? -1 : 1;
      });

      if (Array.isArray(data) && data.length > 0 && data[0].mentors) {
        setMentorsData(sortedMentors);
        // setMentorsData(data[0].mentors); // Set mentors if available
      } else {
        setMentorsData([]);
      }
    } catch (error) {
      console.error("Error fetching top mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const expertCategories = [
    "Technology",
    "Business",
    "Career",
    "Marketing",
    "Finance",
    "Engineering",
    "Mental Fitness",
    "Fintech",
    "Operations",
    "Compliance",
    "Legal",
    "Tax",
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
      icon: <TabletSmartphone size={32} className="text-purple-500" />,
      title: "Multi-Platform Access",
      description:
        "Accessible on mobile or any device to ensure seamless connectivity wherever you are",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
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
              <Link to="/dashboard">
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

      <div className="container mx-auto px-4">
        <main className="container mx-auto px-4 pt-8 sm:pt-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Connect with Top
            <span className="text-[#08286b]"> Professionals</span> Instantly
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
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
                className="ml-2 bg-[#08286b] text-white px-4 py-3 rounded-lg hover:bg-[#08276bcc] transition"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex justify-center space-x-4">
            <a href="/all-mentors">
              <button className="bg-[#08286b] text-white px-6 py-3 rounded-lg hover:bg-[#08276bcc] transition">
                All Mentors
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
                className="text-black px-3 py-1 rounded-full text-sm bg-white hover:bg-gray-400 cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </main>

        <section className="container mx-auto px-4 sm:px-16 py-8">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-xl sm:text-2xl font-semibold">
                {category}
              </span>
              <a
                href={`/see-all/${category}`}
                className="flex items-center text-xl px-4 underline"
              >
                See all {<ArrowRight />}
              </a>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
              <div className="flex grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4">
                  {mentorsData.length === 0 && loading ? <LandingSkeleton/> : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    mentorsData.map((mentor: any) => (
                      <div key={mentor.id} className="w-40 sm:w-48 md:w-44">
                        <Link
                          to={`/profile/${mentor.userId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ProfileCard
                            key={mentor.id}
                            name={`${capitalize(mentor.firstName)} ${capitalize(mentor.lastName)}`}
                            imageUrl={mentor.profilePicture || defaultImage}
                            desc={mentor.bio || "No bio available."}
                          />
                        </Link>
                      </div>
                    )))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-sky-300 py-16 rounded-2xl">
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
                    <CheckCircle className="text-[#08286b]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src={jobImage}
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
        <section className="container mx-auto px-4 py-8 sm:py-16 text-center">
          <div className="bg-sky-300 text-white py-8 sm:py-16 rounded-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black px-4">
              Start Your Professional Journey
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-black px-4">
              Discover opportunities, gain insights, and accelerate your growth
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/signup">
                <button className="bg-[#08286b] text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition flex items-center">
                  Get Started <ChevronRight className="ml-2" />
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
