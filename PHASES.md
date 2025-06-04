# Project Phases: Video Player Test Screen Inserter

This document outlines the planned phases for the development of the Chrome extension. Each phase builds on the previous, allowing for incremental progress and clear milestones.

## Phase 1: Basic Functionality
- When the domain matches (`kktv.me` or `netflix.com`), display the `<div class="test-screen"></div>` before the main video player.
- Enable screenshot functionality on the screen when the domain matches.
- No advanced detection or user configuration.
- Focus on verifying injection, visibility, and screenshot capability only.

## Phase 2:
- Allow users to customize the domain list: when visiting a non-default domain, users can click the extension menu to add the current site to the detection list.
- The extension popup will have a dropdown with two options: "Add current site" and "Manage sites".
- "Manage sites" lists all detected domains, allows manual addition, and supports deleting domains from the list.

## Phase 3: TODO

---

**Note:**
- Refer to this file for the current project scope and next steps.
- Update this document as new phases or features are planned.
