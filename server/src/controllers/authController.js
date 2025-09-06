// controllers/authController.js
import { asyncHandler } from "../middlewares/errorHandler.js";
import { ResponseHandler } from "../utils/ResponseHandler.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    const { user, token } = await this.authService.register(req.body);

    res.cookie("token", token, cookieOptions);

    return ResponseHandler.success(
      res,
      user,
      "User registered successfully",
      201
    );
  });

  login = asyncHandler(async (req, res) => {
    const { user, token } = await this.authService.login(req.body);

    res.cookie("token", token, cookieOptions);

    return ResponseHandler.success(res, user, "Login successful");
  });

  logout = asyncHandler(async (req, res) => {
    // Clear the cookie by setting an expired date
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    return ResponseHandler.success(res, null, "Logout successful");
  });
}