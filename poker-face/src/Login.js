// Login.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ setIsAuthenticated }) { // Receive the setIsAuthenticated prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login', 'register', or 'forgot'
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Set authentication to true on successful login
        setIsAuthenticated(true);
        alert("Login successful!");

        // Redirect to Play page after login
        navigate("/play");

      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Registration successful! Check your email for verification.");
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        alert("Password reset email sent!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleAuth} className="bg-opacity-30 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-white font-bold mb-4">{mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Forgot Password'}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        {mode !== 'forgot' && (
          <div className="mb-6">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={mode !== 'forgot'}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? (mode === 'login' ? 'Logging in...' : mode === 'register' ? 'Registering...' : 'Sending...') : mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password'}
        </button>
        <div className="mt-4 text-gray-600 text-center">
          {mode === 'login' ? (
            <>
              <div className="mb-2">
                <button type="button" onClick={() => setMode('register')} className="text-white">
                  Register
                </button>
              </div>
              <div>
                <button type="button" onClick={() => setMode('forgot')} className="text-white">
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <button type="button" onClick={() => setMode('login')} className="text-blue-500">
              Back to Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;