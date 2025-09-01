import api from "../api/authInterceptor";

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token, roleId }
};

const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roleId");
  window.location.href = "/login";
};

export default { login, register, logout };
