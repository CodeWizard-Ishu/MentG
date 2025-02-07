import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { CheckAuth } from "./CheckAuth";

interface PrivateRouteProps {
  allowedUserType?: "mentor" | "mentee" | "both";
  onLogout: () => void;
}

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({
  allowedUserType,
  onLogout,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      const auth = CheckAuth({ onLogout, navigate });
      auth.checkAuthStatus().then(isValid => {
        setIsAuthenticated(isValid);
      });
    } else {
      setIsAuthenticated(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null) {
    return <Spinner/>;
  }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  // Check user type
  const isMentor = localStorage.getItem("mentor") === "true";

  // Determine if the current user is allowed based on the route's requirements
  const isAllowed = () => {
    if (!isLoggedIn) return false;

    switch (allowedUserType) {
      case "mentor":
        return isMentor === true;
      case "mentee":
        return isMentor === false;
      case "both":
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
