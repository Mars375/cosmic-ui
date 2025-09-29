import { test, expect } from '@playwright/test';

test.describe('UI', () => {
  test('home renders hero and docs link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'CosmicUI' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Voir la doc' })).toBeVisible();
  });

  test('docs sidebar search filters items', async ({ page }) => {
    await page.goto('/docs');
    const input = page.getByPlaceholder('Rechercher...');
    await input.fill('button');
    await expect(page.getByRole('link', { name: 'Button' })).toBeVisible();
  });

  test('button preview exists', async ({ page }) => {
    await page.goto('/docs/button');
    await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
  });
});
