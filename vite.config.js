import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // O el plugin de react que tengas instalado

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/impulso-arquitectura/', // <--- AGREGA ESTA LÍNEA EXACTA CON LAS BARRAS
})