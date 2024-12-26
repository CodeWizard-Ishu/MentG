import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Twitter, MapPin } from "lucide-react";

interface TermsOfServiceProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  loggedIn,
  mentor,
  onLogout,
}) => {
  useEffect(() => {}, [loggedIn, mentor]);

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="">
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

        <div className="max-w-7xl min-h-96 mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden m-12">
          <div className="m-5">
            <h1 className="text-center text-6xl font-bold">Terms Of Service</h1>
          </div>
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
                      <a href="contact" className="hover:underline">
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
    </div>
  );
};

export default TermsOfService;
