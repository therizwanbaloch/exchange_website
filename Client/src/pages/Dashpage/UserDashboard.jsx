import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";
import DashActivity from "../Dashpage/Dashtab Components/DashActivity";
import Steps from "../Dashpage/Dashtab Components/Steps";
import WalletCard from "../Dashpage/Dashtab Components/WalletCard";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Clear data and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // You can still get balances from localStorage if stored, or show 0
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const balancePKR = storedUser?.balances?.find(b => b.currency === "PKR")?.amount || 0;
  const balanceUSD = storedUser?.balances?.find(b => b.currency === "USD")?.amount || 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DashboardNav />

        {/* Content Area */}
        <div className="p-4 lg:p-6 flex flex-col gap-6">
          {/* Wallet Cards */}
          <div className="flex flex-col sm:flex-row gap-4">
            <WalletCard currency="PKR" amount={`₨${balancePKR}`} color="blue" />
            <WalletCard currency="USD" amount={`$${balanceUSD}`} color="green" />
          </div>

          {/* Activity + Steps */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <DashActivity />
            </div>
            <div className="lg:w-1/3">
              <Steps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
