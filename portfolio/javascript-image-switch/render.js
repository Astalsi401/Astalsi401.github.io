ReactDOM.createRoot(document.getElementById("App-header")).render(<Header category="Portfolio" />);
ReactDOM.createRoot(document.getElementById("js")).render(<CodeChunkFromFile path="./image-switch.js" lang="js" />);
ReactDOM.createRoot(document.getElementById("scss")).render(<CodeChunkFromFile path="./image-switch.scss" lang="scss" />);
ReactDOM.createRoot(document.getElementById("html")).render(<CodeChunk code={`<div class="switch shadow-1">\n    <div class="switch-children">\n        <div class="switch-child active">\n            <div class="switch-img"><img class="w-100" src="https://picsum.photos/id/123/1920/1080" /></div>\n            <div class="text-center"></div>\n        </div>\n        <div class="switch-child">\n            <div class="switch-img"><img class="w-100" src="https://picsum.photos/id/456/1920/1080" /></div>\n            <div class=" text-center"></div>\n        </div>\n        <div class="switch-child">\n            <div class="switch-img"><img class="w-100" src="https://picsum.photos/id/789/1920/1080" /></div>\n            <div class="text-center"></div>\n        </div>\n    </div>\n    <div class="prev"></div>\n    <div class="next"></div>\n</div>`} lang="html" />);
ReactDOM.createRoot(document.getElementById("js2")).render(<CodeChunkFromFile path="./image-switch2.js" lang="js" />);
ReactDOM.createRoot(document.getElementById("scss2")).render(<CodeChunkFromFile path="./image-switch2.scss" lang="scss" />);
ReactDOM.createRoot(document.getElementById("html2")).render(<CodeChunk code={`<div class="switch2">\n    <div class="images-container"></div>\n    <div class="prev"></div>\n    <div class="next"></div>\n</div>`} lang="html" />);
