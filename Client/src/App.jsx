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
import AllTickets from "./pages/admin/AllTickets";
import TicketDetails from "./pages/admin/DashComponents/TicketDetails";
import NotFound from "./pages/NotFound";
import DepositPage from "./pages/Dashpage/DepositPage";
import ExchangePage from "./pages/Dashpage/ExchangePage";
import WithdrawalPage from "./pages/Dashpage/WithdrawalPage";
import AdminWithdrawalMethods from "./pages/admin/AdminWithdrawalMethods";
import ProfilePage from "./pages/Dashpage/ProfilePage";


const App = () => {
  const token = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* NEW ADMIN LOGIN ROUTE */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* User Protected Routes */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exchange"
        element={
          <ProtectedRoute>
            <ExchangePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deposit"
        element={
          <ProtectedRoute>
            <DepositPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/withdraw"
        element={
          <ProtectedRoute>
            <WithdrawalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send"
        element={
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request"
        element={
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <DashboardTickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/contact-us"
        element={
          <ProtectedRoute>
            <ContactUsForm />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/deposits"
        element={
          <ProtectedRoute>
            <Deposits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/withdrawals"
        element={
          <ProtectedRoute>
            <Withdrawals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/custom-rates"
        element={
          <ProtectedRoute>
            <CustomRates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/deposit-methods"
        element={
          <ProtectedRoute>
            <DepositMethods />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/all-tickets"
        element={
          <ProtectedRoute>
            <AllTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ticket/:id"
        element={
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/withdraw-methods"
        element={
          <ProtectedRoute>
            <AdminWithdrawalMethods/>
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
