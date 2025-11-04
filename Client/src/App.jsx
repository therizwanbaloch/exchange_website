import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/Dashpage/UserDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Deposits from "./pages/admin/Deposits";
import Withdrawals from "./pages/admin/Withdrawals";
import CustomRates from "./pages/admin/CustomRates";
import DepositMethods from "./pages/admin/DepositMethods";
import SupportTickets from "./pages/admin/SupportTickets";
import { useSelector } from "react-redux";
import useFetchUser from "./hooks/useFetchUser";

const App = () => {
 useFetchUser()
  const userData = useSelector((state) => state.user?.user);
  return (
    <Routes>
      
      <Route path="/" element={userData ? <UserDashboard /> : <LandingPage />} />

      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={userData ? <Navigate to="/" /> : <Register />}
      />
      <Route path="*" element={<Navigate to="/" />} />

      
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/deposits" element={<Deposits />} />
      <Route path="/admin/withdrawals" element={<Withdrawals />} />
      <Route path="/admin/custom-rates" element={<CustomRates />} />
      <Route path="/admin/deposit-methods" element={<DepositMethods />} />
      <Route path="/admin/support-tickets" element={<SupportTickets />} />
    </Routes>
  );
};

export default App;
