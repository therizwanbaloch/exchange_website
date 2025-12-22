import React, { useState, useEffect } from "react";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import axios from "axios";

const WithdrawalPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("PKR");
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // ✅ new state
  const [amount, setAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get(`${URL}/user-data/balance`, authHeaders);
        if (resUser.data.success) setUser(resUser.data.user);

        const resMethods = await axios.get(`${URL}/admin/withdraw-methods`, authHeaders);
        if (resMethods.data.success) {
          setMethods(resMethods.data.methods);
          if (resMethods.data.methods.length > 0) {
            setSelectedMethod(resMethods.data.methods[0]._id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading wallet...</p>
      </div>
    );
  }

  const afterFeeAmount = amount && !isNaN(amount) ? (parseFloat(amount) * 0.99).toFixed(2) : "0.00";

  const handleWithdraw = () => {
    if (!amount || isNaN(amount) || amount <= 0) return alert("Enter a valid amount");
    if (amount > user.wallet[wallet]) return alert(`Insufficient ${wallet} balance`);
    if (!holderName) return alert("Holder name is required");
    if (!accountNumber) return alert("Account number is required"); // ✅ validation
    setModalOpen(true);
  };

  const confirmWithdraw = async () => {
    try {
      await axios.post(
        `${URL}/transactions/withdraw`,
        {
          wallet,
          methodName: selectedMethod,
          amount: parseFloat(amount),
          holderName,
          accountNumber, 
        },
        authHeaders
      );

      alert(`Withdrawal submitted! You will receive ${afterFeeAmount} ${wallet}`);
      setAmount("");
      setHolderName("");
      setAccountNumber(""); 
      setModalOpen(false);

      const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Withdrawal failed!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col p-5 lg:p-10">
        <h1 className="text-3xl font-bold text-white mb-6 bg-blue-500 w-full py-4 text-center rounded-lg">
          Withdraw Funds
        </h1>

        {/* Instructions */}
        <div className="mb-6 max-w-3xl w-full bg-blue-600 text-white p-4 rounded-lg text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>Select wallet and withdrawal method.</li>
            <li>Enter amount to withdraw.</li>
            <li>Holder Name is <strong>mandatory</strong>.</li>
            <li>Account Number is <strong>mandatory</strong>.</li> {/* ✅ instruction */}
            <li>1% fee applies on all withdrawals (calculated automatically).</li>
          </ul>
        </div>

        <div className="w-full max-w-3xl bg-blue-500 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
          {/* Wallet */}
          <div>
            <label className="text-white">Wallet</label>
            <select
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-blue-600 text-white border border-white rounded-lg"
            >
              {Object.keys(user.wallet).map((w) => (
                <option key={w} value={w}>
                  {w} (Balance: {user.wallet[w]})
                </option>
              ))}
            </select>
          </div>

          {/* Method */}
          <div>
            <label className="text-white">Withdrawal Method</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-blue-600 text-white border border-white rounded-lg"
            >
              {methods.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Holder Name */}
          <div>
            <label className="text-white">Holder Name</label>
            <input
              type="text"
              placeholder="Enter holder name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-blue-600 text-white border border-white rounded-lg placeholder-white"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="text-white">Account Number</label>
            <input
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-blue-600 text-white border border-white rounded-lg placeholder-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-white">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full mt-1 px-4 py-3 bg-blue-600 text-white border border-white rounded-lg placeholder-white"
            />
            {amount && (
              <p className="text-sm text-white italic mt-1">
                You will receive <strong>{afterFeeAmount} {wallet}</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleWithdraw}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg"
          >
            Withdraw
          </button>
        </div>

        {/* Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Confirm Withdrawal
              </h2>

              <div className="text-center mb-4 space-y-2">
                <p>Wallet: <strong>{wallet}</strong></p>
                <p>Method: <strong>{methods.find(m => m._id === selectedMethod)?.name}</strong></p>
                <p>Account Holder: <strong>{holderName}</strong></p>
                <p>Account Number: <strong>{accountNumber}</strong></p> {/* ✅ show */}
                <p>Amount: <strong>{afterFeeAmount} {wallet}</strong></p>
                <p className="text-red-600 font-semibold">This action cannot be undone!</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmWithdraw}
                  className="w-1/2 py-2 bg-green-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalPage;
