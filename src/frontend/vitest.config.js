import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// tests/unit/frontend/*.test.jsx lives OUTSIDE src/frontend/, so bare imports
// (@testing-library/*, react-router-dom, ...) resolved from the test file's own
// directory would never find src/frontend/node_modules — same class of problem
// documented in common/behavior-spec.md Section 4.1a for cucumber step files.
// Alias each bare import used by the test suite to this project's own node_modules.
const nodeModules = path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@testing-library/react', replacement: path.join(nodeModules, '@testing-library/react') },
      { find: '@testing-library/jest-dom', replacement: path.join(nodeModules, '@testing-library/jest-dom') },
      { find: 'react-router-dom', replacement: path.join(nodeModules, 'react-router-dom') },
      { find: /^react\/jsx-dev-runtime$/, replacement: path.join(nodeModules, 'react/jsx-dev-runtime.js') },
      { find: /^react\/jsx-runtime$/, replacement: path.join(nodeModules, 'react/jsx-runtime.js') },
      { find: /^react-dom\/client$/, replacement: path.join(nodeModules, 'react-dom/client.js') },
      { find: /^react-dom$/, replacement: path.join(nodeModules, 'react-dom') },
      { find: /^react$/, replacement: path.join(nodeModules, 'react') },
    ],
  },
  server: {
    fs: { allow: ['..', '../..'] },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    root: '.',
    dir: '../../tests/unit/frontend',
    include: ['**/*.test.jsx'],
    server: {
      fs: { allow: ['..', '../..', '../../..'] },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura'],
      reportsDirectory: 'coverage',
      include: ['src/context/AuthContext.jsx', 'src/pages/Billing.jsx', 'src/pages/ActivatePlan.jsx', 'src/components/PremiumUpgradeModal.jsx'],
    },
  },
})
