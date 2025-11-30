import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminScrollBar from "../adminDashboard/AdminScrollBar";

const TicketDetails = () => {
  const { id } = useParams(); // ticket ID from route
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Check for token
  useEffect(() => {
    if (!token) {
      alert("Token not found! Please login again.");
      navigate("/admin-login");
    }
  }, [token, navigate]);

  // Fetch ticket details
  const fetchTicket = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/admin/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTicket(data.ticket);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Ticket not found");
      navigate("/admin/all-tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTicket();
  }, [id, token]);

  // Update ticket status
  const updateStatus = async (status) => {
    if (!window.confirm(`Are you sure you want to mark this ticket as ${status}?`)) return;

    try {
      setUpdating(true);
      await axios.put(
        `${URL}/admin/ticket/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Ticket marked as ${status}`);
      fetchTicket(); // Refresh ticket details
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6">Loading ticket details...</p>;
  if (!ticket) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminScrollBar />

      <main className="flex-1 lg:ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
          <p><strong>Ticket ID:</strong> {ticket._id}</p>
          <p><strong>User Email:</strong> {ticket.userId.email}</p>
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>Message:</strong> {ticket.message}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-sm font-semibold ${
                ticket.status === "pending"
                  ? "bg-yellow-500 text-black"
                  : ticket.status === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {ticket.status}
            </span>
          </p>

          {/* Admin Actions */}
          {ticket.status === "pending" && (
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                onClick={() => updateStatus("completed")}
                disabled={updating}
              >
                Resolve
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                onClick={() => updateStatus("rejected")}
                disabled={updating}
              >
                Reject
              </button>
            </div>
          )}

          <button
            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate("/admin/all-tickets")}
          >
            Back to Tickets
          </button>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;
