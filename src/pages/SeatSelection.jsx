// src/pages/SeatSelection.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSeats, bookSeats } from "../services/busService"; 
import "./Seats.css";

export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state?.bus;
  const scheduleId = bus?.scheduleId;

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSeats = async () => {
    if (!scheduleId) return;
    try {
      setLoading(true);
      const data = await getSeats(scheduleId); 
      setSeats(data);
    } catch {
      setError("Failed to load seats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSeats(); }, [scheduleId]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) {
      alert(`Seat ${seat.seatNumber} is already booked!`);
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  const handleBooking = async () => {
    if (!selectedSeats.length) return;
    try {
      const bookingData = { scheduleId, seatNumbers: selectedSeats };
      const result = await bookSeats(bookingData); // backend returns { bookingId, fare }

      // Navigate to Payment page with booking info
      navigate("/user-dashboard/payments", {
        state: { bookingId: result.bookingId, amount: result.fare },
      });
    } catch (err) {
      alert(err.response?.data?.Error || "Booking failed!");
      fetchSeats();
    }
  };

  const renderSeats = () => {
    if (!seats.length) return <p>No seats available</p>;

    const typeName = bus?.typeName?.toLowerCase() || "";
    const seatsPerRow = typeName.includes("sleeper") ? 2 : 4;
    const rows = [];

    for (let i = 0; i < seats.length; i += seatsPerRow) {
      rows.push(seats.slice(i, i + seatsPerRow));
    }

    return rows.map((row, idx) => (
      <div className="seat-row" key={idx}>
        {row.map((seat, seatIdx) => {
          const seatClass = seat.isBooked
            ? "booked"
            : selectedSeats.includes(seat.seatNumber)
            ? "selected"
            : "available";

          const isLeftSide = seatsPerRow === 4 && seatIdx < 2;

          return (
            <div
              key={seat.seatId}
              className={`seat ${seatClass}`}
              style={{ marginRight: isLeftSide ? "20px" : "5px" }}
              onClick={() => toggleSeat(seat)}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="seat-booking-container">
      <h2>{bus?.busName || "Bus"} - Select Your Seats</h2>
      {loading ? <p>Loading seats...</p> : error ? <p>{error}</p> : (
        <>
          <div className="seat-map">{renderSeats()}</div>
          <div className="legend">
            <div><span className="seat available"></span> Available</div>
            <div><span className="seat selected"></span> Selected</div>
            <div><span className="seat booked"></span> Booked</div>
          </div>
          <button
            className="book-btn"
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
          >
            Book Now
          </button>
        </>
      )}
    </div>
  );
}
