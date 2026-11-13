// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-A11Y-04 Escape closes and focus returns', async ({ page }) => {
    // Precondition: fresh Standard account on Plan & Billing
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
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    await expect(upgradeButton).toBeVisible();

    // 1. Open dialog via keyboard (Tab to button, Enter); press Escape
    let focused = false;
    for (let i = 0; i < 30 && !focused; i++) {
      await page.keyboard.press('Tab');
      try {
        await expect(upgradeButton).toBeFocused({ timeout: 250 });
        focused = true;
      } catch {
        focused = false;
      }
    }
    await expect(upgradeButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');

    // expect: Dialog closes
    await expect(dialog).toBeHidden();

    // expect: No coming-soon message
    await expect(page.getByRole('status')).toHaveCount(0);

    // expect: Focus is on 'Upgrade to Premium' button
    await expect(upgradeButton).toBeFocused();

    // expect: Enter re-opens the dialog
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
  });
});
