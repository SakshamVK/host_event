import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Lock } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase sign-in method
import { auth } from "../firebase"; // Firebase auth instance
import "../styles/Login.css"; // Ensure this CSS includes the background image

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      login(); // Update the authentication state
      navigate("/create-event"); // Redirect on successful login
    } catch (error) {
      // Handle authentication errors
      if (error.code === 'auth/wrong-password') {
        setError("Wrong password. Please try again.");
      } else if (error.code === 'auth/user-not-found') {
        setError("No user found with this email.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
    setLoading(false); // Stop loading
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">Login Page</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <User className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-link">
          <span>New here? </span>
          <button onClick={handleSignupRedirect}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="background-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
    </div>
  );
};

export default Login;
