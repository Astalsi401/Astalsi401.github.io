const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("show"), { threshold: 1 }));
const observer2 = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("show", entry.isIntersecting), { threshold: 1 }));
const swipers = document.querySelectorAll(".swiper");
let i = 0;
const swiperAction = ({ currentTarget }) => {
  const container = currentTarget.parentElement.querySelector(".swiper-container").style;
  let w = container.getPropertyValue("--w");
  let min = -(container.getPropertyValue("--n") - w),
    max = 0;
  console.log(currentTarget.parentElement.querySelector(".swiper-container"));
  i += currentTarget.classList.contains("swiper-next") ? -1 : 1;
  i = i < min ? max : i > max ? min : i;
  container.setProperty("--i", i);
};
const autoSwiper = () => swipers.forEach((swiper) => swiper.classList.contains("show") && swiper.querySelector(".swiper-next").click());
const swiperSetting = () => {
  swipers.forEach((swiper) => {
    const w = window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 4;
    const containerStyle = swiper.querySelector(".swiper-container").style;
    containerStyle.setProperty("--w", w);
    containerStyle.setProperty("--n", swiper.querySelector(".swiper-container").childElementCount);
  });
};
let swiperTimer = setInterval(autoSwiper, 10000);
swipers.forEach((swiper) => {
  swiper.querySelectorAll(".swiper-next, .swiper-prev").forEach((btn) => btn.addEventListener("click", swiperAction));
  swiper.addEventListener("mouseenter", () => clearInterval(swiperTimer));
  swiper.addEventListener("mouseleave", () => (swiperTimer = setInterval(autoSwiper, 10000)));
});
document.querySelectorAll(".intersection").forEach((elem) => observer.observe(elem));
document.querySelectorAll(".intersection2").forEach((elem) => observer2.observe(elem));
swiperSetting();
window.addEventListener("resize", swiperSetting);
