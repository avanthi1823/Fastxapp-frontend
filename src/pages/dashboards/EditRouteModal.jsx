import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import operatorService from "../../../../services/operatorService";

export default function EditRouteModal({ show, onClose, onSaved, route }) {
  const [origin, setOrigin] = useState(route.origin || route.source || "");
  const [destination, setDestination] = useState(route.destination || "");
  const [distance, setDistance] = useState(route.distance || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await operatorService.updateRoute(route.routeId, {
        Origin: origin.trim(),
        Destination: destination.trim(),
        Distance: parseFloat(distance),
      });

      onSaved(); // refresh parent list
      onClose();
    } catch (err) {
      console.error("Failed to update route:", err);
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
            <Form.Control
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Distance (km)</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
