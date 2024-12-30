import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";

interface PrivacyPolicyProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  loggedIn,
  mentor,
  onLogout,
}) => {
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

      <div className="min-h-72 max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden m-4 md:m-8 lg:m-12">
        <div className="m-3 md:m-4 lg:m-5">
          <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-bold">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
