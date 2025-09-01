import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "Male",
    phone: "",
    roleId: 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentImage, setCurrentImage] = useState("/bus.jpg"); // start with first image
  const navigate = useNavigate();

  // Slideshow effect
  useEffect(() => {
    const images = ["/bus.jpg", "/offers.png"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await authService.register(form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (e) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row shadow-lg bg-white rounded overflow-hidden">
          {/* Left Slideshow Section */}
          <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center p-0"
     style={{
       height: "520px",               // fixed height
       maxHeight: "150vh",            // responsive max
     }}>
            <img
              src={currentImage}
              alt="Slideshow"
              className="img-fluid w-100 h-100"
              style={{
                objectFit: "cover",        // ensures the image fills the container
                transition: "opacity 1s",  // smooth fade transition
              }}
            />
          </div>

          {/* Right Form Section */}
          <div className="col-md-6 p-5">
            <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={submit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Register As</label>
                  <select
                    className="form-select"
                    name="roleId"
                    value={form.roleId}
                    onChange={onChange}
                  >
                    <option value={1}>User</option>
                    <option value={2}>Operator</option>
                    <option value={3}>Admin</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-danger w-100" disabled={!!success}>
                Register
              </button>
            </form>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
