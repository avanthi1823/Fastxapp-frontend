import React, { useState, useEffect } from "react";

export default function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, ...form });
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start">
        {/* Left - Profile Form */}
        <div style={{ flex: 1, marginRight: "40px" }}>
          <h3 className="fw-bold mb-4">My Profile</h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              name="email"
              value={form.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-danger px-4 mt-2" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {/* Right - Avatar */}
        <div className="text-center">
          <div
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ddd, #bbb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: "bold",
              color: "#444",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              marginBottom: "12px",
            }}
          >
            {form.fullName ? form.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <p className="text-muted fw-medium"></p>
        </div>
      </div>
    </div>
  );
}
