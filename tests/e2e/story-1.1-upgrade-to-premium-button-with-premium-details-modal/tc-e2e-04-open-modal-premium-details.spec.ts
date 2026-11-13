// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-04 Open the modal and see Premium details', async ({ page }) => {
    // 1. Create Standard account; click 'Upgrade to Premium'
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

    await page.getByRole('button', { name: 'Upgrade to Premium', exact: true }).click();

    // expect: Dialog titled 'Upgrade to Premium' is visible
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Upgrade to Premium' })).toBeVisible();

    // expect: Dialog shows price and feature list
    await expect(dialog.getByText('$30/month')).toBeVisible();
    await expect(dialog.getByText('Ultra HD (4K)')).toBeVisible();
    await expect(dialog.getByText('Watch on 4 devices at once')).toBeVisible();
    await expect(dialog.getByText('Download on 6 devices')).toBeVisible();
    await expect(dialog.getByText('Ad-free streaming')).toBeVisible();
    await expect(dialog.getByText('Spatial audio')).toBeVisible();

    // expect: Buttons 'Continue', 'Cancel' and 'Close' control are present
    await expect(dialog.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible();
  });
});
