import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Bind to all IPs on your local network
    port: 5173, // Optional: Specify a port (default is 5173)
    cors: true, // Enable CORS
  },
});
