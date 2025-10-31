import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${URL}/auth/register`,
        { name, email, password },
      );

  
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // dispatch(setUserData(response.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition font-semibold text-lg shadow-sm"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-500 underline font-semibold"
            to="/login"
          >
            Login Here
          </Link>
        </p>

        <p className="text-center text-gray-600 mt-4 text-xs sm:text-sm">
          By registering, you agree to our{" "}
          <Link
            to="/terms"
            className="text-blue-600 hover:text-blue-500 underline font-medium"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-blue-600 hover:text-blue-500 underline font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
