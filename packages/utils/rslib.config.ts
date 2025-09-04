import {defineConfig} from '@rslib/core';
import * as path from "path";

export default defineConfig({
    lib: [
        {
            format: 'esm',
            syntax: ['node 18'],
            dts: true,
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
});
