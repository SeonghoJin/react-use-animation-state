import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

process.env.BABEL_ENV = 'production';

function setUpRollup({ input, output }) {
    return {
        input,
        exports: 'index',
        output,
        watch: {
            include: '*',
            exclude: 'node_modules/**',
        },
        plugins: [
            peerDepsExternal(),
            json(),
            resolve({ extensions }),
            commonjs({
                include: /node_modules/,
            }),
            typescript({ useTsconfigDeclarationDir: true }),
        ],
        external: ['react', 'react-dom'],
    };
}

export default [
    setUpRollup({
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/index.js',
            sourcemap: true,
            format: 'cjs',
        },
    }),
    setUpRollup({
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/index.js',
            sourcemap: true,
            format: 'esm',
        },
    }),
];
