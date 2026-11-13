// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-E2E-08 Repeated open/close cycles stay consistent', async ({ page }) => {
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
    await expect(page.getByText('Current plan:')).toBeVisible();

    const upgrade = page.getByRole('button', { name: 'Upgrade to Premium', exact: true });
    const dialog = page.getByRole('dialog', { name: 'Upgrade to Premium' });
    const details = ['$30/month', 'Ultra HD (4K)', 'Watch on 4 devices at once', 'Download on 6 devices', 'Ad-free streaming', 'Spatial audio'];

    // 1. Three times: open modal, verify same details, click Cancel
    for (let i = 0; i < 3; i++) {
      await upgrade.click();
      await expect(dialog).toBeVisible();
      // expect: same details each time
      for (const text of details) {
        await expect(dialog.getByText(text)).toBeVisible();
      }
      await dialog.getByRole('button', { name: 'Cancel' }).click();
      await expect(dialog).toBeHidden();
      // expect: no coming-soon message after any cycle
      await expect(page.getByText('Premium upgrades are coming soon')).toHaveCount(0);
    }

    // 2. Open modal and click Continue
    await upgrade.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Continue' }).click();
    await expect(dialog).toBeHidden();
    // expect: message appears exactly once
    await expect(page.getByRole('status').filter({ hasText: 'Premium upgrades are coming soon' })).toHaveCount(1);
    await expect(page.getByText('Premium upgrades are coming soon')).toHaveCount(1);

    // 3. Open modal again
    await upgrade.click();
    // expect: dialog opens normally with the same details
    await expect(dialog).toBeVisible();
    for (const text of details) {
      await expect(dialog.getByText(text)).toBeVisible();
    }
  });
});
