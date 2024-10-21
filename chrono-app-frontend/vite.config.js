import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { BASE_URL } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_URL,
  plugins: [react()],
})
