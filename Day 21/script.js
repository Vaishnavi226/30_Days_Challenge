// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Trip Type Toggle (One Way / Round Trip)
  const oneWayBtn = document.getElementById("oneWayBtn");
  const roundTripBtn = document.getElementById("roundTripBtn");
  const returnDate = document.getElementById("return");

  oneWayBtn.addEventListener("click", function () {
    oneWayBtn.classList.add("active");
    roundTripBtn.classList.remove("active");
    returnDate.disabled = true;
    returnDate.value = "";
  });

  roundTripBtn.addEventListener("click", function () {
    roundTripBtn.classList.add("active");
    oneWayBtn.classList.remove("active");
    returnDate.disabled = false;
  });

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

  // Swap Origin and Destination
  const swapBtn = document.querySelector(".swap-btn");
  const originInput = document.querySelector(".field-group:first-child input");
  const destinationInput = document.querySelector(
    ".field-group:nth-child(3) input",
  );

  if (swapBtn && originInput && destinationInput) {
    swapBtn.addEventListener("click", function () {
      const temp = originInput.value;
      originInput.value = destinationInput.value;
      destinationInput.value = temp;
    });
  }

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

  // Set minimum date to today for departure
  const departureInput = document.getElementById("departure");
  if (departureInput) {
    const today = new Date().toISOString().split("T")[0];
    departureInput.setAttribute("min", today);
    departureInput.value = today;
  }

  // Departure date change handler
  if (departureInput && returnDate) {
    departureInput.addEventListener("change", function () {
      returnDate.setAttribute("min", this.value);
      if (returnDate.value && returnDate.value < this.value) {
        returnDate.value = this.value;
      }
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".promo-card, .service-item, .faq-item",
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
  const animatedElements = document.querySelectorAll(".promo-card, .faq-item");
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
});
