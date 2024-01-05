const Content = () => {
  const sections = [
    {
      title: "Hover arrows",
      content: (
        <>
          <p>
            有趣的<code>box-shadoe</code>用法
          </p>
          <div className="col-12">
            <div className="fp-back center">
              <span />
            </div>
          </div>
          <div className="my-2">
            Html:
            <CodeChunk code={`<div class="fp-back center">\n  <span></span>\n</div>`} lang="html" />
            Scss:
            <CodeChunkFromFile path="./css-btn-arrow.scss" lang="scss" />
          </div>
        </>
      ),
    },
    {
      title: "btn1",
      content: (
        <>
          <p>
            <code>transition-delay</code>的應用
          </p>
          <div className="my-2 mx-auto col-sm-3 p-3">
            <a className="btn1">
              btn1
              <span style={{ "--i": 0 }} />
              <span style={{ "--i": 0 }} />
              <span style={{ "--i": 1 }} />
              <span style={{ "--i": 2 }} />
            </a>
          </div>
          <div className="my-2">
            Html:
            <CodeChunk code={`<a class="btn1">btn1\n    <span style="--i:0;"></span>\n    <span style="--i:0;"></span>\n    <span style="--i:1;"></span>\n    <span style="--i:2;"></span>\n</a>`} lang="html" />
          </div>
          <div className="my-2">
            Scss:
            <CodeChunkFromFile path="./btn1.scss" lang="scss" />
          </div>
        </>
      ),
    },
    {
      title: "btn2",
      content: (
        <>
          <p>
            <code>rotate</code>的應用
          </p>
          <div className="my-2 bg-black px-3 py-5">
            <div className="col-sm-3 mx-auto">
              <a className="btn2">
                <span className="text">btn2</span>
                <span className="blur" />
              </a>
            </div>
          </div>
          <div className="my-2">
            Html:
            <CodeChunk code='<a class="btn2"><span class="text">btn2</span><span class="blur"></span></a>' lang="html" />
          </div>
          <div className="my-2">
            Scss:
            <CodeChunkFromFile path="./btn2.scss" lang="scss" />
          </div>
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
