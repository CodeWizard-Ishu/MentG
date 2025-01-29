import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, PhoneCall } from "lucide-react";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";
import contactImage from "../assets/contact-bg-image.png";

interface AboutUsProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const ContactUs: React.FC<AboutUsProps> = ({ loggedIn, mentor, onLogout }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loggedIn, mentor]);

  const handleSubmit = () => {
    // submit implementation here...
    toast.success("Your Mesaage has been sent Successfully!", {
      position: "bottom-right",
      pauseOnHover: false,
      transition: Bounce,
    });
    setLoading(false);
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

      <div className="flex-grow px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
            <div className="text-center flex flex-col items-center justify-center">
              <img src={contactImage} />
            </div>

            <form className="mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black capitalize mb-4">
                  Contact us
                </h1>

                <div className="space-y-3 md:space-y-4">
                  <p className="flex items-start mx-2">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="mx-2 text-sm sm:text-base text-gray-700 truncate w-72">
                      Mumbai, India
                    </span>
                  </p>

                  <p className="flex items-start mx-2">
                    <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="ml-2 text-sm sm:text-base text-gray-700 truncate">
                      +91-2231514516
                    </span>
                  </p>

                  <p className="flex items-start mx-2">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className=" mx-2 text-sm sm:text-base text-gray-700 truncate w-72">
                      <a href="mailto:info@mentg.in">info@mentg.in</a> <br />
                      <a href="mailto:support@mentg.in">support@mentg.in</a>
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full bg-gray-100 rounded-md py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-gray-100 rounded-md py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors"
                />
                <textarea
                  placeholder="Message"
                  required
                  className="w-full bg-gray-100 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors"
                  rows={6}
                ></textarea>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-white w-full bg-black hover:bg-gray-700 rounded-md text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#fff"
                    className="mr-2"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fillRule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  {loading ? <Spinner /> : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
