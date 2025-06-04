// background.js
// Manifest V3 background service worker (minimal, as content script handles main logic)

// This file is included for future extensibility. Currently, all logic is in the content script.
// You may use this for advanced tab/domain monitoring if needed.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_DOMAINS") {
    chrome.storage.sync.get({ domains: ["kktv.me", "netflix.com"] }, (data) => {
      sendResponse({ domains: data.domains });
    });
    // Return true to indicate async response
    return true;
  }
});
