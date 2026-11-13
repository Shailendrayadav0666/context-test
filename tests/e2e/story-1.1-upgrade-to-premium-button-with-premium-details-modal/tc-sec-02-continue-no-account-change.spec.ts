// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-SEC-02 Continue does not change the account', async ({ page }) => {
    // Precondition: fresh Standard account
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

    // 1. Record price and renewal date; open dialog, click Continue; click Logout; log in again; open /billing
    const renewal = await page.getByText('Renew at').locator('xpath=following-sibling::*[1]').innerText();

    await page.getByRole('button', { name: 'Upgrade to Premium', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Continue' }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/login$/);

    await page.locator('.form-field', { hasText: 'Email Address' }).locator('input').fill(email);
    await page.locator('.form-field', { hasText: 'Password' }).locator('input').fill('Passw0rd!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/billing$/);

    await page.goto('/billing');

    // expect: 'Current plan: Standard', same $20/month price and same renewal date
    await expect(page.getByText('Current plan:')).toBeVisible();
    await expect(page.getByText('Standard', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('$20/month')).toBeVisible();
    await expect(page.getByText(renewal, { exact: true })).toBeVisible();
  });
});
