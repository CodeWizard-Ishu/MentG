import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/Animation - 1737831742616.json";
import { Link, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import useBookingStore from "../Hooks/useBookingStore";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Bounce, toast } from 'react-toastify';
import BACKEND_URL from "../endpoint";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Spinner from "../components/ui/Spinner";

interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required")
    .trim(),
  message: Yup.string()
    .min(10, "Message is too short")
    .required("Message is required"),
});

const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const isBookingSuccessful = location.state?.bookingSuccess === true;
  const { clearBooking } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values: FeedbackFormValues, { setSubmitting, resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Thank you for your feedback!", {
            position: "bottom-right",
            pauseOnHover: false,
            transition: Bounce,
          });
          resetForm();
        } else {
          throw new Error("Something went wrong!")
        }
      } catch (error) {
        toast.error(`Failed to send feedback : ${error}`, {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
      } finally {
        setSubmitting(false);
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isBookingSuccessful) {
      localStorage.setItem("bookingComplete", "true");
      setTimeout(() => {
        localStorage.removeItem("bookingComplete");
        clearBooking();
      }, 20000);
    }
  }, [clearBooking, isBookingSuccessful]);

  if (!isBookingSuccessful) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-sky-200">
      <Header />
      <div className="min-h-screen bg-sky-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl overflow-hidden">
          <div className="flex flex-col md:flex-row">            
            <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex justify-center mb-6">
                <Lottie
                  animationData={successAnimation}
                  loop={true}
                  className="w-48 h-48 md:w-64 md:h-64"
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#08286b] mb-4">
                Booking Successful!
              </h1>

              <p className="text-gray-600 text-base sm:text-lg mb-6">
                Your booking is successfully created🎉. <br />
                An email has been sent to your email address with all details.
              </p>

              <Link
                to="/"
                rel="noopener noreferrer"
                className="inline-block bg-[#08286b] hover:bg-[#08276bcc] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out mt-4"
              >
                Go to Home Page
              </Link>
            </div>
            
            <div className="w-full md:w-1/2 p-8 my-0 sm:my-24">
              <h2 className="text-xl font-semibold text-[#08286b] mb-6 text-center">Share Your Feedback</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    {...formik.getFieldProps('name')}
                    className={`${
                      formik.touched.name && formik.errors.name
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    {...formik.getFieldProps('email')}
                    className={`${
                      formik.touched.email && formik.errors.email
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    id="message"
                    rows={8}
                    placeholder="Please share your experience with our booking process..."
                    {...formik.getFieldProps('message')}
                    className={`${
                      formik.touched.message && formik.errors.message
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#08286b] hover:bg-[#08276bcc] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;