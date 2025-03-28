import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface LoginPageProps {
  onLogin?: (
    token: string,
    isMentor: boolean,
    isActive: boolean,
    userId: string,
    firstName: string,
    lastName: string
  ) => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage: React.FC<LoginPageProps> = ({ onLogin = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong!", {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      const data = await response.json();
      onLogin(
        data.token,
        data.user.isMentor,
        data.user.isActive,
        data.user.id,
        data.user.firstName,
        data.user.lastName
      );
      toast.success("Login Successful!", {
        pauseOnHover: false,
        draggable: true,
      });

      navigate(data.user.isMentor ? "/dashboard/" : "/dashboard/mentee/");
    } catch (error) {
      toast.error(`Network Error: ${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignup = () => {
  //   // Implement Google signup logic
  //   console.log("Google Signup");
  // };

  // const handleLinkedInSignup = () => {
  //   // Implement LinkedIn signup logic
  //   console.log("LinkedIn Signup");
  // };

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-72px)] py-8 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">
              Login to continue
            </p>
          </div>

          {/* Social Signup Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 mb-6">
            <button
              onClick={handleGoogleSignup}
              disabled
              className="flex-1 flex items-center justify-center bg-white border border-gray-300 py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6"
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
              disabled
              className="flex-1 flex items-center justify-center bg-white border border-gray-300 py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  fill="#0A66C2"
                  d="M20.47 2H3.53A1.45 1.45 0 002 3.47v17A1.45 1.45 0 003.53 22h16.94A1.45 1.45 0 0022 20.53V3.47A1.45 1.45 0 0020.47 2zM8.4 19H5.2V9.8h3.2zm-1.6-10a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm11.2 10h-3.2v-5.2c0-1.6-.6-2.4-1.8-2.4-1.3 0-2 .9-2 2.4v5.2H8.4V9.8h3v1.4c.4-.6 1.2-1.4 2.6-1.4 2 0 3.6 1.2 3.6 4v5.2z"
                />
              </svg>
              <span className="ml-2">LinkedIn</span>
            </button>
          </div> */}

          {/* Divider */}
          {/* <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-gray-500 text-xs sm:text-sm">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="text-sm mb-1 ml-1 font-semibold">Email</div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="relative">
                  <div className="text-sm mb-1 ml-1 font-semibold">
                    Password
                  </div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-xs sm:text-sm text-gray-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#08286b] text-white py-3 rounded-lg hover:bg-[#08276bcc] transition-colors font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Spinner /> : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-600">
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
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
