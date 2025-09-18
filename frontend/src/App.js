import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">SnapPoll 📊</h1>
      <Link
        to="/create"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
      >
        Create a Poll
      </Link>
    </div>
  );
}
