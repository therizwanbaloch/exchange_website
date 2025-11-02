import React from 'react';

const PendingDeposits = () => {
  // Once you connect Redux, you'll
  // access the pending deposit data here

  // Example placeholder for conditional rendering (you'll replace this later)
  const pendingDeposits = []; // <-- Redux will populate this

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Action Required for Pending Deposits
      </h2>

      {pendingDeposits.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No deposit requests yet.
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">TXID</th>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Method</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Once Redux is set up, map through the data to create rows */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeposits;
