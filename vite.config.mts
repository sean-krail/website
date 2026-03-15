import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { CommonServerOptions, defineConfig } from "vite";

const commonServerOptions: CommonServerOptions = {
  allowedHosts: [".localhost", ".local"],
  cors: false,
  proxy: {
    "/count/likes": {
      target: "https://api.seankrail.dev",
      changeOrigin: true,
      secure: false,
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: { ...commonServerOptions },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/components"),
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: { ...commonServerOptions },
});
