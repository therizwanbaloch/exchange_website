import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardTickets from "./pages/DashboardTickets";
import ContactUsForm from "./pages/ContactUsForm";
import ComingSoon from "./pages/ComingSoon";
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
import AllTickets from "./pages/admin/AllTickets";
import NotFound from "./pages/NotFound";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const userData = useSelector((state) => state.user.user);
  return userData ? children : <Navigate to="/" replace />;
};

const App = () => {
  useFetchUser();
  const userData = useSelector((state) => state.user.user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={userData ? <Navigate to="/user-dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={userData ? <Navigate to="/user-dashboard" replace /> : <Login />} />
      <Route path="/register" element={userData ? <Navigate to="/user-dashboard" replace /> : <Register />} />

      {/* Protected Routes */}
      <Route
        path="/user-dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/deposit"
        element={
          <PrivateRoute>
            <ComingSoon />
          </PrivateRoute>
        }
      />
      <Route
        path="/withdraw"
        element={
          <PrivateRoute>
            <ComingSoon />
          </PrivateRoute>
        }
      />
      <Route
        path="/send"
        element={
          <PrivateRoute>
            <ComingSoon />
          </PrivateRoute>
        }
      />
      <Route
        path="/request"
        element={
          <PrivateRoute>
            <ComingSoon />
          </PrivateRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <PrivateRoute>
            <DashboardTickets />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact-us"
        element={
          <PrivateRoute>
            <ContactUsForm />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/deposits" element={<Deposits />} />
      <Route path="/admin/withdrawals" element={<Withdrawals />} />
      <Route path="/admin/custom-rates" element={<CustomRates />} />
      <Route path="/admin/deposit-methods" element={<DepositMethods />} />
      <Route path="/admin/all-tickets" element={<AllTickets />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
