#!/usr/bin/env node
// Runs AFTER vite build to generate dist/client/index.html
// by invoking the SSR server once against "/" and saving the output.

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(__dirname, "../dist/server/server.js");
const outPath = resolve(__dirname, "../dist/client/index.html");

console.log("[generate-html] Loading SSR server...");
const { default: server } = await import(serverPath);

console.log("[generate-html] Rendering /...");
const request = new Request("http://localhost/");
const response = await server.fetch(request);

if (!response.ok && response.status !== 200) {
  console.warn(`[generate-html] Server responded ${response.status} — using body anyway`);
}

const html = await response.text();

// Strip out all the pre-rendered UI from the body, keeping ONLY the scripts.
// This prevents the "homepage flash" when the fallback index.html is used for other routes.
const shellHtml = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/i, (match, bodyContent) => {
  const scripts = bodyContent.match(/<script[\s\S]*?<\/script>/gi) || [];
  return `<body>${scripts.join("")}</body>`;
});

mkdirSync(resolve(__dirname, "../dist/client"), { recursive: true });
writeFileSync(outPath, shellHtml, "utf-8");

console.log(`[generate-html] Written ${html.length} chars to dist/client/index.html ✓`);
