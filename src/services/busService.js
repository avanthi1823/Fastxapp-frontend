// src/services/busService.js
import api from "../api/axios";


export async function searchBuses(origin, destination, date) {
  const { data } = await api.post("/search", {
    origin,
    destination,
    travelDate: new Date(date).toISOString(), 
  });
  return data;
}


export async function getBusDetails(busId) {
  const { data } = await api.get(`/buses/${busId}`);
  return data;
}


export async function bookSeats(bookingData) {
  const { data } = await api.post(`/booking`, bookingData);
  return data;
}



export async function getSeats(scheduleId) {
  const { data } = await api.get(`/seat/schedule/${scheduleId}`);
  return data;
}


export async function getBusSchedules(busId) {
  const { data } = await api.get(`/buses/${busId}/schedules`);
  return data;
}


export async function getBusAmenities(busId) {
  const { data } = await api.get(`/buses/${busId}/amenities`);
  return data;
}
