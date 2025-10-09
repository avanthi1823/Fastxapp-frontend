import React, { useEffect, useState, useMemo } from "react";
import {
  FaUsers,
  FaBus,
  FaChartBar,
  FaRoute,
} from "react-icons/fa";
import adminService from '../../../services/adminService';

import UserChart from "./charts/UserChart";
import { BookingLineChart, TopRoutesBarChart } from './charts/BookingChart';

export default function DashboardOverview() {
  const [users, setUsers] = useState([]);
  const [operators, setOperators] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    adminService.getUsers().then(setUsers);
    adminService.getOperators().then(setOperators);
    adminService.getBookings().then(setBookings);
    adminService.getRoutes().then(setRoutes);
  }, []);

  // Compute top routes based on bookings
  const topRoutes = useMemo(() => {
    const routeCounts = bookings.reduce((acc, b) => {
      const routeKey = `${b.origin|| "Unknown"} → ${b.destination || "Unknown"}`;
      acc[routeKey] = (acc[routeKey] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [bookings]);

  return (
    <div>
      {/* KPI CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaUsers className="me-3 fs-2" />
              <div>
                <h5 className="card-title mb-0">Users</h5>
                <h3>{users.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaBus className="me-3 fs-2" />
              <div>
                <h5 className="card-title mb-0">Operators</h5>
                <h3>{operators.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaChartBar className="me-3 fs-2" />
              <div>
                <h5 className="card-title mb-0">Bookings</h5>
                <h3>{bookings.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-info shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaRoute className="me-3 fs-2" />
              <div>
                <h5 className="card-title mb-0">Routes</h5>
                <h3>{routes.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">User Growth</div>
            <div className="card-body">
              <UserChart users={users} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Booking Trends & Top Routes</div>
            <div className="card-body">
              <BookingLineChart bookings={bookings} />
              <TopRoutesBarChart topRoutes={topRoutes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
