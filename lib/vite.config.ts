import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ copyDtsFiles: false, rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: [
        resolve(__dirname, "src/main.ts"),
        resolve(__dirname, "src/useRedundantClick.ts"),
      ],
      output: {
        preserveModules: false,
      },
    },
  },
});
