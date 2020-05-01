import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
      file: pkg.browser,
      format: 'iife', // immediately invoked function expression (browser style)
      name: 'Phasetwo', // the global which can be used in a browser
    },
  ],
  plugins: [resolve(), commonjs()],
};
