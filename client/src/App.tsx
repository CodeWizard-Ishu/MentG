import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import MentorDashboard from "./Mentor/MentorDashboard";
import MenteeDashboard from "./Mentee/MenteeDashboard";
import BookingPage from "./pages/BookingPage";
import CheckAvailability from "./pages/CheckAvailability";
import AboutUs from "./pages/AboutUs";
import SeeAll from "./pages/SeeAll";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import AllMentors from "./pages/AllMentors";
import ResetPasswordPage from "./pages/ResetPassword";
import BookingSuccessPage from "./pages/BookingSuccessful";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ProtectedBookingRoutes from "./pages/ProtectedBookingRoutes";

function App() {
  injectSpeedInsights();
  inject();

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });
  const [mentor, setMentor] = useState(() => {
    return localStorage.getItem("mentor") === "true";
  });

  const handleLogin = (
    token: string,
    isMentor: boolean,
    userId: string,
    firstName: string,
    lastName: string
  ) => {
    localStorage.setItem("userToken", `Bearer ${token}`);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("mentor", isMentor ? "true" : "false");
    localStorage.setItem("userId", userId);
    const capitalize = (string: string) => {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    localStorage.setItem("fullName", formattedName);
    setLoggedIn(true);
    setMentor(isMentor);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("mentor");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    setLoggedIn(false);
    setMentor(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUs loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/contact" element={<ContactUs loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/privacy" element={<PrivacyPolicy loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/pricing" element={<Pricing loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/all-mentors" element={<AllMentors loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/see-all/:domain" element={<SeeAll loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes allowedUserType="mentor" />}>
          <Route path="/dashboard" element={<MentorDashboard onLogout={handleLogout} />} />
        </Route>

        <Route element={<ProtectedRoutes allowedUserType="mentee" />}>
          <Route path="/dashboard/mentee" element={<MenteeDashboard onLogout={handleLogout} />} />
          {/* Booking Flow Routes */}
          <Route element={<ProtectedBookingRoutes requireService={true} />}>
            <Route path="/availability/:mentorId" element={<CheckAvailability />} />
          </Route>
          <Route element={<ProtectedBookingRoutes requireService={true} requireSlot={true} />}>
            <Route path="/booking/:mentorId" element={<BookingPage />} />
          </Route>
          <Route element={<ProtectedBookingRoutes requireService={true} requireSlot={true} />}>
            <Route path="/booking/successfull" element={<BookingSuccessPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowedUserType="both" />}>

        </Route>
      </Routes>
    </Router>

  );
}
export default App;
