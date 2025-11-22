import React, { useState } from "react";
import {
  FiHome,
  FiSend,
  FiUserPlus,
  FiDownload,
  FiUpload,
  FiRepeat,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Deposit", icon: <FiDownload />, path: "/deposit" },
    { name: "Withdraw", icon: <FiUpload />, path: "/withdraw" },
    { name: "Exchange", icon: <FiRepeat />, path: "/exchange" },
    { name: "Send Money", icon: <FiSend />, path: "/send" },
    { name: "Request Money", icon: <FiUserPlus />, path: "/request" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-white bg-[#1E3A8A] p-2 rounded-md"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#1E3A8A] text-white w-64 shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full font-bricolage">
          {/* Branding */}
          <div className="p-5 border-b border-white/20">
            <h2 className="text-2xl font-bold tracking-wide">PKRSPOT</h2>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3B82F6] scrollbar-track-white/20">
            <ul className="p-3 space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 text-white hover:bg-[#3B82F6] p-3 rounded-md transition cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-md font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Button */}
          <div className="border-t border-white/20 p-4">
            <h4 className="text-sm font-semibold text-white/80 mb-1">
              Need Help?
            </h4>
            <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-3 py-2 rounded-md hover:bg-[#0D6EFD] w-full justify-center transition">
              <FiHelpCircle />
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
