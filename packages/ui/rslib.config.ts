import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import {pluginSass} from '@rsbuild/plugin-sass';
import path from "path";

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact(),pluginSass()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
