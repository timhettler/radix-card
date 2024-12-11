import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      tsconfig: resolvePath("tsconfig.app.json"),
      declaration: true,
      declarationDir: resolvePath("dist"),
    }),
  ],
  build: {
    lib: {
      entry: resolvePath("src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
