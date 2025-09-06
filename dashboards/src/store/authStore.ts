// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AuthAPI, {
  User,
  LoginData,
  RegisterData,
  AuthError,
} from "@/apis/authApi"; // Adjust path

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  isInitialized: boolean; // Tracks if session check has completed on app load

  // Actions
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>; // Checks for an existing valid token
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isInitialized: false,

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthAPI.register(data);
          const { user, token } = response.data;
          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, error: error as AuthError });
          throw error; // Re-throw for component-level handling (e.g., showing a toast)
        }
      },

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthAPI.login(data);
          const { user, token } = response.data;
          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, error: error as AuthError });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthAPI.logout();
        } finally {
          // ALWAYS clear the local state, even if the API call fails.
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      initialize: async () => {
        const token = get().accessToken;
        if (!token) {
          // No token found, we are done initializing.
          set({ isInitialized: true });
          return;
        }

        // Token found, let's validate it by fetching the user profile.
        try {
          const response = await AuthAPI.getProfile();
          // Token is valid.
          set({
            user: response.data,
            isAuthenticated: true,
            isInitialized: true,
          });
        } catch (error) {
          // Token is invalid or expired. Clear the auth state.
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isInitialized: true,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage", // Key for localStorage
      // Persist only the token and user info. Volatile state like isLoading is excluded.
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// --- Optional: Custom hooks for convenience ---

// Hook to get auth state - using individual selectors to prevent infinite loops
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
  };
};

// Hook to get auth actions - using individual selectors to prevent infinite loops
export const useAuthActions = () => {
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const initialize = useAuthStore((state) => state.initialize);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    register,
    login,
    logout,
    initialize,
    clearError,
  };
};
