import React, { useEffect, useState } from "react";
import axios from "axios";

const DepositMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMethod, setEditMethod] = useState(null);

  const [formData, setFormData] = useState({
    gateway: "",
    currency: "",
    minAmount: "",
    maxAmount: "",
  });

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Fetch all deposit methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`${URL}/admin/deposit-methods`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMethods(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setMethods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, [URL, token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add deposit method
  const handleAddDeposit = async () => {
    try {
      const res = await axios.post(`${URL}/admin/deposit-method`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods([res.data.method, ...methods]);
      setShowAddModal(false);
      setFormData({ gateway: "", currency: "", minAmount: "", maxAmount: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add deposit method");
    }
  };

  // Edit deposit method
  const handleEditDeposit = async () => {
    try {
      const res = await axios.put(
        `${URL}/admin/deposit-method/${editMethod._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMethods(
        methods.map((m) => (m._id === editMethod._id ? res.data.method : m))
      );
      setShowEditModal(false);
      setEditMethod(null);
      setFormData({ gateway: "", currency: "", minAmount: "", maxAmount: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to update deposit method");
    }
  };

  // Open edit modal
  const openEditModal = (method) => {
    setEditMethod(method);
    setFormData({
      gateway: method.gateway,
      currency: method.currency,
      minAmount: method.minAmount,
      maxAmount: method.maxAmount,
    });
    setShowEditModal(true);
  };

  if (loading)
    return <div className="mt-8 mx-4 text-gray-700 font-bold">Loading...</div>;

  return (
    <div className="mt-8 mx-4 h-[calc(100vh-64px)] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Deposit Methods</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Deposit Method
        </button>
      </div>

      {/* Methods Table */}
      {methods.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No deposit methods found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Large screens: Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">Gateway</th>
                  <th className="px-6 py-3">Currency</th>
                  <th className="px-6 py-3">Min Amount</th>
                  <th className="px-6 py-3">Max Amount</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {methods.map((method) => (
                  <tr key={method._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{method.gateway}</td>
                    <td className="px-6 py-3">{method.currency}</td>
                    <td className="px-6 py-3">{method.minAmount}</td>
                    <td className="px-6 py-3">{method.maxAmount}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => openEditModal(method)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screens: Card layout */}
          <div className="lg:hidden flex flex-col gap-3">
            {methods.map((method) => (
              <div
                key={method._id}
                className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-2"
              >
                <p>
                  <strong>Gateway:</strong> {method.gateway}
                </p>
                <p>
                  <strong>Currency:</strong> {method.currency}
                </p>
                <p>
                  <strong>Min Amount:</strong> {method.minAmount}
                </p>
                <p>
                  <strong>Max Amount:</strong> {method.maxAmount}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openEditModal(method)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glassy Overlay for Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-blue-100 bg-opacity-30 backdrop-blur-md"></div>
          <div className="relative bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md shadow-lg z-10">
            <h3 className="text-lg font-bold mb-4">Add Deposit Method</h3>
            <input
              type="text"
              placeholder="Gateway"
              name="gateway"
              value={formData.gateway}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Min Amount"
              name="minAmount"
              value={formData.minAmount}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max Amount"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDeposit}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glassy Overlay for Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-blue-100 bg-opacity-30 backdrop-blur-md"></div>
          <div className="relative bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md shadow-lg z-10">
            <h3 className="text-lg font-bold mb-4">Edit Deposit Method</h3>
            <input
              type="text"
              placeholder="Gateway"
              name="gateway"
              value={formData.gateway}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Min Amount"
              name="minAmount"
              value={formData.minAmount}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max Amount"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDeposit}
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositMethods;
