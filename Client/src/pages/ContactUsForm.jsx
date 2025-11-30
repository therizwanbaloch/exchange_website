import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../pages/Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../pages/Dashpage/Dashtab Components/DashboardNav";

const ContactUsForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) return alert("All fields are required!");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${URL}/support/create-ticket`,
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.ticket) {
        setSuccess(true);
        setSubject("");
        setMessage("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
    
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      
      <div className="flex-1 flex flex-col">
        
        <div className="w-full">
          <DashboardNav />
        </div>

        
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">PKRSPOT Contact Us</h2>

            {success ? (
              <div className="flex flex-col gap-4">
                <p className="text-green-600">
                  Your ticket has been submitted successfully! We will get back to
                  you soon.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-max"
                >
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="p-2 border rounded w-full"
                  required
                />
                <textarea
                  placeholder="Describe your issue here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 border rounded h-32 w-full"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Ticket"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
