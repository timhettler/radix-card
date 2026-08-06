import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const resolvePath = (str: string) => path.resolve(import.meta.dirname, str);

// The low-level Radix primitives are internal implementation details, so they
// (and their types) are bundled into the package rather than shipped as runtime
// dependencies — keeping consumers' dependency trees free of Radix internals.
const bundledRadix = [
  "@radix-ui/primitive",
  "@radix-ui/react-compose-refs",
  "@radix-ui/react-context",
  "@radix-ui/react-primitive",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolvePath("tsconfig.app.json"),
      // Roll declarations into a single self-contained entry and inline the
      // bundled Radix types so the published types never reference packages
      // that aren't runtime dependencies.
      rollupTypes: true,
      bundledPackages: bundledRadix,
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
      // Only React is external (it's a peer dependency and must stay a
      // singleton); the Radix primitives above are bundled in.
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/],
    },
  },
});
