const searchBtn = document.querySelector(".search-btn");
const results = document.querySelector(".results");

const trains = [
  { name: "Rajdhani Express", departure: "06:00", duration: 8, price: 2200 },
  { name: "Duronto Express", departure: "09:30", duration: 9, price: 1800 },
  { name: "Shatabdi Express", departure: "15:00", duration: 7, price: 1600 },
];

searchBtn.addEventListener("click", () => {
  const from = document.querySelector("#from")?.value;
  const to = document.querySelector("#to")?.value;
  const date = document.querySelector("#date")?.value;

  if (!from || !to || !date) {
    alert("Please fill From, To and Date");
    return;
  }

  loadTrains();
});

function loadTrains() {
  document.querySelectorAll(".train-card").forEach((card) => card.remove());

  trains.forEach((train) => {
    const card = document.createElement("div");
    card.className = "train-card";

    card.innerHTML = `
      <div class="train-name">${train.name}</div>
      <div style="font-size:12px;color:#555;margin:6px 0">
        Departure: ${train.departure} | Duration: ${train.duration} hrs
      </div>

      <div class="class-availability">
        <div class="class-box">SL<br><span class="class-status">AVAILABLE</span></div>
        <div class="class-box">3A<br><span class="class-status">WL 5</span></div>
        <div class="class-box">2A<br><span class="class-status refresh">Refresh</span></div>
        <div class="class-box">1A<br><span class="class-status">NA</span></div>
      </div>
    `;

    results.appendChild(card);
  });

  activateClassSelection();
}

function activateClassSelection() {
  document.querySelectorAll(".class-box").forEach((box) => {
    box.addEventListener("click", () => {
      document
        .querySelectorAll(".class-box")
        .forEach((b) => b.classList.remove("active"));
      box.classList.add("active");
    });
  });
}

document.querySelectorAll(".time-slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    document
      .querySelectorAll(".time-slot")
      .forEach((s) => s.classList.remove("active"));
    slot.classList.add("active");
  });
});

document
  .querySelectorAll(".filter-section input[type='checkbox']")
  .forEach((filter) => {
    filter.addEventListener("change", () => {});
  });

document.querySelectorAll(".sort-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.innerText.toLowerCase();

    if (text.includes("departure"))
      trains.sort((a, b) => a.departure.localeCompare(b.departure));
    if (text.includes("duration"))
      trains.sort((a, b) => a.duration - b.duration);
    if (text.includes("price")) trains.sort((a, b) => a.price - b.price);

    loadTrains();
  });
});

window.addEventListener("load", () => {
  console.log("IRCTC UI Ready");
});
