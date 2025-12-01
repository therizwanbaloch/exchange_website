import React, { useEffect, useState } from "react";
import axios from "axios";

const LastSixUsers = () => {
  const [lastUsers, setLastUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="mt-8 mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recently Registered Users
        </h2>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Recently Registered Users
      </h2>

      {lastUsers.length === 0 ? (
        <div className="text-center py-6 bg-gray-100 text-gray-700 rounded-md shadow-sm">
          No users registered yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-sm">
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
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LastSixUsers;
