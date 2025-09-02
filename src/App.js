// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SeatSelection from "./pages/SeatSelection.jsx";
import Payments from "./pages/dashboards/user/Payments.jsx"; // ✅ match your actual filename

// Dashboards
import UserDashboard from "./pages/dashboards/UserDashboard.jsx";
import AdminDashboard from "./pages/dashboards/admin/AdminDashboard.jsx";
import OperatorDashboard from "./pages/dashboards/OperatorDashboard.jsx";

// User sub-pages
import MyBookings from "./pages/dashboards/user/MyBookings.jsx";
import BookingDetails from "./pages/dashboards/user/BookingDetails.jsx";
import QuickBook from "./pages/dashboards/user/QuickBook.jsx";
import Profile from "./pages/dashboards/user/Profile.jsx";

// Styles
import "bootstrap-icons/font/bootstrap-icons.css";

// -------------------- Protected Route --------------------
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const roleId = parseInt(localStorage.getItem("roleId"));

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(roleId)) return <Navigate to="/login" replace />;
  return children;
}

// -------------------- App --------------------
export default function App() {
  const [bookedSeats, setBookedSeats] = useState([]);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<SearchResults />} />

        {/* Seat Selection */}
        <Route path="/seats" element={<SeatSelection />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/user-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested user pages */}
          <Route path="bookings" element={<MyBookings />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
          <Route path="quickbook" element={<QuickBook setBookedSeats={setBookedSeats} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payments" element={<Payments />} /> {/* ✅ Payments page */}
        </Route>

        {/* OPERATOR DASHBOARD */}
        <Route
          path="/operator-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
