import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  googleId: {
    type: String,
    default: null,
  },
});

// Hash password only if it exists and is modified
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default userSchema;
