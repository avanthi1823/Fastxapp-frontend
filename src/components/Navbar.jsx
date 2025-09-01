import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const roleId = parseInt(localStorage.getItem("roleId"));
  const location = useLocation(); // 👈 Get current path

  // Helper to check if a path is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #ffdfdfff, #ffaaaaff)", // red gradient
        minHeight: "10px",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand with Logo */}
        <Link className="navbar-brand d-flex align-items-center text-white" to="/">
          <img
            src="/logo.png"
            alt="FastXpress Logo"
            style={{ height: "60px", marginRight: "10px" }}
          />
          <span
            style={{
              fontSize: "35px",
              fontWeight: "900",
              color: "#d32f2f",
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "1px",
            }}
          >
            FastXpress
          </span>
        </Link>

        {/* Right Side Buttons */}
        <div className="d-flex align-items-center">
          {!token && (
            <>
              <Link
                className={`btn me-2 ${isActive("/home") ? "btn-light" : "btn-outline-light"}`}
                to="/home"
              >
                Home
              </Link>
              <Link
                className={`btn me-2 ${isActive("/login") ? "btn-light" : "btn-outline-light"}`}
                to="/login"
              >
                Login
              </Link>
              <Link
                className={`btn ${isActive("/register") ? "btn-light" : "btn-outline-light"}`}
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {token && roleId === 1 && (
            <div className="dropdown me-2">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/admin-dashboard/overview") ? "active" : ""}`}
                    to="/admin-dashboard/overview"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/admin-dashboard/users") ? "active" : ""}`}
                    to="/admin-dashboard/users"
                  >
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/admin-dashboard/operators") ? "active" : ""}`}
                    to="/admin-dashboard/operators"
                  >
                    Manage Operators
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/admin-dashboard/bookings") ? "active" : ""}`}
                    to="/admin-dashboard/bookings"
                  >
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/admin-dashboard/routes") ? "active" : ""}`}
                    to="/admin-dashboard/routes"
                  >
                    Manage Routes
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* ================= USER ================= */}
          {token && roleId === 2 && (
            <div className="dropdown me-2">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Dashboard
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/user-dashboard/bookings") ? "active" : ""}`}
                    to="/user-dashboard/bookings"
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/user-dashboard/quickbook") ? "active" : ""}`}
                    to="/user-dashboard/quickbook"
                  >
                    Quick Book
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/user-dashboard/profile") ? "active" : ""}`}
                    to="/user-dashboard/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/user-dashboard/payments") ? "active" : ""}`}
                    to="/user-dashboard/payments"
                  >
                    Payments
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* ================= OPERATOR ================= */}
          {token && roleId === 3 && (
            <Link
              className={`btn me-2 ${isActive("/operator-dashboard") ? "btn-light" : "btn-outline-light"}`}
              to="/operator-dashboard"
            >
              Operator Dashboard
            </Link>
          )}

          {/* ================= LOGOUT ================= */}
          {token && (
            <button
              className="btn btn-dark"
              style={{ backgroundColor: "#000000ff", border: "none" }}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
