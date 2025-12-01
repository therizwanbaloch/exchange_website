import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingWithdraw = () => {
  const [pendingWithdraws, setPendingWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const token = localStorage.getItem("token");
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

    fetchWithdraws();
  }, [URL]);

  if (loading) {
    return (
      <div className="mt-8 mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Action Required for Pending Cashouts
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-200 animate-pulse flex justify-between"
            >
              <div className="space-y-2 w-full">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Action Required for Pending Cashouts
      </h2>

      {pendingWithdraws.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No Withdrawal Requests Yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Large screens: Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                {pendingWithdraws.map((wd) => (
                  <tr key={wd._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{wd.status}</td>
                    <td className="px-6 py-3">{wd.transactionId || "N/A"}</td>
                    <td className="px-6 py-3">{wd.user?.name || wd.user}</td>
                    <td className="px-6 py-3">{wd.paymentApp || "N/A"}</td>
                    <td className="px-6 py-3">{wd.amount}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Approve
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screens: Card layout */}
          <div className="lg:hidden flex flex-col gap-3">
            {pendingWithdraws.map((wd) => (
              <div key={wd._id} className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-2">
                <p><strong>Status:</strong> {wd.status}</p>
                <p><strong>TXID:</strong> {wd.transactionId || "N/A"}</p>
                <p><strong>User:</strong> {wd.user?.name || wd.user}</p>
                <p><strong>Method:</strong> {wd.paymentApp || "N/A"}</p>
                <p><strong>Amount:</strong> {wd.amount}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingWithdraw;
