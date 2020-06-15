import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

// list of dependencies to load from node_modules rather than bundle in phasetwo-js ES bundle
const externals = ['keycloak-js', 'phasetwo-api-client'];

export default [
  /*
   * browser-friendly UMD build
   *
   * Note that this build config does not include an `external` option, as we wish to bundle
   * all dependencies into a single file appropriate for inclusion in a web page.
   */
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Phasetwo',
    },
    plugins: [
      // locates modules using the Node resolution algorithm, for using third party modules in node_modules
      resolve({
        // favor the "browser" property in package.json of dependencies when bundling. This is useful for packages (like isomorphic-unfetch)
        // that provide different code when bundling for the browser vs for Node.js--we don't want to include Node-specific code in our browser bundle.
        browser: true,
      }),

      // converts CommonJS modules to ES6, so they can be included in a Rollup bundle
      commonjs(),

      // run Babel transformations (defined in babel.config.json) on the generated bundle
      babel({
        // TODO: we may want to switch this to 'runtime' (https://www.npmjs.com/package/@rollup/plugin-babel#babelhelpers)
        babelHelpers: 'bundled',
      }),

      // shows filesize in console after building Rollup bundle
      filesize(),
    ],

    // hook to intercept warning messages when building
    onwarn: (warning, next) => {
      // suppress eval warnings, as we have no ability to change the usage of eval in our dependencies
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

  /*
   * ES module (for bundlers) build
   *
   * TODO: this may not be necessary for this module's use case.
   */
  {
    input: 'src/index.js',
    external: externals,
    output: [{ file: pkg.module, format: 'es' }],
    plugins: [filesize()],
  },
];
