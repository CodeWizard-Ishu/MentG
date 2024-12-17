import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import MentorDashboard from "./Mentor/MentorDashboard";
import MenteeDashboard from "./Mentee/MenteeDashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });
  const [mentor, setMentor] = useState(() => {
    return localStorage.getItem("mentor") === "true";
  });

  const handleLogin = (email : string, token : string, isMentor : boolean, userId : string) => {
    localStorage.setItem('userToken', `Bearer ${token}`);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("mentor", isMentor ? "true" : "false");
    localStorage.setItem("userId",userId);
    setLoggedIn(true);
    setMentor(isMentor);
    console.log(`Logged in as: ${email}`);
    console.log(`Mento : ${isMentor}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("mentor");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setMentor(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing loggedIn={loggedIn} mentor={mentor} onLogout={handleLogout}/>}/>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/dashboard" element={<MentorDashboard onLogout={handleLogout}/>}/>
        <Route path="/dashboard/mentee" element={<MenteeDashboard onLogout={handleLogout}/>}/>
        <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}
export default App;
