import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Navbar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NewPatients from "./pages/NewPatients";
import YourPatients from "./pages/YourPatients";
import MyPatient from "./pages/MyPatient";
import SpecialNote from "./components/SpecialNote";
import Chat from "./pages/Chat";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (email) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="App flex bg-[#F8F7FA] min-h-screen">
          <Sidebar onLogout={handleLogout} />
          <div className="flex-1">
            <TopBar />
            <main>
              <Routes>
                {/* Private Routes */}
                <Route path="/" element={<Profile />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/newpatient" element={<NewPatients />} />
                <Route path="/yourpatients" element={<YourPatients />} />
                <Route path="/mypatient/:id" element={<MyPatient />} />
                <Route path="/specialnote" element={<SpecialNote />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
