import api from "../api/axios";


const getUsers = () => api.get("/admin/users").then(res => res.data);
const deleteUser = (id) => api.delete(`/admin/user/${id}`).then(res => res.data);


const getOperators = () => api.get("/admin/operators").then(res => res.data);
const deleteOperator = (id) => api.delete(`/admin/operator/${id}`).then(res => res.data);

const getBookings = () => api.get("/admin/bookings").then(res => res.data);
const deleteBooking = (id) => api.delete(`/admin/booking/${id}`).then(res => res.data);


const getRoutes = async () => {
  const res = await api.get("/route");
 
  return (res.data || []).map(r => ({
    routeId: r.routeId || r.RouteId,
    origin: r.origin || r.Origin,
    destination: r.destination || r.Destination,
  }));
};


const addRoute = async ({ origin, destination }) => {
  const res = await api.post("/route", { origin, destination });
  return res.data;
};


const updateRoute = async (id, { origin, destination }) => {
  // Include routeId in the body to satisfy backend
  const res = await api.put(`/route/${id}`, {
    routeId: id,
    origin,
    destination,
  });
  return res.data;
};

// DELETE route
const deleteRoute = async (id) => {
  const res = await api.delete(`/route/${id}`);
  return res.data;
};



export default {
  
  getUsers,
  deleteUser,

 
  getOperators,
  deleteOperator,

 
  getBookings,
  deleteBooking,

  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,

};
