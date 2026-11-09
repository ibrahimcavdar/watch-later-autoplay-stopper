#!/usr/bin/env node
// Prints the Firefox (desktop + Android) variant of manifest.json.
//
// - Adds the add-on ID and minimum versions AMO requires. The ID must never
//   change once the add-on is published.
// - Declares that no user data is collected (AMO's built-in consent).
// - Adds m.youtube.com, which Firefox for Android opens by default. The Chrome
//   build leaves it out so existing Chrome users don't get a new permission
//   prompt for a site they can't use extensions on.
// - Drops the Chrome-only `minimum_chrome_version`.

'use strict';

const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const MOBILE_SITE = 'https://m.youtube.com/*';

delete manifest.minimum_chrome_version;

for (const script of manifest.content_scripts) {
  if (!script.matches.includes(MOBILE_SITE)) script.matches.push(MOBILE_SITE);
}

manifest.browser_specific_settings = {
  gecko: {
    id: 'watch-later-autoplay-stopper@ibrahimcavdar.github.io',
    // `world: "MAIN"` content scripts need 128; the data consent key needs 140.
    strict_min_version: '140.0',
    data_collection_permissions: { required: ['none'] },
  },
  gecko_android: {
    strict_min_version: '142.0',
  },
};

process.stdout.write(JSON.stringify(manifest, null, 2) + '\n');
