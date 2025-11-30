import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminScrollBar from "./adminDashboard/AdminScrollBar";
import { useNavigate } from "react-router-dom";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(`${URL}/admin/all-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(data.tickets || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error fetching tickets");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchTickets();
    }
  }, [token, navigate]);

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-black px-2 py-1 rounded text-sm font-semibold";
      case "completed":
        return "bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold";
      case "rejected":
        return "bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold";
      default:
        return "bg-black text-white px-2 py-1 rounded text-sm font-semibold";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminScrollBar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">All Support Tickets</h1>

        {tickets.length === 0 ? (
          <p className="text-gray-600">No tickets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left font-medium text-gray-700">Date</th>
                  <th className="p-3 text-left font-medium text-gray-700">Ticket ID</th>
                  <th className="p-3 text-left font-medium text-gray-700">User Email</th>
                  <th className="p-3 text-left font-medium text-gray-700">Subject</th>
                  <th className="p-3 text-left font-medium text-gray-700">Status</th>
                  <th className="p-3 text-left font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{ticket._id}</td>
                    <td className="p-3">{ticket.userId.email}</td>
                    <td className="p-3">{ticket.subject}</td>
                    <td className="p-3">
                      <span className={statusBadge(ticket.status)}>{ticket.status}</span>
                    </td>
                    <td className="p-3">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => navigate(`/admin/ticket/${ticket._id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllTickets;
