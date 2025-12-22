import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingWithdraw = () => {
  const [pendingWithdraws, setPendingWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchWithdraws = async () => {
    try {
      const res = await axios.get(`${URL}/admin/p-withdraws`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingWithdraws(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setPendingWithdraws([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, []);

  const handleApprove = async () => {
    try {
      await axios.put(
        `${URL}/admin/transactions/${selectedWithdraw._id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Withdrawal Approved");
      setSelectedWithdraw(null);
      fetchWithdraws();
    } catch (err) {
      alert("Approve failed");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `${URL}/admin/transactions/${selectedWithdraw._id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Withdrawal Rejected & Refunded");
      setSelectedWithdraw(null);
      fetchWithdraws();
    } catch (err) {
      alert("Reject failed");
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-xl font-bold mb-4">
        Action Required for Pending Cashouts
      </h2>

      {pendingWithdraws.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 rounded">
          No Withdrawal Requests Yet.
        </div>
      ) : (
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">TXID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdraws.map((wd) => (
                <tr key={wd._id} className="border-t">
                  <td className="px-4 py-2">{wd.transactionId}</td>
                  <td className="px-4 py-2">{wd.user?.name}</td>
                  <td className="px-4 py-2">{wd.methodName}</td>
                  <td className="px-4 py-2">{wd.amount}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedWithdraw(wd)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedWithdraw && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-center">
              Withdrawal Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>User:</strong> {selectedWithdraw.user?.name}</p>
              <p><strong>Wallet:</strong> {selectedWithdraw.fromWallet}</p>
              <p><strong>Amount:</strong> {selectedWithdraw.amount}</p>
              <p><strong>Method:</strong> {selectedWithdraw.methodName}</p>
              <p><strong>Holder Name:</strong> {selectedWithdraw.holderName}</p>
              <p><strong>Account Number:</strong> {selectedWithdraw.accountNumber}</p>
              <p><strong>TXID:</strong> {selectedWithdraw.transactionId}</p>
              <p><strong>Status:</strong> {selectedWithdraw.status}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleApprove}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Reject
              </button>
            </div>

            <button
              onClick={() => setSelectedWithdraw(null)}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingWithdraw;
