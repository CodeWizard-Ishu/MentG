import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";
import { isValid } from "date-fns";

interface SignupPageProps {
  onLoginClick?: () => void;
}

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces")
    .required("First name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignupPage: React.FC<SignupPageProps> = ({ onLoginClick = () => {} }) => {
  const [loadingMentor, setLoadingMentor] = useState(false);
  const [loadingMentee, setLoadingMentee] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const initialValues: SignupFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleJoinAsMentee = async (values: SignupFormValues) => {
    if (!isValid) {
      toast.error("Please fill all details!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      return;
    }
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
        body: JSON.stringify(values),
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

  const handleJoinAsMentor = async (values: SignupFormValues) => {
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
        body: JSON.stringify(values),
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {}}
          >
            {({ values }) => (
              <Form className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex flex-row gap-4 sm:space-x-4">
                  <div className="relative w-full sm:w-1/2">
                    <div className="text-sm mb-1 ml-1 font-semibold">
                      First Name
                    </div>
                    <Field
                      type="text"
                      name="firstName"
                      required
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative w-full sm:w-1/2">
                    <div className="text-sm mb-1 ml-1 font-semibold">
                      Last Name
                    </div>
                    <Field
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="text-sm mb-1 ml-1 font-semibold">Email</div>
                  <Field
                    type="email"
                    name="email"
                    required
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
                    required
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
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
                      terms & privacy policy
                    </a>{" "}
                    of MentG
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => handleJoinAsMentee(values)}
                    className="w-full bg-[#08286b] text-white py-3 rounded-lg hover:bg-[#08276bcc] transition-colors font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMentee ? <Spinner /> : "Join as Mentee"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJoinAsMentor(values)}
                    className="w-full bg-white text-[#08286b] py-3 rounded-lg hover:bg-[#08276b2b] border-2 border-[#08286b] transition-colors font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMentor ? <Spinner /> : "Join as Mentor"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

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
