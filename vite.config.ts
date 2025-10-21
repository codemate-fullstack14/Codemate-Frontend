import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  define: {
    global: "window",
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://3.107.155.57:8080",
          changeOrigin: true,
          secure: false,
        },
        "/auth": {
          target: "http://3.107.155.57:8080",
          changeOrigin: true,
          secure: false,
        },
        "/problems": {
          target: "http://another-server:8080",
          changeOrigin: true,
          secure: false,
        },
        "/reviews": {
          target: "http://another-server:8080",
          changeOrigin: true,
          secure: false,
        },
        "/user": {
          target: "http://another-server:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
  base: command === "serve" ? "/" : "/Codemate-Frontend/",
}));
