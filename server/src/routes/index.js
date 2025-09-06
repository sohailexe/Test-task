import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";


// Use routes
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
