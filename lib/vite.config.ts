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
      // types resolve under bundler and node16/nodenext.
      rollupTypes: true,
      exclude: ["**/*.test.*", "**/*.spec.*"],
    }),
  ],
  build: {
    target: "es2022",
    lib: {
      entry: resolvePath("src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      // Externalize React and the low-level Radix primitives (declared as
      // regular dependencies) so they dedupe with the consumer's other Radix
      // packages into single shared instances — exactly as the official
      // @radix-ui/react-* components ship. Bundling them would create private
      // copies that break asChild/Slot and scope composition across the
      // ecosystem.
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^@radix-ui\/.*/],
    },
  },
});
