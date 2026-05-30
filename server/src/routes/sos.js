import express from "express";

import authMiddleware from "../middleware/auth.js";

import {
  createSOS
} from "../controllers/sos.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createSOS
);

export default router;