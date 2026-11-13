// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-SEC-01 Upgrade flow makes no network request', async ({ page }) => {
    // Precondition: fresh Standard account on /billing
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
    await expect(page.getByText('Current plan: Standard')).toBeVisible();
    const upgradeButton = page.getByRole('button', { name: 'Upgrade to Premium', exact: true });
    await expect(upgradeButton).toBeVisible();

    // 1. On fully loaded /billing start recording page requests
    const requests: string[] = [];
    page.on('request', (req) => requests.push(`${req.method()} ${req.url()}`));

    // Click Upgrade to Premium then Continue
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await upgradeButton.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Continue' }).click();

    // Open and press Escape
    await upgradeButton.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    // Open and click Cancel
    await upgradeButton.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).toBeHidden();

    // expect: Zero requests recorded during these actions
    expect(requests).toEqual([]);
  });
});
