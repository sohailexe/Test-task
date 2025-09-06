// middlewares/authenticate.js
import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/errors/errors.js";

export const authenticate = (req, res, next) => {
  let token;

  // 1. Check for the Authorization header and ensure it's a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // 2. Extract the token from the "Bearer <token>" string
    token = req.headers.authorization.split(" ")[1];
  }

  // 3. If no token is found, send an unauthorized error
  if (!token) {
    return next(new AppError("Not authorized, no token provided", 401));
  }

  try {
    // 4. Verify the token
    const decoded = verifyToken(token);

    // 5. Attach the decoded payload (e.g., { userId, role }) to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Not authorized, token failed", 401));
  }
};
