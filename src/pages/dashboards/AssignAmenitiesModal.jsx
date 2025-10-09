import React, { useEffect, useState } from "react";
import operatorService from "../../services/operatorService";

export default function AssignAmenitiesModal({ bus, onClose, onSaved }) {
  const [amenities, setAmenities] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function loadAmenities() {
      try {
        const data = await operatorService.getAmenities();
        setAmenities(data || []);
      } catch (err) {
        console.error("Failed to load amenities", err);
      }
    }
    loadAmenities();
  }, []);

  const toggleAmenity = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      console.log("Assigning amenities:", bus.busId, selected);
      await operatorService.assignAmenities(bus.busId, selected);

      alert("✅ Amenities assigned successfully!");
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("Error assigning amenities", err.response || err);
      alert("❌ Failed to assign amenities. Please check logs.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign Amenities to {bus.busName}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {amenities.map((a) => (
              <div key={a.amenitiesId} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selected.includes(a.amenitiesId)}
                  onChange={() => toggleAmenity(a.amenitiesId)}
                />
                <label className="form-check-label">
                  {a.amenitiesName}
                </label>
              </div>
            ))}
            {amenities.length === 0 && (
              <p className="text-muted">No amenities available.</p>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
