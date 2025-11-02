import React, { useState } from "react";
import AdminScrollBar from "../admin/adminDashboard/AdminScrollBar";
import ManageDeposits from "./DashComponents/ManageDeposits";
import DepositMethods from "./DashComponents/ManageDeposits";

const Deposits = () => {
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside className="w-64 bg-[#020c2c] text-white fixed top-0 left-0 h-full shadow-xl hidden lg:block">
        <AdminScrollBar />
      </aside>

    
      <main className="flex-1 lg:ml-64 p-6 space-y-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Deposits</h1>

        
        <div className="flex gap-4 mb-4 border-b">
          <button
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === "manage" ? "bg-white text-blue-600 shadow" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Deposits
          </button>
          <button
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === "methods" ? "bg-white text-blue-600 shadow" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("methods")}
          >
            Deposit Methods
          </button>
        </div>

        
        <div className="bg-white rounded-lg shadow-md p-4">
          {activeTab === "manage" && <ManageDeposits />}
          {activeTab === "methods" && <DepositMethods />}
        </div>
      </main>
    </div>
  );
};

export default Deposits;
