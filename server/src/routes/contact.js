import express from "express";

import authMiddleware from "../middleware/auth.js";

import {

  addContact,
  getContacts,
  deleteContact

} from "../controllers/contact.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addContact
);

router.get(
  "/",
  authMiddleware,
  getContacts
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

export default router;