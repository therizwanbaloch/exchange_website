import React, { useEffect } from "react";
import DashboardSidebar from "../userDashBoard/Dashtab Components/DashboardSidebar";
import DashboardNav from "../userDashBoard/Dashtab Components/DashboardNav";
import DashActivity from "../userDashBoard/Dashtab Components/DashActivity";
import Steps from "../userDashBoard/Dashtab Components/Steps";
import WalletCard from "../userDashBoard/Dashtab Components/WalletCard";
import { useDispatch, useSelector } from "react-redux";
import { getBalances } from "../hooks/getBalances";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.balance); 

  useEffect(() => {
    dispatch(getBalances()); 
  }, [dispatch]);

  return (
    <div className="grid grid-cols-7 grid-rows-9 gap-4">
      <div className="col-span-2 row-span-9">
        <DashboardSidebar />
      </div>
      <div className="col-span-5 col-start-3">
        <DashboardNav />
      </div>

      {balance.length > 0 && (
        <>
          <div className="col-start-3 row-start-2">
            <WalletCard
              currency="PKR"
              amount={`₨${balance[0].amount}`}
              color="blue"
            />
          </div>
          <div className="col-start-4 row-start-2">
            <WalletCard
              currency="USD"
              amount={`$${balance[1].amount}`}
              color="green"
            />
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
