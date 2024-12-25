import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
} from "lucide-react";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const ContactUs: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
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

        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden m-12">
          <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
            <div className="text-center flex flex-col items-center justify-center">
              <img src="https://i.ibb.co/dk0VGk3/rb-12860.png "/>
            </div>

            <form className="mx-auto">
              <div className="mb-6">
                <h1 className="text-5xl font-semibold text-black capitalize">
                  Contact us
                </h1>

                <div className="mt-6 space-y-3 md:mt-8">
                  <p className="flex items-start mx-2">
                    <MapPin />
                    <span className="mx-2 text-gray-700 truncate w-72">
                      Navi Mumbai, Maharashtra, India
                    </span>
                  </p>

                  <p className="flex items-start mx-2">
                    <Mail />
                    <span className=" mx-2 text-gray-700 truncate w-72">
                      <a href="mailto:info@mentg.in">info@mentg.in</a> <br />
                      <a href="mailto:support@mentg.in">support@mentg.in</a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="max-w-md mx-auto space-y-3 relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-md outline-black focus-within:bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-md outline-black focus-within:bg-transparent"
                />
                <textarea
                  placeholder="Message"
                  className="w-full bg-gray-100 rounded-md px-4 text-md pt-3 outline-black focus-within:bg-transparent"
                  rows={6}
                ></textarea>

                <button
                  type="button"
                  className="text-white w-full relative bg-black hover:bg-gray-700 rounded-md text-md px-6 py-3 !mt-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#fff"
                    className="mr-2 inline"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clip-rule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  Send Message
                </button>
              </div>
            </form>
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
    </div>
  );
};

export default ContactUs;
