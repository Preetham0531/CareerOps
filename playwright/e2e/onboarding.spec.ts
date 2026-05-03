import { test, expect } from '@playwright/test';

test.describe('Onboarding happy path', () => {
  test('progresses through all 6 steps to dashboard', async ({ page }) => {
    // Step 0 hero
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /job-search agent built for india/i })).toBeVisible();
    await page.getByRole('link', { name: /start your search/i }).click();

    // Step 1 — auth (use OAuth stub for speed)
    await expect(page).toHaveURL(/\/start\/auth/);
    await page.getByRole('button', { name: /continue with linkedin/i }).click();

    // Step 2 — persona
    await expect(page).toHaveURL(/\/start\/persona/);
    await page.getByText(/currently employed, looking quietly/i).click();
    await page.getByText(/within a month/i).click();
    await page.getByText(/better compensation/i).click();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 3 — resume (skip)
    await expect(page).toHaveURL(/\/start\/resume/);
    await page.getByRole('button', { name: /skip/i }).click();

    // Step 4 — filters
    await expect(page).toHaveURL(/\/start\/filters/);
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 5 — network
    await expect(page).toHaveURL(/\/start\/network/);
    await page.getByRole('button', { name: /^connect$/i }).first().click();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 6 — preferences
    await expect(page).toHaveURL(/\/start\/preferences/);
    await page.getByRole('button', { name: /take me in/i }).click();

    // Dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole('heading', { name: /good \w+, aman/i })).toBeVisible();
  });

  test('command palette opens with ⌘K', async ({ page }) => {
    await page.goto('/start/auth');
    await page.getByRole('button', { name: /continue with linkedin/i }).click();
    await page.waitForURL(/\/start\/persona/);
    // Direct dashboard navigation now that we're authed
    await page.goto('/dashboard');
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder(/search jobs, settings, actions/i)).toBeVisible();
  });
});
