import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

// list of dependencies to load from node_modules rather than bundle in phasetwo-js ES bundle
const externals = ['keycloak-js', 'phasetwo-api-client'];

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
    onwarn: (warning, next) => {
      // suppress eval warnings
      const knownModules = ['js-sha256', 'keycloak-js'].map((module) => `node_modules/${module}`);
      if (warning.code === 'EVAL') {
        for (const module of knownModules) {
          if (warning.loc.file.includes(module)) {
            return;
          }
        }
      }
      next(warning);
    },
  },

  // ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: externals,
    output: [{ file: pkg.module, format: 'es' }],
    plugins: [filesize()],
  },
];
