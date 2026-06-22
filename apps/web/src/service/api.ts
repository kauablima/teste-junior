import axios from 'axios'

// In dev, Vite proxies /api → http://localhost:3301
// In production, set VITE_API_URL to the full base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  withCredentials: true, // needed for httpOnly JWT cookies
})