import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/Animation - 1737831742616.json";
import { Link, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import useBookingStore from "../Hooks/useBookingStore";

const BookingSuccessPage: React.FC = () => {
  const [countdown, setCountdown] = useState(20);
  const location = useLocation();
  const isBookingSuccessful = location.state?.bookingSuccess === true;
  const { clearBooking } = useBookingStore();

  useEffect(() => {
    if (isBookingSuccessful) {
      localStorage.setItem("bookingComplete", "true");
      setTimeout(() => {
        localStorage.removeItem("bookingComplete");
        clearBooking();
      }, 20000);
    }
  }, [clearBooking, isBookingSuccessful]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // If no booking success state, redirect to home
  if (!isBookingSuccessful) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-sky-200">
      
      <Header />

      <div className="min-h-screen bg-sky-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center max-w-md w-full">
          <div className="flex justify-center mb-6">
            <Lottie
              animationData={successAnimation}
              loop={true}
              className="w-64 h-64"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#08286b] mb-4">
            Booking Successful!
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mb-6">
            Your booking is successfully created🎉. <br />
            An email has been sent to your email address with all details.
            <br /> <br /> You can now proceed to the Home Page or you will
            redirected to Home Page in <span className="font-semibold">{countdown} second{countdown !== 1 ? 's' : ''}</span>.
          </p>

          <Link
            to="/"
            rel="noopener noreferrer"
            className="inline-block bg-[#08286b] hover:bg-[#08276bcc] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
