import react from "@vitejs/plugin-react-swc";
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
  plugins: [react()],
  server: { ...commonServerOptions },
  preview: { ...commonServerOptions },
});
