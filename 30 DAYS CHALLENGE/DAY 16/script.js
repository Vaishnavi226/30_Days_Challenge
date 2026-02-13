// Live Time Update
function updateTime() {
  document.getElementById("datetime").innerText = "30-Jan-2026 [22:30:51]";
}

// Swap From & To
function swapLocations() {
  const from = document.getElementById("fromInput");
  const to = document.getElementById("toInput");
  [from.value, to.value] = [to.value, from.value];
}

// Search Button
function searchTrains() {
  const from = document.getElementById("fromInput").value;
  const to = document.getElementById("toInput").value;

  if (!from || !to) {
    alert("Please enter From and To stations.");
  } else {
    alert(`Searching trains from ${from} to ${to}...`);
  }
}

updateTime();
setInterval(updateTime, 1000);
