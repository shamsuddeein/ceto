import { test, expect } from "@playwright/test";

test.describe("Auth flows", () => {
  test("Login form validation and success state", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500); // Give React time to hydrate

    // 1. Test invalid password first
    await page.fill("#login-identifier", "test@cetoh.com");
    await page.fill("#login-password", "WrongPassword123!");
    await page.locator('form button[type="submit"]').click({ force: true });
    // Check for failure toast/message
    await expect(page.locator("text=Incorrect password").first()).toBeVisible({ timeout: 12000 });



    // 2. Clear password and fill with the correct one
    await page.fill("#login-password", "");
    await page.fill("#login-password", "StrongPass123!");
    await page.locator('form button[type="submit"]').click({ force: true });

    // 3. Verify it navigates to the Creator Dashboard
    await page.waitForURL("**/dashboard/creator", { timeout: 12000 });
    await expect(page.locator("text=Total earnings").first()).toBeVisible({ timeout: 12000 });
  });

  test("Signup form navigation and basic checks", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("h1").first()).toContainText(/Create your Cetoh account/i);

    // Test navigation back to login
    await page.click("main a[href='/login']");
    await expect(page).toHaveURL(/.*\/login/);
  });
});
