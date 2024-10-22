/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: ['default'],
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
    testTimeout: 15000,
    slowTestThreshold: 1000,
    maxConcurrency: 8,
    dangerouslyIgnoreUnhandledErrors: true,
  },
});
