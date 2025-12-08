import React, { useEffect, useState } from "react";
import axios from "axios";

const DashActivity = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${URL}/transactions/recent-transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecent(res.data?.transactions || []);
      } catch (err) {
        setError("Failed to load activity");
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, [URL]);

  // 🔵 Fancy skeleton loader UI
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="h-4 bg-gray-200 rounded w-10 mx-auto"></div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <span className="inline-block w-2 h-5 bg-blue-600 rounded-sm"></span>
        Recent Activity
      </h2>

      {loading ? (
        <table className="min-w-full border-collapse">
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
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
              <th className="py-3 px-4 font-semibold">TxID</th>
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

                <td className="py-3 px-4 text-sm text-gray-600">
                  {tx.txid ? tx.txid : "N/A"}
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
