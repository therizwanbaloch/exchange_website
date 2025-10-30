import React, { useState } from "react";
import { FiHome, FiSend, FiUserPlus, FiDownload, FiUpload, FiRepeat, FiGift, FiTrendingUp, FiUsers, FiHelpCircle, FiMenu, FiX } from "react-icons/fi";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Send Money", icon: <FiSend /> },
    { name: "Request Money", icon: <FiUserPlus /> },
    { name: "Deposit", icon: <FiDownload /> },
    { name: "Withdraw", icon: <FiUpload /> },
    { name: "Exchange", icon: <FiRepeat /> },
  ];

  return (
    <>
      {/* mobile only view developer bhai samajh gaye hahhahaha*/}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-800 focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md border-r w-64 transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold text-blue-600">
              Exchange Website
            </h2>
          </div>

         {/* menu  */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
            <ul className="p-3 space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 p-2 rounded-md cursor-pointer"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* contact button */}
          <div className="border-t p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Need Help?
            </h4>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 w-full justify-center">
              <FiHelpCircle />
              Contact Our Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
