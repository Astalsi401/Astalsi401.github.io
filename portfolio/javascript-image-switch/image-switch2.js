"https://picsum.photos/id/123/1920/1080";
class ImageSwitch {
  constructor(container) {
    this.container = container;
    this.images = ["../../assets/images/heatmap.png", "../../assets/images/choropleth-map.png"];
    this.cols = 5;
    this.rows = 4;
  }
  draw = () => {
    this.container.innerHTML = "";
    const { width, height } = this.container.getBoundingClientRect();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const img = document.createElement("a");
        img.src = this.images[0];
        img.classList.add("img-cell");
        img.style.width = `${width / this.cols}px`;
        img.style.height = `${height / this.rows}px`;
        img.style.backgroundImage = `url(${this.images[0]})`;
        img.style.backgroundSize = `${width}px`;
        img.style.backgroundPosition = `-${(width / this.cols) * c}px -${(height / this.rows) * r}px`;
        this.container.appendChild(img);
      }
    }
  };
}
const switch2 = new ImageSwitch(document.querySelector(".switch2"));
switch2.draw();
window.addEventListener("resize", switch2.draw);
