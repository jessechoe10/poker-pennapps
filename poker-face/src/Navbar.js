// Navbar.js
import React from "react";

function Navbar() {
  return (
    <nav className="bg-transparent p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <a href="/" className="hover:text-blue-300 transition">Home</a>
          <a href="/about" className="hover:text-blue-300 transition">About</a>
        </div>
        <div className="flex space-x-4">
          <a 
            href="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Register
          </a>
          <a 
            href="/login" 
            className="border border-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;