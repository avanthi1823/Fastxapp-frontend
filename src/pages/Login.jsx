import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function doLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, roleId } = await authService.login(email, password);
      const role = Number(roleId);

      localStorage.setItem("token", token);
      localStorage.setItem("roleId", role);

      switch (role) {
        case 1:
          navigate("/admin-dashboard");
          break;
        case 2:
          navigate("/user-dashboard");
          break;
        case 3:
          navigate("/operator-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="card p-4 shadow-lg" style={{ minWidth: "380px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={doLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-danger w-100">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <a href="/register" className="text-decoration-none">Register</a>
        </p>
      </div>
    </div>
  );
}
