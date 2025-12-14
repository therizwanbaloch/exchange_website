import React, { useEffect, useState } from "react";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [updating, setUpdating] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
        if (res.data.success) {
          setUser(res.data.user);
          setName(res.data.user.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (!name.trim() && !password.trim()) {
      alert("Enter new name or password to update");
      return;
    }

    try {
      setUpdating(true);
      await axios.put(
        `${URL}/user-data/update`,
        { name: name.trim(), password: password.trim() },
        authHeaders
      );
      alert("Profile updated successfully!");
      setPassword("");
      // refresh user data
      const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <div className="p-5 lg:p-10 flex-1 flex flex-col items-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center bg-blue-500 w-full py-4 rounded-lg shadow-lg">
            User Profile
          </h1>

          <div className="w-full bg-blue-500 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 max-w-full lg:max-w-3xl">
            {/* Wallet Info */}
            <div className="flex justify-between text-white font-semibold mb-4 text-sm sm:text-base">
              <div>PKR: <span className="font-bold">{user.wallet.PKR}</span></div>
              <div>USD: <span className="font-bold">{user.wallet.USD}</span></div>
              {user.wallet.GBP !== undefined && <div>GBP: <span className="font-bold">{user.wallet.GBP}</span></div>}
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white focus:text-black transition"
                placeholder="Enter your name"
              />
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="px-4 py-3 rounded-lg bg-gray-200/50 border border-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white focus:text-black transition"
                placeholder="Enter new password"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition shadow-lg"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
