import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { roles } from "../utils/roles";


export default function Navbar() {
  const token = localStorage.getItem("token");
  const roleId = Number(localStorage.getItem("roleId")) || 0;
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "linear-gradient(90deg, rgba(255,105,105,1), rgba(255,105,105,1))", minHeight: "10px" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center text-white" to="/">
          <img src="/logon.png" alt="Logo" style={{ height: "60px", marginRight: "0px" }} />
          <span style={{ fontSize: "36px", fontWeight: "bold", fontStyle: "italic", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", letterSpacing: "1px", color: "#ffffff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
            FastXpress
          </span>
        </Link>

        <div className="d-flex align-items-center">
          {!token && (
            <>
              <Link className={`btn me-2 ${isActive("/home") ? "btn-light" : "btn-outline-light"}`} to="/home">Home</Link>
              <Link className={`btn me-2 ${isActive("/login") ? "btn-light" : "btn-outline-light"}`} to="/login">Login</Link>
              <Link className={`btn ${isActive("/register") ? "btn-light" : "btn-outline-light"}`} to="/register">Register</Link>
            </>
          )}

          {token && roleId && (
            <Link className={`btn me-2 ${isActive("/dashboard") ? "btn-light" : "btn-outline-light"}`} to={`/${roles.find(r => r.id === roleId)?.name.toLowerCase()}-dashboard`}>
              {roles.find(r => r.id === roleId)?.name} Dashboard
            </Link>
          )}

          {token && (
            <button className="btn btn-dark" onClick={() => { localStorage.clear(); navigate("/"); }}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
