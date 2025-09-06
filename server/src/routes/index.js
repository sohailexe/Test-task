import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";


// Use routes
router.use("/auth", authRoutes);


export default router;
