class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <p>Stata只提供非常基礎的編輯器，使用上常會感到不方便。而利用Sublime Text 3的各種功能（ex：自動補齊）可大幅增加編寫效率。</p>
            <ol>
              <li>
                安裝<a href="https://www.sublimetext.com/">Sublime Text 3</a>
              </li>
              <li>
                開啟Sublime，在Sublime中安裝Package Control
                <ol type="i">
                  <li>
                    快捷鍵<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>
                  </li>
                  <li>
                    輸入<code>install package contorl</code>
                  </li>
                  <li>重新開啟Sublime</li>
                </ol>
              </li>
              <li>
                在Sublime中安裝Stata Editor
                <ol type="i">
                  <li>
                    快捷鍵<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>
                  </li>
                  <li>
                    輸入<code>install package</code>，可能要稍微等待幾秒鐘，之後會跳出搜索框
                  </li>
                  <li>
                    輸入<code>stata editor</code>，按<kbd>enter</kbd>安裝
                  </li>
                </ol>
              </li>
              <li>安裝pywin32，方法如上</li>
              <li>
                設定Stata Editor
                <ol type="i">
                  <li>
                    開啟預設設定檔
                    <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step5-1.png"></ZoomImage>
                  </li>
                  <li>
                    開啟自訂設定檔
                    <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step5-2.png"></ZoomImage>
                  </li>
                  <li>將預設檔全選並複製到自訂檔</li>
                  <li>
                    更改<code>stata_path</code>為自己的Stata安裝路徑
                  </li>
                  <li>
                    更改<code>stata_version</code>為自己的版本，存檔。
                    <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step5-5.png"></ZoomImage>
                  </li>
                </ol>
              </li>
              <li>在Stata安裝目錄中為stata建立捷徑</li>
              <li>
                右鍵點選捷徑→內容，將目標中的路徑用英文的引號<code> " </code>括起來，後方隔一個空格輸入<code>/Register</code>，套用
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step7.png"></ZoomImage>
              </li>
              <li>
                此時引號會消失，代表已成功
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step8.png"></ZoomImage>
              </li>
              <li>再次右鍵點選捷徑→以系統管理員身分執行→是，然後重新啟動電腦就完成了</li>
            </ol>
            <p>
              之後開啟Sublime，<kbd>ctrl</kbd>+<kbd>n</kbd>建立新分頁，選擇View&gt;Syntax&gt;Stata，隨意輸入一段statacode後用<kbd>ctrl</kbd>+<kbd>d</kbd>即可傳送到stata執行。
            </p>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step9-1.png"></ZoomImage>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/step9-2.png"></ZoomImage>
          </div>
        ),
      },
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} language="stata"></CodeChunk>
            <CodeChunk code={``} language="output"></CodeChunk>
          </div>
        ),
      },
    ];
  }
  render() {
    return (
      <div>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </div>
    );
  }
}
