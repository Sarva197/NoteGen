// routes/userRoutes.js
import express from "express";
import {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteById,
  updateNote,
  aiChatNote,
  addToNotes,
} from "../controllers/notes.js";
import authenticateUser from "../middleware/isAuth.js";
import asyncWrap from "../utils/asyncWrap.js";

const router = express.Router();

router.get("/notes/:id", authenticateUser, asyncWrap(getAllNotes));
router.post("/notes/:id/create", authenticateUser, asyncWrap(createNote));
// Corrected route
router.post(
  "/:userId/notes/:noteId/chat",
  authenticateUser,
  asyncWrap(aiChatNote)
);
router.post(
  "/:userId/notes/:noteId/add",
  authenticateUser,
  asyncWrap(addToNotes)
);
router.get("/notes/:id/:noteId", authenticateUser, asyncWrap(getNoteById));
router.put(
  "/notes/:id/update/:noteId",
  authenticateUser,
  asyncWrap(updateNote)
);
router.delete(
  "/notes/:id/delete/:noteId",
  authenticateUser,
  asyncWrap(deleteNote)
);

export default router;
