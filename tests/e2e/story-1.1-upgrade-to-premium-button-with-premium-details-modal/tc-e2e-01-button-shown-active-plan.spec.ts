// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-01 Button shown for an active Standard plan', async ({ page }) => {
    // 1. Create Standard account (seed); on /billing wait for 'Current plan: Standard' and the $20/month price card
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
    await expect(page.getByText('$20/month')).toBeVisible();

    // expect: button visible and styled as a primary 'btn'
    const upgrade = page.getByRole('button', { name: 'Upgrade to Premium', exact: true });
    await expect(upgrade).toBeVisible();
    await expect(upgrade).toHaveClass(/(^|\s)btn(\s|$)/);
  });
});
