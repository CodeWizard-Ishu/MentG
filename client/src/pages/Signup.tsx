import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

interface SignupPageProps {
  onLoginClick?: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onLoginClick = () => {} }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingMentor, setLoadingMentor] = useState(false);
  const [loadingMentee, setLoadingMentee] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleJoinAsMentee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the terms and privacy policy", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      return;
    }
    setLoadingMentee(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup/mentee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.status === 400) {
        toast.error("Something went wrong!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        setLoadingMentee(false);
      }

      if (response.ok) {
        toast.success("SignUp Successful!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setLoadingMentee(false);
    }
  };

  const handleJoinAsMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the terms and privacy policy", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      return;
    }
    setLoadingMentor(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup/mentor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.status === 400) {
        toast.error("Something went wrong!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        setLoadingMentor(false);
      }

      if (response.ok) {
        toast.success("SignUp Successful!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setLoadingMentor(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#08286b] p-3 md:p-4 lg:p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <a href="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
              />
            </a>
          </div>
          <nav>
            <Link to="/login">
              <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-sm md:text-base lg:text-base text-black rounded-md hover:bg-gray-300 transition-colors">
                Login
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Signup Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-72px)] py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Create Account
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 sm:mt-3">
              Start your journey
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex flex-row gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  required
                />
              </div>
              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                required
              />
            </div>

            {/* Terms and Privacy Policy Checkbox */}
            <div className="flex items-start sm:items-center space-x-2 px-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm sm:text-base text-gray-600"
              >
                I accept the{" "}
                <a href="/privacy" className="underline">
                  terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline">
                  privacy policy
                </a>{" "}
                of MentG
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
              <button
                type="submit"
                onClick={handleJoinAsMentee}
                className="w-full bg-[#08286b] text-white py-3 rounded-lg hover:bg-[#08276bcc] transition-colors font-semibold text-sm sm:text-base"
              >
                {loadingMentee ? <Spinner /> : "Join as Mentee"}
              </button>
              <button
                type="submit"
                onClick={handleJoinAsMentor}
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-sm sm:text-base"
              >
                {loadingMentor ? <Spinner /> : "Join as Mentor"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?
              <Link to="/login">
                <button
                  onClick={onLoginClick}
                  className="text-black hover:underline ml-1 font-semibold"
                >
                  Login
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
