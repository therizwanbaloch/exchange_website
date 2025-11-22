import React from "react";
import { useSelector } from "react-redux";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";
import DashActivity from "../Dashpage/Dashtab Components/DashActivity";
import Steps from "../Dashpage/Dashtab Components/Steps";
import WalletCard from "../Dashpage/Dashtab Components/WalletCard";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);

  const balancePKR = user?.balances?.find((b) => b.currency === "PKR")?.amount;
  const balanceUSD = user?.balances?.find((b) => b.currency === "USD")?.amount;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="w-full">
          <DashboardNav />
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6 flex flex-col gap-6">
          {/* Wallet Cards */}
          <div className="flex flex-col sm:flex-row gap-4">
            {user && (
              <>
                <WalletCard
                  currency="PKR"
                  amount={`₨${balancePKR || 0}`}
                  color="blue"
                />
                <WalletCard
                  currency="USD"
                  amount={`$${balanceUSD || 0}`}
                  color="green"
                />
              </>
            )}
          </div>

          {/* Activity + Steps */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Activity */}
            <div className="flex-1">
              <DashActivity />
            </div>

            {/* Steps */}
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
