import React, { useState, useEffect } from "react";
import AdminScrollBar from "../admin/adminDashboard/AdminScrollBar";
import axios from "axios";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL;

  // Fetch paginated deposits
  const fetchDeposits = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/admin/deposits`, {
        params: { page, limit: 10 },
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeposits(res.data.deposits);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single deposit details
  const fetchDepositDetails = async (id) => {
    setModalLoading(true);
    setModalOpen(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/transactions/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedDeposit(res.data.deposit);
    } catch (err) {
      console.error(err);
      setSelectedDeposit(null);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-500 text-white px-2 py-1 rounded text-sm font-medium";
      case "pending":
        return "bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium";
      case "rejected":
        return "bg-red-500 text-white px-2 py-1 rounded text-sm font-medium";
      default:
        return "bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm font-medium";
    }
  };

  // Approve / Reject functions
  const approveDeposit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${URL}/admin/deposit/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Deposit approved!");
      fetchDeposits(currentPage);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to approve deposit.");
    }
  };

  const rejectDeposit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${URL}/admin/deposit/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Deposit rejected!");
      fetchDeposits(currentPage);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to reject deposit.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#020c2c] text-white shadow-xl lg:fixed top-0 left-0 h-16 lg:h-full lg:block">
        <AdminScrollBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Deposits</h1>

        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {deposits.map((dep, index) => (
                  <tr
                    key={dep._id}
                    className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
                  >
                    <td className="px-6 py-4">{dep.user.email}</td>
                    <td className="px-6 py-4">{dep.amount}</td>
                    <td className="px-6 py-4">{new Date(dep.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusClasses(dep.status)}>{dep.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => fetchDepositDetails(dep._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-700"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-700"
            >
              Next
            </button>
          </div>
        </div>

        {/* Glassy Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-blue-100/30 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            ></div>
            <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-full max-w-md relative">
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                ×
              </button>

              {modalLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
              ) : selectedDeposit ? (
                <>
                  <h2 className="text-xl font-bold mb-4">Deposit Details</h2>
                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">User:</span> {selectedDeposit.user.email}
                    </p>
                    <p>
                      <span className="font-semibold">Amount:</span> {selectedDeposit.amount}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={getStatusClasses(selectedDeposit.status)}>{selectedDeposit.status}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(selectedDeposit.createdAt).toLocaleString()}
                    </p>
                    {selectedDeposit.paymentApp && (
                      <p>
                        <span className="font-semibold">Payment App:</span> {selectedDeposit.paymentApp}
                      </p>
                    )}
                    {selectedDeposit.transactionId && (
                      <p>
                        <span className="font-semibold">Transaction ID:</span> {selectedDeposit.transactionId}
                      </p>
                    )}
                    {selectedDeposit.notes && (
                      <p>
                        <span className="font-semibold">Notes:</span> {selectedDeposit.notes}
                      </p>
                    )}
                  </div>

                  {/* Approve / Reject Buttons */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => approveDeposit(selectedDeposit._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectDeposit(selectedDeposit._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-red-500">Failed to load deposit details.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Deposits;
