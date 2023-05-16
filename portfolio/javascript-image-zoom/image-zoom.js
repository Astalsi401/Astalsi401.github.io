const zoom = (e) => {
  const imgBox = e.currentTarget;
  const img = e.currentTarget.querySelector("img");
  const { x, y, width, height } = img.getBoundingClientRect();
  const scale = Math.min(window.innerWidth / width, window.innerHeight / height);
  const translate = `${(window.innerWidth / 2 - x) / scale - width / 2}px, ${(window.innerHeight / 2 - y) / scale - height / 2}px`;
  imgBox.classList.toggle("active");
  img.style.transform = imgBox.classList.contains("active") ? `scale(${scale}) translate(${translate})` : "scale(1) translate(0)";
};
document.querySelectorAll(".image-zoom").forEach((img) => img.addEventListener("click", zoom));
