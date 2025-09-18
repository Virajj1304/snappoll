# SnapPoll - Real-Time Visual Polling App

This repository contains a full-stack React + Node (Express) application for creating and voting on polls in real-time using Socket.IO and MongoDB.

## Structure

- `backend/` - Node.js + Express API + Socket.IO
- `frontend/` - React app built with Create React App + TailwindCSS

## Quick Start (local)

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGO_URI`
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` in `frontend/` if you want to set `REACT_APP_API_URL` (e.g. `REACT_APP_API_URL=http://localhost:5000`)
4. `npm start`

## Deployment
- Deploy backend to Render / Railway / Heroku (ensure CORS and socket support).
- Deploy frontend to Vercel / Netlify and set `REACT_APP_API_URL` to the deployed backend URL.
- Use MongoDB Atlas for the database.

## Notes
- This project is a starter kit. You can extend features like images/GIFs, short links, QR codes, auth, or animated charts.
