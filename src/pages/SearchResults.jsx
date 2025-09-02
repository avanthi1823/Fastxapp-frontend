// src/pages/ResultsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { buses = [], search } = location.state || {};

  if (!buses.length) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold">No buses found 🚫</h4>
        <p className="text-muted">Try another route or date.</p>
        <button className="btn btn-danger mt-3 px-4" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* 🔴 Header */}
      <div className="mb-4">
        <h3 className="fw-bold">
          {search.origin} → {search.destination}
        </h3>
        <p className="text-muted">{buses.length} buses available on {search.date}</p>
      </div>

      {/* 🚌 Bus Cards */}
      <div className="d-flex flex-column gap-4">
        {buses.map((bus, i) => (
          <div
            key={i}
            className="card shadow-sm border rounded-3 p-3"
            style={{ borderLeft: "5px solid #d32f2f" }}
          >
            <div className="row align-items-center">
              {/* Left Section */}
              <div className="col-md-6">
                <span className="badge bg-warning text-dark me-2">
                  {bus.busNumber || "TN66AP7295"}
                </span>
                <span className="badge bg-light text-dark">
                  Reaching {bus.destination} at {bus.arrivalTime}
                </span>

                <h5 className="fw-bold mt-2">{bus.busName}</h5>
                <p className="text-muted small mb-1">
                  {bus.type} ({bus.layout || "2+1"})
                </p>

                {/* Rating */}
                {bus.rating && (
                  <div className="d-inline-flex align-items-center bg-success text-white px-2 py-1 rounded">
                    <i className="bi bi-star-fill me-1"></i>
                    {bus.rating} <small className="ms-1">({bus.reviews || 100})</small>
                  </div>
                )}

                {/* Departure/Arrival */}
                <div className="mt-2">
                  <strong>{bus.departureTime}</strong> –{" "}
                  <strong>{bus.arrivalTime}</strong>
                  <span className="text-muted ms-2">
                    {bus.duration || "7h 55m"}
                  </span>
                </div>

                {/* Seats */}
                <p className="mt-1 text-danger fw-bold">
                  {bus.availableSeats} Seats left
                </p>
              </div>

              {/* Right Section */}
              <div className="col-md-6 text-end">
                <h4 className="fw-bold text-success">₹{bus.fare}</h4>
                <small className="text-muted">Onwards</small>
                <div className="mt-3">
                 
                  <button
  className="btn btn-danger mt-2 px-4"
  onClick={() => navigate("/seats", { state: { bus } })}
>
  Book Seats
</button>

                </div>
              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
