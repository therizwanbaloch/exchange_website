import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "../pages/Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../pages/Dashpage/Dashtab Components/DashboardNav";

const DashboardTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Modal states
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const { data } = await axios.get(`${URL}/support/my-tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(data?.tickets || []);
      } catch (err) {
        console.error("Fetch tickets error:", err);
        alert(
          err?.response?.data?.message ||
            err.message ||
            "Error fetching tickets"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate, URL]);

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400 text-black px-2 py-1 rounded font-semibold text-sm";
      case "completed":
        return "bg-green-600 text-white px-2 py-1 rounded font-semibold text-sm";
      case "rejected":
        return "bg-red-600 text-white px-2 py-1 rounded font-semibold text-sm";
      default:
        return "bg-gray-800 text-white px-2 py-1 rounded font-semibold text-sm";
    }
  };

  // 🔹 Open modal
  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // 🔹 Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-64 w-full shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              PKRSPOT Support Tickets
            </h2>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 bg-gray-100 p-4 rounded"
                  >
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <p className="text-gray-600">You have no support tickets.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Ticket #</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id} className="border-b">
                        <td className="p-3">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 break-all">{ticket._id}</td>
                        <td className="p-3">
                          <span className={statusBadge(ticket.status)}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => openModal(ticket)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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

            <button
              onClick={() => navigate("/contact-us")}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* 🔮 Glassmorphism Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl w-[90%] max-w-lg p-6 text-white relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Support Ticket Details</h3>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Ticket ID:</span>{" "}
                {selectedTicket._id}
              </p>

              <p>
                <span className="font-semibold">Subject:</span>{" "}
                {selectedTicket.subject}
              </p>

              <p>
                <span className="font-semibold">Message:</span>{" "}
                {selectedTicket.message}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className={statusBadge(selectedTicket.status)}>
                  {selectedTicket.status}
                </span>
              </p>

              <p>
                <span className="font-semibold">Admin Reply:</span>{" "}
                {selectedTicket.adminReply || "No reply yet"}
              </p>

              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(selectedTicket.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTickets;
