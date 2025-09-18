import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreatePoll from "./components/CreatePoll";
import Poll from "./components/Poll";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreatePoll />} />
      <Route path="/poll/:id" element={<Poll />} />
    </Routes>
  </BrowserRouter>
);
