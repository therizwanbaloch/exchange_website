import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./Dashpage/UserDashboard";

const App = () => {
  // const userData = useSelector((state) => state.user?.userData);
  const userData = true

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
    </Routes>
  );
};

export default App;
