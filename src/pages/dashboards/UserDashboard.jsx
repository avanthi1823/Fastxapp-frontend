

import React, { useEffect, useState } from "react";
import MyBookings from "./user/MyBookings";
import { useLocation } from "react-router-dom"; 
import Profile from "./user/Profile";
import Payments from "./user/Payments";
import QuickBook from "./user/QuickBook";
import { getProfile } from "../../services/userService";

export default function UserDashboard() {
   const reactLocation = useLocation();
  const [activeTab, setActiveTab] = useState("quickbook"); // ✅ Default is QuickBook
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const u = await getProfile();
      setUser(u);
    }
    load();
  }, []);
useEffect(() => {
    if (reactLocation.state?.activeTab) {
      setActiveTab(reactLocation.state.activeTab);
    }
  }, [reactLocation.state]);
  return (
    <div style={{ backgroundColor: "#f8f9faff", minHeight: "100vh" }}>
      {/* 🔴 Hero Header */}
      <div
        className="d-flex justify-content-between align-items-center px-5 py-4 text-white"
        style={{
          background: "linear-gradient(90deg, #c45c5cff, #fd7e93ff)",
          //borderBottomLeftRadius: "px",
          //borderBottomRightRadius: "20px",
            maxWidth: "1300px",  // 👈 controls the width (compress here)
      margin: "0 auto",    // 👈 centers it
      width: "100%",
      padding: "0 20px",
      marginTop:"20px",
        }}
      >
        {/* Left Side - User Greeting */}
      <div>
          <h3 className="fw-bold mb-1">Hi {user?.fullName || "Traveler"} 👋</h3>
          <p className="mb-0 opacity-75">Where do you want to travel today?</p>
        </div>

        {/* Right Side - Navigation */}
        <div>
          <button
            className={`btn me-2 ${
              activeTab === "quickbook" ? "btn-light text-danger" : "btn-outline-light"
            }`}
            onClick={() => setActiveTab("quickbook")}
          >
            <i className="bi bi-bus-front me-1"></i> Book Your Tickets
          </button>
          <button
            className={`btn me-2 ${
              activeTab === "bookings" ? "btn-light text-danger" : "btn-outline-light"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="bi bi-ticket-perforated me-1"></i> My Bookings
          </button>
          <button
            className={`btn me-2 ${
              activeTab === "payments" ? "btn-light text-danger" : "btn-outline-light"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <i className="bi bi-credit-card me-1"></i> Payments
          </button>
          <button
            className={`btn ${
              activeTab === "profile" ? "btn-light text-danger" : "btn-outline-light"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="bi bi-person-circle me-1"></i> Profile
          </button>
        </div>
      </div>

      <div className="container mt-4">
        {/* ✅ Show content based on active tab */}
        <div className="card shadow-sm border-0 p-4">
          {activeTab === "quickbook" && <QuickBook />}
          {activeTab === "bookings" && <MyBookings />}
          {activeTab === "payments" && <Payments />}
         {activeTab === "profile" && <Profile user={user} setUser={setUser} />}

        </div>
      </div>
    </div>
  );
}
