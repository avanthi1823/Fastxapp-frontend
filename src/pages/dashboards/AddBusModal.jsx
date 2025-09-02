import React, { useState } from "react";
import operatorService from "../../services/operatorService";

export default function AddBusModal({ onClose, onSaved }) {
  const [busData, setBusData] = useState({
    busName: "",
    busNumber: "",
    busTypeId: "",
    numberOfSeats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  const handleSave = async () => {
    try {
   
      const payload = {
        ...busData,
        busTypeId: parseInt(busData.busTypeId, 10),
        numberOfSeats: parseInt(busData.numberOfSeats, 10),
      };

 
      if (!payload.busName || !payload.busNumber || isNaN(payload.busTypeId) || isNaN(payload.numberOfSeats)) {
        alert("❌ Please fill all fields correctly.");
        return;
      }

      await operatorService.addBus(payload);
      alert("✅ Bus added successfully!");
      onSaved(); // refresh data
      onClose();
    } catch (err) {
      console.error("Error adding bus", err);
      alert(
        err.response?.data?.message || "❌ Failed to add bus. Please check the data."
      );
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Bus</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="busName"
              placeholder="Bus Name"
              value={busData.busName}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="busNumber"
              placeholder="Bus Number"
              value={busData.busNumber}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="number"
              name="busTypeId"
              placeholder="Bus Type ID"
              value={busData.busTypeId}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="number"
              name="numberOfSeats"
              placeholder="Number of Seats"
              value={busData.numberOfSeats}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
