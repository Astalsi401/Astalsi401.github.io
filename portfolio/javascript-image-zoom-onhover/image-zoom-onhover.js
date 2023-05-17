document.querySelectorAll(".image-zoom-onhover").forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const { width, height } = image.getBoundingClientRect();
    const img = image.querySelector("img").getBoundingClientRect();
    image.querySelector("img").style.transformOrigin = `${(e.layerX / width) * img.width}px ${(e.layerY / height) * img.height}px`;
  });
});
