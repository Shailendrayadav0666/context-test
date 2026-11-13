// spec: spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md
// seed: tests/e2e/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Upgrade to Premium button', () => {
  test('TC-A11Y-06 Zoom 200% and contrast', async ({ page }) => {
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

    // 1. Emulate 200% zoom (viewport halved: 640x360); open modal
    await page.setViewportSize({ width: 640, height: 360 });
    await upgradeButton.scrollIntoViewIfNeeded();
    await expect(upgradeButton).toBeVisible();
    await upgradeButton.click();
    await expect(dialog).toBeVisible();

    // expect: all dialog controls visible, operable and not overlapping
    const close = dialog.getByRole('button', { name: 'Close' });
    const cancel = dialog.getByRole('button', { name: 'Cancel' });
    const cont = dialog.getByRole('button', { name: 'Continue' });
    for (const c of [close, cancel, cont]) {
      await c.scrollIntoViewIfNeeded();
      await expect(c).toBeVisible();
      await expect(c).toBeEnabled();
    }
    const boxes = [];
    for (const c of [close, cancel, cont]) {
      boxes.push((await c.boundingBox())!);
    }
    const intersects = (a: any, b: any) =>
      a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
    expect(intersects(boxes[0], boxes[1])).toBe(false);
    expect(intersects(boxes[0], boxes[2])).toBe(false);
    expect(intersects(boxes[1], boxes[2])).toBe(false);

    // 2. Compute contrast from computed color vs effective background
    const ratios = await page.evaluate(() => {
      const lum = (c: number[]) => {
        const [r, g, b] = c.map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const parse = (s: string) => {
        const m = s.match(/[\d.]+/g)!.map(Number);
        return { rgb: m.slice(0, 3), a: m[3] ?? 1 };
      };
      const bg = (el: Element | null) => {
        const layers: { rgb: number[]; a: number }[] = [];
        while (el) {
          const p = parse(getComputedStyle(el).backgroundColor);
          if (p.a > 0) layers.push(p);
          if (p.a >= 1) break;
          el = el.parentElement;
        }
        let base = [255, 255, 255];
        for (const l of layers.reverse()) base = base.map((v, i) => l.rgb[i] * l.a + v * (1 - l.a));
        return base;
      };
      const ratio = (el: Element) => {
        const a = lum(parse(getComputedStyle(el).color).rgb);
        const c = lum(bg(el));
        return (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05);
      };
      const btn = [...document.querySelectorAll('button')].find((b) => b.textContent!.trim() === 'Upgrade to Premium')!;
      const d = document.querySelector('[role=dialog]')!;
      const texts = [...d.querySelectorAll('*')].filter((e) => e.children.length === 0 && e.textContent!.trim());
      return [ratio(btn), ...texts.map(ratio)];
    });
    // expect: contrast ratio >= 4.5:1 for each
    for (const r of ratios) {
      expect(r).toBeGreaterThanOrEqual(4.5);
    }
  });
});
