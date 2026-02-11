// ===== TAB FUNCTIONALITY =====
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    tab.classList.add("active");

    // Optional: You can filter ticket cards based on tab selection
    console.log(`${tab.textContent} tab selected`);
  });
});

// ===== BUTTON INTERACTIONS =====
const actionButtons = document.querySelectorAll(".btn-action");

actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const action = this.textContent.trim();

    switch (action) {
      case "Show More":
        alert("Showing more ticket details...");
        break;
      case "Update Profile":
        alert("Opening profile update page...");
        break;
      case "File TDR":
        alert("Opening TDR filing form...");
        break;
      case "SMS":
        alert("Sending ticket details via SMS...");
        break;
      case "Email":
        alert("Sending ticket details via Email...");
        break;
      case "Send Available Berth":
        alert("Checking available berths...");
        break;
      case "Print Cancellable":
        alert("Preparing ticket for printing...");
        break;
      default:
        alert(`${action} clicked!`);
    }
  });
});

// ===== AD BUTTON =====
const adButton = document.querySelector(".ad-btn");
if (adButton) {
  adButton.addEventListener("click", () => {
    alert("Redirecting to Buddha Circuit booking page...");
    // In real scenario: window.location.href = 'booking-page-url';
  });
}

// ===== COPY PNR NUMBER (if you add copy functionality) =====
function copyPNR(pnrNumber) {
  navigator.clipboard
    .writeText(pnrNumber)
    .then(() => {
      alert(`PNR ${pnrNumber} copied to clipboard!`);
    })
    .catch((err) => {
      console.error("Failed to copy PNR:", err);
    });
}

// ===== RESPONSIVE TABLE SCROLL HINT =====
window.addEventListener("load", () => {
  const tables = document.querySelectorAll(".passenger-table");

  tables.forEach((table) => {
    if (table.scrollWidth > table.clientWidth) {
      table.style.cursor = "grab";
      table.title = "Scroll horizontally to see all columns";
    }
  });
});
