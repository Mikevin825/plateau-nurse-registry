import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { cwd } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')
  const configuredApiBase = env.VITE_API_BASE_URL || '/api/v1'
  const backend = env.VITE_BACKEND_ORIGIN || (configuredApiBase.startsWith('http') ? new URL(configuredApiBase).origin : 'http://127.0.0.1:8000')
  const proxy = { '/api/v1': { target: backend, changeOrigin: true } }

  return {
    plugins: [react()],
    define: mode === 'development' ? { 'import.meta.env.VITE_API_BASE_URL': JSON.stringify('/api/v1') } : undefined,
    server: { proxy },
  }
})
