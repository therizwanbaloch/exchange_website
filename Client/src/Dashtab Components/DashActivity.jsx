import React from "react";

const DashActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full overflow-x-auto">
      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Recent Activity
      </h2>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium">Activity</th>
            <th className="py-3 px-4 font-medium">Amount</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* When no data */}
          <tr>
            <td
              colSpan="5"
              className="text-center text-gray-400 py-6 text-sm italic"
            >
              No recent activity found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashActivity;
