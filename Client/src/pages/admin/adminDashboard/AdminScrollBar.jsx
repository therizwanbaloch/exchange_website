import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaMoneyBillAlt, FaCoins, FaHeadset } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const AdminScrollBar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard size={24} />, link: "/admin" },
    { label: "Manage Users", icon: <FaUsers size={24} />, link: "/admin/manage-users" },
    { label: "Deposits", icon: <FaMoneyBillAlt size={24} />, link: "/admin/deposits" },
    { label: "Deposit Methods", icon: <FaCoins size={24} />, link: "/admin/deposit-methods" },
    { label: "Custom Rates", icon: <RiMoneyDollarCircleFill size={24} />, link: "/admin/custom-rates" },
    { label: "Support Tickets", icon: <FaHeadset size={24} />, link: "/admin/all-tickets" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-[#1E3A8A] text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-10">PKRSpot</h1>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={idx}
                to={item.link}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-white hover:text-[#020c2c] transition-all cursor-pointer ${
                  isActive ? "bg-white text-[#020c2c]" : ""
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-t border-t flex justify-around py-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={idx}
              to={item.link}
              className={`flex flex-col items-center text-gray-500 ${
                isActive ? "text-blue-600" : ""
              }`}
            >
              {item.icon}
              {/* Optional: show label below icon */}
              {/* <span className="text-xs">{item.label}</span> */}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default AdminScrollBar;
