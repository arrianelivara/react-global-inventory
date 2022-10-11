import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
// const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), svgrPlugin()],
  // build: {
  //   outDir: 'build',
  // },
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  // resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, 'src'),
  //   },
  // },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
