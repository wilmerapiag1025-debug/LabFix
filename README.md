# LabFix — Computer Laboratory Issue Reporter

## Community Problem

Students in our school computer laboratory struggle to report computer
workstation problems because there is no simple centralized record
of faulty computers and their issues.

## FR-01

Students can report a computer laboratory issue by entering the
workstation number, issue category, and problem description.

## Project Goal

LabFix aims to provide a simple webpage where students can report
computer laboratory problems so reported issues can be recorded
and monitored.

## Implemented Functionality

- Submit reports with a required positive whole PC number, category, and description of at least five characters.
- Categorize issues as Hardware, Software, Network, or Other.
- View saved reports on the dashboard, including workstation, category, description, and date/time; the report count updates automatically.
- Edit existing reports without creating duplicates. Changes retain the report ID and record a modified date/time.
- Cancel an edit to restore the blank submission form.
- Delete reports after confirming the action.
- Keep reports in this browser using `localStorage`, including across page reloads.
- Show an empty-state message when there are no reports.
- Render user-entered content safely and provide accessible report actions.
- Add a photographic flame backdrop with a flickering heat glow and ember particles.
- Respect reduced-motion preferences and reduce the effect on mobile screens.

The bundled background photo is “FIRE 01” by MarcusObal, from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FIRE_01.JPG), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The image is stored locally at `assets/campfire.jpg`; the app does not fetch it at runtime.

## Technologies

- HTML
- CSS
- JavaScript
- Browser `localStorage`

## Current Progress

- [x] Initial interface and design
- [x] Report form functionality and input validation
- [x] Dynamic dashboard, report counter, and empty state
- [x] Edit reports, validate changes, and cancel edits
- [x] `localStorage` persistence
- [x] Confirmed report deletion
- [x] Browser testing

## Privacy

Reports are stored locally in the browser that submitted them. No account or personal information is required, and reports are not sent to a server. Clearing browser storage removes saved reports.