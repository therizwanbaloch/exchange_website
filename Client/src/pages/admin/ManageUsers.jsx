import React from "react";
import AdminScrollBar from "../admin/adminDashboard/AdminScrollBar";
import SearchByEmail from "./DashComponents/SearchByEmail";
import UsersTable from "./DashComponents/UsersTable";

const ManageUsers = () => {
  return (
    <div className="flex min-h-screen bg-blue-200/50">
    
      <aside className="w-64 bg-[#020c2c] text-white fixed top-0 left-0 h-full shadow-xl hidden lg:block">
        <AdminScrollBar />
      </aside>

    
      <main className="flex-1 lg:ml-64 p-6 space-y-8 w-full">
      
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-gray-600 mt-1">
            View, edit, and manage your users here.
          </p>
        </div>

        
        <div className="bg-white rounded-lg shadow-md p-4">
          <SearchByEmail />
        </div>

        
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <UsersTable />
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
