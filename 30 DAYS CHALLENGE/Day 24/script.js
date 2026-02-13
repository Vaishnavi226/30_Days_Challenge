// ===== CAPTCHA Generator =====
const captchaChars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

function generateCaptcha(length = 5) {
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += captchaChars.charAt(
      Math.floor(Math.random() * captchaChars.length),
    );
  }
  return captcha;
}

function refreshCaptcha() {
  const captchaText = document.getElementById("captchaText");
  captchaText.textContent = generateCaptcha();
  document.getElementById("captchaInput").value = "";
}

// Refresh CAPTCHA button
document.getElementById("refreshCaptcha").addEventListener("click", () => {
  const btn = document.getElementById("refreshCaptcha");
  btn.style.transform = "rotate(360deg)";
  setTimeout(() => {
    btn.style.transform = "rotate(0deg)";
  }, 400);
  refreshCaptcha();
});

// ===== Continue Button Validation =====
document.getElementById("continueBtn").addEventListener("click", () => {
  const captchaText = document.getElementById("captchaText").textContent;
  const userInput = document.getElementById("captchaInput").value.trim();

  if (!userInput) {
    showToast("Please enter the CAPTCHA.", "error");
    document.getElementById("captchaInput").focus();
    return;
  }

  if (userInput !== captchaText) {
    showToast("Incorrect CAPTCHA. Please try again.", "error");
    refreshCaptcha();
    document.getElementById("captchaInput").focus();
    return;
  }

  showToast("CAPTCHA verified! Redirecting to payment...", "success");

  // Simulate redirect
  setTimeout(() => {
    // Update stepper to Payment
    const steps = document.querySelectorAll(".step");
    const lines = document.querySelectorAll(".step-line");

    steps[1].classList.remove("active-step");
    steps[1].classList.add("completed");
    steps[1].querySelector(".step-icon").innerHTML =
      '<i class="fas fa-check-circle"></i>';

    lines[1].classList.add("completed-line");

    steps[2].classList.add("active-step");
    steps[2].querySelector(".step-icon").innerHTML =
      '<i class="fas fa-dot-circle"></i>';

    showToast("Payment page loaded.", "success");
  }, 1500);
});

// ===== Back Button =====
document.querySelector(".btn-back").addEventListener("click", () => {
  showToast("Going back to Passenger Details...", "info");
});

// ===== Toggle Passenger Details =====
document.querySelector(".card-header").addEventListener("click", () => {
  const list = document.querySelector(".passenger-list");
  const icon = document.querySelector(".card-header i");

  if (list.style.display === "none") {
    list.style.display = "block";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    list.style.display = "none";
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }
});

// ===== Toast Notification =====
function showToast(message, type = "info") {
  // Remove existing toast
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;

  const colors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#1a237e",
  };

  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: colors[type] || colors.info,
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    zIndex: "9999",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    animation: "slideIn 0.3s ease",
    maxWidth: "360px",
  });

  document.body.appendChild(toast);

  // Add animation keyframes
  if (!document.getElementById("toast-style")) {
    const style = document.createElement("style");
    style.id = "toast-style";
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Initialize =====
refreshCaptcha();
