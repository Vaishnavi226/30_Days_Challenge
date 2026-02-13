// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Trip Type Toggle (Domestic / International)
  const domesticBtn = document.getElementById("domesticBtn");
  const internationalBtn = document.getElementById("internationalBtn");

  if (domesticBtn && internationalBtn) {
    domesticBtn.addEventListener("click", function () {
      domesticBtn.classList.add("active");
      internationalBtn.classList.remove("active");
    });

    internationalBtn.addEventListener("click", function () {
      internationalBtn.classList.add("active");
      domesticBtn.classList.remove("active");
    });
  }

  // Banner Slider
  const slides = document.querySelectorAll(".banner-slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dots .dot");

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      dots[index].classList.remove("active");
    });
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  // Auto slide
  slideInterval = setInterval(nextSlide, 4000);

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Close other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Service Items Click
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    item.addEventListener("click", function () {
      serviceItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Search Button Animation
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

      setTimeout(() => {
        this.innerHTML = 'Search <i class="fas fa-search"></i>';
        alert("Search functionality would be implemented here!");
      }, 2000);
    });
  }

  // Set minimum date to today for check-in
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  if (checkinInput) {
    const today = new Date().toISOString().split("T")[0];
    checkinInput.setAttribute("min", today);
    checkinInput.value = today;

    // Set checkout to tomorrow
    if (checkoutInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      checkoutInput.setAttribute("min", tomorrow.toISOString().split("T")[0]);
      checkoutInput.value = tomorrow.toISOString().split("T")[0];
    }
  }

  // Check-in date change handler
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener("change", function () {
      const checkinDate = new Date(this.value);
      const minCheckout = new Date(checkinDate);
      minCheckout.setDate(minCheckout.getDate() + 1);
      checkoutInput.setAttribute(
        "min",
        minCheckout.toISOString().split("T")[0],
      );

      if (new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = minCheckout.toISOString().split("T")[0];
      }
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".promo-card, .service-item, .faq-item, .dest-card",
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initial animation styles
  const animatedElements = document.querySelectorAll(
    ".promo-card, .faq-item, .dest-card",
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run on load

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  header.style.transition = "transform 0.3s ease";

  // Destination cards click animation
  const destCards = document.querySelectorAll(".dest-card");
  destCards.forEach((card) => {
    card.addEventListener("click", function () {
      const destination = this.querySelector("h3").textContent;
      console.log("Selected destination:", destination);
      // You can add navigation or search functionality here
    });
  });
});
