import { test, expect } from '@playwright/test';

async function signInQuick(page: import('@playwright/test').Page) {
  await page.goto('/start/auth');
  await page.getByRole('button', { name: /continue with linkedin/i }).click();
  await page.waitForURL(/\/start\/persona/);
}

test.describe('Discovery surface', () => {
  test.beforeEach(async ({ page }) => {
    await signInQuick(page);
  });

  test('lists jobs, opens preview, applies with undo', async ({ page }) => {
    await page.goto('/discover');

    // Wait for at least one card to render
    await expect(page.getByRole('article').first()).toBeVisible({ timeout: 10_000 });

    // Click first card to open preview
    await page.getByRole('article').first().click();
    await expect(page.getByRole('region', { name: /job preview/i })).toBeVisible();

    // Click Apply within preview
    await page
      .getByRole('region', { name: /job preview/i })
      .getByRole('button', { name: /^apply/i })
      .click();

    // Confirmation dialog
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /submit application/i }).click();

    // Undo toast appears
    await expect(page.getByText(/applied to/i)).toBeVisible({ timeout: 5_000 });
    await expect(page.getByRole('button', { name: /undo/i })).toBeVisible();
  });

  test('filter chips toggle removes the filter', async ({ page }) => {
    await page.goto('/discover');

    // Pick a city — Bangalore
    await page.getByLabel(/^Bangalore/).check();
    await expect(page.getByText('Bangalore', { exact: false })).toBeVisible();

    // Remove via the active-filter chip
    await page.getByRole('button', { name: /remove/i }).first().click();
    await expect(page.getByLabel(/^Bangalore/)).not.toBeChecked();
  });
});
