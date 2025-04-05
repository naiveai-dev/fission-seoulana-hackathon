import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), nodePolyfills()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      'node-fetch': 'isomorphic-fetch',
    },
  },
  define: {
    process: {
      env: {
        NODE_DEBUG: false,
      },
      version: '',
    },
    global: {},
    ANTHROPIC_API_KEY: JSON.stringify(process.env.VITE_ANTHROPIC_API_KEY),
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rollupNodePolyFill(),
      ],
    },
  },
});
