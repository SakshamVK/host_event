// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  Calendar,
  User,
  LogOut,
} from "lucide-react";
import "../components/Sidebar.css"; // Ensure this path is correct

const Sidebar = () => {
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  // Updated navItems array with Garbage Dashboard link
  const navItems = [
    { path: "/home", icon: <LayoutDashboard size={18} />, title: "Home" },
    { path: "/create-event", icon: <CalendarPlus size={18} />, title: "Create Event" },
    { path: "/my-events", icon: <Calendar size={18} />, title: "My Events" },
    { path: "/profile", icon: <User size={18} />, title: "My Profile" },
    { path: "/garbage", icon: <LayoutDashboard size={18} />, title: "Garbage Dashboard" }, // New Garbage Dashboard link
  ];

  const handleLogout = () => {
    localStorage.removeItem("userName");
    // Additional logout logic if needed
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/home" className="sidebar-brand">
          <span className="brand-text">VibeCheck</span>
        </Link>
      </div>

      <div className="sidebar-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-profile">
        {userName && <span className="user-greeting">Hello, {userName}</span>}
        <Link to="/" className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
