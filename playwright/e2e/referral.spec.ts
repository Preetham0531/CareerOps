import { test, expect } from '@playwright/test';

async function signInQuick(page: import('@playwright/test').Page) {
  await page.goto('/start/auth');
  await page.getByRole('button', { name: /continue with linkedin/i }).click();
  await page.waitForURL(/\/start\/persona/);
}

test.describe('Referral hijack', () => {
  test.beforeEach(async ({ page }) => {
    await signInQuick(page);
  });

  test('opens graph, picks a referrer, drafts a DM', async ({ page }) => {
    await page.goto('/referrers/r1');

    // Top referrers rail loads
    await expect(page.getByRole('complementary', { name: /top referrers/i })).toBeVisible({
      timeout: 10_000,
    });

    // Pick first referrer's Compose DM
    await page
      .getByRole('complementary', { name: /top referrers/i })
      .getByRole('button', { name: /compose dm/i })
      .first()
      .click();

    // Composer opens with tone tabs
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('tab', { name: /warm/i })).toBeVisible();

    // AI typing should populate the body within a few seconds
    await expect(page.getByRole('textbox', { name: /body/i })).not.toHaveValue('', {
      timeout: 5_000,
    });

    // Switch tone
    await page.getByRole('tab', { name: /direct/i }).click();
    // Body still populated
    await expect(page.getByRole('textbox', { name: /body/i })).not.toHaveValue('', {
      timeout: 5_000,
    });
  });

  test('inbox lists threads and opens one', async ({ page }) => {
    await page.goto('/inbox');
    await expect(page.getByText(/Priya Krishnan/i)).toBeVisible({ timeout: 5_000 });
    await page.getByText(/Priya Krishnan/i).click();
    await expect(page.getByPlaceholder(/reply…/i)).toBeVisible();
  });
});
