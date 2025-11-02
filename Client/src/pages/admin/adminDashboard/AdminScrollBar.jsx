import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaMoneyBillAlt, FaCoins, FaHeadset } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const AdminScrollBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard size={20} />, link: "/admin" },
    { label: "Manage Users", icon: <FaUsers size={20} />, link: "/admin/manage-users" },
    { label: "Deposits", icon: <FaMoneyBillAlt size={20} />, link: "/admin/deposits" },
    { label: "Deposit Methods", icon: <FaCoins size={20} />, link: "/admin/deposit-methods" },
    { label: "Custom Rates", icon: <RiMoneyDollarCircleFill size={20} />, link: "/admin/custom-rates" },
    { label: "Support Tickets", icon: <FaHeadset size={20} />, link: "/admin/support-tickets" },
  ];

  return (
    <>
      
      <div className="lg:hidden p-4 bg-[#1E3A8A] text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Exchanger PK</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      
      <div
        className={`fixed top-0 left-0 h-full bg-[#1E3A8A] text-white w-64 p-6 shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block z-50 overflow-y-auto`}
      >
        
        <h1 className="text-2xl font-bold mb-10">Exchanger PK</h1>

        
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={index}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-white hover:text-[#020c2c] transition-all cursor-pointer ${isActive ? "bg-white text-[#020c2c]" : ""}`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center gap-3 p-2 w-full bg-red-600 hover:bg-red-700 transition-all rounded-md text-white text-sm font-medium">
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminScrollBar;
