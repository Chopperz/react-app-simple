import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@store",
        replacement: resolve(__dirname, "./src/store/"),
      },
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/components/"),
      },
      {
        find: "@shared",
        replacement: resolve(__dirname, "./src/components/shared/"),
      },
      {
        find: "@services",
        replacement: resolve(__dirname, "./src/services/"),
      }
    ],
  },
});
