import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Access env variables from process.env
const apiRoute = process.env.VITE_API_ROUTE || "/backend-api";
const serverUrl = process.env.VITE_SERVER_URL || "http://localhost:5050";

console.log("Proxying API requests from", apiRoute, "to", serverUrl);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: serverUrl,
        ws: true, // enable websocket proxying
        changeOrigin: true,
      },
      '/backend-api': {
        target: serverUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backend-api/, ''),
      },
    },
  },
});
