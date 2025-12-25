import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingDeposits = () => {
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchDeposits = async () => {
    try {
      const res = await axios.get(`${URL}/admin/p-deposits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingDeposits(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setPendingDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const approveDeposit = async (id) => {
    try {
      await axios.put(
        `${URL}/admin/transactions/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const rejectDeposit = async (id) => {
    try {
      await axios.put(
        `${URL}/admin/transactions/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  if (loading) {
    return (
      <div className="mt-8 mx-4 bg-white rounded p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Action Required
        </h2>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-4 bg-white rounded p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Action Required for Pending Deposits
      </h2>

      {pendingDeposits.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-800 rounded">
          No deposit requests yet.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">TXID</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingDeposits.map((dep) => (
                  <tr key={dep._id}>
                    <td className="px-6 py-3">{dep.status}</td>
                    <td className="px-6 py-3">{dep.transactionId || "N/A"}</td>
                    <td className="px-6 py-3">{dep.user?.name}</td>
                    <td className="px-6 py-3">{dep.paymentApp || "N/A"}</td>
                    <td className="px-6 py-3">{dep.amount}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => approveDeposit(dep._id)}
                        className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectDeposit(dep._id)}
                        className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden flex flex-col gap-3">
            {pendingDeposits.map((dep) => (
              <div
                key={dep._id}
                className="p-4 bg-white text-gray-800 rounded shadow"
              >
                <p>
                  <strong>Status:</strong> {dep.status}
                </p>
                <p>
                  <strong>TXID:</strong> {dep.transactionId || "N/A"}
                </p>
                <p>
                  <strong>User:</strong> {dep.user?.name}
                </p>
                <p>
                  <strong>Method:</strong> {dep.paymentApp || "N/A"}
                </p>
                <p>
                  <strong>Amount:</strong> {dep.amount}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => approveDeposit(dep._id)}
                    className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectDeposit(dep._id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PendingDeposits;
