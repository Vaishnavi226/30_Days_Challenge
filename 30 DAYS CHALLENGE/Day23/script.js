document.addEventListener("DOMContentLoaded", () => {
  // ===== TIME FILTER BUTTONS =====
  const departureTimeBtns = document.querySelectorAll(
    ".filter-group:nth-child(3) .time-btn",
  );
  const arrivalTimeBtns = document.querySelectorAll(
    ".filter-group:nth-child(4) .time-btn",
  );

  // Toggle for departure time buttons
  departureTimeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      filterTrains();
    });
  });

  // Toggle for arrival time buttons
  arrivalTimeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      filterTrains();
    });
  });

  // ===== RESET FILTERS =====
  const resetLink = document.querySelector(".reset-link");
  resetLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Reset all checkboxes
    document
      .querySelectorAll('.checkbox-container input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = cb.parentElement.textContent.trim().includes("DURONTO");
      });

    // Reset all time buttons
    document.querySelectorAll(".time-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Show all train cards
    document.querySelectorAll(".train-card").forEach((card) => {
      card.style.display = "block";
    });

    // Visual feedback
    resetLink.textContent = "Filters Reset!";
    setTimeout(() => {
      resetLink.textContent = "Reset Filters";
    }, 1500);
  });

  // ===== TRAIN TYPE CHECKBOXES =====
  const checkboxes = document.querySelectorAll(
    '.checkbox-container input[type="checkbox"]',
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterTrains);
  });

  // ===== FILTER TRAINS FUNCTION =====
  function filterTrains() {
    const durontoChecked = document.querySelector(
      '.checkbox-container:nth-child(2) input[type="checkbox"]',
    ).checked;
    const otherChecked = document.querySelector(
      '.checkbox-container:nth-child(3) input[type="checkbox"]',
    ).checked;

    const trainCards = document.querySelectorAll(".train-card");

    trainCards.forEach((card) => {
      const trainName = card.querySelector("h3").textContent.toLowerCase();
      const isDuronto = trainName.includes("duronto");

      let showCard = false;

      if (durontoChecked && isDuronto) showCard = true;
      if (otherChecked && !isDuronto) showCard = true;
      if (!durontoChecked && !otherChecked) showCard = true;

      card.style.display = showCard ? "block" : "none";
    });
  }

  // ===== OTHER DATES MODAL =====
  const modal = document.getElementById("datesModal");
  const modalTrainName = document.getElementById("modalTrainName");
  const datesGrid = document.getElementById("datesGrid");
  const closeModal = document.getElementById("closeModal");
  const cancelModal = document.getElementById("cancelModal");
  const confirmDate = document.getElementById("confirmDate");
  let selectedDateElement = null;
  let currentTrainCard = null;

  // Generate dates for the next 8 days
  function generateDates() {
    const dates = [];
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const availability = getRandomAvailability();
      dates.push({
        day: days[date.getDay()],
        date: `${date.getDate()} ${months[date.getMonth()]}`,
        fullDate: date,
        availability: availability,
      });
    }
    return dates;
  }

  function getRandomAvailability() {
    const statuses = [
      { text: "Available", class: "available" },
      { text: "Limited", class: "limited" },
      { text: "WL", class: "waitlist" },
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  function renderDatesModal(trainName) {
    modalTrainName.textContent = trainName;
    datesGrid.innerHTML = "";

    const dates = generateDates();
    dates.forEach((dateInfo, index) => {
      const dateOption = document.createElement("div");
      dateOption.className = "date-option";
      dateOption.innerHTML = `
        <div class="day">${dateInfo.day}</div>
        <div class="date">${dateInfo.date}</div>
        <div class="availability ${dateInfo.availability.class}">${dateInfo.availability.text}</div>
      `;

      dateOption.addEventListener("click", () => {
        document.querySelectorAll(".date-option").forEach((opt) => {
          opt.classList.remove("selected");
        });
        dateOption.classList.add("selected");
        selectedDateElement = dateInfo;
      });

      if (index === 0) {
        dateOption.classList.add("selected");
        selectedDateElement = dateInfo;
      }

      datesGrid.appendChild(dateOption);
    });
  }

  // Open modal on "Other Dates" button click
  document.querySelectorAll(".btn-other").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const trainCard = e.target.closest(".train-card");
      currentTrainCard = trainCard;
      const trainName = btn.getAttribute("data-train");
      renderDatesModal(trainName);
      modal.classList.add("active");
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  cancelModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Confirm date selection
  confirmDate.addEventListener("click", () => {
    if (selectedDateElement && currentTrainCard) {
      // Update the date in the train card
      const dateElements = currentTrainCard.querySelectorAll(".time-box .date");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const newDate = selectedDateElement.fullDate;
      const formattedDate = `${days[newDate.getDay()]}, ${String(newDate.getDate()).padStart(2, "0")} ${months[newDate.getMonth()]}`;

      if (dateElements.length > 0) {
        dateElements[0].textContent = formattedDate;
        // Update arrival date (next day for long journeys)
        const arrivalDate = new Date(newDate);
        arrivalDate.setDate(arrivalDate.getDate() + 1);
        const arrivalFormatted = `${days[arrivalDate.getDay()]}, ${String(arrivalDate.getDate()).padStart(2, "0")} ${months[arrivalDate.getMonth()]}`;
        if (dateElements.length > 1) {
          dateElements[1].textContent = arrivalFormatted;
        }
      }

      // Visual feedback
      const btnOther = currentTrainCard.querySelector(".btn-other");
      btnOther.textContent = "Date Updated!";
      btnOther.style.background = "#2ecc71";
      btnOther.style.color = "white";
      btnOther.style.borderColor = "#2ecc71";

      setTimeout(() => {
        btnOther.textContent = "Other Dates";
        btnOther.style.background = "";
        btnOther.style.color = "";
        btnOther.style.borderColor = "";
      }, 2000);

      modal.classList.remove("active");
    }
  });

  // ===== CLASS SELECTION =====
  window.selectClass = function (element) {
    const parent = element.parentElement;
    const siblings = parent.querySelectorAll(".class-box");
    siblings.forEach((sib) => {
      sib.classList.remove("selected");
    });

    element.classList.add("selected");

    const statusDiv = element.querySelector(".cls-status");
    if (statusDiv.classList.contains("refresh")) {
      statusDiv.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Checking...';

      setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
          statusDiv.innerHTML = "AVAILABLE-00" + Math.floor(Math.random() * 50);
          statusDiv.classList.remove("refresh");
          statusDiv.classList.add("available");
          statusDiv.style.color = "#2ecc71";

          if (!element.querySelector(".cls-price")) {
            const price = document.createElement("div");
            price.className = "cls-price";
            price.innerText = "₹ " + (800 + Math.floor(Math.random() * 1000));
            element.appendChild(price);
          }

          const card = element.closest(".train-card");
          const bookBtn = card.querySelector(".btn-book");
          bookBtn.classList.remove("disabled");
          bookBtn.classList.add("active");
        } else {
          statusDiv.innerHTML = "WL " + Math.floor(Math.random() * 20);
          statusDiv.classList.remove("refresh");
          statusDiv.classList.add("wl");
          statusDiv.style.color = "#e74c3c";
        }
      }, 800);
    }
  };

  // ===== BOOK NOW BUTTON =====
  document.querySelectorAll(".btn-book").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("disabled")) {
        const trainCard = this.closest(".train-card");
        const trainName = trainCard.querySelector("h3").textContent;
        const selectedClass = trainCard.querySelector(
          ".class-box.selected .cls-name",
        );
        const className = selectedClass
          ? selectedClass.textContent
          : "Unknown Class";

        this.textContent = "Booking...";
        this.style.background = "#f39c12";

        setTimeout(() => {
          this.textContent = "Booked!";
          this.style.background = "#2ecc71";
          alert(`Successfully booked ${trainName} - ${className}!`);

          setTimeout(() => {
            this.textContent = "Book Now";
            this.style.background = "";
          }, 2000);
        }, 1500);
      }
    });
  });

  // ===== SORT OPTIONS =====
  const sortLinks = document.querySelectorAll(".sort-options .link");
  sortLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sortLinks.forEach((l) => (l.style.fontWeight = "400"));
      this.style.fontWeight = "700";
      this.style.color = "#fb792b";

      setTimeout(() => {
        this.style.color = "#213d77";
      }, 500);
    });
  });
});
