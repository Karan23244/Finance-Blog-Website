import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Helps analyze bundle size
  ],
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("chart.js")) return "chartjs"; // Separate Chart.js
            if (id.includes("react-router-dom")) return "react-router";
            if (id.includes("react-icons")) return "react-icons"; // Large file
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["chart.js"],
    exclude: ["react-chartjs-2"], // Avoid pre-bundling unnecessary parts
  },
})
