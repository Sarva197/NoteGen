
import userSchema from "../schemas/userSchema.js";

import { model } from "mongoose";

const userModel = model('user', userSchema);

export default userModel;