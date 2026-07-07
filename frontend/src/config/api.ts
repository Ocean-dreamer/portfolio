// frontend/src/config/api.ts
//
// Single source of truth for the backend URL. Set VITE_API_URL in your
// .env (or in Vercel's project env vars) to your deployed backend URL,
// e.g. https://your-backend.onrender.com
//
// Falls back to localhost:5000 for local development if not set.

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// console.log("API_BASE_URL =", API_BASE_URL);