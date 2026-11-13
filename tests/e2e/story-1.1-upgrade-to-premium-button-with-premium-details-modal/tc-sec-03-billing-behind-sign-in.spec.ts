// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-SEC-03 Billing page stays behind sign-in', async ({ page }) => {
    // 1. In a fresh context (signed out) navigate directly to /billing
    await page.goto('/billing');

    // Redirected to /login
    await expect(page).toHaveURL(/\/login$/);

    // No billing content and no 'Upgrade to Premium' button
    await expect(page.getByText('Current plan:')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Upgrade to Premium', exact: true })).toHaveCount(0);
  });
});
