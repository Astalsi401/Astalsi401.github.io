const observer = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    entry.isIntersecting && entry.target.classList.add("show");
    if (entry.isIntersecting && entry.target.classList.contains("count") && !entry.target.classList.contains("counted")) countNumbers(entry.target);
  })
);
const counts = document.querySelectorAll(".count");
counts.forEach((count) => observer.observe(count));
const countNumbers = (elem) => {
  elem.classList.add("counted");
  const targetCount = parseInt(elem.getAttribute("data-count"));
  let currentCount = 0;
  const increment = Math.ceil(targetCount / 20);
  const interval = setInterval(() => {
    currentCount += increment;
    elem.textContent = currentCount;
    if (currentCount >= targetCount) {
      clearInterval(interval);
      elem.textContent = targetCount;
    }
  }, 50);
};

let activeSpeaker = 0;
const speakers = document.querySelectorAll(".speakers");
const speakersBox = document.querySelectorAll(".speakers-box");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
speakersBox.forEach((box) => box.style.setProperty("--num", box.childElementCount));
const switchSpeakers = (n) => {
  activeSpeaker -= n;
  speakersBox.forEach((box) => box.style.setProperty("--active", activeSpeaker));
};
prev.addEventListener("click", () => switchSpeakers(-1));
next.addEventListener("click", () => switchSpeakers(1));
let interval = setInterval(() => switchSpeakers(1), 5000);
speakers.forEach((box) => {
  box.addEventListener("mouseenter", () => clearInterval(interval));
  box.addEventListener("mouseleave", () => (interval = setInterval(() => switchSpeakers(1), 5000)));
});
