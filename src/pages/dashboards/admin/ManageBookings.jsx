import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import adminService from '../../../services/adminService';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await adminService.getBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await adminService.deleteBooking(id);
      // Optimistically remove booking from state
      setBookings(prev => prev.filter(b => b.bookingId !== id));
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Manage Bookings</h4>
      <h5>Total Bookings: {bookings.length}</h5>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Route</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Seat Numbers</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId}>
                <td><span className="fw-bold">#{b.bookingId}</span></td>
                <td>{b.userName}</td>
                <td>{b.route}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>{b.totalSeats}</td>
                <td>{Array.isArray(b.seatNumbers) ? b.seatNumbers.join(", ") : b.seatNumbers}</td>
                <td className="fw-bold">₹{b.fare}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(b.bookingId)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
