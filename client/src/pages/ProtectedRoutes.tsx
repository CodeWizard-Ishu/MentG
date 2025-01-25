import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedUserType?: 'mentor' | 'mentee' | 'both';
}

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({ allowedUserType }) => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
  
  // Check user type
  const isMentor = sessionStorage.getItem('mentor') === 'true';

  // Determine if the current user is allowed based on the route's requirements
  const isAllowed = () => {
    if (!isLoggedIn) return false;

    switch (allowedUserType) {
      case 'mentor':
        return isMentor === true;
      case 'mentee':
        return isMentor === false;
      case 'both':
      default:
        return true;
    }
  };

  // If not logged in or not allowed, redirect to login
  if (!isAllowed()) {
    return <Navigate to="/login" replace />;
  }

  // If allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoutes;