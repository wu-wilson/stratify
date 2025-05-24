import { defineConfig, loadEnv } from "vite";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      https: {
        key: readFileSync(path.join(__dirname, "../certs/localhost-key.pem")),
        cert: readFileSync(path.join(__dirname, "../certs/localhost.pem")),
      },
      proxy: {
        "/__/auth": {
          target: `https://${env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN}`,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
