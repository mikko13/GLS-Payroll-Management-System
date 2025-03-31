import axios from "axios";

// Store token in localStorage
const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem("token");
};

// Add authorization header to requests
const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login user
const login = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
};

// In authService.ts
const logout = async () => {
  try {
    // Optional: Call your backend logout endpoint if you have one
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeToken();
  }
};

// Get current user info
const getCurrentUser = async () => {
  const response = await axios.get("http://localhost:5000/api/auth/me", {
    headers: authHeader(),
  });
  return response.data;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getToken,
  setToken,
  authHeader,
};

export default authService;
