// ==================== DOM ELEMENTS ====================
const buttons = document.querySelectorAll(".btn-book");
const filterBoxes = document.querySelectorAll(".filter-box");
const filterHeaders = document.querySelectorAll(".filter-header");
const carouselContainer = document.querySelector(".carousel-container");
const sortOptions = document.querySelectorAll(".sort-options span");
const packageCards = document.querySelectorAll(".package-card");
const checkboxes = document.querySelectorAll(
  '.checkbox-group input[type="checkbox"]',
);

// ==================== BOOK NOW BUTTONS ====================
buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const card = btn.closest(".package-card");
    const packageName = card.querySelector(".card-title").textContent;
    const price = card.querySelector(".price").textContent;

    // Create modal for booking confirmation
    showBookingModal(packageName, price);
  });
});

// Booking Modal Function
function showBookingModal(packageName, price) {
  const modal = document.createElement("div");
  modal.className = "booking-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2><i class="fas fa-check-circle"></i> Booking Details</h2>
      <div class="modal-body">
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Price:</strong> ${price} per person</p>
        <form id="booking-form">
          <input type="text" placeholder="Full Name" required>
          <input type="email" placeholder="Email Address" required>
          <input type="tel" placeholder="Phone Number" required>
          <input type="number" placeholder="Number of Travelers" min="1" value="1" required>
          <button type="submit" class="btn-confirm">Confirm Booking</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles dynamically
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); display: flex; justify-content: center;
    align-items: center; z-index: 1000; animation: fadeIn 0.3s ease;
  `;

  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.cssText = `
    background: white; padding: 30px; border-radius: 10px; max-width: 450px;
    width: 90%; position: relative; animation: slideIn 0.3s ease;
  `;

  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.style.cssText = `
    position: absolute; top: 10px; right: 15px; font-size: 28px;
    cursor: pointer; color: #666;
  `;

  modal.querySelector("h2").style.cssText = `
    color: #2f3292; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
  `;

  modal.querySelectorAll("input").forEach((input) => {
    input.style.cssText = `
      width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd;
      border-radius: 5px; font-size: 14px;
    `;
  });

  modal.querySelector(".btn-confirm").style.cssText = `
    width: 100%; padding: 12px; background: #fb8c00; color: white;
    border: none; border-radius: 5px; font-size: 16px; font-weight: bold;
    cursor: pointer; transition: background 0.3s;
  `;

  // Close modal events
  closeBtn.addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  // Form submission
  modal.querySelector("#booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    modal.querySelector(".modal-body").innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <i class="fas fa-check-circle" style="font-size: 60px; color: #4CAF50;"></i>
        <h3 style="margin: 20px 0; color: #333;">Booking Confirmed!</h3>
        <p style="color: #666;">Thank you for your booking. Confirmation details have been sent to your email.</p>
      </div>
    `;
    setTimeout(() => modal.remove(), 3000);
  });
}

// ==================== FILTER BOX TOGGLE ====================
filterHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const filterBox = header.parentElement;
    const content = filterBox.querySelector(".filter-content");
    const icon = header.querySelector("i:last-child");

    if (content) {
      content.classList.toggle("collapsed");

      if (content.classList.contains("collapsed")) {
        content.style.maxHeight = "0";
        content.style.padding = "0 15px";
        content.style.overflow = "hidden";
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      } else {
        content.style.maxHeight = "500px";
        content.style.padding = "10px 15px";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }
    }
  });
});

// Initialize filter content transitions
document.querySelectorAll(".filter-content").forEach((content) => {
  content.style.transition = "all 0.3s ease";
  content.style.maxHeight = "500px";
  content.style.overflow = "hidden";
});

// ==================== CAROUSEL AUTO-SCROLL ====================
let scrollAmount = 0;
const scrollStep = 260;
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    scrollAmount += scrollStep;
    if (
      scrollAmount >=
      carouselContainer.scrollWidth - carouselContainer.clientWidth
    ) {
      scrollAmount = 0;
    }
    carouselContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scroll on page load
if (carouselContainer) {
  startAutoScroll();

  // Pause on hover
  carouselContainer.addEventListener("mouseenter", stopAutoScroll);
  carouselContainer.addEventListener("mouseleave", startAutoScroll);
}

// ==================== SORT FUNCTIONALITY ====================
sortOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Update active state
    sortOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");

    const sortType = this.textContent.trim().toLowerCase();
    const packageList = document.querySelector(".package-list");
    const cards = Array.from(packageList.querySelectorAll(".package-card"));

    cards.sort((a, b) => {
      if (sortType === "name") {
        const nameA = a.querySelector(".card-title").textContent;
        const nameB = b.querySelector(".card-title").textContent;
        return nameA.localeCompare(nameB);
      } else if (sortType === "price") {
        const priceA = parseInt(
          a.querySelector(".price").textContent.replace(/[₹,\s]/g, ""),
        );
        const priceB = parseInt(
          b.querySelector(".price").textContent.replace(/[₹,\s]/g, ""),
        );
        return priceA - priceB;
      }
      return 0;
    });

    // Re-append sorted cards (keep the sort-bar and ad banner in place)
    const sortBar = packageList.querySelector(".sort-bar");
    const adBanner = packageList.querySelector('[style*="970"]');

    // Remove all package cards
    cards.forEach((card) => card.remove());

    // Re-add sorted cards
    cards.forEach((card, index) => {
      if (adBanner && index === 2) {
        adBanner.after(card);
      } else if (index === 0) {
        sortBar.after(card);
      } else {
        cards[index - 1].after(card);
      }
    });

    // Add animation
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.3s ease ${index * 0.1}s forwards`;
      card.style.opacity = "0";
    });
  });
});

// ==================== FILTER CHECKBOXES ====================
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const activeFilters = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) {
        activeFilters.push(cb.parentElement.textContent.trim());
      }
    });

    // Show filter notification
    if (activeFilters.length > 0) {
      showNotification(`Filters applied: ${activeFilters.join(", ")}`);
    }
  });
});

// Notification Function
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector(".filter-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "filter-notification";
  notification.innerHTML = `<i class="fas fa-filter"></i> ${message}`;
  notification.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; background: #2f3292;
    color: white; padding: 15px 20px; border-radius: 8px; z-index: 1000;
    animation: slideInRight 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease forwards";
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector("header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "none";
  }

  // Hide/show header on scroll
  if (window.scrollY > lastScrollY && window.scrollY > 200) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScrollY = window.scrollY;
});

header.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

// ==================== VIEW DETAILS LINKS ====================
document.querySelectorAll(".view-details").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const card = this.closest(".package-card");
    const packageName = card.querySelector(".card-title").textContent;

    showNotification(`Loading details for: ${packageName}`);
  });
});

// ==================== PACKAGE CARD HOVER EFFECT ====================
packageCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
  });

  card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
});

// ==================== ADD CSS ANIMATIONS ====================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100px); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

// ==================== INITIALIZE ====================
console.log("IRCTC Tourism Clone - JavaScript Loaded Successfully!");
