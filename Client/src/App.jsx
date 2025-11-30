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


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin-login" replace />;
};

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={token ? <Navigate to="/user-dashboard" replace /> : <LandingPage />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/user-dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/user-dashboard" replace /> : <Register />}
      />

      {/* User Protected Routes */}
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
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/deposits"
        element={
          <AdminRoute>
            <Deposits />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/withdrawals"
        element={
          <AdminRoute>
            <Withdrawals />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/custom-rates"
        element={
          <AdminRoute>
            <CustomRates />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/deposit-methods"
        element={
          <AdminRoute>
            <DepositMethods />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/all-tickets"
        element={
          <AdminRoute>
            <AllTickets />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/ticket/:id"
        element={
          <AdminRoute>
            <TicketDetails />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
