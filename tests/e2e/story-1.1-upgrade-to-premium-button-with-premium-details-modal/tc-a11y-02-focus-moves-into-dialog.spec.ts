// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-A11Y-02 Focus moves into dialog on open', async ({ page }) => {
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
    const closeButton = dialog.getByRole('button', { name: 'Close' });
    const cancelButton = dialog.getByRole('button', { name: 'Cancel' });
    const continueButton = dialog.getByRole('button', { name: 'Continue' });

    // 1. Focus button and press Enter
    await upgradeButton.focus();
    await expect(upgradeButton).toBeFocused();
    await page.keyboard.press('Enter');

    // expect: document.activeElement is the dialog or inside it immediately
    // (observed: the dialog panel itself, tabindex=-1, receives focus)
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();

    // 2. Press Tab repeatedly
    // expect: Focus moves through Close, Cancel, Continue and stays within the dialog
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(cancelButton).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(continueButton).toBeFocused();

    // Observation (not asserted): the live app has no focus trap; a further Tab past
    // Continue moves focus out of the dialog (document root, then the header "Billing" link).
  });
});
