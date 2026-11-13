// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-06 Cancel dismisses with no change', async ({ page }) => {
    // 1. Create Standard account; open modal; click 'Cancel'
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

    const upgradeButton = page.getByRole('button', { name: 'Upgrade to Premium', exact: true });
    await upgradeButton.click();
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Cancel' }).click();

    // expect: Dialog closes
    await expect(dialog).toBeHidden();

    // expect: No 'Premium upgrades are coming soon' message
    await expect(page.getByText('Premium upgrades are coming soon')).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveCount(0);

    // expect: Page still shows Current plan: Standard and Upgrade to Premium button
    await expect(page.getByText('Current plan: Standard')).toBeVisible();
    await expect(upgradeButton).toBeVisible();
  });
});
