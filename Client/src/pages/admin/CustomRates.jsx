import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRate, setEditRate] = useState(null);

  const [formData, setFormData] = useState({
    fromCurrency: "",
    toCurrency: "",
    rate: "",
  });

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Fetch all rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(`${URL}/admin/rates`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRates(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setRates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [URL, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add rate
  const handleAddRate = async () => {
    try {
      const res = await axios.post(`${URL}/rates/add-rate`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRates([res.data.rate, ...rates]);
      setShowAddModal(false);
      setFormData({ fromCurrency: "", toCurrency: "", rate: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add rate");
    }
  };

  // Edit rate
  const handleEditRate = async () => {
    try {
      const res = await axios.put(
        `${URL}/rates/edit-rate/${editRate._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRates(
        rates.map((r) => (r._id === editRate._id ? res.data.rate : r))
      );
      setShowEditModal(false);
      setEditRate(null);
      setFormData({ fromCurrency: "", toCurrency: "", rate: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to update rate");
    }
  };

  // Delete rate
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/rates/delete-rate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRates(rates.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete rate");
    }
  };

  const openEditModal = (rate) => {
    setEditRate(rate);
    setFormData({
      fromCurrency: rate.fromCurrency,
      toCurrency: rate.toCurrency,
      rate: rate.rate,
    });
    setShowEditModal(true);
  };

  // Fancy loading animation
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        </div>
      </div>
    );

  return (
    <div className="mt-8 mx-4 h-[calc(100vh-64px)] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Custom Rates</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Rate
        </button>
      </div>

      {/* Rates Table */}
      {rates.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No custom rates found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Large screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Rate</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rates.map((rate) => (
                  <tr key={rate._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{rate.fromCurrency}</td>
                    <td className="px-6 py-3">{rate.toCurrency}</td>
                    <td className="px-6 py-3">{rate.rate}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => openEditModal(rate)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rate._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screens */}
          <div className="lg:hidden flex flex-col gap-3">
            {rates.map((rate) => (
              <div
                key={rate._id}
                className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-2"
              >
                <p>
                  <strong>From:</strong> {rate.fromCurrency}
                </p>
                <p>
                  <strong>To:</strong> {rate.toCurrency}
                </p>
                <p>
                  <strong>Rate:</strong> {rate.rate}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openEditModal(rate)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rate._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-blue-100 bg-opacity-30 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          ></div>

          <div className="relative bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md shadow-lg z-10">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-4">Add Custom Rate</h3>

            <input
              type="text"
              placeholder="From Currency"
              name="fromCurrency"
              value={formData.fromCurrency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="To Currency"
              name="toCurrency"
              value={formData.toCurrency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="number"
              placeholder="Rate"
              name="rate"
              value={formData.rate}
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
                onClick={handleAddRate}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-blue-100 bg-opacity-30 backdrop-blur-md"
            onClick={() => setShowEditModal(false)}
          ></div>

          <div className="relative bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md shadow-lg z-10">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-4">Edit Custom Rate</h3>

            <input
              type="text"
              placeholder="From Currency"
              name="fromCurrency"
              value={formData.fromCurrency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="To Currency"
              name="toCurrency"
              value={formData.toCurrency}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="number"
              placeholder="Rate"
              name="rate"
              value={formData.rate}
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
                onClick={handleEditRate}
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

export default CustomRates;
