// Patches unkeyed element arrays inside @stackframe/stack's providers,
// which otherwise spam React's "unique key prop" dev warning on every page:
//
//   dist/{esm/,}providers/stack-provider.js  -> children: [Suspense, TranslationProvider]
//   dist/{esm/,}providers/theme-provider.js  -> children: [BrowserScript, <style>, TooltipProvider]
//
// Upstream bug (present in latest 2.8.108). This script is:
// - idempotent (skips files that already contain the keys),
// - fail-soft (warns instead of crashing the install if Stack's dist changes).
// Keep "@stackframe/stack" pinned to an exact version in package.json so the
// patterns below can't silently drift.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stackDir = join(root, "node_modules", "@stackframe", "stack", "dist");

const targets = [
  "esm/providers/stack-provider.js",
  "providers/stack-provider.js",
  "esm/providers/theme-provider.js",
  "providers/theme-provider.js",
];

/** [pattern, replacement] pairs applied in order. */
const patches = [
  // <Suspense fallback={null} /> inside StackProvider's children array (ESM)
  [
    `jsx(Suspense, { fallback: null })`,
    `jsx(Suspense, { fallback: null }, "stack-suspense")`,
  ],
  // ... same, CJS build: (0, jsx)(react.Suspense, { fallback: null })
  [
    `react.Suspense, { fallback: null })`,
    `react.Suspense, { fallback: null }, "stack-suspense")`,
  ],
  // <TranslationProvider …> — key goes INSIDE its jsx() call, before the
  // closing paren: jsx(TranslationProvider, { lang, …, children }, "key")
  [
    /translationOverrides,(\s*)children(\s*)\}\)\]/,
    `translationOverrides,$1children$2}, "stack-i18n")]`,
  ],
  // <BrowserScript nonce /> inside StackTheme's fragment array (ESM)
  [
    `jsx(BrowserScript, { nonce })`,
    `jsx(BrowserScript, { nonce }, "stack-browser-script")`,
  ],
  // ... same, CJS build
  [
    `BrowserScript, { nonce })`,
    `BrowserScript, { nonce }, "stack-browser-script")`,
  ],
  // <TooltipProvider> inside StackTheme's fragment array (ESM)
  [
    `jsx(TooltipProvider, { children })`,
    `jsx(TooltipProvider, { children }, "stack-tooltip")`,
  ],
  // ... same, CJS build
  [
    `TooltipProvider, { children })`,
    `TooltipProvider, { children }, "stack-tooltip")`,
  ],
  // <style> theme tag inside StackTheme's fragment array
  [
    /convertColorsToCSS\(themeValue\) \}(\s*)\}\),/,
    `convertColorsToCSS(themeValue) }$1}, "stack-theme-style"),`,
  ],
];

let changed = 0;
for (const rel of targets) {
  const file = join(stackDir, rel);
  if (!existsSync(file)) {
    console.warn(`[fix-stack-keys] missing (stack version drift?): ${rel}`);
    continue;
  }
  let content = readFileSync(file, "utf8");
  if (content.includes("stack-suspense") || content.includes("stack-browser-script")) {
    console.log(`[fix-stack-keys] already patched: ${rel}`);
    continue;
  }
  let fileChanged = false;
  for (const [pattern, replacement] of patches) {
    if (typeof pattern === "string") {
      if (content.includes(pattern)) {
        content = content.replaceAll(pattern, replacement);
        fileChanged = true;
      }
    } else if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      fileChanged = true;
    }
  }
  if (fileChanged) {
    writeFileSync(file, content);
    changed++;
    console.log(`[fix-stack-keys] patched: ${rel}`);
  } else {
    console.warn(`[fix-stack-keys] no patterns matched (stack version drift?): ${rel}`);
  }
}
console.log(`[fix-stack-keys] done (${changed} file(s) patched)`);
