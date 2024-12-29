import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

interface LoginPageProps {
  onLogin?: (
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
      // console.log(data);
      onLogin(
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

  return (
    <div className="min-h-screen bg-sky-100">
      {/* Header */}
      <header className="shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <a href="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-12 w-12" />
              <span className="font-bold text-2xl">MentG</span>
            </a>
          </div>
          <nav>
            <Link to="/signup">
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700">
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
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
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
