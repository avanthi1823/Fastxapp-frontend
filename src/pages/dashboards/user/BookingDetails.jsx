import React, { useEffect, useState } from "react";
import { getBookingDetails } from "../../../services/userService";
import { useParams } from "react-router-dom";

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => { loadBooking(); }, []);

  async function loadBooking() {
    const data = await getBookingDetails(id);
    setBooking(data);
  }

  if (!booking) return <p>Loading...</p>;

  return (
    <div>
      <h4 className="fw-bold mb-3">Booking Details</h4>
      <div className="card p-3 shadow-sm">
        <p><strong>Bus:</strong> {booking.busName}</p>
        <p><strong>Route:</strong> {booking.origin} → {booking.destination}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Seats:</strong> {booking.seats}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>
    </div>
  );
}
