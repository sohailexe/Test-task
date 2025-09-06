import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";

// Use routes
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/posts/:postId/comments", commentRoutes);
        

export default router;
