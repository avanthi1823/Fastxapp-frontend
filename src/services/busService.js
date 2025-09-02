// src/services/busService.js
import api from "../api/axios";

// 🔍 Search available buses
export async function searchBuses(origin, destination, date) {
  const { data } = await api.post("/search", {
    origin,
    destination,
    travelDate: new Date(date).toISOString(), // backend expects ISO
  });
  return data;
}

// 🚌 Get bus details (with seats, amenities, etc.)
export async function getBusDetails(busId) {
  const { data } = await api.get(`/buses/${busId}`);
  return data;
}

// 🎟️ Book seats on a bus
// 🎟️ Book seats on a bus
export async function bookSeats(bookingData) {
  const { data } = await api.post(`/booking`, bookingData);
  return data;
}


// ✅ Get seats for a schedule
export async function getSeats(scheduleId) {
  const { data } = await api.get(`/seat/schedule/${scheduleId}`);
  return data;
}

// 📅 Get schedules for a specific bus
export async function getBusSchedules(busId) {
  const { data } = await api.get(`/buses/${busId}/schedules`);
  return data;
}

// 🏷️ Get amenities for a bus
export async function getBusAmenities(busId) {
  const { data } = await api.get(`/buses/${busId}/amenities`);
  return data;
}
