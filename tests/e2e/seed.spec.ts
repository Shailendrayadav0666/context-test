import { test, expect } from '@playwright/test';

// Shared environment seed (one file for every story — extend, never overwrite).
// Story 1.1 — "Standard account" shared setup from
// spec/test-plans/story-1.1-upgrade-to-premium-button-with-premium-details-modal/e2e-test-steps.md:
// Sign Up with a unique email, activate the Standard plan, land on Plan & Billing.
// The backend keeps accounts in memory, so every run creates a fresh account.
test.describe('Test group', () => {
  test('seed', async ({ page }) => {
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
  });
});
