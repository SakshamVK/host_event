import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

function MainApp() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Conditionally render the Navbar based on authentication status and route */}
      {isAuthenticated && location.pathname !== "/" && location.pathname !== "/signup" && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </>
  );
}

export default App;
