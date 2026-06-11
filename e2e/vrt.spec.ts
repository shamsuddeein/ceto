import { test, expect } from '@playwright/test';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'login', path: '/login' },
  { name: 'signup', path: '/signup' },
  { name: 'marketplace', path: '/marketplace' },
  { name: 'pricing', path: '/pricing' }
];

test.describe('Visual Regression Tests', () => {
  for (const route of ROUTES) {
    test(`Visual check for ${route.name}`, async ({ page }) => {
      // Navigate to the route
      await page.goto(route.path);
      
      // Wait for network idle to ensure fonts/images are loaded
      await page.waitForLoadState('networkidle');

      // Hide specific dynamic elements like floating decorative circles with random rotation if they break VRT
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });

      // Take a full page screenshot and compare
      await expect(page).toHaveScreenshot(`${route.name}-full.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05, // Allow small pixel differences for rendering variations
        timeout: 15000, // Increase timeout for long pages
        animations: "disabled"
      });
    });
  }
});
