// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-SEC-04 Fail-safe when billing data cannot load', async ({ page }) => {
    // Precondition: create Standard account (seed sign-up flow)
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

    // 1. Route '**/api/billing*' to abort; reload /billing
    // (the billing request always carries a ?email= query string, hence the wildcard)
    await page.route('**/api/billing*', (route) => route.abort());
    await page.reload();

    // The page never receives billing data, so it stays on its loading state
    await expect(page.getByText('Loading billing...')).toBeVisible();

    // expect: No 'Upgrade to Premium' button
    await expect(page.getByRole('button', { name: 'Upgrade to Premium', exact: true })).toHaveCount(0);

    // expect: No raw error text, stack trace or exception details visible
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/TypeError|Failed to fetch|NetworkError|ERR_FAILED|Unhandled|Exception|\bat\s+\S+\s+\(|stack/i);
    await expect(page.locator('.error-text')).toHaveCount(0);
  });
});
