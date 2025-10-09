import api from "../api/authInterceptor";

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; 
};

const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

const authService = {
  login,
  register,
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    authService.redirectToLogin(); // call via exported object
  },
  redirectToLogin: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
};

export default authService;
//const logout = () => {
//  localStorage.removeItem("token");
  //localStorage.removeItem("roleId");
//  window.location.href = "/login";
//  window.location.assign("/login");

//};

//export default { login, register, logout };
