const BASE_URL = "https://ankur-handicraft.onrender.com";

const getToken = () => localStorage.getItem("admin_token");

const request = async (path, { method = "GET", body, auth = false } = {}) => {
  const headers = {};

  if (auth && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  if (!(body instanceof FormData) && body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || data.type || "Request failed");
  }

  return data;
};

export { request, getToken };
