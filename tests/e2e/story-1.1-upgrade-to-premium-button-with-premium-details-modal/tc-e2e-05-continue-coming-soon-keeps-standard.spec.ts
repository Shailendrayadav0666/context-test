// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-05 Continue shows coming-soon message and keeps Standard', async ({ page }) => {
    // 1. Create Standard account; note price and renewal date; open modal; click 'Continue'
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
    const renewal = await page.getByText('Renew at').locator('xpath=following-sibling::*[1]').innerText();

    await page.getByRole('button', { name: 'Upgrade to Premium', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Continue' }).click();

    // expect: Dialog closes
    await expect(dialog).toBeHidden();

    // expect: 'Premium upgrades are coming soon' is shown
    await expect(page.getByText('Premium upgrades are coming soon')).toBeVisible();

    // expect: Current plan: Standard still shown with same price
    await expect(page.getByText('Current plan:')).toBeVisible();
    await expect(page.getByText('Standard', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('$20/month')).toBeVisible();
    await expect(page.getByText(renewal, { exact: true })).toBeVisible();

    // 2. Reload /billing
    await page.reload();

    // expect: Plan is still Standard
    await expect(page).toHaveURL(/\/billing$/);
    await expect(page.getByText('Current plan:')).toBeVisible();
    await expect(page.getByText('Standard', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('$20/month')).toBeVisible();
  });
});
