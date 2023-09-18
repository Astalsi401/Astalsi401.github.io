const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("show"), { threshold: 1 }));
const getSiblings = (elem, defaultElem) => (elem ? elem : defaultElem);
const swiperAction = ({ currentTarget }) => {
  const nextClick = currentTarget.classList.contains("swiper-next");
  const container = currentTarget.parentElement.querySelector(".swiper-container");
  const cardActive = currentTarget.parentElement.querySelector(".swiper-card.active");
  const prev = getSiblings(cardActive.previousElementSibling, container.lastElementChild);
  const next = getSiblings(cardActive.nextElementSibling, container.firstElementChild);
  cardActive.classList.remove("active");
  next.classList.remove("next");
  prev.classList.remove("prev");
  const newActive = nextClick ? next : prev;
  newActive.classList.add("active");
  getSiblings(newActive.previousElementSibling, container.lastElementChild).classList.add("prev");
  getSiblings(newActive.nextElementSibling, container.firstElementChild).classList.add("next");
};
const autoSwiper = () => document.querySelectorAll(".swiper").forEach((swiper) => swiper.querySelector(".swiper-next").click());
let swiperTimer = setInterval(autoSwiper, 7000);
document.querySelectorAll(".swiper").forEach((swiper) => {
  swiper.querySelectorAll(".swiper-next, .swiper-prev").forEach((btn) => btn.addEventListener("click", swiperAction));
  swiper.addEventListener("mouseenter", () => clearInterval(swiperTimer));
  swiper.addEventListener("mouseleave", () => (swiperTimer = setInterval(autoSwiper, 7000)));
});
document.querySelectorAll(".intersection").forEach((elem) => observer.observe(elem));
