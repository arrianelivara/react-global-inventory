import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), svgrPlugin()],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 8000
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
