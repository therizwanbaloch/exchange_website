import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";

const DepositPage = () => {
  const navigate = useNavigate();
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`${URL}/transactions/gateways`, authHeaders);
        setMethods(res.data.methods || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load deposit methods");
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, []);

  const fetchMethodDetails = async (id) => {
    try {
      const res = await axios.get(`${URL}/transactions/gateway/${id}`, authHeaders);
      setSelectedMethod(res.data.method);
      setDetailsOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch method details");
    }
  };

  const submitDeposit = async () => {
    if (!amount || !transactionId) {
      alert("Please enter valid amount & transaction ID");
      return;
    }
    try {
      const res = await axios.post(
        `${URL}/transactions/deposit`,
        { methodId: selectedMethod._id, amount, transactionId },
        authHeaders
      );
      alert(res.data.message || "Deposit created successfully!");
      setAmount("");
      setTransactionId("");
      setModalOpen(false);
      setDetailsOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  // Copy wallet address to clipboard
  const handleCopyAddress = () => {
    if (selectedMethod?.address) {
      navigator.clipboard.writeText(selectedMethod.address);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 1000); // disappear after 1s
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <div className="p-5 lg:p-10 flex-1">
          <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
            Available Deposit Methods
          </h1>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse p-6 bg-white rounded-2xl shadow space-y-3"
                >
                  <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : methods.length === 0 ? (
            <p className="text-center text-gray-600">No deposit methods found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {methods.map((m) => (
                <div
                  key={m._id}
                  onClick={() => fetchMethodDetails(m._id)}
                  className="cursor-pointer p-6 bg-blue-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                >
                  <h2 className="text-xl font-semibold mb-2">{m.gateway}</h2>
                  <p className="text-white/80 text-sm">Click to view details</p>
                </div>
              ))}
            </div>
          )}

          {/* Details Panel */}
          {detailsOpen && selectedMethod && (
            <div className="mt-10 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100 max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700">
                {selectedMethod.gateway}
              </h2>

              <p className="mt-2"><strong>Currency:</strong> {selectedMethod.currency}</p>

              {/* Address with overflow fix + copy icon */}
              <div className="mt-2">
                <strong>Address:</strong>
                <div className="mt-1 flex gap-2 items-start bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm break-all flex-1 max-w-full">
                    {selectedMethod.address}
                  </p>
                  <FiCopy
                    className="text-gray-500 text-lg cursor-pointer hover:text-blue-600 flex-shrink-0"
                    title="Copy address"
                    onClick={handleCopyAddress}
                  />
                </div>
              </div>

              <p className="mt-2"><strong>Instructions:</strong> {selectedMethod.instructions}</p>
              <p><strong>Min:</strong> {selectedMethod.minAmount}</p>
              <p><strong>Max:</strong> {selectedMethod.maxAmount}</p>

              <div className="mt-5 flex gap-3 flex-wrap">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Create Deposit
                </button>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div
                className="absolute inset-0 backdrop-blur-md bg-black/30"
                onClick={() => setModalOpen(false)}
              ></div>

              <div className="relative bg-white/90 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl border border-blue-100">
                <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
                  Create Deposit
                </h2>

                <input
                  value={selectedMethod.gateway}
                  disabled
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100"
                />

                <input
                  value={selectedMethod.currency}
                  disabled
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100"
                />

                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Transaction ID / Hash"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                />

                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={submitDeposit}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Submit Deposit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast notification */}
          {toastVisible && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg animate-fadeInOut">
              Address copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
