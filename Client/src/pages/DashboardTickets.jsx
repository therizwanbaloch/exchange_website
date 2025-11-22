import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "../pages/Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../pages/Dashpage/Dashtab Components/DashboardNav";

const DashboardTickets = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [tickets, setTickets] = useState([]);
  const URL = import.meta.env.VITE_API_URL;

  // Fetch tickets with Authorization
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("You are not logged in");

        const { data } = await axios.get(`${URL}/support/my-tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(data.tickets || []);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message || "Error fetching tickets");
      }
    };

    if (user) fetchTickets();
  }, [user]);

  // Status badge classes
  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400 text-black px-2 py-1 rounded font-semibold text-sm";
      case "completed":
        return "bg-green-600 text-white px-2 py-1 rounded font-semibold text-sm";
      case "rejected":
        return "bg-red-600 text-white px-2 py-1 rounded font-semibold text-sm";
      default:
        return "bg-black text-white px-2 py-1 rounded- font-semibold text-sm";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="w-full">
          <DashboardNav />
        </div>

        {/* Tickets Section */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">PKRSPOT Support Tickets</h2>

            {tickets.length === 0 ? (
              <p className="text-gray-600">You have no support tickets.</p>
            ) : (
              <table className="min-w-full border-collapse w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left font-medium text-gray-700">Date</th>
                    <th className="p-3 text-left font-medium text-gray-700">Ticket #</th>
                    <th className="p-3 text-left font-medium text-gray-700">Status</th>
                    <th className="p-3 text-left font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">{ticket._id}</td>
                      <td className="p-3">
                        <span className={statusBadge(ticket.status)}>
                          {ticket.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => navigate(`/tickets/${ticket._id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button
              onClick={() => navigate("/contact-us")}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTickets;
