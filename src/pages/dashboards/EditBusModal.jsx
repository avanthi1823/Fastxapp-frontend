import React, { useState, useEffect } from "react";
import operatorService from "../../services/operatorService";

export default function EditBusModal({ bus, onClose, onSaved }) {
  const [busData, setBusData] = useState({
    BusName: "",
    BusNumber: "",
    BusTypeId: "",
    NumberOfSeats: "",
  });

  useEffect(() => {
    if (bus) {
      setBusData({
        BusName: bus.BusName ?? bus.busName,
        BusNumber: bus.BusNumber ?? bus.busNumber,
        BusTypeId: bus.BusTypeId ?? bus.busTypeId,
        NumberOfSeats: bus.NumberOfSeats ?? bus.numberOfSeats,
      });
    }
  }, [bus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await operatorService.updateBus(bus.BusId ?? bus.busId, busData);
      alert("✅ Bus updated successfully!");
      onSaved();
      onClose();
    } catch (err) {
      console.error("Error updating bus", err);
      alert("❌ Failed to update bus. Please check the data.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Bus</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="BusName"
              placeholder="Bus Name"
              value={busData.BusName}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="BusNumber"
              placeholder="Bus Number"
              value={busData.BusNumber}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="number"
              name="BusTypeId"
              placeholder="Bus Type ID"
              value={busData.BusTypeId}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="number"
              name="NumberOfSeats"
              placeholder="Number of Seats"
              value={busData.NumberOfSeats}
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
