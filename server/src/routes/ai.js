import express from "express";
import authMiddleware 
from "../middleware/auth.js";
import {
  getAIResponse,
  getChatHistory
}
from "../controllers/aiController.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  getAIResponse
);
router.get(
  "/history",
  authMiddleware,
  getChatHistory
);


export default router;