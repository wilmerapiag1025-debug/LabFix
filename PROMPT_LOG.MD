# AI Prompt Log — LabFix

This file records the AI prompts used during the development of LabFix, including their goals, summaries, and results.

---

## Prompt 1 — Initial UI and Design

**Tool:** ChatGPT

**Goal:** Create the initial user interface and visual design of LabFix.

**Prompt Summary:**

Create a beginner-friendly single-page Computer Laboratory Issue Reporter called LabFix using HTML, CSS, and JavaScript.

Use a dark charcoal background with fiery orange and amber accents. Create a modern dashboard layout with a header, welcome banner, issue report form, and fictional sample report cards.

Use separate `index.html`, `style.css`, and `script.js` files. Make the interface responsive. Do not implement form functionality yet.

**Result:**

Created the initial LabFix interface, dashboard layout, fiery color theme, report form, and fictional sample reports.

---

## Prompt 2 — Complete Report CRUD

**Tool:** GitHub Copilot

**Goal:** Implement the complete report management functionality while preserving the existing dashboard design.

**Prompt Summary:**

Add complete create, read, update, and delete functionality to the existing LabFix application.

Implement report editing with input validation, stable report IDs, modified timestamps, and cancel-edit functionality.

Require confirmation before deleting reports. Save reports using browser `localStorage`, safely display user-entered content, update the report counter and empty state, and document and test the report workflow.

**Result:**

Implemented report submission, display, editing, cancellation, and confirmed deletion. Added stable report IDs, modified timestamps, input validation, and `localStorage` persistence.

---

## Prompt 3 — Realistic Fire Visuals

**Tool:** GitHub Copilot

**Goal:** Improve the visual appearance of LabFix by adding a realistic fire background without affecting existing functionality.

**Prompt Summary:**

Create a realistic flame backdrop with warm fire colors, natural movement, a soft heat glow, and subtle ember particles.

Keep the effects behind the application content. Make them responsive, respect reduced-motion preferences, and avoid unnecessary dependencies or runtime image requests.

Preserve the existing dashboard layout and report functionality.

**Result:**

Added a licensed campfire photograph with CSS-based glow and ember effects. Preserved the existing dashboard design and report management functionality.

---

## Development Notes

- The application was developed using HTML, CSS, and JavaScript.
- AI assistance was used for interface design, functionality, and visual improvements.
- The project was tested in the browser.
- Reports are stored locally using `localStorage`.
- The project was uploaded to GitHub and published using GitHub Pages.

