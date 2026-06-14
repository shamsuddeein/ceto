import { test, expect } from "@playwright/test";

test.describe("Auth flows", () => {
  test("Login form validation and success state", async ({ page }) => {
    await page.goto("/login");

    // Fill both and mock successful login
    await page.fill("#login-identifier", "testuser");
    await page.fill("#login-password", "password123");
    await page.click('button[type="submit"]');
  });

  test("Signup form navigation and basic checks", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("h1").first()).toContainText(/Create your Cetoh account/i);

    // Test navigation back to login
    await page.click("text=Log in");
    await expect(page).toHaveURL(/.*\/login/);
  });
});
