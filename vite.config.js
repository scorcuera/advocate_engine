import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/advocate_engine/', // Nombre exacto de tu repositorio
})


