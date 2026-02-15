import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // docs klasörü için kısa yol
      '@docs': path.resolve(__dirname, './docs'),
    },
  },
  server: {
    fs: {
      // Üst klasördeki dosyalara erişim izni
      allow: ['..']
    }
  }
})