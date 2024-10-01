import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from "tailwindcss"
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [
    react(), 
    dts({ tsconfigPath: './tsconfig.app.json' }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point for your library
      name: '@crease/react', // Global variable name for UMD builds
      fileName: (format) => `index.${format}.js`, // Output file names
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
})
