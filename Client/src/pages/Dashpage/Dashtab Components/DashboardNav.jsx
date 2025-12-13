import React, { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { GrHistory } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DashboardNav = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch user from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/customer/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(true); // Set error to true
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="w-full bg-white text-gray-800 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* LEFT SECTION */}
        {loading ? (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
          </div>
        ) : error ? (
          <div className="text-blue-600 font-semibold text-lg">
            PKRSPOT
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FiHome className="text-base text-blue-600" />
            <h1 className="text-lg font-semibold hidden sm:block">
              {user?.name ? `${user.name}'s Dashboard` : "Customer Dashboard"}
            </h1>
          </div>
        )}

        {/* RIGHT MENU */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* All Activity */}
          {loading ? (
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <button
              onClick={() => navigate("/recent-activity")}
              className="flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <GrHistory className="text-base" />
              <span className="hidden md:inline">All Activity</span>
            </button>
          )}

          {/* Support */}
          {loading ? (
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <button
              onClick={() => navigate("/contact-us")}
              className="flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <BiSupport className="text-base" />
              <span className="hidden md:inline">Support</span>
            </button>
          )}

          {/* Settings */}
          {loading ? (
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <IoSettingsOutline className="text-base" />
              <span className="hidden md:inline">Settings</span>
            </button>
          )}

          {/* Logout */}
          {loading ? (
            <div className="h-4 w-16 bg-red-200 rounded animate-pulse"></div>
          ) : (
            <button
              className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
              onClick={handleLogout}
            >
              <IoIosPower className="text-base" />
              <span className="hidden md:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
