const contents = [
  {
    id: "App-header",
    content: <Header category="Portfolio" />,
  },
  {
    id: "btn1-html",
    content: <CodeChunk code={`<a class="btn1">btn1\n    <span style="--i:0;"></span>\n    <span style="--i:0;"></span>\n    <span style="--i:1;"></span>\n    <span style="--i:2;"></span>\n</a>`} lang="html" />,
  },
  {
    id: "btn1-scss",
    content: <CodeChunkFromFile path="./btn1.scss" lang="scss" />,
  },
];
contents.forEach((item) => ReactDOM.createRoot(document.getElementById(item.id)).render(item.content));
