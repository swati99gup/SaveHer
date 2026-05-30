import express from "express";

import {
  saveFCMToken
}
from "../controllers/fcmController.js";

import authMiddleware
from "../middleware/auth.js";

const router =
  express.Router();

router.post(

  "/save-token",

  authMiddleware,

  saveFCMToken
);

export default router;