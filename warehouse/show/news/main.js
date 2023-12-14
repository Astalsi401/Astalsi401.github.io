const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("show"), { threshold: 1 }));
const observer2 = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("show", entry.isIntersecting), { threshold: 1 }));
const swipers = document.querySelectorAll(".swiper");
let i = 0;
const swiperAction = ({ currentTarget }) => {
  const container = currentTarget.parentElement.querySelector(".swiper-container").style;
  let w = container.getPropertyValue("--w");
  let min = -(container.getPropertyValue("--n") - w),
    max = 0;
  i += currentTarget.classList.contains("swiper-next") ? -1 : 1;
  i = i < min ? max : i > max ? min : i;
  container.setProperty("--i", i);
};
const getSiblings = (elem, defaultElem) => (elem ? elem : defaultElem);
const swiperActionSNQ = ({ currentTarget }) => {
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
const autoSwiper = () => swipers.forEach((swiper) => swiper.classList.contains("show") && swiper.querySelector(".swiper-next").click());
const swiperSetting = () => {
  swipers.forEach((swiper) => {
    const w = window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 4;
    const containerStyle = swiper.querySelector(".swiper-container").style;
    containerStyle.setProperty("--w", w);
    containerStyle.setProperty("--n", swiper.querySelector(".swiper-container").childElementCount);
  });
};
const topics = document.querySelectorAll(".topic-item");
const topicsImg = document.querySelectorAll(".topic-img img");
const topicToggle = () => {
  topics.forEach((topic) => {
    console.log(topic);
    topic.addEventListener("click", ({ currentTarget }) => {
      const topicsArray = Array.from(topics);
      const index = topicsArray.indexOf(currentTarget);
      Array.from(topics)
        .filter((item) => item !== currentTarget)
        .forEach((item) => item.classList.remove("active"));
      Array.from(topicsImg)
        .filter((item, i) => i !== index)
        .forEach((item) => item.classList.remove("active"));
      currentTarget.classList.toggle("active");
      topicsImg[index].classList.toggle("active");
    });
  });
};
let swiperTimer = setInterval(autoSwiper, 10000);
swipers.forEach((swiper) => {
  swiper.querySelectorAll(".swiper-next, .swiper-prev").forEach((btn) => {
    btn.addEventListener("click", swiperAction);
    btn.addEventListener("click", swiperActionSNQ);
  });
  swiper.addEventListener("mouseenter", () => clearInterval(swiperTimer));
  swiper.addEventListener("mouseleave", () => (swiperTimer = setInterval(autoSwiper, 10000)));
});
document.querySelectorAll(".intersection").forEach((elem) => observer.observe(elem));
document.querySelectorAll(".intersection2").forEach((elem) => observer2.observe(elem));
topicToggle();
swiperSetting();
window.addEventListener("resize", swiperSetting);
