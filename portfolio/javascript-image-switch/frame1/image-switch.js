const gallaries = document.querySelectorAll(".switch");
const gallary = (next = true) => {
  gallaries.forEach((element) => {
    let active = Array.from(element.querySelectorAll(".switch-child")).find((img) => img.classList.contains("active"));
    active.classList.remove("active");
    let nextImg = next ? active.nextElementSibling || active.parentElement.firstElementChild : active.previousElementSibling || active.parentElement.lastElementChild;
    nextImg.classList.add("active");
  });
};
let gallaryTimer = setInterval(gallary, 5000);
gallaries.forEach((element) => {
  element.addEventListener("click", (e) => gallary(e.target.classList.contains("next")));
  element.addEventListener("mouseenter", () => clearInterval(gallaryTimer));
  element.addEventListener("mouseleave", () => (gallaryTimer = setInterval(gallary, 5000)));
});
