#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for file in src/bridge.js src/main.js popup/popup.js; do
  node --check "$ROOT/$file"
done

node - "$ROOT" <<'NODE'
const fs = require("fs");
const path = require("path");

const root = process.argv[2];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const manifest = JSON.parse(read("manifest.json"));

if (manifest.manifest_version !== 3) throw new Error("Manifest V3 is required.");
if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error("Use an x.y.z version.");
if (JSON.stringify(manifest.permissions) !== '["storage"]' || manifest.host_permissions) {
  throw new Error("Only the storage permission is expected.");
}
if (!manifest.content_scripts.some((script) => script.world === "MAIN" && script.js.includes("src/main.js"))) {
  throw new Error("src/main.js must run in the MAIN world.");
}

const messageKeys = (locale) => JSON.parse(read(`_locales/${locale}/messages.json`));
const english = messageKeys(manifest.default_locale);
const usedKeys = new Set([
  ...JSON.stringify(manifest).matchAll(/__MSG_(\w+)__/g),
  ...read("popup/popup.html").matchAll(/data-i18n="(\w+)"/g),
].map((match) => match[1]));

for (const locale of fs.readdirSync(path.join(root, "_locales"))) {
  const messages = messageKeys(locale);
  for (const key of usedKeys) {
    if (!messages[key]?.message) throw new Error(`Missing "${key}" in _locales/${locale}.`);
  }
  for (const key of Object.keys(messages)) {
    if (!(key in english)) throw new Error(`Unknown "${key}" in _locales/${locale}.`);
  }
  const description = messages.extDescription.message;
  if (description.length > 132) {
    throw new Error(`_locales/${locale} description is ${description.length} characters (max 132).`);
  }
}

const referenced = [
  ...manifest.content_scripts.flatMap((script) => script.js),
  manifest.action.default_popup,
  ...Object.values(manifest.icons),
];
for (const file of referenced) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}.`);
}

console.log(`Validated Watch Later Autoplay Stopper ${manifest.version}.`);
NODE
