import { defineConfig } from "vite";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: readFileSync(path.join(__dirname, "../certs/localhost-key.pem")),
      cert: readFileSync(path.join(__dirname, "../certs/localhost.pem")),
    },
  },
});
