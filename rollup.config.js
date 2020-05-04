import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs', // Common JS (Node)
    },
    {
      file: pkg.module,
      format: 'es', // ES6 import/export
    },
    {
      file: 'dist/phasetwo-js.iife.js',
      format: 'iife', // immediately invoked function expression
      name: 'Phasetwo', // the global which can be used in a browser
    },
  ],
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
};
