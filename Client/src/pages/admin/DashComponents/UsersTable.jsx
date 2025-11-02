import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const UsersTable = ({ users = [] }) => {
  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 flex gap-2 sm:gap-3">
                        <button className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition-all text-sm sm:text-base">
                          <FiEdit />
                          Edit
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all text-sm sm:text-base">
                          <FiTrash2 />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
