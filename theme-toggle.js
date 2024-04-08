// Function to toggle theme
function toggleTheme() {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateButtonContent(newTheme);
}

function updateButtonContent(theme) {
  const toggleButton = document.getElementById("toggleTheme");
  if (theme === "dark") {
    toggleButton.textContent = "🌙"; // moon emoji for dark mode
  } else {
    toggleButton.textContent = "☀️"; // sun emoji for light mode
  }
}

// Check for stored theme preference
let storedTheme = localStorage.getItem("theme");

// Check for user's system preference
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme) {
  // Use stored theme if present
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateButtonContent(storedTheme);
} else if (userPrefersDark) {
  // Otherwise fallback to system preference
  document.documentElement.setAttribute("data-theme", "dark");
  updateButtonContent("dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  updateButtonContent("light");
}

document.getElementById("toggleTheme").addEventListener("click", toggleTheme);

//name spinner
const nameSpinner = document.getElementById("nameSpinner");

// Variables to track rotation and freewheeling effect
let rotationAngle = 0;
let isFreewheeling = false;
let freewheelVelocity = 0;
const damping = 0.995; // Damping factor for velocity decay
const epsilon = 0.01; // Threshold for stopping the rotation

// Add click event listener
nameSpinner.addEventListener("click", function () {
  if (!isFreewheeling) {
    // Single click, perform a normal spin
    rotationAngle += 360;
    this.style.transform = `rotate(${rotationAngle}deg)`;
  } else {
    // Freewheeling mode, add velocity
    freewheelVelocity += 180; // Adjust this value to control the added rotation speed
  }
});

// Update the rotation and freewheeling effect
function updateRotation() {
  if (isFreewheeling) {
    // Apply freewheeling effect
    rotationAngle += freewheelVelocity;
    nameSpinner.style.transform = `rotate(${rotationAngle}deg)`;

    freewheelVelocity *= damping;

    if (Math.abs(freewheelVelocity) < epsilon) {
      isFreewheeling = false;
      freewheelVelocity = 0;
    }
  }

  requestAnimationFrame(updateRotation);
}

updateRotation();

// Add event listener for freewheeling mode
let lastClickTime = 0;
const freewheelThreshold = 1000; // Threshold for entering freewheeling mode (in milliseconds)

nameSpinner.addEventListener("click", function () {
  const currentTime = new Date().getTime();
  const timeSinceLastClick = currentTime - lastClickTime;

  if (timeSinceLastClick < freewheelThreshold) {
    isFreewheeling = true;
  } else {
    isFreewheeling = false;
    freewheelVelocity = 0;
  }

  lastClickTime = currentTime;
});
