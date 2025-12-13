import React, { useState, useEffect } from "react";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";
import axios from "axios";

const ExchangePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fromCurrency, setFromCurrency] = useState("PKR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCalculate = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    if (amount > user.wallet[fromCurrency]) {
      alert(`Insufficient ${fromCurrency} balance`);
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/transactions/calculate`,
        { from: fromCurrency, to: toCurrency, amount },
        authHeaders
      );
      setReceiveAmount(res.data.receiveAmount.toFixed(2));
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate exchange");
    }
  };

  const confirmExchange = async () => {
    try {
      await axios.post(
        `${URL}/transactions/exchange`,
        { from: fromCurrency, to: toCurrency, amount },
        authHeaders
      );
      alert("Exchange successful!");
      setAmount("");
      setModalOpen(false);

      const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Exchange failed!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <div className="p-5 lg:p-10 flex-1 flex flex-col items-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center bg-blue-500 w-full py-4 rounded-lg shadow-lg">
            Wallet Exchange
          </h1>

          {/* Exchange Card */}
          <div className="w-full bg-blue-500 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 max-w-full lg:max-w-3xl">
            {/* Wallet Info */}
            <div className="flex justify-between text-white font-semibold mb-4 text-sm sm:text-base">
              <div>PKR: <span className="font-bold">{user.wallet.PKR}</span></div>
              <div>USD: <span className="font-bold">{user.wallet.USD}</span></div>
            </div>

            {/* From Currency */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">From</label>
              <select
                className="px-4 py-3 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white focus:text-black transition"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* To Currency */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">To</label>
              <select
                className="px-4 py-3 rounded-lg bg-transparent border border-white text-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white focus:text-black transition"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Amount</label>
              <input
                type="number"
                placeholder={`Enter amount in ${fromCurrency}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white focus:text-black transition"
              />
            </div>

            {/* Exchange Button */}
            <button
              onClick={handleCalculate}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-lg"
            >
              Calculate & Exchange
            </button>
          </div>

          {/* Modal Confirmation */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div
                className="absolute inset-0 backdrop-blur-md bg-black/40"
                onClick={() => setModalOpen(false)}
              ></div>

              <div className="relative bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-blue-300 animate-scaleUp">
                <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">
                  Confirm Exchange
                </h2>
                <p className="mb-3 text-gray-700 text-center">
                  Exchanging <span className="font-semibold">{amount} {fromCurrency}</span> to <span className="font-semibold">{toCurrency}</span>.
                </p>
                <p className="mb-6 text-gray-700 text-center">
                  You will receive: <span className="font-bold text-green-600">{receiveAmount} {toCurrency}</span>
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-1/2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmExchange}
                    className="w-1/2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
