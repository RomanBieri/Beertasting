import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // DIESER TEIL IST NEU:
  server: {
    proxy: {
      // Leitet alle Anfragen, die mit /api beginnen, an dein Backend weiter
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
