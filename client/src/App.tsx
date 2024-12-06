import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import ExpertDashboard from "./pages/ExpertDashboard";

function App() {
  const handleLogin = (email : string, token : string, isMentor : boolean) => {
    localStorage.setItem('userToken', `Bearer ${token}`);
    console.log(`Logged in as: ${email}`);
    console.log(`Mento : ${isMentor}`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/dashboard" element={<ExpertDashboard/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}
export default App;
