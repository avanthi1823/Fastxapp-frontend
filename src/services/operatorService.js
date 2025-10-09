import api from "../api/axios";

const getMyBuses = async () => (await api.get("/operator/my-buses")).data;
const addBus = async (busData) => (await api.post("/operator/add-bus", busData)).data;
const updateBus = async (busId, busData) => (await api.put(`/operator/update-bus/${busId}`, busData)).data;
const deleteBus = async (busId) => (await api.delete(`/operator/delete-bus/${busId}`)).data;


const getBookings = async () => (await api.get("/operator/bookings")).data;


const getAmenities = async () => (await api.get("/operator/amenities")).data;
const assignAmenities = async (busId, amenitiesIds) =>
  (await api.post("/operator/assign-amenities", { busId, amenitiesIds })).data;


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


const getRoutes = async () => (await api.get("/route")).data;
const addRoute = async ({ Origin, Destination, Distance }) =>
  (await api.post("/route", { Origin, Destination, Distance: parseFloat(Distance) })).data;
const updateRoute = async (routeId, { Origin, Destination, Distance }) =>
  (await api.put(`/route/${routeId}`, { Origin, Destination, Distance: parseFloat(Distance) })).data;
const deleteRoute = async (routeId) =>
  (await api.delete(`/route/${routeId}`)).data;


const operatorService = {
 
  getMyBuses,
  addBus,
  updateBus,
  deleteBus,


  getBookings,

  getAmenities,
  assignAmenities,

  
  getMySchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,

 
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
};

export default operatorService;
