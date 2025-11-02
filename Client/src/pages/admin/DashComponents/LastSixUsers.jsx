import React from "react";

const LastSixUsers = () => {
  const lastUsers = []; // Populate using Redux later

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
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>{/* Map over lastUsers and create rows */}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LastSixUsers;
