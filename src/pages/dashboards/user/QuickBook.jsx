import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBuses } from "../../../services/busService";

export default function QuickBook() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const buses = await searchBuses(origin, destination, date);
      navigate("/results", { state: { buses, search: { origin, destination, date } } });
    } catch (e) {
      setError("No buses found. Try a different route/date.");
    } finally {
      setLoading(false);
    }
  }

  const popular = [
    { from: "Mumbai", to: "Pune", img: "/mumbai-pune.jpg" },
    { from: "Delhi", to: "Jaipur", img: "/delhi-jaipur.jpg" },
    { from: "Bengaluru", to: "Chennai", img: "/bangalore-chennai.jpg" },
  ];

  return (
    <div>
      {/* 🌆 Hero Banner */}
      <div
        className="position-relative text-center text-white mb-5"
        style={{
          backgroundImage: "url('/bus-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.55)" }}
        ></div>
        <div className="position-relative">
          <h1 className="fw-bold display-5">Book Your Journey 🚍</h1>
          <p className="lead">Search, compare and travel with ease</p>
        </div>
      </div>

      {/* 🔎 Search Card */}
      <div
        className="card shadow-lg border-0 p-4 mb-5"
        style={{ borderRadius: "20px", marginTop: "-80px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSearch} className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-semibold">From</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-geo-alt-fill text-danger"></i>
              </span>
              <input
                className="form-control"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter origin city"
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">To</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-geo-fill text-success"></i>
              </span>
              <input
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination city"
                required
              />
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Date</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-calendar-event text-primary"></i>
              </span>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn btn-danger fw-bold"
              disabled={loading}
              style={{ borderRadius: "12px" }}
            >
              {loading ? "…" : "Go"}
            </button>
          </div>
        </form>
      </div>

      {/* ✨ Popular Routes */}
      <div className="mt-5">
        <h4 className="fw-bold mb-4 text-center">
          <i className="bi bi-stars text-warning me-2"></i> Popular Routes
        </h4>
        <div className="row g-4">
          {popular.map((p, i) => (
            <div key={i} className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => {
                  setOrigin(p.from);
                  setDestination(p.to);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={p.img}
                  alt={`${p.from}-${p.to}`}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-danger">
                    {p.from} → {p.to}
                  </h6>
                  <small className="text-muted">Tap to select</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
