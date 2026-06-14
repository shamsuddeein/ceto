import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const routes = [
    "/",
    "/login",
    "/signup",
    "/pricing",
    "/features",
    "/dashboard",
    "/settings",
    "/analytics",
    "/affiliates",
    "/withdrawals",
    "/marketplace",
  ];

  const results = {};

  for (const route of routes) {
    try {
      console.log(`Scanning ${route}...`);
      await page.goto(`http://localhost:5173${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
      // wait 2 seconds for JS to render
      await page.waitForTimeout(2000);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      results[route] = accessibilityScanResults.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        nodes: v.nodes.map((n) => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary,
        })),
      }));
      console.log(`Scanned ${route}: ${accessibilityScanResults.violations.length} violations`);
    } catch (e) {
      console.log(`Failed to scan ${route}:`, e.message);
    }
  }

  fs.writeFileSync("axe-results.json", JSON.stringify(results, null, 2));
  console.log("Results written to axe-results.json");
  await browser.close();
})();
