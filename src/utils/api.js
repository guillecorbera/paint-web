// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Set auth token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// ============ PUBLIC API ============

// Fetch all services (public)
export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// ============ AUTH API ============

// Login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout
export const logout = () => {
  removeAuthToken();
};

// ============ PROTECTED API ============

// Create new service
export const createService = async (serviceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Update service
export const updateService = async (id, serviceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
