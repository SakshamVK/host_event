import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar"; // Assuming your Sidebar component is here
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

  // Check if user is authenticated and not on the login/signup page
  if (isAuthenticated && location.pathname !== "/" && location.pathname !== "/signup") {
    return (
      <div style={{ display: 'flex' }}>
        {/* Sidebar will always be displayed on the left side */}
        <Sidebar />
        
        {/* The rest of the content will have a margin to not overlap with the Sidebar */}
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Render login and signup pages if the user is not authenticated
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
