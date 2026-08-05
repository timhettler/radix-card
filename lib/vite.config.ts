import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const resolvePath = (str: string) => path.resolve(import.meta.dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolvePath("tsconfig.app.json"),
      // Roll declarations into a single self-contained entry so the published
      // types resolve under bundler and node16/nodenext, matching the JS bundle.
      rollupTypes: true,
      exclude: ["**/*.test.*", "**/*.spec.*"],
    }),
  ],
  build: {
    lib: {
      entry: resolvePath("src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      // Externalize peers and all declared deps (Radix) so they aren't bundled
      // in — consumers install them once, avoiding duplicate React contexts.
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^@radix-ui\/.*/],
    },
  },
});
