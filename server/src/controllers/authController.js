// controllers/authController.js
import { asyncHandler } from "../middlewares/errorHandler.js";
import { ResponseHandler } from "../utils/ResponseHandler.js";

export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    // The service returns both the user object and the token
    const { user, token } = await this.authService.register(req.body);

    // Send both user and token back in the response body
    // This is what the frontend needs to store the token and user info
    return ResponseHandler.success(
      res,
      { user, token }, // <-- Key Change
      "User registered successfully",
      201
    );
  });

  login = asyncHandler(async (req, res) => {
    // The service returns both the user object and the token
    const { user, token } = await this.authService.login(req.body);

    // Send both user and token back in the response body
    return ResponseHandler.success(
      res,
      { user, token }, // <-- Key Change
      "Login successful"
    );
  });

  logout = asyncHandler(async (req, res) => {
    // With bearer tokens, logout is primarily a client-side action
    // (deleting the token from storage).
    // This server endpoint is here for convention and can be extended
    // later for blocklisting tokens if needed.
    return ResponseHandler.success(
      res,
      null,
      "Logout successful. Please clear the token on the client."
    );
  });
}