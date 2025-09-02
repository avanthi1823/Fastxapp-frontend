import React, { useState, useEffect } from "react";
import UserChart from "./UserChart";
import { BookingLineChart, TopRoutesBarChart } from "./BookingChart";
import adminService from "../../services/adminService";

export default function DashboardCharts() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [u, b] = await Promise.all([
        adminService.getUsers(),
        adminService.getBookings(),
      ]);
      setUsers(u || []);
      setBookings(b || []);
    }
    loadData();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <h5>User Distribution</h5>
        <UserChart users={users} />
      </div>
      <div className="col-md-6">
        <h5>Booking Trends</h5>
        <BookingLineChart bookings={bookings} />
      </div>
      <div className="col-12">
        <h5>Top Routes</h5>
        <TopRoutesBarChart bookings={bookings} />
      </div>
    </div>
  );
}
