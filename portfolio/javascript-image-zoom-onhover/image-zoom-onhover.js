document.querySelectorAll(".image-zoom-onhover").forEach((image) => {
  image.addEventListener("mousemove", (e) => (image.querySelector("img").style.transformOrigin = `${e.layerX}px ${e.layerY}px`));
});
