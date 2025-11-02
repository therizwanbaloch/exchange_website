import React from "react";
import { FiHome } from "react-icons/fi";
import { GrHistory } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosPower } from "react-icons/io";

const DashboardNav = () => {
  return (
    <nav className="w-full bg-white text-gray-800 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <FiHome className="text-base text-blue-600" />
          <h1 className="text-lg font-semibold hidden sm:block">
            Exchange Dashboard
          </h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <GrHistory className="text-base" />
            <span className="hidden md:inline">All Activity</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <BiSupport className="text-base" />
            <span className="hidden md:inline">Support</span>
          </a>
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
            onClick={() => console.log("Logout clicked")}
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
