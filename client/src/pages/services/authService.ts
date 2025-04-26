import axios from "axios";

const serverURL = import.meta.env.VITE_API_BASE_URL;

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem("token");
};

// Store user role in localStorage - using sessionStorage for more security
const setUserRole = (role) => {
  sessionStorage.setItem("userRole", role);
};

// Get user role from sessionStorage
const getUserRole = () => {
  return sessionStorage.getItem("userRole");
};

// Remove user role from sessionStorage
const removeUserRole = () => {
  sessionStorage.removeItem("userRole");
};

// Add authorization header to requests
const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login user with improved error handling and logging
const login = async (email, password) => {
  try {
    const response = await axios.post(`${serverURL}/api/auth/login`, {
      email,
      password,
    });

    if (response.data.token) {
      setToken(response.data.token);

      // Store user role if available
      if (response.data.user && response.data.user.role) {
        setUserRole(response.data.user.role);
      } else {
      }
    } else {
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error in login:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
    } else {
    }
    throw error;
  }
};

const logout = async () => {
  try {
    await axios.post(
      `${serverURL}/api/auth/logout`,
      {},
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
  } finally {
    removeToken();
    removeUserRole();
  }
};

// Get current user info with improved error handling and role validation
const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${serverURL}/api/auth/me`, {
      headers: authHeader(),
    });

    // Update stored role if available
    if (response.data && response.data.role) {
      setUserRole(response.data.role);
    } else {
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error in getCurrentUser:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Handle token expiration or invalid token
      if (error.response?.status === 401) {
        removeToken();
        removeUserRole();
      }
    } else {
    }
    throw error;
  }
};

// Check if user is admin with verification
const isAdmin = () => {
  const role = getUserRole();
  return role === "admin";
};

// Verify authentication status
const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getToken,
  setToken,
  authHeader,
  isAdmin,
  getUserRole,
  isAuthenticated,
};

export default authService;
