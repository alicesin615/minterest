import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
    INFURA_PUBLIC_KEY: `"${process.env.INFURA_PUBLIC_KEY}"`
  },
  resolve: {
    alias: {
      
    }
  }
})
