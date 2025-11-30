import React from "react";
import { FiHome } from "react-icons/fi";
import { GrHistory } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../../redux/slices/userSlice";

const DashboardNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    dispatch(clearUserData());

    
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");

    navigate("/", { replace: true });
  };

  return (
    <nav className="w-full bg-white text-gray-800 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        
        <div className="flex items-center gap-2">
          <FiHome className="text-base text-blue-600" />
          <h1 className="text-lg font-semibold hidden sm:block">
            Customer Dashboard
          </h1>
        </div>

        
        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <GrHistory className="text-base" />
            <span className="hidden md:inline">All Activity</span>
          </a>
          <button
            onClick={() => navigate("/contact-us")}
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <BiSupport className="text-base" />
            <span className="hidden md:inline">Support</span>
          </button>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <IoSettingsOutline className="text-base" />
            <span className="hidden md:inline">Settings</span>
          </a>

          {/* Logout */}
          <button
            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
            onClick={handleLogout}
          >
            <IoIosPower className="text-base" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
