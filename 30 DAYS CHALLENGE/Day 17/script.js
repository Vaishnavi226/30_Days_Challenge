function updateClock() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
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
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("current-date").innerText =
    `${day}-${month}-${year} [${h}:${m}:${s}]`;
}

updateClock();
setInterval(updateClock, 1000);

function togglePassword() {
  const pwd = document.getElementById("password");
  const icon = document.querySelector(".password-toggle");

  if (pwd.type === "password") {
    pwd.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    pwd.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function toggleOtpMode() {
  const pwd = document.getElementById("password");
  const btn = document.getElementById("submitBtn");
  const chk = document.getElementById("otpCheck");

  if (chk.checked) {
    pwd.disabled = true;
    pwd.value = "";
    btn.textContent = "Get OTP";
    btn.style.background = "#213d77";
  } else {
    pwd.disabled = false;
    btn.textContent = "Sign In";
    btn.style.background = "#fb792b";
  }
}

function handleLogin(e) {
  e.preventDefault();
  alert("Login logic would execute here!");
}
