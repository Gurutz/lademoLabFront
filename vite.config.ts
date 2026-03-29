import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    /** Escucha en todas las interfaces (0.0.0.0) para acceder desde la LAN, p. ej. http://192.168.1.40:5173 */
    host: true,
    port: 5173,
  },
})
