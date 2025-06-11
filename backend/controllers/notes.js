import { formatResponse } from "../utils/formatResponse.js";
import Note from "../models/notesModel.js";
import httpStatus from "http-status";
import ollama from "ollama/browser";
import ExpressError from "../utils/ExpressError.js";

// const dbData = {
//   model: "llama3.2:1b",
//   created_at: "2025-03-23T06:04:16.1733808Z",
//   message: {
//     role: "assistant",
//     content:
//       "Machine learning (ML) is a subfield of artificial intelligence (AI) that involves training algorithms to learn from data, make predictions or decisions without being explicitly programmed. It's a type of intelligent automation that can be applied to various domains, such as computer vision, natural language processing, time series forecasting, and more.\n" +
//       "\n" +
//       "In traditional computing, machines are programmed with rules and algorithms to perform specific tasks. However, in machine learning, the focus is on enabling machines to learn from data and improve their performance over time, often without human intervention.\n" +
//       "\n" +
//       "Here's a simplified overview of how machine learning works:\n" +
//       "\n" +
//       "1. **Data collection**: Gathering a large dataset relevant to the problem you want to solve.\n" +
//       "2. **Preprocessing**: Cleaning, transforming, and preparing the data for use in the model.\n" +
//       "3. **Model training**: Training a machine learning algorithm on the preprocessed data using supervised or unsupervised learning techniques.\n" +
//       "4. **Model evaluation**: Testing and evaluating the performance of the trained model.\n" +
//       "5. **Deployment**: Using the trained model to make predictions or take actions in real-world scenarios.\n" +
//       "\n" +
//       "Machine learning algorithms can be broadly categorized into three types:\n" +
//       "\n" +
//       "1. **Supervised learning**: The algorithm learns from labeled data, where the correct output is already known.\n" +
//       "2. **Unsupervised learning**: The algorithm identifies patterns and relationships within unlabeled data.\n" +
//       "3. **Reinforcement learning**: The algorithm learns through trial and error by interacting with an environment and receiving feedback.\n" +
//       "\n" +
//       "Some popular machine learning techniques include:\n" +
//       "\n" +
//       "1. **Linear regression**\n" +
//       "2. **Decision trees**\n" +
//       "3. **Neural networks**\n" +
//       "4. **Clustering**\n" +
//       "5. **Deep learning**\n" +
//       "\n" +
//       "Machine learning has many applications in various fields, such as:\n" +
//       "\n" +
//       "1. **Recommendation systems** (e.g., Netflix)\n" +
//       "2. **Image recognition** (e.g., self-driving cars)\n" +
//       "3. **Natural language processing** (e.g., speech recognition)\n" +
//       "4. **Predictive maintenance** (e.g., industrial equipment)\n" +
//       "5. **Healthcare** (e.g., disease diagnosis, personalized medicine)\n" +
//       "\n" +
//       "Overall, machine learning is a powerful tool for automating tasks, improving decision-making, and extracting insights from data.",
//   },
//   done_reason: "stop",
//   done: true,
//   total_duration: 5432010300,
//   load_duration: 632299900,
//   prompt_eval_count: 30,
//   prompt_eval_duration: 31000000,
//   eval_count: 440,
//   eval_duration: 4763000000,
// };

//
export const getAllNotes = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) throw new ExpressError(httpStatus.BAD_REQUEST, "Missing userId");

  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  return res.status(httpStatus.OK).json({ notes });
};

// ✅ Get Note by ID
export const getNoteById = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);
  if (!note) throw new ExpressError(httpStatus.NOT_FOUND, "Note not found");
  return res.json({ note });
};

// ✅ Create Note
export const createNote = async (req, res, next) => {
  const { title, user } = req.body;
  if (!title || !user) {
    throw new ExpressError(httpStatus.BAD_REQUEST, "Missing title or user");
  }

  const note = new Note({ title, user });
  await note.save();
  return res.status(httpStatus.CREATED).json({ newNote: note });
};

// ✅ Update Note
export const updateNote = async (req, res, next) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    { title, content },
    { new: true }
  );
  if (!updatedNote)
    throw new ExpressError(httpStatus.NOT_FOUND, "Note not found");
  res.json({ updatedNote });
};

// ✅ Delete Note
export const deleteNote = async (req, res, next) => {
  const deleted = await Note.findByIdAndDelete(req.params.noteId);
  if (!deleted) throw new ExpressError(httpStatus.NOT_FOUND, "Note not found");
  return res.json({ message: "Note deleted" });
};

// ✅ AI Chat with Note
export const aiChatNote = async (req, res, next) => {
  const { query } = req.body;
  const { userId, noteId } = req.params;

  if (!query || !userId || !noteId) {
    throw new ExpressError(
      httpStatus.BAD_REQUEST,
      "Missing query, userId, or noteId"
    );
  }

  const aiResponse = await ollama.chat({
    model: "llama3.2:1b",
    messages: [{ role: "user", content: `${query}` }],
  });

  if (!aiResponse?.message?.content) {
    throw new ExpressError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "AI did not return any content"
    );
  }

  const answer = formatResponse(aiResponse);
  return res.status(httpStatus.OK).json({ answer });
};

// ✅ Add To Notes
export const addToNotes = async (req, res, next) => {
  const { noteId } = req.params;
  const { content } = req.body;

  const notes = await Note.findById(noteId);
  if (!notes) {
    throw new ExpressError(httpStatus.NOT_FOUND, "No such notes exist");
  }

  const newContent = notes.content + "<hr>" + content;
  await Note.findByIdAndUpdate(noteId, { content: newContent });

  return res
    .status(httpStatus.OK)
    .json({ message: "Notes added successfully" });
};
