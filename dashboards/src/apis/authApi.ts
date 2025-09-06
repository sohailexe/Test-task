// src/apis/authApi.ts
import apiClient from '../lib/apiClient';
import axios from 'axios';

// --- Type Definitions (can be moved to a separate types file) ---
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string | null;
}

export interface LoginData {
  email: string;
  password: string;
  role?: 'user' | 'admin'; // Make role optional
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin'; // Make role optional
}

// Matches the backend's successful response structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

// The data object returned on successful login/register
export interface AuthSuccessData {
  user: User;
  token: string;
}

// Structure for API errors
export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

// --- Endpoints ---
const AUTH_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  PROFILE: '/api/auth/profile', // Used to verify token on app load
};

class AuthAPI {
  /**
   * Centralized error handler for all API calls.
   * @param error The error object caught from an API call.
   * @returns A standardized AuthError object.
   */
  private static handleApiError(error: unknown): AuthError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          message: error.response.data?.message || `Server error: ${error.response.status}`,
          status: error.response.status,
          code: error.response.data?.code,
        };
      }
      if (error.request) {
        // The request was made but no response was received
        return { message: 'No response from server. Please check your connection.' };
      }
    }
    // Something happened in setting up the request that triggered an Error
    return { message: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }

  static async register(data: RegisterData): Promise<ApiResponse<AuthSuccessData>> {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  static async login(data: LoginData): Promise<ApiResponse<AuthSuccessData>> {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, data);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  static async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
      return response.data;
    } catch (error) {
      // Don't throw an error if logout fails on the server;
      // the client still needs to clear its state.
      console.warn('Server logout failed, but proceeding with client-side logout.', error);
      return { success: true, data: null, message: 'Logged out locally', statusCode: 200 };
    }
  }

  /**
   * Fetches the current user's profile using the stored token.
   * This is the canonical way to check if a user's session is still valid.
   */
  static async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
}

export default AuthAPI;