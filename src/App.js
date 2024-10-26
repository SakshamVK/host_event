// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import HomePage from "./pages/HomePage";
import GarbageDashboard from "./pages/Garbage";
import Profile from "./pages/Profile"; // Updated import name

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
    <div style={{ display: "flex" }}>
      {isAuthenticated && location.pathname !== "/" && location.pathname !== "/signup" && (
        <Sidebar />
      )}
      
      <div style={{ flex: 1, padding: "20px", marginLeft: isAuthenticated ? "250px" : "0" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/garbage" element={<GarbageDashboard />} />
          <Route path="/profile" element={<Profile />} /> {/* Updated route path */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
