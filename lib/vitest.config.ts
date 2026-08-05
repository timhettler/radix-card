import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Dedicated Vitest config so the library-build plugins (dts emit, lib mode)
// in vite.config.ts don't run during tests.
export default defineConfig({
  plugins: [react()],
  test: {
    // Enables Testing Library's automatic DOM cleanup between tests.
    globals: true,
    environment: "jsdom",
  },
});
