import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useBookingStore from "../Hooks/useBookingStore";
import Spinner from "../components/ui/Spinner";
import { CheckAuth } from "./CheckAuth";

interface ProtectedBookingRoutesProps {
  requireService?: boolean;
  requireSlot?: boolean;
  onLogout: () => void;
}

const ProtectedBookingRoutes: React.FC<ProtectedBookingRoutesProps> = ({
  requireService = false,
  requireSlot = false,
  onLogout,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedService, selectedSlot } = useBookingStore();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      const auth = CheckAuth({ onLogout, navigate });
      auth.checkAuthStatus().then((isValid) => {
        setIsAuthenticated(isValid);
      });
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null) {
    return <Spinner clasName="min-h-screen content-center" />;
  }

  // Get booking completion status from session storage
  const isBookingComplete = localStorage.getItem("bookingComplete") === "true";

  // Function to check if the current route is allowed based on booking state
  const isAllowed = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const isMentor = localStorage.getItem("mentor") === "true";

    // Only mentees can access booking routes
    if (!isLoggedIn || isMentor) {
      return false;
    }

    // If booking is complete, don't allow access to booking routes
    if (isBookingComplete) {
      return false;
    }

    // Check if service selection is required and exists
    if (requireService && !selectedService) {
      return false;
    }

    // Check if slot selection is required and exists
    if (requireSlot && !selectedSlot) {
      return false;
    }

    return true;
  };

  if (!isAllowed()) {
    // If booking is complete, redirect to mentee dashboard
    if (isBookingComplete) {
      return <Navigate to="/dashboard/mentee" replace />;
    }

    // If accessing success page without completing booking, redirect to home
    if (location.pathname.includes("/booking/successfull")) {
      return <Navigate to="/" replace />;
    }

    // For other booking routes, redirect to profile page if no service selected
    const mentorId = location.pathname.split("/")[2];
    return <Navigate to={`/profile/${mentorId}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedBookingRoutes;
