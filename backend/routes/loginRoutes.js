import express from "express";
import { Signup, Login, Logout, GetUser } from "../controllers/login.js";
import authenticateUser from "../middleware/isAuth.js";
import asyncWrap from "../utils/asyncWrap.js";
import rateLimit from "express-rate-limit";

const router = express.Router();


const logLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  message: { message: "Too many requests, please try again later." },
});


// Routes
router.post("/signup",logLimiter, asyncWrap(Signup));
router.post("/login",logLimiter, asyncWrap(Login));
router.post("/logout", asyncWrap(Logout));
router.get("/me", authenticateUser, asyncWrap(GetUser));

export default router;
