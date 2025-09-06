import express from "express";
import { body } from "express-validator";
import AuthController from "../controllers/authController.js";
import AuthService from "../services/authServices.js";
import { authenticate } from "../middlewares/authenticate.js";
import { handleValidationErrors } from "../middlewares/handleValidateErrors.js";

const router = express.Router();

// Initialize service and controller
const authService = new AuthService();
const authController = new AuthController(authService);

// Register a new user
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
    body("email")
      .isEmail().withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role")
      .optional()
      .isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),
  ],
  handleValidationErrors,
  authController.register
);

// Login a user
router.post(
  "/login",
  [
    body("email")
      .isEmail().withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password")
      .notEmpty().withMessage("Password is required"),
    body("role")
      .optional()
      .isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),
  ],
  handleValidationErrors,
  authController.login
);

// Logout a user
router.post("/logout", authController.logout); 

// Example of a protected route
router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({ 
    message: "Welcome to your profile!",
    user: req.user 
  });
});

export default router;