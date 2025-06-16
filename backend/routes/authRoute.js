import express from "express";
import passport from "passport";
import { createSecretToken } from "../utils/generateToken.js"; // Make sure this returns a JWT

const router = express.Router();

// Step 1: Redirect to Google login
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
}));

// Step 2: Handle callback and issue JWT
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    const token = createSecretToken(req.user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "Lax",
    });

    res.redirect("http://localhost:5173/dashboard");
  }
); 

export default router;
