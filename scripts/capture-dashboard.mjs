import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const outDir =
    "/home/deen/.gemini/antigravity-ide/brain/9591927f-dc22-4188-9ef0-87a53311d4b4/internal_screenshots";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    // Register event listeners immediately
    page.on("console", (msg) =>
      console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`),
    );
    page.on("pageerror", (err) => console.error(`[Browser PageError] ${err.stack || err.message}`));

    console.log("Navigating to login page...");
    await page.goto("http://localhost:5174/login");

    console.log("Waiting for React hydration...");
    await page.waitForTimeout(3000);

    console.log("Entering login details...");
    await page.click("#login-identifier");
    await page.type("#login-identifier", "test@example.com");

    await page.click("#login-password");
    await page.type("#login-password", "password123");

    // Verify input values
    const idVal = await page.$eval("#login-identifier", (el) => el.value);
    const passVal = await page.$eval("#login-password", (el) => el.value);
    console.log(`Verified input values: identifier='${idVal}', password='${passVal}'`);

    console.log("Submitting login form...");
    await page.click("button[type='submit']");

    console.log("Waiting for navigation to dashboard...");
    try {
      await page.waitForURL("**/dashboard/creator", { timeout: 10000 });
      console.log("Successfully logged in and reached /dashboard/creator");
    } catch (e) {
      console.log(`Current URL: ${page.url()}`);
      const token = await page.evaluate(() => localStorage.getItem("mock_token"));
      console.log(`localStorage mock_token value: ${token}`);
      const content = await page.content();
      console.log(`HTML Page Content (first 500 chars): ${content.substring(0, 500)}`);
      await page.screenshot({ path: path.join(outDir, "login_error_debug.png") });
      console.log(`Saved error screenshot to login_error_debug.png`);
      throw e;
    }

    // Capture pages
    const routes = [
      { name: "dashboard_creator", url: "http://localhost:5174/dashboard/creator" },
      { name: "profile", url: "http://localhost:5174/dashboard/creator/profile" },
      { name: "add_product", url: "http://localhost:5174/dashboard/creator/add-product" },
      { name: "my_products", url: "http://localhost:5174/dashboard/creator/my-products" },
      { name: "orders", url: "http://localhost:5174/dashboard/creator/orders" },
      { name: "withdrawals", url: "http://localhost:5174/dashboard/creator/withdrawals" },
      { name: "overview_customer", url: "http://localhost:5174/dashboard/overview" },
    ];

    for (const r of routes) {
      console.log(`Navigating to ${r.url}...`);
      await page.goto(r.url);
      await page.waitForTimeout(1000); // Allow render
      const screenshotPath = path.join(outDir, `${r.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot: ${screenshotPath}`);
    }

    // Capture mobile settings view
    console.log("Testing mobile viewport settings...");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("http://localhost:5174/dashboard/creator/profile");
    await page.waitForTimeout(1000);
    const mobileProfilePath = path.join(outDir, "mobile_profile.png");
    await page.screenshot({ path: mobileProfilePath, fullPage: true });
    console.log(`Saved mobile screenshot: ${mobileProfilePath}`);
  } catch (err) {
    console.error("Error capturing screenshots:", err);
  } finally {
    await browser.close();
  }
})();
