import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminScrollBar from "../adminDashboard/AdminScrollBar";

const TicketDetails = () => {
  const { id } = useParams(); // ticket ID
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/admin-login");

    const fetchTicket = async () => {
      try {
        const { data } = await axios.get(`${URL}/support/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(data.ticket);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error fetching ticket");
        navigate("/admin/all-tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  if (loading) return <p className="p-6">Loading ticket...</p>;
  if (!ticket) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminScrollBar />
      <main className="flex-1 lg:ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <p><strong>Ticket ID:</strong> {ticket._id}</p>
          <p><strong>User Email:</strong> {ticket.userId.email}</p>
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>Message:</strong> {ticket.message}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          {ticket.adminReply && <p><strong>Admin Reply:</strong> {ticket.adminReply}</p>}
          <button
            onClick={() => navigate("/admin/all-tickets")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to All Tickets
          </button>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;
