import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../Dashpage/Dashtab Components/DashboardSidebar";
import DashboardNav from "../Dashpage/Dashtab Components/DashboardNav";
import DashActivity from "../Dashpage/Dashtab Components/DashActivity";
import Steps from "../Dashpage/Dashtab Components/Steps";
import WalletCard from "../Dashpage/Dashtab Components/WalletCard";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    } else {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(`${URL}/user-data/balance`, authHeaders);
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [navigate, token]);

  const balancePKR = user?.wallet?.PKR ?? 0;
  const balanceUSD = user?.wallet?.USD ?? 0;

  // Skeleton component
  const DashboardSkeleton = () => (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 lg:p-6 animate-pulse">
      <div className="lg:w-64 w-full h-96 bg-gray-200 rounded-xl mb-6 lg:mb-0"></div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="h-16 bg-gray-200 rounded-xl mb-6 w-full"></div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 sm:flex-none h-32 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 sm:flex-none h-32 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 h-64 bg-gray-200 rounded-xl"></div>
          <div className="lg:w-1/3 h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-64 w-full">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <div className="p-4 lg:p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <WalletCard currency="PKR" amount={`₨${balancePKR}`} color="blue" className="flex-1 sm:flex-none" />
            <WalletCard currency="USD" amount={`$${balanceUSD}`} color="green" className="flex-1 sm:flex-none" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <DashActivity />
            </div>
            <div className="lg:w-1/3">
              <Steps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
