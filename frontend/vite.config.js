import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173, // Port number to use for development server
    host: '0.0.0.0', // Ensure the server listens on all network interfaces (needed for Render)
    cors: true, // Enable CORS for all origins if needed
  },
  plugins: [react()],
});
