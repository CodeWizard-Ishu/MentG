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

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return sessionStorage.getItem("loggedIn") === "true";
  });
  const [mentor, setMentor] = useState(() => {
    return sessionStorage.getItem("mentor") === "true";
  });

  const handleLogin = (
    token: string,
    isMentor: boolean,
    userId: string,
    firstName: string,
    lastName: string
  ) => {
    sessionStorage.setItem("userToken", `Bearer ${token}`);
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("mentor", isMentor ? "true" : "false");
    sessionStorage.setItem("userId", userId);
    const capitalize = (string: string) => {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sessionStorage.setItem("fullName", formattedName);
    setLoggedIn(true);
    setMentor(isMentor);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("mentor");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("fullName");
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
      </Routes>
    </Router>
  );
}
export default App;
