import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import loginRoutes from "./routes/loginRoutes.js";
import notesRoutes from "./routes/notesRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import passport from "passport";
import "./config/passport.js";
import authRoute from "./routes/authRoute.js";
import ExpressError from './utils/ExpressError.js';


dotenv.config();

const app = express();
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
//logger
app.use((req, res, next) => {
  console.log(
    `${req.method} request to ${req.url} , Hostname ${req.hostname}, Pathname ${req.path} `
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use("/", loginRoutes);
app.use("/auth", authRoute);
app.use("/api/v1/user", notesRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, `Can't find ${req.originalUrl}`));
});

app.use(errorHandler);

// Start server
app.listen(PORT || 3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});
