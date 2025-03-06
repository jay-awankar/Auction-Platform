import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css'

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from './components/Dashboard'
import AuctionItem from './components/AuctionItem'
import PostAuction from './components/PostAuction'
import Landing from './components/Landing'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  //loads when the component load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    // navigate('/signin');
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>AUCTIONAIR</h1>
          <hr style={{maxWidth:"120px"}}></hr>
          <nav>
            <Link to="/signup" className="nav-link">
              Sign-Up
            </Link>
            <Link to="/signin" className="nav-link">
              Sign-In
            </Link>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/post-auction" className="nav-link">
              Post Auction
            </Link>
            {isAuthenticated && (
              <button
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                }}
                onClick={handleLogout}
                className="nav-link logout-button"
              >
                Logout
              </button>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auction/:id" element={<AuctionItem />} />
            <Route path="/post-auction" element={<PostAuction />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Auction App. All rights reserved.</p>
          <p>
            Welcome to the best place to buy and sell items through auctions!
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App
