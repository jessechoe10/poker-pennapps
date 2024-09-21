import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import About from "./About";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;