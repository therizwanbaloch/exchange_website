import React, { useState } from "react";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
import { FaUsers, FaMoneyBillAlt, FaCoins, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminScrollBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard size={24} />, link: "/admin" },
    { label: "Manage Users", icon: <FaUsers size={24} />, link: "/admin/manage-users" },
    { label: "Deposits", icon: <FaMoneyBillAlt size={24} />, link: "/admin/deposits" },
    { label: "Deposit Methods", icon: <FaCoins size={24} />, link: "/admin/deposit-methods" },
    { label: "Custom Rates", icon: <RiMoneyDollarCircleFill size={24} />, link: "/admin/custom-rates" },
    { label: "Cashouts", icon: <FaMoneyBillAlt size={24} />, link: "/admin/withdraws" },
    { label: "Cashout Methods", icon: <FaCoins size={24} />, link: "/admin/withdraw-methods" },
    { label: "Support Tickets", icon: <FaHeadset size={24} />, link: "/admin/all-tickets" },
  ];

  return (
    <>
      
      <div className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-[#1E3A8A] text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-10">PKRSpot</h1>

        <nav className="flex flex-col gap-4 flex-1">
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

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
          <FaSignOutAlt size={22} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-white rounded-md shadow-lg"
        >
          <MdMenu size={28} />
        </button>
      </div>

      
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1E3A8A] text-white p-6 shadow-lg transform transition-transform duration-300 z-50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">PKRSpot</h1>
          <button onClick={() => setMobileOpen(false)}>
            <MdClose size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={idx}
                to={item.link}
                onClick={() => setMobileOpen(false)}
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

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all w-full"
        >
          <FaSignOutAlt size={22} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminScrollBar;
