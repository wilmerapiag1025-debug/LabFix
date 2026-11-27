// LabFix - Computer Laboratory Issue Reporter
"use strict";

const STORAGE_KEY = "labfixReports";
const reportForm = document.getElementById("reportForm");
const pcNumberInput = document.getElementById("pcNumber");
const categoryInput = document.getElementById("issueCategory");
const descriptionInput = document.getElementById("description");
const reportsList = document.getElementById("reportsList");
const reportCount = document.getElementById("reportCount");
const formMessage = document.getElementById("formMessage");
const formTitle = document.getElementById("formTitle");
const submitButtonText = document.getElementById("submitButtonText");
const cancelEditButton = document.getElementById("cancelEditBtn");
const validCategories = Array.from(categoryInput.options)
  .map((option) => option.value)
  .filter(Boolean);

function isReport(report) {
  return report &&
    (typeof report.id === "number" || typeof report.id === "string") &&
    typeof report.workstation === "string" &&
    typeof report.category === "string" &&
    typeof report.description === "string" &&
    typeof report.date === "string" &&
    (report.modifiedDate === undefined || typeof report.modifiedDate === "string");
}

function loadReports() {
  const savedReports = localStorage.getItem(STORAGE_KEY);
  if (!savedReports) {
    return [];
  }

  try {
    const parsedReports = JSON.parse(savedReports);
    if (!Array.isArray(parsedReports)) {
      throw new TypeError("Saved LabFix reports must be an array.");
    }
    return parsedReports.filter(isReport);
  } catch (error) {
    console.error("Unable to load saved LabFix reports.", error);
    return [];
  }
}

let reports = loadReports();
let editingReportId = null;

function saveReports(updatedReports) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    return true;
  } catch (error) {
    console.error("Unable to save LabFix reports.", error);
    return false;
  }
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderReports() {
  reportsList.replaceChildren();
  reportCount.textContent = String(reports.length);

  if (reports.length === 0) {
    reportsList.appendChild(
      createTextElement("p", "empty-state", "No reports yet. Submit an issue to get started.")
    );
    return;
  }

  reports.forEach((report) => {
    const card = document.createElement("article");
    card.className = "issue-card";

    const top = document.createElement("div");
    top.className = "issue-top";
    top.appendChild(createTextElement("span", "pc-label", `PC ${report.workstation}`));
    top.appendChild(createTextElement("span", "issue-status", "Reported"));
    card.appendChild(top);

    card.appendChild(createTextElement("h3", "", report.category));
    card.appendChild(createTextElement("p", "issue-description", report.description));

    const footer = document.createElement("div");
    footer.className = "issue-footer";
    const reportDate = new Date(report.date);
    const formattedDate = Number.isNaN(reportDate.getTime())
      ? report.date
      : reportDate.toLocaleString();
    footer.appendChild(createTextElement("span", "", `📅 ${formattedDate}`));
    footer.appendChild(createTextElement("span", "issue-category", report.category));
    card.appendChild(footer);

    if (report.modifiedDate) {
      const modifiedDate = new Date(report.modifiedDate);
      const formattedModifiedDate = Number.isNaN(modifiedDate.getTime())
        ? report.modifiedDate
        : modifiedDate.toLocaleString();
      card.appendChild(
        createTextElement("small", "issue-updated", `Updated ${formattedModifiedDate}`)
      );
    }

    const actions = document.createElement("div");
    actions.className = "report-actions";
    [
      { action: "edit", label: "Edit", className: "edit-report-btn" },
      { action: "delete", label: "Delete", className: "delete-report-btn" },
    ].forEach(({ action, label, className }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.dataset.action = action;
      button.dataset.reportId = String(report.id);
      button.setAttribute("aria-label", `${label} report for PC ${report.workstation}`);
      button.textContent = label;
      actions.appendChild(button);
    });
    card.appendChild(actions);

    reportsList.appendChild(card);
  });
}

function exitEditMode() {
  editingReportId = null;
  reportForm.reset();
  pcNumberInput.setCustomValidity("");
  categoryInput.setCustomValidity("");
  descriptionInput.setCustomValidity("");
  formTitle.textContent = "Report an Issue";
  submitButtonText.textContent = "Submit Report";
  cancelEditButton.hidden = true;
}

function enterEditMode(report) {
  editingReportId = report.id;
  pcNumberInput.value = report.workstation;
  categoryInput.value = report.category;
  descriptionInput.value = report.description;
  formTitle.textContent = "Edit Report";
  submitButtonText.textContent = "Save Changes";
  cancelEditButton.hidden = false;
  showMessage(`Editing the report for PC ${report.workstation}.`, false);
  reportForm.scrollIntoView({ behavior: "smooth", block: "start" });
  pcNumberInput.focus({ preventScroll: true });
}

function showMessage(message, isError) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
}

pcNumberInput.addEventListener("input", () => pcNumberInput.setCustomValidity(""));
categoryInput.addEventListener("change", () => categoryInput.setCustomValidity(""));
descriptionInput.addEventListener("input", () => descriptionInput.setCustomValidity(""));

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showMessage("", false);

  const workstation = pcNumberInput.value.trim();
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();
  const pcNumber = Number(workstation);

  pcNumberInput.setCustomValidity(
    workstation && (!Number.isInteger(pcNumber) || pcNumber < 1)
      ? "Enter a whole PC number greater than zero."
      : ""
  );
  categoryInput.setCustomValidity(
    validCategories.includes(category) ? "" : "Select a valid issue category."
  );
  descriptionInput.setCustomValidity(
    description.length < 5 ? "Description must be at least 5 characters." : ""
  );

  if (!reportForm.reportValidity()) {
    return;
  }

  const updatedAt = new Date().toISOString();
  let updatedReports;
  let successMessage;

  if (editingReportId !== null) {
    const reportExists = reports.some(
      (report) => String(report.id) === String(editingReportId)
    );
    if (!reportExists) {
      exitEditMode();
      showMessage("This report no longer exists. The form has been reset.", true);
      return;
    }

    updatedReports = reports.map((report) =>
      String(report.id) === String(editingReportId)
        ? { ...report, workstation, category, description, modifiedDate: updatedAt }
        : report
    );
    successMessage = "Report changes saved successfully.";
  } else {
    const newReport = {
      id: Date.now(),
      workstation,
      category,
      description,
      date: updatedAt,
      modifiedDate: "",
    };
    updatedReports = [newReport, ...reports];
    successMessage = "Report submitted successfully.";
  }

  if (!saveReports(updatedReports)) {
    showMessage("Unable to save changes. Check browser storage and try again.", true);
    return;
  }

  reports = updatedReports;
  renderReports();
  exitEditMode();
  showMessage(successMessage, false);
});

cancelEditButton.addEventListener("click", () => {
  exitEditMode();
  showMessage("Edit canceled.", false);
});

reportsList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton || !reportsList.contains(actionButton)) {
    return;
  }

  const reportId = actionButton.dataset.reportId;
  const report = reports.find((item) => String(item.id) === reportId);
  if (!report) {
    return;
  }

  if (actionButton.dataset.action === "edit") {
    enterEditMode(report);
    return;
  }

  if (actionButton.dataset.action !== "delete") {
    return;
  }
  if (!window.confirm(`Delete the report for PC ${report.workstation}?`)) {
    return;
  }

  const updatedReports = reports.filter((item) => String(item.id) !== reportId);
  if (!saveReports(updatedReports)) {
    showMessage("Unable to delete the report. Check browser storage and try again.", true);
    return;
  }

  const wasEditingDeletedReport = String(editingReportId) === reportId;
  reports = updatedReports;
  renderReports();
  if (wasEditingDeletedReport) {
    exitEditMode();
  }
  showMessage(`Report for PC ${report.workstation} deleted.`, false);
});

renderReports();