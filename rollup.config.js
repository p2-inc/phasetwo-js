import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Phasetwo',
    },
    plugins: [resolve({ browser: true }), commonjs(), babel({ babelHelpers: 'bundled' }), filesize()],
  },

  // ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: [].concat('keycloak-js', 'phasetwo-api-client'),
    output: [{ file: pkg.module, format: 'es' }],
    plugins: [filesize()],
  },
];
