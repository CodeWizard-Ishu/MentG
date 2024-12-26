import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ui/ProfileCard";
import Logo from '../assets/logo.png';

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const SeeAll: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  useEffect(() => {}, [loggedIn, mentor]);

  return (
    <div className="min-h-screen bg-sky-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
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

      <section>
        <div className="container mx-auto px-16 py-16 min-h-screen bg-sky-100">
          <h1 className="text-5xl font-bold underline">Technology:</h1>
          <div className="mt-24 mb-24">
            <div className="grid md:grid-cols-6 gap-8">
              <Link to={`/profile/1`} style={{ textDecoration: "none" }}>
                <ProfileCard
                  className="hover:scale-105 transition-all duration-300"
                  name="Utkarsh Jaiswal"
                  imageUrl="https://via.placeholder.com/150"
                  desc="Experience in field 1"
                />
              </Link>
              <Link to={`/profile/1`} style={{ textDecoration: "none" }}>
                <ProfileCard
                  className="hover:scale-105 transition-all duration-300"
                  name="Utkarsh Jaiswal"
                  imageUrl="https://via.placeholder.com/150"
                  desc="Experience in field 1"
                />
              </Link>
              <Link to={`/profile/1`} style={{ textDecoration: "none" }}>
                <ProfileCard
                  className="hover:scale-105 transition-all duration-300"
                  name="Utkarsh Jaiswal"
                  imageUrl="https://via.placeholder.com/150"
                  desc="Experience in field 1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeeAll;
