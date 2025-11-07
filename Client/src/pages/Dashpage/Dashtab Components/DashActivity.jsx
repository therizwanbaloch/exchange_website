import React from "react";
import useRecentTransactions from "../../../hooks/useRecentTransactions";

const DashActivity = () => {
  const { recent, loading, error } = useRecentTransactions();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <span className="inline-block w-2 h-5 bg-blue-600 rounded-sm"></span>
        Recent Activity
      </h2>

      {loading ? (
        <div className="text-center py-6 text-gray-500 animate-pulse">
          Loading transactions...
        </div>
      ) : error ? (
        <div className="text-center py-6 text-red-500">{error}</div>
      ) : recent && recent.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Type</th>
              <th className="py-3 px-4 font-semibold">Wallet</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((tx) => (
              <tr
                key={tx._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700 text-sm">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`py-3 px-4 text-sm font-medium ${
                    tx.type === "deposit"
                      ? "text-green-600"
                      : tx.type === "withdraw"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {tx.toWallet || "-"}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                  ${tx.amount}
                </td>
                <td
                  className={`py-3 px-4 text-sm font-medium ${
                    tx.status === "pending"
                      ? "text-yellow-600"
                      : tx.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.status}
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="text-blue-600 hover:underline text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-400 py-8 italic">
          No recent activity found.
        </div>
      )}
    </div>
  );
};

export default DashActivity;
