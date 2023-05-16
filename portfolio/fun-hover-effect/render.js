ReactDOM.createRoot(document.getElementById("App-header")).render(<Header category="Portfolio" />);
ReactDOM.createRoot(document.getElementById("code-html")).render(<CodeChunk code={`<section class="my-4 round-container">\n    <div id="round-A" class="round-lg bg-red" style="--children:7;">\n        <div class="round-sm" style="--i:2;background: rgba(165, 42, 42, 0.9);"></div>\n        <div class="round-sm" style="--i:5;background: rgba(165, 42, 42, 0.9);"></div>\n        <div class="round-sm" style="--i:6;background: rgba(105, 28, 28, 0.9);"></div>\n        <div class="round-sm" style="--i:0;background: rgba(165, 42, 42, 0.9);"></div>\n        <div class="round-sm" style="--i:1;background: rgba(105, 28, 28, 0.9);"></div>\n    </div>\n    <div id="round-B" class="round-lg bg-blue" style="--children:5;">\n        <div class="round-sm" style="--i:1;background: rgba(54, 54, 175, 0.9);"></div>\n        <div class="round-sm" style="--i:2;background: rgba(0, 0, 128, 0.9);"></div>\n        <div class="round-sm" style="--i:3;background: rgba(54, 54, 175, 0.9);"></div>\n        <div class="round-sm" style="--i:4;background: rgba(0, 0, 128, 0.9);"></div>\n    </div>\n</section>`} lang="html" />);
ReactDOM.createRoot(document.getElementById("code-css")).render(<CodeChunkFromFile path="./hover-effect.css" lang="css" />);
ReactDOM.createRoot(document.getElementById("code-js")).render(<CodeChunkFromFile path="./hover-effect.js" lang="js" />);