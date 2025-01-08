import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, UserCheck, Users } from "lucide-react";
import aboutusImage from "../assets/aboutus-image.jpg";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}
import Logo from "../assets/logo.png";
import Vaishali from "../assets/Vaishali.jpg";
import Utkarsh from "../assets/Utkarsh.jpg";
import Kushagra from "../assets/Kushagra.jpg";
import Footer from "../components/Footer";

const AboutUs: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  useEffect(() => {}, [loggedIn, mentor]);

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

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:min-h-screen lg:pt-12">
        <div className="relative max-w-7xl mx-auto px-6 ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Navigating Success
                <span className="block text-[#08286b]">Together</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-800 mb-12 leading-relaxed">
                We connects individuals with experts for personalized guidance,
                fostering growth and success through mentorship.
              </p>
              <div className="flex gap-6">
                <a href="/signup">
                  <button className="px-8 py-4 bg-[#08286b] hover:bg-[#08276bcc] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#000000]/20">
                    Get Started
                  </button>
                </a>
                <a href="#features">
                  <button className="px-8 py-4 border border-gray-400 hover:border-black text-black rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square ">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={aboutusImage}
                    alt="Hero"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#4ECDC4]/40 text-[#190482] font-medium text-sm sm:text-base">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-4 sm:mt-6">
              What We Do Best
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Collaboration",
                icon: <Users className="w-6 h-6" />,
                color: "#FF6B6B",
                desc: "Empowering professional mentors to seamlessly connect and collaborate with mentees",
              },
              {
                title: "Ease Of Use",
                icon: <Sparkles className="w-6 h-6" />,
                color: "#4ECDC4",
                desc: "Built for simplicity and efficiency to ensure an intuitive experience for mentors and mentees",
              },
              {
                title: "User-Friendly Design",
                icon: <UserCheck className="w-6 h-6" />,
                color: "#2563eb",
                desc: "A clean, intuitive interface designed for professionals and users of all experience levels",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl h-full">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-r from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFD93D]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#4ECDC4]/40 text-[#190482] font-medium text-sm sm:text-base">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-4 sm:mt-6">
              Meet Our Experts
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8">
            {[
              { name: "Vaishali", role: "Founder", image: Vaishali },
              { name: "Utkarsh", role: "Technology", image: Utkarsh },
              { name: "Kushagra", role: "Technology", image: Kushagra },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg overflow-hidden w-40 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl  font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-900">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
