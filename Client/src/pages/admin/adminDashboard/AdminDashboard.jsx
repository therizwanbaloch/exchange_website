import React from 'react';
import AdminScrollBar from './adminScrollBar';
import DataSection from '../DashComponents/DataSection';
import PendingDeposits from '../DashComponents/PendingDeposits';
import PendingWithdraw from '../DashComponents/PendingWithdraw';
import LastSixUsers from '../DashComponents/LastSixUsers';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminScrollBar />

      <main className="flex-1 lg:ml-64 p-6 space-y-8">
        <section>
          <DataSection />
        </section>

        <section>
          <PendingDeposits />
        </section>

        <section>
          <PendingWithdraw />
        </section>

        <section>
          <LastSixUsers />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
