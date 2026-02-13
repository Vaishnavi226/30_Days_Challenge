// 1. Live Time Update (Simulated)
function updateTime() {
  const now = new Date();
  // Format: 30-Jan-2026 [22:30:51]
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const dateStr = now.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  const timeStr = now.toLocaleTimeString("en-GB", { hour12: false });

  // Hardcoding date to match image for visual consistency, but showing live time
  // document.getElementById('datetime').innerText = `${dateStr} [${timeStr}]`;

  // Or keep static like the screenshot:
  document.getElementById("datetime").innerText = "30-Jan-2026 [22:30:51]";
}

// 2. Swap Functionality
function swapLocations() {
  const from = document.getElementById("fromInput");
  const to = document.getElementById("toInput");

  const temp = from.value;
  from.value = to.value;
  to.value = temp;
}

// 3. Search Button Action
function searchTrains() {
  const from = document.getElementById("fromInput").value;
  const to = document.getElementById("toInput").value;

  if (!from || !to) {
    alert("Please enter From and To stations.");
  } else {
    alert(`Searching trains from ${from} to ${to}...`);
  }
}

// 4. Modal functionality
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("alertModal").style.display = "none";
});

// Close modal if clicking outside the white box
window.onclick = function (event) {
  const modal = document.getElementById("alertModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);
});
