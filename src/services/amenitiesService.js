// src/services/amenitiesService.js
import api from "../api/axios";

// Admin: Create a new amenity
const createAmenity = async (name) => {
  const res = await api.post("/amenities", { amenitiesName: name });
  return res.data;
};

// Get all amenities (used by operator dashboard too)
const getAmenities = async () => {
  const res = await api.get("/amenities");
  return res.data;
};

export default { createAmenity, getAmenities };
