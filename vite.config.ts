import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(async () => ({
  plugins: [react()],
  build: {
    target: ["chrome140", "firefox139"]
  },
  server: {
    strictPort: true,
    port: 1420,
    host: "127.0.0.1"
  }
}))
