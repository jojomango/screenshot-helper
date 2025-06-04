# Chrome Extension Development Instruction

## Objective

Develop a Chrome Extension using VS Code's Copilot Chat Agent Mode that automatically inserts a specific HTML element in front of video players on designated streaming platforms.

## Functionality Description

The extension should perform the following actions:

1.  **Domain Detection:**
    * Continuously monitor the current browser tab's domain.
    * Activate the extension's core functionality only when the domain is identified as `kktv.me` (or subdomains like `*.kktv.me`) or `netflix.com` (or subdomains like `*.netflix.com`).

2.  **Player Identification:**
    * Once activated, the extension should scan the current webpage's DOM to identify the primary video player element.
    * The identification should attempt to be robust, considering common HTML structures for video players (e.g., `<video>` tags, `div` elements with common player classes or IDs). The agent should use its best judgment to locate the main video player.

3.  **Element Insertion:**
    * Upon successful identification of the video player, a new `div` element with the class `test-screen` should be inserted immediately *before* the identified player's HTML tag in the DOM.
    * The inserted element should look like this: `<div class="test-screen"></div>`.

## Technical Stack & Considerations

* **Chrome Extension APIs:** Utilize appropriate Chrome Extension APIs for tab management, content script injection, and DOM manipulation.
* **Content Scripts:** The core logic for DOM manipulation will likely reside within content scripts injected into the target pages.
* **Manifest V3:** The extension should be built according to Manifest V3 specifications.
* **JavaScript, HTML, CSS:** Standard web technologies will be used.

## Expected Output

The AI agent should generate the following files and code snippets:

* `manifest.json`: The extension's manifest file, defining permissions, content scripts, and other necessary configurations.
* `background.js` (if necessary): For background logic, such as domain monitoring.
* `content-script.js`: The main script injected into the target webpages for player detection and element insertion.
* `styles.css` (optional, for `test-screen`): A basic CSS file if any default styling for `test-screen` is required (though not explicitly requested, it might be a helpful placeholder).
* Clear explanations for each file and the rationale behind the code.
* Instructions on how to load and test the extension in Chrome.

## Additional Notes

* Prioritize a robust and efficient method for identifying the video player.
* Ensure the extension is well-behaved and doesn't interfere with the normal operation of the streaming sites.
* Provide comments in the code for clarity.