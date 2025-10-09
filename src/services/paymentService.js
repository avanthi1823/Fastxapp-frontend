import api from "../api/axios";


export const makePayment = async ({ bookingId, amount }) => {
  const { data } = await api.post("/payment/record", { bookingId, amount });
  return data;
};


export const getPaymentDetails = async (bookingId) => {
  const { data } = await api.get(`/payment/${bookingId}`);
  return data;
};


export const searchPayments = async (searchRequest) => {
  const { data } = await api.post("/payment/search", searchRequest);
  return data;
};
