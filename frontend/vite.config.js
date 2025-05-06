import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default {
  server: {
    port: 5173, // or another port number that Render can use
    host: '0.0.0.0' // Make sure the server listens on all network interfaces
  }
}