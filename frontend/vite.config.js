import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Проксування API-запитів до бекенду під час локальної розробки
      // Примітка: цільовий порт (наразі 3000) та точні префікси маршрутів
      // узгодимо з бекенд-розробником
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
