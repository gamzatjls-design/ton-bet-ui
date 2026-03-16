import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Это говорит Vite: "Если кто-то просит buffer, дай ему библиотеку buffer"
      buffer: 'buffer',
    },
  },
  define: {
    // Еще одна подстраховка для глобальных переменных
    global: 'window',
  },
})