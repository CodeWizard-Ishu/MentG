import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";

interface SignupPageProps {
  onSignup?: (
    token: string,
    isMentor: boolean,
    isActive: boolean,
    userId: string,
    firstName: string,
    lastName: string
  ) => void;
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
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required")
    .trim(),

  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required")
    .trim(),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 50 characters")
    .required("Password is required"),
});

const SignupPage: React.FC<SignupPageProps> = ({ onSignup = () => {} }) => {
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

  useEffect(() => {
      if (localStorage.getItem("loggedIn") === "true") {
        navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const handleSubmit = async (
    values: SignupFormValues,
    isMentor: boolean,
  ) => {

    if (!acceptTerms) {
      toast.error("Please accept the terms and privacy policy",{
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    const setLoading = isMentor ? setLoadingMentor : setLoadingMentee;
    setLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/auth/signup/${isMentor ? "mentor" : "mentee"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim().toLowerCase(),
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong!", {
          pauseOnHover: false,
        draggable: true,
        });
        return;
      }

      const data = await response.json();
      onSignup(
        data.token,
        data.user.isMentor,
        data.user.isActive,
        data.user.id,
        data.user.firstName,
        data.user.lastName
      )

      if (data.user.isMentor) {
        navigate("/onboarding/services");
      } else {
        navigate("/dashboard/mentee/");
      }
    } catch (error) {
      toast.error(`Network error: ${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setLoading(false);
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
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values, touched, errors }) => (
              <Form className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex flex-row gap-4 sm:space-x-4">
                  <div className="relative w-full sm:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="text-sm mb-1 ml-1 font-semibold"
                    >
                      First Name *
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base ${
                        touched.firstName && errors.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative w-full sm:w-1/2">
                    <label
                      htmlFor="lastName"
                      className="text-sm mb-1 ml-1 font-semibold"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base ${
                        touched.lastName && errors.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="text-sm mb-1 ml-1 font-semibold"
                  >
                    Email *
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="text-sm mb-1 ml-1 font-semibold"
                  >
                    Password *
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-start sm:items-center space-x-2 px-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm sm:text-base text-gray-600"
                  >
                    I accept the{" "}
                    <a href="/privacy" className="underline">
                      terms & privacy policy
                    </a>{" "}
                    of MentG *
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => handleSubmit(values, false)}
                    disabled={loadingMentee}
                    className="w-full bg-[#08286b] text-white py-3 rounded-lg hover:bg-[#08276bcc] transition-colors font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMentee ? <Spinner /> : "Join as Mentee"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit(values, true)}
                    disabled={loadingMentor}
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
              Already have an account?{" "}
              <Link to="/login">
                <button
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
