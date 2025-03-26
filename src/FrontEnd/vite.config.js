import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     },
  //
  //   }
  // },
  // // Додаємо серверний хук
  // configureServer(server) {
  //   server.middlewares.use((req, res, next) => {
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  //     res.setHeader('credentials', 'include');
  //     next();
  //   });
  }
})