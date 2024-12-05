import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import "./App.css";

function App() {
  const handleLogin = (email : string, token : string) => {
    localStorage.setItem('userToken', `Bearer ${token}`);
    console.log(`Logged in as: ${email}`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
}
export default App;
