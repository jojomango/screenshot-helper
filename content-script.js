// content-script.js
// Injects a <div class="test-screen"></div> before the main video player on supported domains

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
      player.previousElementSibling.classList.contains("test-screen")
    );
  }

  function tryInsert() {
    const player = findVideoPlayer();
    if (player && !alreadyInserted(player)) {
      const testDiv = document.createElement("div");
      testDiv.className = "test-screen";
      player.parentNode.insertBefore(testDiv, player);
      // Optionally, you can log for debugging:
      // console.log('Inserted test-screen before video player');
    }
  }

  // Run on DOMContentLoaded and periodically (in case player loads late)
  document.addEventListener("DOMContentLoaded", tryInsert);
  // Also run every 2 seconds for late-loading players
  setInterval(tryInsert, 2000);
})();
