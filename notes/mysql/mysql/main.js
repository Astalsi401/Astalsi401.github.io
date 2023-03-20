class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      code1: `[client]\n# 設定客戶端mysql編碼\ndefault-character-set=utf8\n \n[mysqld]\n# 設定3306端口\nport = 3306\n# 設定mysql安裝目錄\nbasedir=D:\\Tools\\mysql-8.0.27-winx64\n# 允許最大連接數\nmax_connections=20\n# 設定服務端編碼\ncharacter-set-server=utf8\n# 創建新表時使用默認儲存引擎\ndefault-storage-engine=INNODB`,
    };
  }
  render() {
    return (
      <div>
        <section className="my-4">
          <h3 className="my-3">設定</h3>
          <ol>
            <li>安裝後，新增路徑至環境變數 &gt; 系統變數 &gt; PATH</li>
            <li>
              新增my.ini至安裝目錄，內容為
              <CodeChunk code={this.data.code1} />
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
        </section>
        <section className="my-4">
          <h3 className="my-3">常用指令</h3>
          <ol>
            <li>
              mysql啟動時使用系統指令需加上<code>system</code>，例如：
              <CodeChunk code="system pwd" />
            </li>
          </ol>
        </section>
      </div>
    );
  }
}
