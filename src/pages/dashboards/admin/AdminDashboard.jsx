import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

// Import all admin modules
import DashboardOverview from './DashboardOverview';
import ManageUsers from './ManageUsers';
import ManageOperators from './ManageOperators';
import ManageBookings from './ManageBookings';
import ManageRoutes from './ManageRoutes';



export default function AdminDashboard() {
  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Navigation */}
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link as={NavLink} to="overview">
            Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="users">
            Manage Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="operators">
            Manage Operators
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="bookings">
            Manage Bookings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="routes">
            Manage Routes
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Page Content */}
      <div className="mt-3">
        <Routes>
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="operators" element={<ManageOperators />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="routes" element={<ManageRoutes />} />

          {/* Default redirect to overview */}
          <Route path="*" element={<Navigate to="overview" replace />} />
        </Routes>
      </div>
    </Container>
  );
}
