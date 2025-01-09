import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../assets/logo.png";
import contactImage from "../assets/pricing-image.jpg";

interface PricingProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const Pricing: React.FC<PricingProps> = ({ loggedIn, mentor, onLogout }) => {
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

      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
            <div className="text-center flex flex-col items-center justify-center">
              <img src={contactImage} />
            </div>
            <div className="flex items-center justify-center">
              <h2 className="text-3xl sm:text-5xl text-center text-gray-900 font-bold">
                Currently all the features of website are free of cost... <br />{" "}
                <br />
                Grab the Opportunity!
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
