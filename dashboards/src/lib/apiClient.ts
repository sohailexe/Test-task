// src/lib/apiClient.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // Adjust this import path

const apiClient = axios.create({
  // Use environment variables for your API base URL it is vite project process .env not defined
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  // Bearer tokens don't use credentials, cookies do.
  withCredentials: false,
});

/**
 * Axios Request Interceptor
 *
 * This interceptor automatically attaches the JWT access token to the
 * 'Authorization' header for every outgoing request if the token exists.
 */
apiClient.interceptors.request.use(
  (config) => {
    // We use getState() here because hooks can't be used outside of components.
    const token = useAuthStore.getState().accessToken;
    
    if (token) {
      // Add the Bearer token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;