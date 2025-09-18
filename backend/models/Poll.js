import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  pollId: { type: String, unique: true },
  question: String,
  options: [{ text: String, votes: { type: Number, default: 0 } }]
});

export default mongoose.model("Poll", PollSchema);
