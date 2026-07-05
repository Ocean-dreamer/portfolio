import { createRoot } from 'react-dom/client'
import React from 'react'
import axios from 'axios'
import App from './App'

// Send the auth cookie on every request automatically - several admin
// pages call axios directly without setting this per-call.
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
