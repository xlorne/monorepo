import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';
import * as path from "path";

export default defineConfig({
    plugins: [pluginReact(), pluginSass()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
