import React from 'react';
import AdminScrollBar from './adminScrollBar';
import DataSection from '../DashComponents/DataSection';
import PendingDeposits from '../DashComponents/PendingDeposits';
import PendingWithdraw from '../DashComponents/PendingWithdraw';
import LastSixUsers from '../DashComponents/LastSixUsers';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-x-hidden">
      {/* Sidebar / Bottom Nav */}
      <AdminScrollBar />

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-8 space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl">
          <DataSection />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl">
          <PendingDeposits />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl">
          <PendingWithdraw />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl">
          <LastSixUsers />
        </section>

        {/* Extra space for mobile bottom nav */}
        <div className="lg:hidden h-16"></div>
      </main>
    </div>
  );
};

export default AdminDashboard;
