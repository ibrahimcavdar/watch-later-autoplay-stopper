// Runs in the extension's isolated world. The main-world script (main.js) can't
// read chrome.storage, so this script relays the saved settings to it through
// DOM events. Settings travel as JSON strings because object `detail`s don't
// reliably cross the isolated/main world boundary.

(() => {
  'use strict';

  const DEFAULTS = { enabled: true, scope: 'watchLater' };

  let current = null;

  function send() {
    if (!current) return;
    window.dispatchEvent(
      new CustomEvent('wlas:settings', { detail: JSON.stringify(current) })
    );
  }

  chrome.storage.sync.get(DEFAULTS, (stored) => {
    current = stored;
    send();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync' || !current) return;
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key in DEFAULTS) current[key] = newValue ?? DEFAULTS[key];
    }
    send();
  });

  // main.js may load after us or before us; it asks once it's listening.
  window.addEventListener('wlas:request-settings', send);
})();
