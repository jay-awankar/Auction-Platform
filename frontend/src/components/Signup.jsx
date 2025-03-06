import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const res = await axios.post("https://auctionair.netlify.app/signup", {
        username,
        password,
      });

      alert("Signup successful! Please sign in.");
      navigate("/signin"); // Redirect to signin page
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Sign-Up Here</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup
