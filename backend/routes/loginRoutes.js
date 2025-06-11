import express from "express";
import { Signup, Login, Logout, GetUser } from "../controllers/login.js";
import authenticateUser from "../middleware/isAuth.js";
import asyncWrap from "../utils/asyncWrap.js";

const router = express.Router();

// Routes
router.post("/signup", asyncWrap(Signup));
router.post("/login", asyncWrap(Login));
router.post("/logout", asyncWrap(Logout));
router.get("/me", authenticateUser, asyncWrap(GetUser));

export default router;
