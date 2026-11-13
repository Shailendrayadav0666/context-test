// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-02 Button hidden when there is no active plan', async ({ page }) => {
    // 1. Create No-plan account (choose No/Skip on Activate your plan); open /billing
    const email = `qa+${Date.now()}@example.com`;
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.locator('.form-field', { hasText: 'Full name' }).locator('input').fill('QA Tester');
    await page.locator('.form-field', { hasText: 'Email Address' }).locator('input').fill(email);
    await page.locator('.form-field', { hasText: 'Password' }).locator('input').fill('Passw0rd!');
    await page.locator('form').getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByRole('heading', { name: 'Activate your plan' })).toBeVisible();
    await page.getByRole('button', { name: 'No / Skip' }).click();
    await expect(page).toHaveURL(/\/billing$/);

    // expect: 'No active plan' shown, Activate button visible, no Upgrade to Premium button
    await expect(page.getByText('No active plan')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Activate Standard plan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Upgrade to Premium' })).toHaveCount(0);
  });
});
