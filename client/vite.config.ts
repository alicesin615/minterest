import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config(); // load env vars from .env
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
        VITE_INFURA_PUBLIC_KEY: `"${process.env.VITE_INFURA_PUBLIC_KEY}"`
    },
    resolve: {
        alias: {
            '@components': `${path.resolve(__dirname, './src/components/')}`,
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@hooks': path.resolve(__dirname, './src/hooks')
        }
    }
});
