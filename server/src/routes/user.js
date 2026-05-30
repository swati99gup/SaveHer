import express from "express";

import authMiddleware from "../middleware/auth.js";

import {
  getProfile
} from "../controllers/user.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

export default router;