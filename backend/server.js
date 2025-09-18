import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import shortid from "shortid";
import Poll from "./models/Poll.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Create Poll
app.post("/poll", async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Provide a question and at least two options" });
    }
    const pollId = shortid.generate();
    const newPoll = new Poll({ pollId, question, options: options.map(opt => ({ text: opt })) });
    await newPoll.save();
    res.json({ pollId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create poll" });
  }
});

// Get Poll
app.get("/poll/:id", async (req, res) => {
  try {
    const poll = await Poll.findOne({ pollId: req.params.id });
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching poll" });
  }
});

// WebSocket for voting
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("vote", async ({ pollId, optionIndex }) => {
    try {
      const poll = await Poll.findOne({ pollId });
      if (poll && poll.options[optionIndex]) {
        poll.options[optionIndex].votes += 1;
        await poll.save();
        io.emit(`poll-${pollId}`, poll); // broadcast updated results
      }
    } catch (err) {
      console.error("Error handling vote:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
