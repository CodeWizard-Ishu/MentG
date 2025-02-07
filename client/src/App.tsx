// import "./App.css";
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { inject } from "@vercel/analytics";
// import { injectSpeedInsights } from "@vercel/speed-insights";
// import Landing from "./pages/Landing";
// import LoginPage from "./pages/Login";
// import SignupPage from "./pages/Signup";
// import ProfilePage from "./pages/ProfilePage";
// import MentorDashboard from "./Mentor/MentorDashboard";
// import MenteeDashboard from "./Mentee/MenteeDashboard";
// import BookingPage from "./pages/BookingPage";
// import CheckAvailability from "./pages/CheckAvailability";
// import AboutUs from "./pages/AboutUs";
// import SeeAll from "./pages/SeeAll";
// import ContactUs from "./pages/ContactUs";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import Pricing from "./pages/Pricing";
// import AllMentors from "./pages/AllMentors";
// import ResetPasswordPage from "./pages/ResetPassword";
// import BookingSuccessPage from "./pages/BookingSuccessful";
// import ProtectedRoutes from "./utils/ProtectedRoutes";
// import ProtectedBookingRoutes from "./utils/ProtectedBookingRoutes";

import Header from "./components/Header"

// function App() {
//   injectSpeedInsights();
//   inject();

//   const [loggedIn, setLoggedIn] = useState(() => {
//     return localStorage.getItem("loggedIn") === "true";
//   });
//   const [mentor, setMentor] = useState(() => {
//     return localStorage.getItem("mentor") === "true";
//   });

//   const handleLogin = (
//     isMentor: boolean,
//     isActive: boolean,
//     userId: string,
//     firstName: string,
//     lastName: string
//   ) => {
//     localStorage.setItem("loggedIn", "true");
//     localStorage.setItem("mentor", isMentor ? "true" : "false");
//     localStorage.setItem("isActive", isActive ? "true" : " false");
//     localStorage.setItem("userId", userId);
//     const capitalize = (string: string) => {
//       if (!string) return "";
//       return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };
//     const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
//     localStorage.setItem("fullName", formattedName);
//     setLoggedIn(true);
//     setMentor(isMentor);
//   };

//   const handleSignup = (
//     isMentor: boolean,
//     isActive: boolean,
//     userId: string,
//     firstName: string,
//     lastName: string
//   ) => {
//     localStorage.setItem("loggedIn", "true");
//     localStorage.setItem("mentor", isMentor ? "true" : "false");
//     localStorage.setItem("isActive", isActive ? "true" : " false");
//     localStorage.setItem("userId", userId);
//     const capitalize = (string: string) => {
//       if (!string) return "";
//       return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };
//     const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
//     localStorage.setItem("fullName", formattedName);
//     setLoggedIn(true);
//     setMentor(isMentor);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setMentor(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Landing loggedIn={loggedIn} mentor={mentor}  />} />
//         <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//         <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
//         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/privacy" element={<PrivacyPolicy />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/all-mentors" element={<AllMentors loggedIn={loggedIn} mentor={mentor} />} />
//         <Route path="/profile/:userId" element={<ProfilePage />} />
//         <Route path="/see-all/:domain" element={<SeeAll loggedIn={loggedIn} mentor={mentor}  />} />

//         {/* Protected Routes */}
//         <Route element={<ProtectedRoutes allowedUserType="mentor" onLogout={handleLogout} />}>
//           <Route path="/dashboard" element={<MentorDashboard onLogout={handleLogout} />} />
//         </Route>

//         <Route element={<ProtectedRoutes allowedUserType="mentee"  onLogout={handleLogout}/>}>
//           <Route path="/dashboard/mentee" element={<MenteeDashboard onLogout={handleLogout} />} />
//           {/* Booking Flow Routes */}
//           <Route element={<ProtectedBookingRoutes requireService={true} onLogout={handleLogout} />}>
//             <Route path="/availability/:mentorId" element={<CheckAvailability />} />
//           </Route>
//           <Route element={<ProtectedBookingRoutes requireService={true} requireSlot={true} onLogout={handleLogout} />}>
//             <Route path="/booking/:mentorId" element={<BookingPage />} />
//           </Route>
//           <Route element={<ProtectedBookingRoutes requireService={true} requireSlot={true} onLogout={handleLogout} />}>
//             <Route path="/booking/successfull" element={<BookingSuccessPage />} />
//           </Route>
//         </Route>
//       </Routes>
//     </Router>

//   );
// }
// export default App;


const App = () => {
  return (
    <div className="min-h-screen bg-sky-200">
      <Header/>
      <div className="container flex text-center justify-center mt-36 text-2xl bg-white rounded-lg p-4 mx-auto w-3/4"> 
      Website is currently under maintenance. Please check back later.
      <br />

      <br />

      Sorry for the inconvenience - MentG Team
    </div>
    </div>
  )
}

export default App
