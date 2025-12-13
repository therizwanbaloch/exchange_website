import React, { useEffect, useState } from "react";
import axios from "axios";

const DashActivity = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${URL}/transactions/recent-transactions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecent(res.data?.transactions || []);
      } catch (err) {
        setError("Failed to load activity");
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, [URL]);

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <span className="inline-block w-2 h-5 bg-blue-600 rounded-sm"></span>
        Recent Activity
      </h2>

      {/* TABLE */}
      {loading ? (
        <table className="min-w-full">
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      ) : error ? (
        <div className="text-center text-red-500 py-6">{error}</div>
      ) : recent.length === 0 ? (
        <div className="text-center text-gray-400 py-8 italic">
          No recent activity found.
        </div>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Wallet</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">TxID</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((tx) => (
              <tr
                key={tx._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-gray-700">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>

                <td
                  className={`py-3 px-4 font-medium ${
                    tx.type === "deposit"
                      ? "text-green-600"
                      : tx.type === "withdraw"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {tx.type}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {tx.toWallet || "-"}
                </td>

                {/* ✅ FIXED AMOUNT (NO IDS) */}
                <td className="py-3 px-4 font-semibold text-gray-800">
                  {tx.amount}
                </td>

                <td
                  className={`py-3 px-4 font-medium ${
                    tx.status === "pending"
                      ? "text-yellow-600"
                      : tx.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.status}
                </td>

                <td className="py-3 px-4 text-gray-500 truncate max-w-[120px]">
                  {tx.transactionId}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedTx(tx);
                      setModalOpen(true);
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {modalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
              Transaction Details
            </h2>

            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 font-semibold">Date</td>
                  <td>{new Date(selectedTx.createdAt).toLocaleString()}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-semibold">Type</td>
                  <td>{selectedTx.type}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Wallet</td>
                  <td>{selectedTx.toWallet}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-semibold">Amount</td>
                  {/* ✅ FIXED HERE TOO */}
                  <td>{selectedTx.amount}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Status</td>
                  <td>{selectedTx.status}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 font-semibold">Transaction ID</td>
                  <td className="break-all">{selectedTx.transactionId}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashActivity;
