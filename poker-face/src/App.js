// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import Router components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import About from "./About";
import Login from "./Login";
import Play from "./Play";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />} // Pass the setter to Login
          />
          <Route
            path="/play"
            element={isAuthenticated ? <Play /> : <Navigate to="/login" />} // Protect the Play route
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;