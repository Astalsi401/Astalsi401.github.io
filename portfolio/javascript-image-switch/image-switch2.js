class ImageSwitch {
  constructor(box, images, cols = 10, rows = 8) {
    this.transitionSec = 5;
    this.box = box;
    this.container = this.box.querySelector(".images-container");
    this.images = images;
    this.cols = cols;
    this.rows = rows;
    this.active = 0;

    // 設定css變數，計算transition-delay，讓動畫總時間 = this.transitionSec / 2
    // (同時從頭/尾變更圖片，因此所需時間為一半)
    this.box.style.setProperty("--delay", `${this.transitionSec / (this.cols * this.rows)}s`);
    this.draw();
    window.addEventListener("resize", this.draw);
    this.box.querySelector(".next").addEventListener("click", this.next);
    this.box.querySelector(".prev").addEventListener("click", () => this.next(false));
  }
  cells = (width, height, image, index) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-cells", this.active === index ? "active" : "hide");
    this.container.appendChild(imageContainer);
    let i = 0,
      half = false;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = document.createElement("a");
        const cellWidth = width / this.cols;
        const cellHeight = height / this.rows;
        // 調整cell的background-size, background-position, width, height, top, left，確保每個格子的大小、位置、圖片都在正確的位置
        cell.classList.add("img-cell");
        cell.style.setProperty("--i", i);
        cell.style.width = `${cellWidth}px`;
        cell.style.height = `${height / this.rows}px`;
        cell.style.backgroundImage = `url(${image})`;
        cell.style.backgroundSize = `${width}px`;
        cell.style.backgroundPosition = `-${cellWidth * c}px -${cellHeight * r}px`;
        cell.style.top = `${cellHeight * r}px`;
        cell.style.left = `${cellWidth * c}px`;
        imageContainer.appendChild(cell);
        // 檢測當前的格子是否達總數一半，若達一半，則css變數--i由正序改為逆序
        half = i === (this.cols * this.rows) / 2 ? !half : half;
        i += half ? -1 : 1;
      }
    }
  };
  draw = () => {
    this.container.innerHTML = "";
    const { width, height } = this.container.getBoundingClientRect();
    this.images.forEach((image, index) => this.cells(width, height, image, index));
  };
  next = (next = true) => {
    this.active = (this.active + (next ? 1 : -1) + this.images.length) % this.images.length;
    this.container.querySelectorAll(".img-cells").forEach((cell, i) => cell.classList.toggle("active", i === this.active));
  };
}
const switch2 = new ImageSwitch(document.querySelector(".switch2"), ["https://picsum.photos/id/321/1920/1080", "https://picsum.photos/id/654/1920/1080", "https://picsum.photos/id/987/1920/1080"]);
