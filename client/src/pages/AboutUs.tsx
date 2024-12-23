import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Zap,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Earth,
} from "lucide-react";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  useEffect(() => {}, [loggedIn, mentor]);

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

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4ECDC4]/5 to-transparent" />
        <div className="absolute top-9 right-10 w-64 h-64 rounded-full bg-[#FFD93D]/20" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-[#FF6B6B]/20" />

        <div className="relative max-w-7xl mx-auto px-6 ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-bold text-gray-800 mb-8">
                Navigating Success
                <span className="block text-yellow-700">Together</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We connects individuals with experts for personalized guidance,
                fostering growth and success through mentorship.
              </p>
              <div className="flex gap-6">
                <a href="/">
                  <button className="px-8 py-4 bg-[#000000] text-white rounded-xl font-medium hover:scale-105 transition-transform shadow-lg shadow-[#FF6B6B]/20">
                    Get Started
                  </button>
                </a>
                <a href="#features">
                  <button className="px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-xl font-medium hover:scale-105 transition-transform">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square ">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="https://img.freepik.com/free-vector/live-collaboration-concept-illustration_114360-2514.jpg?t=st=1734991581~exp=1734995181~hmac=c120babef40c8065518d7ea24cba074179e85373f6c0f8be315d3fa3cf62a515&w=996"
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
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="px-6 py-2 rounded-full bg-[#4ECDC4]/40 text-[#190482] font-medium">
              Our Services
            </span>
            <h2 className="text-5xl font-bold text-gray-800 mt-6">
              What We Do Best
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Collaboration",
                icon: <Zap className="w-6 h-6" />,
                color: "#FF6B6B",
                desc: "Empowering professionals to seamlessly connect and collaborate with mentees",
              },
              {
                title: "Ease Of Use",
                icon: <Star className="w-6 h-6" />,
                color: "#4ECDC4",
                desc: "Built for simplicity and efficiency to ensure an intuitive experience for mentors and mentees",
              },
              {
                title: "Global Reach",
                icon: <Earth className="w-6 h-6" />,
                color: "#2563eb",
                desc: "Connecting mentees with mentors worldwide through a secure and intuitive platform.",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFD93D]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="px-6 py-2 rounded-full bg-[#4ECDC4]/40 text-[#190482] font-medium">
              Our Team
            </span>
            <h2 className="text-5xl font-bold text-gray-800 mt-6">
              Meet Our Experts
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative mb-8">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://i.ibb.co/r5ypWGw/Whats-App-Image-2024-12-24-at-05-03-53-e6f0e3d0.jpg"
                    alt="Dheeraj Jaiswal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Dheeraj Jaiswal
              </h3>
              <p className="text-blue-900">CEO & Founder</p>
            </div>
            <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative mb-8">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://i.ibb.co/nRzKCPY/Whats-App-Image-2024-12-24-at-05-06-40-bc6a15da.jpg"
                    alt="Vaishali Jaiswal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Vaishali Jaiswal
              </h3>
              <p className="text-blue-900">Co-Founder</p>
            </div>
            <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative mb-8">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://i.ibb.co/34WZtv2/Utkarsh.jpg"
                    alt="Utkarsh Jaiswal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Utkarsh Jaiswal
              </h3>
              <p className="text-blue-900">Tech</p>
            </div>
            <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative mb-8">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://i.ibb.co/zVQ0xBH/Whats-App-Image-2024-12-24-at-05-00-13-b22ba564.jpg"
                    alt="Kushgra Shukla"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Kushgra Shukla
              </h3>
              <p className="text-blue-900">Tech</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
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
              <address className="text-gray-500 not-italic mt-9">
                <MapPin size={28} className="mb-2" /> Navi Mumbai, Maharashtra
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
                    <a href="#" className="hover:underline">
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
              <a href="#">
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

export default AboutUs;
