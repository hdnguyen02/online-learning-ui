import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      component: path.resolve(__dirname, 'src/component/'),
      service: path.resolve(__dirname, 'src/service/'),
      feature: path.resolve(__dirname, 'src/feature/'), 
      context: path.resolve(__dirname, 'src/context/')
    },
  },
})


