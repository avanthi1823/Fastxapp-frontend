import api from "../api/authInterceptor";

export const getSeats = async (scheduleId) => {
  const res = await api.get(`/seat/schedule/${scheduleId}`);
  return res.data;
};

export const bookSeats = async (bookingData) => {
  const res = await api.post("/booking", bookingData);
  return res.data;
};

export const createBooking = async (bookingData) => {
  const res = await api.post("/booking", bookingData);
  return res.data;
};

export const getUserBookings = async () => {
  const res = await api.get("/user/bookings");
  return res.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await api.delete(`/booking/${bookingId}`);
  return res.data;
};
