import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd', // UMD (AMD / CJS hybrid)
      name: 'Phasetwo',
    },
    {
      file: pkg.module,
      format: 'es', // ES6 import/export
    },
  ],
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
};
