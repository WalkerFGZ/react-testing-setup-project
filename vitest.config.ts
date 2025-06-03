import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTest.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.config.ts",
        "**/*.config.js",
        "**/*.types.ts",
        "**/types",
        "node_modules/**",
        "src/setupTest.ts",
        "src/**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/__tests__/**",
        "**/App.tsx",
        "**/main.tsx",
      ],
      thresholds: {
        functions: 80,
      },
      all: true,
      clean: true,
    },
  },
});
