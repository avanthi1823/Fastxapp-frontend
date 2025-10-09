import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminService from "../../../../services/adminService";

export default function EditRouteModal({ show, onClose, route, onUpdated }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show && route) {
      setOrigin(route.origin || "");
      setDestination(route.destination || "");
    }
  }, [route, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!route) return;

    setLoading(true);
    setError("");

    try {
      await adminService.updateRoute(route.routeId, {
        origin: origin.trim(),
        destination: destination.trim(),
      });

      onUpdated(); 
      onClose();
    } catch (err) {
      console.error("Update failed:", err.response || err);
      setError(err.response?.data?.message || err.message || "Failed to update route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Route</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Origin</Form.Label>
            <Form.Control type="text" value={origin} onChange={e => setOrigin(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Control type="text" value={destination} onChange={e => setDestination(e.target.value)} required />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

 
