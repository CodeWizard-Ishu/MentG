import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useBookingStore from '../Hooks/useBookingStore';

interface ProtectedBookingRoutesProps {
  requireService?: boolean;
  requireSlot?: boolean;
}

const ProtectedBookingRoutes: React.FC<ProtectedBookingRoutesProps> = ({
  requireService = false,
  requireSlot = false,
}) => {
  const location = useLocation();
  const { selectedService, selectedSlot, clearBooking } = useBookingStore();
  
  // Get booking completion status from session storage
  const isBookingComplete = sessionStorage.getItem('bookingComplete') === 'true';
  
  // Clear booking state and session storage if booking is complete
  useEffect(() => {
    if (isBookingComplete) {
      clearBooking();
      // Clear the booking completion status after a delay
      const timeoutId = setTimeout(() => {
        sessionStorage.removeItem('bookingComplete');
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isBookingComplete, clearBooking]);

  // Function to check if the current route is allowed based on booking state
  const isAllowed = () => {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const isMentor = sessionStorage.getItem('mentor') === 'true';
    
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
    if (location.pathname.includes('/booking/successfull')) {
      return <Navigate to="/" replace />;
    }
    
    // For other booking routes, redirect to profile page if no service selected
    const mentorId = location.pathname.split('/')[2];
    return <Navigate to={`/profile/${mentorId}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedBookingRoutes;