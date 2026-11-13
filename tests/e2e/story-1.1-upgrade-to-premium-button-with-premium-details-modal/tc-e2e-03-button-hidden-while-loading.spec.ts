// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-03 Button hidden while billing data is loading', async ({ page }) => {
    // Precondition: create Standard account (seed sign-up flow)
    const email = `qa+${Date.now()}@example.com`;
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.locator('.form-field', { hasText: 'Full name' }).locator('input').fill('QA Tester');
    await page.locator('.form-field', { hasText: 'Email Address' }).locator('input').fill(email);
    await page.locator('.form-field', { hasText: 'Password' }).locator('input').fill('Passw0rd!');
    await page.locator('form').getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByRole('heading', { name: 'Activate your plan' })).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page).toHaveURL(/\/billing$/);
    await expect(page.getByText('Current plan:')).toBeVisible();

    // 1. Route '**/api/billing*' with a delay before continuing; reload /billing
    await page.route('**/api/billing*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });
    await page.reload();

    // expect: While 'Loading billing...' is visible, 'Upgrade to Premium' count is 0
    await expect(page.getByText('Loading billing...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Upgrade to Premium', exact: true })).toHaveCount(0);

    // 2. Wait for loading to finish
    await expect(page.getByText('Loading billing...')).toBeHidden({ timeout: 10000 });

    // expect: 'Current plan: Standard' shown and the 'Upgrade to Premium' button appears
    await expect(page.getByText('Current plan:')).toContainText('Standard');
    await expect(page.getByRole('button', { name: 'Upgrade to Premium', exact: true })).toBeVisible();
  });
});
