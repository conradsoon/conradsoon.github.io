const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const routeSection = document.querySelector(".route-section");

if (routeSection && (reducedMotion || !("IntersectionObserver" in window))) {
  routeSection.classList.add("is-visible");
} else if (routeSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -9%", threshold: 0.08 },
  );

  observer.observe(routeSection);
}

const timeElement = document.getElementById("localTime");

function updateLocalTime() {
  const time = new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
  timeElement.textContent = `SIN ${time}`;
}

if (timeElement) {
  updateLocalTime();
  window.setInterval(updateLocalTime, 60_000);
}

const flipCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function flipLabel(element) {
  if (reducedMotion || element.dataset.animating === "true") return;
  const finalText = element.dataset.flip;
  let frame = 0;
  const totalFrames = 8;
  element.dataset.animating = "true";

  const interval = window.setInterval(() => {
    const progress = frame / totalFrames;
    element.textContent = [...finalText]
      .map((character, index) => {
        if (character === " ") return " ";
        if (index / finalText.length < progress) return character;
        return flipCharacters[Math.floor(Math.random() * flipCharacters.length)];
      })
      .join("");

    frame += 1;
    if (frame > totalFrames) {
      window.clearInterval(interval);
      element.textContent = finalText;
      element.dataset.animating = "false";
    }
  }, 34);
}

document.querySelectorAll("[data-flip]").forEach((element) => {
  const row = element.closest(".board-row");
  if (!row) return;
  row.addEventListener("pointerenter", () => flipLabel(element));
  row.addEventListener("focusin", () => flipLabel(element));
});
