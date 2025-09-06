// services/authService.js
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import {
  AppError,
  ConflictError,
  AuthenticationError,
} from "../utils/errors/errors.js";

export default class AuthService {
  /**
   * Registers a new user.
   * @param {object} userData - Contains name, email, and password.
   * @returns {Promise<{user: object, token: string}>}
   */
  async register(userData) {
    const { name, email, password , role} = userData;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    // 2. Create new user (password will be hashed by the model's pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // 3. Generate JWT
    const token = generateToken({ userId: user._id, role: user.role });

    // 4. Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Logs in an existing user.
   * @param {object} loginData - Contains email and password.
   * @returns {Promise<{user: object, token: string}>}
   */
  async login(loginData) {
    const { email, password ,role} = loginData;

    // 1. Find user by email, ensuring password is included in the result
    const user = await User.findOne({ email }).select('+password');


    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    if(role && user.role !== role){
      throw new AuthenticationError("Invalid role for this user");
    }
    // 2. Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid email or password");
    }

    // 3. Generate JWT
    const token = generateToken({ userId: user._id, role: user.role });

    // 4. Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      token,
    };
  }
}