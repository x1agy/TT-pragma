import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [
      react(),
      eslintPlugin({
        cache: false,
        include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        pages: path.resolve(__dirname, './src/pages'),
        types: `${path.resolve(__dirname, './src/types')}`,
        utils: `${path.resolve(__dirname, './src/utils')}`,
        hooks: `${path.resolve(__dirname, './src/hooks')}`,
        $: `${path.resolve(__dirname, './src/assets')}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'src/style/variables/index';`,
        },
      },
    },
  };
});
