
import api from "../api/axios";


const createAmenity = async (name) => {
  const res = await api.post("/amenities", { amenitiesName: name });
  return res.data;
};


const getAmenities = async () => {
  const res = await api.get("/amenities");
  return res.data;
};

export default { createAmenity, getAmenities };
