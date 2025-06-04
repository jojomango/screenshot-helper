// content-script.js
// Injects a <div class="test-screen"></div> before the main video player on supported domains

// Log when content script is loaded
console.log("[TestScreen] Content script loaded on", window.location.hostname);

(function insertTestScreen() {
  // Helper: Try to robustly find the main video player element
  function findVideoPlayer() {
    // 1. Try <video> tags
    const videos = document.querySelectorAll("video");
    if (videos.length === 1) return videos[0];
    if (videos.length > 1) {
      // Heuristic: pick the largest video element
      return Array.from(videos).sort(
        (a, b) =>
          b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight
      )[0];
    }
    // 2. Try common player containers (Netflix, KKTV)
    const selectors = [
      '[data-uia="video-player"]', // Netflix
      ".nf-player-container", // Netflix
      "#player",
      ".player", // KKTV/Generic
      ".html5-video-player", // YouTube/Generic
      ".vjs-tech", // Video.js
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  function alreadyInserted(player) {
    return (
      player &&
      player.previousElementSibling &&
      player.previousElementSibling.classList.contains("screenshot-helper")
    );
  }

  // Get current domain (without www)
  function getCurrentDomain() {
    return window.location.hostname.replace(/^www\./, "");
  }

  // Check if current domain matches any in the allowed list (including subdomains)
  function isDomainAllowed(currentDomain, domains) {
    return domains.some(
      (domain) =>
        currentDomain === domain || currentDomain.endsWith("." + domain)
    );
  }

  function checkDomainAndInsert(domains) {
    const currentDomain = getCurrentDomain();
    if (isDomainAllowed(currentDomain, domains)) {
      console.log("[TestScreen] Domain matched:", currentDomain);
      tryInsert();
      // Also run every 2 seconds for late-loading players
      let intervalId = setInterval(() => {
        const inserted = tryInsert();
        if (inserted) {
          clearInterval(intervalId);
        }
      }, 2000);
    }
  }

  function tryInsert() {
    const player = findVideoPlayer();
    if (player && !alreadyInserted(player)) {
      const helperDiv = document.createElement("div");
      helperDiv.className = "screenshot-helper";
      player.parentNode.insertBefore(helperDiv, player);
      console.log(
        "[screenshot-helper] Inserted screenshot-helper div before player"
      );
      return true;
    }
    // 只在成功插入時 log，否則不 log found video player
    return false;
  }

  // Load domains via messaging (Manifest V3 compatible)
  function loadDomains(cb) {
    chrome.runtime.sendMessage({ type: "GET_DOMAINS" }, (response) => {
      if (response && response.domains) {
        console.log(
          "[TestScreen] Loaded domains from storage:",
          response.domains
        );
        cb(response.domains);
      } else {
        console.warn("[TestScreen] Failed to load domains from background");
        cb(["kktv.me", "netflix.com"]);
      }
    });
  }

  // Run immediately in case DOMContentLoaded already fired
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[TestScreen] DOM fully loaded");
      loadDomains(checkDomainAndInsert);
    });
  } else {
    console.log("[TestScreen] DOM already loaded");
    loadDomains(checkDomainAndInsert);
  }
})();
console.log("[MCP DEBUG]", window.location.hostname);
