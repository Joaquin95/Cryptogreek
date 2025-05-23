import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "frontend/dist",
    rollupOptions: {
      external: ["react-icons/fa", "react-chartjs-2", "chart.js"],
    },
  },
});
