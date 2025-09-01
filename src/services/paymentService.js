import api from "../api/axios";

// ✅ Record a payment for a booking
export const makePayment = async ({ bookingId, amount }) => {
  const { data } = await api.post("/payment/record", { bookingId, amount });
  return data;
};

// ✅ Get payment details for a booking
export const getPaymentDetails = async (bookingId) => {
  const { data } = await api.get(`/payment/${bookingId}`);
  return data;
};

// Optional: Search payments (if you need it in admin dashboard)
export const searchPayments = async (searchRequest) => {
  const { data } = await api.post("/payment/search", searchRequest);
  return data;
};
