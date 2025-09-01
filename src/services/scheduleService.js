// src/services/scheduleService.js
import api from "../api/axios";

export const searchSchedules = async (from, to, date) => {
  // date is "YYYY-MM-DD"
  const res = await api.get(`/schedules/search`, {
    params: { from, to, date },
  });
  return res.data;
};

