import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminScrollBar from "../admin/adminDashboard/AdminScrollBar";

const ManageUsers = () => {
  const URL = import.meta.env.VITE_API_URL;

  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch paginated users
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/admin/users`, {
        params: { page, limit: 10 },
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.users || []);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Search users by email
  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${URL}/admin/seacrh-user`,
        { email: searchEmail.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSearchResults(res.data.users || []);
    } catch (err) {
      console.error("Error searching users:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="flex min-h-screen bg-blue-200/50">
      
      {/* Sidebar with built-in mobile hamburger */}
      <AdminScrollBar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 space-y-8 w-full">

        {/* Heading */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600 mt-1">View, search, and manage all users here.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search with email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Results Table */}
        {searchEmail && (
          <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto mt-6">
            <h2 className="text-lg font-semibold mb-3">Search Results</h2>
            {searchLoading ? (
              <p className="text-center py-6 text-gray-600">Searching...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-center py-6 text-gray-600">No users found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((u, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3">{u.name || "N/A"}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <button
                          onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Paginated Users Table */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto mt-6">
          {loading ? (
            <p className="text-center py-6 text-gray-600">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-center py-6 text-gray-600">No users available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3">{u.name || "N/A"}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <button
                        onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* User Details Modal */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-blue-100/30 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-96">
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <p><strong>Name:</strong> {selectedUser.name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Joining Date:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
