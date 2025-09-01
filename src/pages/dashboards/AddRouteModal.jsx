import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import operatorService from "../../../../services/operatorService";

export default function AddRouteModal({ show, onClose, onAdded }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await operatorService.addRoute({
        Origin: origin.trim(),
        Destination: destination.trim(),
        Distance: parseFloat(distance),
      });

      onAdded(); // refresh parent list
      onClose();
      setOrigin("");
      setDestination("");
      setDistance("");
    } catch (err) {
      console.error("Failed to add route:", err);
      setError(err.response?.data?.message || err.message || "Failed to add route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Route</Modal.Title>
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
            {loading ? "Adding..." : "Add Route"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
