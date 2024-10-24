// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" // Load from storage
  );

  // Function to log in
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist in storage
  };

  // Function to log out
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
