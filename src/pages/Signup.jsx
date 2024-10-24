// src/components/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase"; // Adjust the path based on your folder structure
import { createUserWithEmailAndPassword } from "firebase/auth";
import"../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally redirect or show a success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Contact Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
    </div>
  );
};

export default Signup;
