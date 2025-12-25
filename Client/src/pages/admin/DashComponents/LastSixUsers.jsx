import React, { useEffect, useState } from "react";
import axios from "axios";

const LastSixUsers = () => {
  const [lastUsers, setLastUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For modal

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${URL}/admin/recent-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLastUsers(Array.isArray(res.data) ? res.data.slice(0, 6) : []);
      } catch (err) {
        console.error(err);
        setLastUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [URL]);

  if (loading) {
    return (
      <div className="mt-8 px-2 sm:px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recently Registered Users
        </h2>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 px-2 sm:px-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Recently Registered Users
      </h2>

      {lastUsers.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No users registered yet.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto rounded-md shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lastUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 break-words">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden flex flex-col gap-3">
            {lastUsers.map((user) => (
              <div
                key={user._id}
                className="p-3 bg-white rounded shadow flex flex-col gap-2"
              >
                <p className="break-words"><strong>Email:</strong> {user.email}</p>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-max"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-center">
              User Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              {selectedUser.name && <p><strong>Name:</strong> {selectedUser.name}</p>}
              {selectedUser.createdAt && (
                <p><strong>Registered At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              )}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LastSixUsers;
