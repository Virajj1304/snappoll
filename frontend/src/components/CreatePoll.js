import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addOption = () => setOptions([...options, ""]);
  const handleOptionChange = (i, val) => {
    const newOptions = [...options];
    newOptions[i] = val;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    if (!question.trim() || options.filter(o => o.trim()).length < 2) {
      alert("Please enter a question and at least two options.");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/poll", { question, options: options.filter(o => o.trim()) });
      navigate(`/poll/${res.data.pollId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Create a Poll</h2>
      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 mb-4 w-80 rounded"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          className="border p-2 mb-2 w-80 rounded"
        />
      ))}
      <div className="flex gap-2 mt-2">
        <button
          onClick={addOption}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          + Add Option
        </button>
        <button
          onClick={createPoll}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </div>
    </div>
  );
}
