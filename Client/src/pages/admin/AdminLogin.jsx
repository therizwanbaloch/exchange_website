import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/admin/login`,
        { email, password },
      );

      
      const token = response.data?.token;

      if (token) {
        localStorage.setItem("token", token); 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      }

      // dispatch(setUserData(response.data.user));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-100 sm:p-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-700 text-center tracking-tight">
          Administrator Login
        </h2>
        <p className="text-sm mb-6 text-gray-600 text-center">
          Welcome back! Access your Administrator dashboard by Logging in.
        </p>

        {error && (
          <p className="mb-3 text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition shadow-sm"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition shadow-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 hover:shadow-md transition font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
