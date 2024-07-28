import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import appConfig from "./src/config/app.environment";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), eslint()],
  });
};
