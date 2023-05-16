ReactDOM.createRoot(document.getElementById("App-header")).render(<Header category="Portfolio" />);
ReactDOM.createRoot(document.getElementById("js")).render(<CodeChunkFromFile path="./image-zoom.js" lang="js" />);
ReactDOM.createRoot(document.getElementById("scss")).render(<CodeChunkFromFile path="./image-zoom.scss" lang="scss" />);
ReactDOM.createRoot(document.getElementById("html")).render(<CodeChunk code={`<div class="image-zoom"><img src="https://picsum.photos/1920/1080" alt=""></div>`} lang="html" />);
