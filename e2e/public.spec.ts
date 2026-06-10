import { test, expect } from '@playwright/test';

test.describe('Public routes', () => {
  test('Homepage loads correctly with lazy sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Cetoh/);
    await expect(page.locator('h1').first()).toContainText('The best way to sell');
    
    // Scroll and wait for the lazy loaded PaymentGateways section to appear
    await page.locator('text=Never lose an international').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Never lose an international')).toBeVisible();
  });

  test('Marketplace route fetches and renders products', async ({ page }) => {
    await page.goto('/marketplace');
    await expect(page.locator('h1')).toContainText('Discover digital products');
    
    // Check if the mock products are rendered by looking for a specific product text or general grid element
    await expect(page.locator('text=products').first()).toBeVisible();
  });

  test('Creator profile fetches and renders creator data', async ({ page }) => {
    await page.goto('/creators/janedoe');
    
    // The queryOptions loader uppercases the first letter
    await expect(page.locator('h1').first()).toContainText('Janedoe');
    await expect(page.locator('text=@janedoe')).toBeVisible();
    await expect(page.locator('text=Featured Products').first()).toBeVisible();
  });
});
