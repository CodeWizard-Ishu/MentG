import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import TermsOfService from "./pages/TermsOfService";

function App() {
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
        <Route
          path="/"
          element={
            <Landing
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={<MentorDashboard onLogout={handleLogout} />}
        />
        <Route
          path="/dashboard/mentee"
          element={<MenteeDashboard onLogout={handleLogout} />}
        />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route
          path="/see-all/:domain"
          element={
            <SeeAll
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/availability/:mentorId" element={<CheckAvailability />} />
        <Route path="/booking/:mentorId" element={<BookingPage />} />
        <Route
          path="/about"
          element={
            <AboutUs
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactUs
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <PrivacyPolicy
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <TermsOfService
              loggedIn={loggedIn}
              mentor={mentor}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
