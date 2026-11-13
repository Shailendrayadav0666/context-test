import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig, mergeConfig } from 'vitest/config'
import base from './vitest.config.js'

// Behavioural (Gherkin) tiers B1/B2/B3 — invoked by tests/.evals/behavior/run.sh with explicit
// step files. Step definitions live in the repo-root tests/behavior/ tree (common/behavior-spec.md
// Section 4), so their bare imports are aliased to this project's own node_modules.
const nodeModules = path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules')

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      alias: [
        { find: '@amiceli/vitest-cucumber', replacement: path.join(nodeModules, '@amiceli/vitest-cucumber') },
        { find: '@testing-library/user-event', replacement: path.join(nodeModules, '@testing-library/user-event') },
      ],
    },
    test: {
      dir: '../../tests/behavior',
      include: ['steps/**/*.behavior.test.jsx'],
      coverage: { enabled: false },
      // vitest-cucumber runs every Gherkin step as its own test; Testing Library's automatic
      // afterEach cleanup would unmount the app between the steps of one scenario. Scenarios
      // clean up explicitly in AfterEachScenario instead.
      env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
    },
  }),
)
