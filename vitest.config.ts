/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { getViteConfig } from "astro/config";

/**
 * Pages and endpoints render through Astro's own pipeline (the container
 * API), so the tests read the same HTML, headers and bytes a visitor gets.
 *
 * `root` is explicit so the config resolves astro.config.mjs no matter where
 * Vitest is started from.
 */
export default getViteConfig(
  {
    test: {
      environment: "node",
      include: ["tests/**/*.test.ts"],
      testTimeout: 30_000,
    },
  },
  { root: fileURLToPath(new URL("./", import.meta.url)) },
);
