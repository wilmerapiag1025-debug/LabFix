# LabFix — Computer Laboratory Issue Reporter

A simple web application that helps students report problems with computers in their school's computer laboratory.

## Community Problem

Students in our school's computer laboratory sometimes experience problems with computer workstations. Reporting these issues can be difficult because there is no simple way to keep track of faulty computers and their reported problems.

LabFix provides a simple webpage where students can submit and manage computer laboratory issue reports.

## Functional Requirement

**FR-01:** Students can report a computer laboratory issue by entering the workstation number, issue category, and problem description.

## Acceptance Criteria

1. The user can submit a report by providing a valid PC number, selecting an issue category, and entering a problem description.
2. The system rejects empty fields, invalid PC numbers, and descriptions with fewer than five characters.
3. Submitted reports appear on the dashboard with their workstation number, category, description, and date and time.
4. Reports remain saved after refreshing the webpage using browser `localStorage`.
5. Users can edit and delete existing reports.

## Features

- Submit computer laboratory issue reports.
- Choose from Hardware, Software, Network, or Other categories.
- Validate user inputs before submission.
- View all submitted reports on the dashboard.
- Automatically update the total report count.
- Edit and delete existing reports.
- Save reports in the browser using `localStorage`.
- Display an empty-state message when there are no reports.
- Use a responsive interface with an animated flame background.

## Technologies Used

- HTML
- CSS
- JavaScript
- localStorage
- Git and GitHub
- GitHub Pages

## Testing

The application was tested to check:

- Successful report submission.
- Empty and invalid input rejection.
- PC number validation.
- Issue category selection.
- Editing and deleting reports.
- Data persistence after refreshing the webpage.

## Testing Table

The following test cases were performed to verify the functionality of LabFix.

| No. | Test Case | Expected Result | Actual Result |
|---|---|---|---|
| 1 | Valid report submission | Report appears on the dashboard. | PASS |
| 2 | Empty form submission | Submission is rejected. | PASS |
| 3 | Invalid PC number (0) | Invalid number is rejected. | PASS |
| 4 | Short description ("Bad") | Description is rejected. | PASS |
| 5 | Edit existing report | Report updates without duplication. | PASS |
| 6 | Delete existing report | Selected report is removed. | PASS |
| 7 | Refresh webpage | Saved report remains visible. | PASS |
| 8 | Cancel editing | Original report remains unchanged. | PASS |

**Testing Summary:** 8 out of 8 test cases passed.

## Privacy

LabFix uses made-up data for demonstration and testing. Reports are stored locally in the browser using `localStorage`. The application does not require accounts, collect personal information, or send reports to an external server.

Clearing browser storage removes saved reports.

## Image Attribution

Background image: "FIRE 01" by MarcusObal, from Wikimedia Commons, licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

The image is stored locally in `assets/campfire.jpg`.