import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 5173,
    },
    build: { 
      target: "es2020", 
      sourcemap: true 
    },
    optimizeDeps: {
      esbuildOptions: { 
        target: "es2020", 
        supported: { bigint: true } 
      },
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "./src/assets/"),
        components: path.resolve(__dirname, "./src/components/"),
        containers: path.resolve(__dirname, "./src/containers/"),
        pages: path.resolve(__dirname, "./src/pages/"),
        store: path.resolve(__dirname, "./src/store/"),
        styles: path.resolve(__dirname, "./src/styles/"),
        utils: path.resolve(__dirname, "./src/utils/"),
      },
    },
  });
};