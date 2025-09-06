// src/types/auth.types.ts

// Matches the backend User model
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Data for the login API endpoint
export interface LoginData {
  email: string;
  password: string;
}

// Data for the register API endpoint
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// The structure of a successful API response from your backend
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

// Structure for API errors
export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

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