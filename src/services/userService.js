import api from "../api/axios";

export async function getUserBookings() {
  const { data } = await api.get("/user/bookings");
  return data;
}


export async function cancelBooking(bookingId) {
  const res = await api.delete(`/Booking/${bookingId}`);
  return res.data;
}


export async function getBookingDetails(id) {
  const { data } = await api.get(`/user/bookings/${id}`);
  return data;
}


export async function getProfile() {
  const { data } = await api.get("/user/profile");
  return data;
}

export async function updateProfile(profile) {
  const payload = {
    FullName: profile.fullName,
    Gender: profile.gender,
    Phone: profile.phone,
  };

  const { data } = await api.put("/user/profile", payload);
  return data;
}

// PAYMENTS
export async function getPayments() {
  const { data } = await api.get("/user/payments");
  return data;
}

/*export async function downloadInvoice(id) {
  const response = await api.get(`/user/payments/${id}/invoice`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `invoice-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
}*/
