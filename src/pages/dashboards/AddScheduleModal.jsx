// src/pages/dashboards/AddScheduleModal.jsx
import React, { useState } from "react";
import operatorService from "../../services/operatorService";

export default function AddScheduleModal({ buses = [], onClose, onSaved }) {
  const [busId, setBusId] = useState("");
  const [routeId, setRouteId] = useState(""); 
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [fare, setFare] = useState("");
const handleSave = async () => {
  if (!busId || !routeId || !departureTime || !arrivalTime || !fare) {
    alert("All fields are required");
    return;
  }

  try {
    await operatorService.addSchedule({
      busId: Number(busId),         
      routeId: Number(routeId),     
      departureTime,
      arrivalTime,
      fare: Number(fare),           
    });
        alert("✅ Schedule added successfully!");
    onSaved();
    onClose();
  } catch (e) {
    console.error("Schedule add failed:", e.response?.data || e.message);
    alert("Failed to add schedule. Check console for details.");
  }
};


  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">➕ Add Schedule</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            
            {/* Bus Select */}
            <div className="mb-3">
              <label className="form-label">Select Bus</label>
              <select
                className="form-select"
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
              >
                <option value="">-- Select Bus --</option>
                {buses.map((b) => (
                  <option key={b.busId} value={b.busId}>
                    {b.busName} ({b.busNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Route Id Input */}
            <div className="mb-3">
              <label className="form-label">Route ID</label>
              <input
                type="number"
                className="form-control"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                placeholder="Enter Route ID"
              />
            </div>

            {/* Departure */}
            <div className="mb-3">
              <label className="form-label">Departure Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </div>

            {/* Arrival */}
            <div className="mb-3">
              <label className="form-label">Arrival Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </div>

            {/* Fare */}
            <div className="mb-3">
              <label className="form-label">Fare (₹)</label>
              <input
                type="number"
                className="form-control"
                value={fare}
                onChange={(e) => setFare(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
