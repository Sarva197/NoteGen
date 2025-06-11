import { model } from "mongoose";
import noteSchema from "../schemas/noteSchema.js";
const noteModel = model("note", noteSchema);

export default noteModel;
