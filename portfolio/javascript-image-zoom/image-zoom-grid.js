class GridImageZoom {
  constructor(img) {
    this.img = img;
    this.active = false;
    this.timer = null;
    document.addEventListener("click", this.zoom);
  }
  zoom = ({ target }) => {
    if (this.timer) return;
    this.active = target === this.img ? !this.active : false;
    this.img.classList.toggle("active", this.active);
    if (this.active) {
      this.img.style.zIndex = 101;
    } else {
      this.timer = setTimeout(() => {
        this.img.style.zIndex = 1;
        this.timer = null;
      }, 800);
    }
    const { x, y, width, height } = this.img.getBoundingClientRect();
    const scale = Math.min(window.innerWidth / width, window.innerHeight / height);
    const translate = `${(window.innerWidth / 2 - x) / scale - width / 2}px, ${(window.innerHeight / 2 - y) / scale - height / 2}px`;
    this.img.style.transform = this.active ? `scale(${scale}) translate(${translate})` : "scale(1) translate(0)";
  };
}
document.querySelectorAll(".grid-image-zoom").forEach((img) => new GridImageZoom(img));
