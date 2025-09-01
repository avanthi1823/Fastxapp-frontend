import api from "../api/axios";

// ===============================
// 🚌 BUSES
// ===============================
const getMyBuses = async () => (await api.get("/operator/my-buses")).data;
const addBus = async (busData) => (await api.post("/operator/add-bus", busData)).data;
const updateBus = async (busId, busData) => (await api.put(`/operator/update-bus/${busId}`, busData)).data;
const deleteBus = async (busId) => (await api.delete(`/operator/delete-bus/${busId}`)).data;

// ===============================
// 🎟 BOOKINGS
// ===============================
const getBookings = async () => (await api.get("/operator/bookings")).data;

// ===============================
// 🛠 AMENITIES
// ===============================
const getAmenities = async () => (await api.get("/operator/amenities")).data;
const assignAmenities = async (busId, amenitiesIds) =>
  (await api.post("/operator/assign-amenities", { busId, amenitiesIds })).data;

// ===============================
// 🕒 SCHEDULES
// ===============================
const getMySchedules = async () => (await api.get("/schedule/my-schedules")).data;
const addSchedule = async ({ busId, routeId, departureTime, arrivalTime, fare }) =>
  (await api.post("/schedule", {
    BusId: parseInt(busId, 10),
    RouteId: parseInt(routeId, 10),
    DepartureTime: new Date(departureTime).toISOString(),
    ArrivalTime: new Date(arrivalTime).toISOString(),
    Fare: parseFloat(fare),
  })).data;
const updateSchedule = async (scheduleId, payload) =>
  (await api.put(`/schedule/${scheduleId}`, payload)).data;
const deleteSchedule = async (scheduleId) =>
  (await api.delete(`/schedule/${scheduleId}`)).data;

// ===============================
// 🚍 ROUTES (common controller)
// ===============================
const getRoutes = async () => (await api.get("/route")).data;
const addRoute = async ({ Origin, Destination, Distance }) =>
  (await api.post("/route", { Origin, Destination, Distance: parseFloat(Distance) })).data;
const updateRoute = async (routeId, { Origin, Destination, Distance }) =>
  (await api.put(`/route/${routeId}`, { Origin, Destination, Distance: parseFloat(Distance) })).data;
const deleteRoute = async (routeId) =>
  (await api.delete(`/route/${routeId}`)).data;

// ===============================
// EXPORT
// ===============================
const operatorService = {
  // buses
  getMyBuses,
  addBus,
  updateBus,
  deleteBus,

  // bookings
  getBookings,

  // amenities
  getAmenities,
  assignAmenities,

  // schedules
  getMySchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,

  // routes
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
};

export default operatorService;
