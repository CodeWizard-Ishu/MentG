import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

interface LoginPageProps {
  onLogin?: (
    email: string,
    token: string,
    isMentor: boolean,
    userId: string,
    firstName: string,
    lastName: string
  ) => void;
  onSignupClick?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      onLogin(
        data.user.email,
        data.token,
        data.user.isMentor,
        data.user.id,
        data.user.firstName,
        data.user.lastName
      );

      if (response.ok) {
        toast.success("Login Successful!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
      }
      if (data.user.isMentor) navigate("/dashboard");
      else navigate("/dashboard/mentee");
    } catch (error) {
      console.error(error);
      toast.error("Bad Credentials!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google signup logic
    console.log("Google Signup");
  };

  const handleLinkedInSignup = () => {
    // Implement LinkedIn signup logic
    console.log("LinkedIn Signup");
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
            <Link to="/signup">
              <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-sm md:text-base lg:text-base text-black rounded-md hover:bg-gray-300 transition-colors">
                Join Now
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Form */}
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-72px)]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Login to continue</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleGoogleSignup}
              className="flex-1 flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.75c-.99.67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C4 20.2 7.73 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.46 2.09 14.97 1 12 1 7.73 1 4 3.81 2.18 7.07l3.66 2.84c.86-2.59 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={handleLinkedInSignup}
              className="flex-1 flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0A66C2"
                  d="M20.47 2H3.53A1.45 1.45 0 002 3.47v17A1.45 1.45 0 003.53 22h16.94A1.45 1.45 0 0022 20.53V3.47A1.45 1.45 0 0020.47 2zM8.4 19H5.2V9.8h3.2zm-1.6-10a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm11.2 10h-3.2v-5.2c0-1.6-.6-2.4-1.8-2.4-1.3 0-2 .9-2 2.4v5.2H8.4V9.8h3v1.4c.4-.6 1.2-1.4 2.6-1.4 2 0 3.6 1.2 3.6 4v5.2z"
                />
              </svg>
              <span className="ml-2">LinkedIn</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#08286b] text-white py-3 rounded-lg hover:bg-[#08276bcc] transition-colors font-semibold"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link to="/signup">
                <button className="text-black hover:underline ml-1 font-semibold">
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
