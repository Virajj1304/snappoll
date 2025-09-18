import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api";

// socket will connect lazily once code runs
let socket;

export default function Poll() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await API.get(`/poll/${id}`);
        setPoll(res.data);
      } catch (err) {
        console.error(err);
        alert("Poll not found or server error.");
      }
    };
    fetchPoll();

    const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    socket = io(backendUrl);

    socket.on(`poll-${id}`, (updatedPoll) => {
      setPoll(updatedPoll);
    });

    return () => {
      if (socket) {
        socket.off(`poll-${id}`);
        socket.disconnect();
      }
    };
  }, [id]);

  const handleVote = (i) => {
    if (!socket) return;
    socket.emit("vote", { pollId: id, optionIndex: i });
  };

  if (!poll) return <div className="p-6">Loading poll...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
      <div className="space-y-2 w-80">
        {poll.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleVote(i)}
            className="w-full bg-white p-3 rounded shadow flex justify-between"
          >
            <span>{opt.text}</span>
            <span>{opt.votes}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
