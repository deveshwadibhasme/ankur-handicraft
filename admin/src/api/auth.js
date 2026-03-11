import { request } from "../utils/axios";

export const signupAdmin = (payload) => request("/auth/admin/signup", { method: "POST", body: payload });

export const loginAdmin = async (payload) => {
  const data = await request("/auth/admin/login", { method: "POST", body: payload });
  if (data.token) {
    localStorage.setItem("admin_token", data.token);
  }
  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_token");
};
