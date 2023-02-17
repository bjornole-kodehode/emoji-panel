import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/https://bjornole-kodehode.github.io/emoji-panel/",
  plugins: [react()],
})
