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
    <div className="grid grid-cols-7 grid-rows-9 gap-4">
      
      <div className="col-span-2 row-span-9">
        <DashboardSidebar />
      </div>

      
      <div className="col-span-5 col-start-3">
        <DashboardNav />
      </div>

    
      {user && (
        <>
          <div className="col-start-3 row-start-2">
            <WalletCard currency="PKR" amount={`₨${balancePKR || 0}`} color="blue" />
          </div>
          <div className="col-start-4 row-start-2">
            <WalletCard currency="USD" amount={`$${balanceUSD || 0}`} color="green" />
          </div>
        </>
      )}

      
      <div className="col-span-3 row-span-7 col-start-3 row-start-3">
        <DashActivity />
      </div>

      
      <div className="col-span-2 row-span-7 col-start-6 row-start-3">
        <Steps />
      </div>
    </div>
  );
};

export default UserDashboard;
