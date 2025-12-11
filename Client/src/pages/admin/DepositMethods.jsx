import React, { useEffect, useState } from "react";
import axios from "axios";

// ⭐ Memoized Modal to prevent re-render & focus loss
const Modal = React.memo(({ title, formData, handleChange, onClose, onSubmit }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    ></div>

    <div className="relative bg-white/80 backdrop-blur-xl w-full max-w-md rounded-2xl shadow-xl p-6 z-10 max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>

      <div className="space-y-2">
        <input
          type="text"
          name="gateway"
          placeholder="Gateway (e.g. USDT TRC20)"
          value={formData.gateway}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="text"
          name="currency"
          placeholder="Currency (e.g. USDT)"
          value={formData.currency}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address / Number"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="text"
          name="depositUrl"
          placeholder="Deposit URL (Optional)"
          value={formData.depositUrl}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <textarea
          name="instructions"
          placeholder="Instructions (Optional)"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          value={formData.minAmount}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          value={formData.maxAmount}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-4 py-2 border rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  </div>
));

// ⭐ Memoized Delete Modal
const DeleteModal = React.memo(({ onClose, onDelete }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    ></div>

    <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-2xl shadow-xl p-6 z-10">
      <h3 className="text-lg font-bold text-red-600 mb-4">
        Confirm Delete
      </h3>
      <p className="mb-4 text-gray-700">
        Are you sure you want to delete this deposit method?
      </p>
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 border rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
));

const DepositMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editMethod, setEditMethod] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    gateway: "",
    currency: "",
    address: "",
    depositUrl: "",
    instructions: "",
    minAmount: "",
    maxAmount: "",
  });

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`${URL}/admin/deposit-methods`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.methods || [];

        setMethods(data);
      } catch (err) {
        console.error("Error fetching deposit methods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, [URL, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      gateway: "",
      currency: "",
      address: "",
      depositUrl: "",
      instructions: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  const handleAddDeposit = async () => {
    try {
      const res = await axios.post(`${URL}/admin/deposit-method`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMethods([res.data.method, ...methods]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add deposit method");
    }
  };

  const handleEditDeposit = async () => {
    try {
      const res = await axios.put(
        `${URL}/admin/deposit-method/update/${editMethod._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMethods((prev) =>
        prev.map((m) => (m._id === editMethod._id ? res.data.method : m))
      );

      setShowEditModal(false);
      setEditMethod(null);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update deposit method");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/admin/deposit-method/delete/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMethods((prev) => prev.filter((m) => m._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete deposit method");
    }
  };

  const openEditModal = (method) => {
    setEditMethod(method);
    setFormData({
      gateway: method.gateway || "",
      currency: method.currency || "",
      address: method.address || "",
      depositUrl: method.depositUrl || "",
      instructions: method.instructions || "",
      minAmount: method.minAmount || "",
      maxAmount: method.maxAmount || "",
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <div className="mt-8 mx-4 text-gray-700 font-bold">Loading...</div>;
  }

  return (
    <div className="mt-8 mx-4 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Deposit Methods</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          Add Deposit Method
        </button>
      </div>

      {methods.length === 0 ? (
        <div>No deposit methods found.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <strong>Address:</strong> {method.address}
              </p>
              <p>
                <strong>Min:</strong> {method.minAmount}
              </p>
              <p>
                <strong>Max:</strong> {method.maxAmount}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => openEditModal(method)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => openDeleteModal(method._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <Modal
          title="Add Deposit Method"
          formData={formData}
          handleChange={handleChange}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddDeposit}
        />
      )}

      {showEditModal && (
        <Modal
          title="Edit Deposit Method"
          formData={formData}
          handleChange={handleChange}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditDeposit}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DepositMethods;
