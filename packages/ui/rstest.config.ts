import { pluginReact } from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';
import { defineConfig } from '@rstest/core';
import path from 'path';

export default defineConfig({
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  plugins: [pluginReact(),pluginSass()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
