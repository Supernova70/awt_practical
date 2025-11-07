# Course Timetable Generator

This project is a minimal course timetable generator with:

- Backend: Node + Express + Mongoose (MongoDB)
- Frontend: React (Vite)

It provides example data and a small UI to select a subject and view its timetable.

## Prerequisites

- Node.js (16+ recommended)
- A running MongoDB instance (local or remote)

## Setup

1. Backend

Run these commands in PowerShell from the backend folder:

cd "c:/Users/Dragon/Desktop/Sem 5/exam/backend"
npm install
# copy .env.example to .env and edit MONGODB_URI if needed
npm run seed
npm start

2. Frontend

Run these commands in PowerShell from the frontend folder:

cd "c:/Users/Dragon/Desktop/Sem 5/exam/frontend"
npm install
npm run dev

By default the backend listens on port 4000 and the frontend Vite server on 5173. The frontend fetches API from http://localhost:4000/api.

## API

- GET /api/subjects — list of subjects
- GET /api/timetables?subjectId=<id> — timetable entries for a subject

## Notes & Next steps

- Add create/update/delete API endpoints.
- Add authentication and user preferences.
- Improve timetable UI (calendar grid, export to PDF, drag/drop).
