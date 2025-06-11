import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema =  new Schema({
    title :{
      type: String,
      required: true,
      trim: true
    },
    content: {
        type: String,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    // category: {
    //     type: String, // Example: "JavaScript", "Cloud Computing"
    //     required: true,
    // },
})

export default noteSchema;