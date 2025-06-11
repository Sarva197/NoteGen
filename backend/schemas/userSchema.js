import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const {Schema}  = mongoose;

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
        required: [true, "Your password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

export default userSchema;