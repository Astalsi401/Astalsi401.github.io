const Content = () => {
  const sections = [
    {
      title: "設定",
      content: (
        <>
          <ol>
            <li>安裝後，新增路徑至環境變數 &gt; 系統變數 &gt; PATH</li>
            <li>
              新增my.ini至安裝目錄，內容為
              <CodeChunkFromFile path="mysql/my.ini" />
            </li>
            <li>
              初始化數據庫，執行後將輸出默認密碼
              <CodeChunk code="mysqld --initialize --console" />
            </li>
            <li>
              安裝
              <CodeChunk code="mysqld install" />
            </li>
            <li>
              啟動
              <CodeChunk code="net start mysql" />
            </li>
            <li>
              登錄數據庫
              <CodeChunk code="mysql -h 主機名 -u 用戶名 -p" />
            </li>
            <li>
              登錄本機數據庫
              <CodeChunk code="mysql -u root -p" />
            </li>
          </ol>
        </>
      ),
    },
    {
      title: "常用指令",
      content: (
        <>
          <ol>
            <li>
              mysql啟動時使用系統指令需加上<code>system</code>，例如：
              <CodeChunk code="system pwd" />
            </li>
          </ol>
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};
