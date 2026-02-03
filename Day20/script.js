// Bus Animation Controller
document.addEventListener("DOMContentLoaded", function () {
  const busLeft = document.querySelector(".bus-left");
  const busRight = document.querySelector(".bus-right");
  const hero = document.querySelector(".hero");

  // Add smooth entrance animation on page load
  if (busLeft && busRight) {
    // Ensure buses are visible
    busLeft.style.opacity = "1";
    busRight.style.opacity = "1";

    // Pause animation on hover for interactivity
    busLeft.addEventListener("mouseenter", () => {
      busLeft.style.animationPlayState = "paused";
    });

    busLeft.addEventListener("mouseleave", () => {
      busLeft.style.animationPlayState = "running";
    });

    busRight.addEventListener("mouseenter", () => {
      busRight.style.animationPlayState = "paused";
    });

    busRight.addEventListener("mouseleave", () => {
      busRight.style.animationPlayState = "running";
    });

    // Add honk sound effect on click (visual feedback)
    busLeft.addEventListener("click", () => {
      honkEffect(busLeft);
    });

    busRight.addEventListener("click", () => {
      honkEffect(busRight);
    });
  }

  // Honk visual effect function
  function honkEffect(bus) {
    // Create honk bubble
    const honk = document.createElement("div");
    honk.textContent = "🔊 HONK!";
    honk.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            color: #213d77;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 12px;
            animation: fadeUp 1s ease-out forwards;
            z-index: 100;
            pointer-events: none;
        `;

    bus.style.position = "absolute";
    bus.appendChild(honk);

    // Remove after animation
    setTimeout(() => {
      honk.remove();
    }, 1000);

    // Add bounce effect to bus
    bus.style.transform = bus.classList.contains("bus-right")
      ? "scaleX(-1) translateY(-5px)"
      : "translateY(-5px)";

    setTimeout(() => {
      bus.style.transform = bus.classList.contains("bus-right")
        ? "scaleX(-1)"
        : "none";
    }, 150);
  }

  // Add CSS animation for honk effect
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeUp {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
        
        .bus {
            cursor: pointer;
            transition: transform 0.15s ease;
        }
        
        .bus:hover {
            filter: brightness(1.1);
        }
    `;
  document.head.appendChild(style);

  // Road marking animation enhancement
  const roadMarking = document.querySelector(".road-marking");
  if (roadMarking) {
    let offset = 0;
    setInterval(() => {
      offset -= 2;
      roadMarking.style.backgroundPosition = `${offset}px 0`;
    }, 50);
  }

  // Back to top button functionality
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
        backToTop.style.opacity = "1";
      } else {
        backToTop.style.opacity = "0";
        setTimeout(() => {
          if (window.scrollY <= 300) {
            backToTop.style.display = "none";
          }
        }, 300);
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Service items hover effect
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      serviceItems.forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".icon-circle")?.classList.remove("active");
      });

      // Add active class to clicked item
      this.classList.add("active");
      this.querySelector(".icon-circle")?.classList.add("active");
    });
  });

  console.log("🚌 Bus animation initialized successfully!");

  // ==================== CALENDAR FUNCTIONALITY ====================
  const dateInput = document.getElementById("departure-date");
  const calendarIcon = document.getElementById("calendar-icon");
  const calendarDropdown = document.getElementById("calendar-dropdown");

  let currentDate = new Date();
  let selectedDate = null;

  // Add calendar styles
  const calendarStyles = document.createElement("style");
  calendarStyles.textContent = `
    .date-input-wrapper {
      position: relative;
    }
    
    .calendar-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.2);
      z-index: 1000;
      padding: 15px;
      min-width: 300px;
      margin-top: 5px;
    }
    
    .calendar-dropdown.active {
      display: block;
      animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .calendar-header h4 {
      margin: 0;
      color: #213d77;
      font-size: 16px;
    }
    
    .calendar-nav {
      display: flex;
      gap: 10px;
    }
    
    .calendar-nav button {
      background: #213d77;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;
    }
    
    .calendar-nav button:hover {
      background: #ffc107;
      color: #213d77;
    }
    
    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      margin-bottom: 10px;
    }
    
    .calendar-weekdays span {
      text-align: center;
      font-weight: bold;
      color: #213d77;
      font-size: 12px;
      padding: 5px;
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
    }
    
    .calendar-day {
      text-align: center;
      padding: 10px 5px;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s;
      font-size: 14px;
    }
    
    .calendar-day:hover:not(.disabled):not(.empty) {
      background: #213d77;
      color: white;
    }
    
    .calendar-day.today {
      background: #e3f2fd;
      color: #213d77;
      font-weight: bold;
    }
    
    .calendar-day.selected {
      background: #ffc107;
      color: #213d77;
      font-weight: bold;
    }
    
    .calendar-day.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    
    .calendar-day.empty {
      cursor: default;
    }
    
    #departure-date {
      cursor: pointer;
    }
    
    #calendar-icon {
      cursor: pointer;
      transition: color 0.3s;
    }
    
    #calendar-icon:hover {
      color: #ffc107;
    }
  `;
  document.head.appendChild(calendarStyles);

  // Toggle calendar
  function toggleCalendar() {
    calendarDropdown.classList.toggle("active");
    if (calendarDropdown.classList.contains("active")) {
      renderCalendar();
    }
  }

  // Render calendar
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = `
      <div class="calendar-header">
        <div class="calendar-nav">
          <button id="prev-month"><i class="fas fa-chevron-left"></i></button>
        </div>
        <h4>${monthNames[month]} ${year}</h4>
        <div class="calendar-nav">
          <button id="next-month"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="calendar-weekdays">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
        <span>Thu</span><span>Fri</span><span>Sat</span>
      </div>
      <div class="calendar-days">
    `;

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast =
        date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      let classes = "calendar-day";
      if (isToday) classes += " today";
      if (isPast) classes += " disabled";
      if (isSelected) classes += " selected";

      html += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }

    html += "</div>";
    calendarDropdown.innerHTML = html;

    // Add event listeners
    document.getElementById("prev-month").addEventListener("click", (e) => {
      e.stopPropagation();
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", (e) => {
      e.stopPropagation();
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    // Day click handlers
    document
      .querySelectorAll(".calendar-day:not(.disabled):not(.empty)")
      .forEach((dayEl) => {
        dayEl.addEventListener("click", (e) => {
          e.stopPropagation();
          const day = parseInt(dayEl.dataset.day);
          selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
          );

          // Format date
          const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          };
          dateInput.value = selectedDate.toLocaleDateString("en-US", options);

          calendarDropdown.classList.remove("active");
        });
      });
  }

  // Event listeners for calendar
  if (dateInput && calendarIcon && calendarDropdown) {
    dateInput.addEventListener("click", toggleCalendar);
    calendarIcon.addEventListener("click", toggleCalendar);

    // Close calendar when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !calendarDropdown.contains(e.target) &&
        e.target !== dateInput &&
        e.target !== calendarIcon
      ) {
        calendarDropdown.classList.remove("active");
      }
    });
  }

  console.log("📅 Calendar initialized successfully!");
});
