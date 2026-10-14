'use strict';

const DEFAULTS = { enabled: true, scope: 'watchLater' };

const enabledBox = document.getElementById('enabled');
const scopeSet = document.getElementById('scope');

document.documentElement.lang = chrome.i18n.getUILanguage();
for (const element of document.querySelectorAll('[data-i18n]')) {
  element.textContent = chrome.i18n.getMessage(element.dataset.i18n);
}

function render({ enabled, scope }) {
  enabledBox.checked = enabled;
  scopeSet.disabled = !enabled;
  for (const radio of scopeSet.querySelectorAll('input[name="scope"]')) {
    radio.checked = radio.value === scope;
  }
}

chrome.storage.sync.get(DEFAULTS, render);

enabledBox.addEventListener('change', () => {
  scopeSet.disabled = !enabledBox.checked;
  chrome.storage.sync.set({ enabled: enabledBox.checked });
});

scopeSet.addEventListener('change', (event) => {
  if (event.target.name === 'scope') {
    chrome.storage.sync.set({ scope: event.target.value });
  }
});
