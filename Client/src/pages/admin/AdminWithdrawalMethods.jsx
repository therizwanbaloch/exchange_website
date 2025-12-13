import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminScrollBar from "../admin/adminDashboard/AdminScrollBar"
const AdminWithdrawalMethods = () => {
  const [methods, setMethods] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch all methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`${URL}/admin/withdraw-methods`, authHeaders);
        if (res.data.success) setMethods(res.data.methods);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch withdrawal methods");
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, [URL]);

  const addMethod = async () => {
    if (!name) return alert("Method name is required");

    try {
      await axios.post(`${URL}/admin/withdraw-method`, { name }, authHeaders);
      setName("");
      setShowAddModal(false);
      setMethods([{ name, _id: Date.now() }, ...methods]); 
    } catch (err) {
      console.error(err);
      alert("Failed to add method");
    }
  };

  const deleteMethod = async (id) => {
    if (!window.confirm("Delete this withdrawal method?")) return;

    try {
      await axios.delete(`${URL}/admin/withdraw-method/delete/${id}`, authHeaders);
      setMethods(methods.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete method");
    }
  };

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block w-64">
        <AdminScrollBar />
      </div>

      {/* Main */}
      <div className="flex-1 p-5 lg:p-10 mt-4 lg:mt-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Withdrawal Methods</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Method
          </button>
        </div>

        {/* Methods list */}
        {methods.length === 0 ? (
          <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
            No withdrawal methods found.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Large screens */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3">Method Name</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {methods.map((method) => (
                    <tr key={method._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">{method.name}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => deleteMethod(method._id)}
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

            {/* Mobile screens */}
            <div className="lg:hidden flex flex-col gap-3">
              {methods.map((method) => (
                <div
                  key={method._id}
                  className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                >
                  <p className="font-semibold">{method.name}</p>
                  <button
                    onClick={() => deleteMethod(method._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg z-10">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                ×
              </button>
              <h3 className="text-lg font-bold mb-4">Add Withdrawal Method</h3>
              <input
                type="text"
                placeholder="Method Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  onClick={addMethod}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawalMethods;
