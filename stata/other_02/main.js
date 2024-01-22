const Content = () => {
  const sections = [
    {
      title: "",
      content: <p>本頁將介紹兩種能將Stata執行結果加上文字說明輸出為html檔的方法。</p>,
    },
    {
      title: "dyndoc",
      content: (
        <>
          <p>
            <code>dyndoc</code>的do檔格式如下：
          </p>
          <CodeChunk code={`將Markdown語法的文字輸入在這裡，ex:\n\n#標題\n\n##標題2\n\n - A\n\n - B\n\n - C\n\n~~~~\n<<dd_do>>\n/*將Stata code輸入在這裡, ex:*/\ncd "D:/Documents/Stata/Stata/data"\nuse us_birth_rate, clear\nlist in 1/8\ncd "D:/Documents/Git/stata/other/02"\n<</dd_do>>\n~~~~\n\n另一段Markdown....\n\n~~~~\n<<dd_do>>\n/*另一段Stata code....*/\n<</dd_do>>\n~~~~`} lang="md" />
          <p>
            以<code>dyndoc 檔名.do, replace</code>將檔案與執行結果輸出為html，輸出檔案如下：
          </p>
          <DemoFrame src={`${domain}/stata/other/example.html`} />
        </>
      ),
    },
    {
      title: "webdoc",
      content: (
        <>
          <p>
            <code>webdoc</code>的do檔案看起來如下：
          </p>
          <ul>
            <li>
              <code>head()</code>代表html中&lt;head&gt;標籤內的資訊
            </li>
            <li>
              <code>w(800px)</code>:頁面寬度800px
            </li>
            <li>
              <code>t("example2")</code>:html頁面的名稱，不需要跟檔名相同
            </li>
            <li>
              <code>st(ocean cbf)</code>:主題為ocean（海藍色），cbf代表Stata輸入指令為粗體字
            </li>
          </ul>
          <CodeChunk code={`clear\ncd "D:/Documents/Git/stata/other/02"  /*要匯出的do檔所在的工作目錄*/\nwebdoc init example2, replace logall /// /*example2: 檔案名*/\n       head(w(800px) t("example2") st(ocean cbf))\n\n/***\n將Html語法的文字輸入在這裡，ex:\n\n<h1>標題</h1>\n<h2>標題2</h2>\n<ul>\n	<li>A</li>\n	<li>B</li>\n	<li>C</li>\n</ul>\n***/\n\n/*將Stata code輸入在這裡, ex:*/\ncd "D:/Documents/Stata/Stata/data"\nuse us_birth_rate, clear\nlist in 1/8\ncd "D:/Documents/Git/stata/other/02"\n\n/***\n另一段Html....\n***/\n\n/*另一段Stata code....*/`} lang="html" />
          <p>
            以<code>webdoc do 檔名.do, replace</code>將檔案輸出為html，結果如下：
          </p>
          <DemoFrame src={`${domain}/stata/other/example2.html`} />
          <p>
            本網站也是使用<code>webdoc</code>製作，不過在輸出後又手動對html檔進行編輯，本站中所有頁面的html檔，以及style設定檔都能在<a href="https://github.com/Astalsi401/Astalsi401.github.io">我的github</a>找到。
          </p>
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};
