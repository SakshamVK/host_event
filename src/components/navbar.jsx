import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "../components/navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/home", icon: <LayoutDashboard size={18} />, title: "Home" }, // Added Home
    {
      path: "/create-event",
      icon: <CalendarPlus size={18} />,
      title: "Create Event",
    },
    { path: "/my-events", icon: <Calendar size={18} />, title: "My Events" },
    { path: "/profile", icon: <User size={18} />, title: "My Profile" }, // Added My Profile
  ];

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/home" className="nav-brand">
          <span className="brand-text">VibeCheck</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="nav-profile">
          <Link to="/" className="logout-btn">
            <LogOut size={18} />
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
        <Link
          to="/"
          className="mobile-nav-link logout"
          onClick={() => setIsOpen(false)}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
