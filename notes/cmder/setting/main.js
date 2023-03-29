class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      table: [
        { shortCut: "Ctrl+T", des: "新頁面" },
        { shortCut: "Ctrl+W", des: "關閉頁面" },
        { shortCut: "Ctrl+Tab", des: "切換頁面" },
        { shortCut: "Alt+Shift+1", des: "開啟cmd.exe" },
        { shortCut: "Alt+Shift+2", des: "開啟powershell.exe" },
        { shortCut: "Alt+Shift+3", des: "開啟powershell.exe (系統管理員許可權)" },
        { shortCut: "Ctrl+n", des: "快速切換到第n個頁籤" },
        { shortCut: "Ctrl+R", des: "歷史命令搜尋" },
        { shortCut: "Win+Alt+P", des: "開啟設定視窗" },
      ],
    };
  }
  render() {
    return (
      <div>
        <section className="my-4">
          <h3 id="install" className="my-3">
            安裝
          </h3>
          <ol>
            <li>
              Cmder下載：<a href="https://cmder.net/">官網</a>
            </li>
            <li>
              解壓縮至想安裝的資料夾，例如我安裝於：<code>D:\Tools\cmder</code>
            </li>
            <li>新增以上路徑至環境變數 &gt; 系統變數 &gt; PATH</li>
          </ol>
        </section>
        <section className="my-4">
          <h3 id="settings" className="my-3">
            基礎設定
          </h3>
          <ol>
            <li>
              更改命令提示字元 <br /> cmder預設為<code>λ</code>，偶爾會導致有一個字符無法刪除的bug，雖然多餘的字符並不會影響指令運作，但還是建議替換。
              <br />到<code>cmder安裝路徑\config\cmder_prompt_config.lua</code>，將
              <CodeChunk code='prompt_lambSymbol = "λ"' />
              改為
              <CodeChunk code='prompt_lambSymbol = "$"' />
              重啟cmder。
            </li>
          </ol>
        </section>
        <section className="my-4">
          <h3 id="cmder_git" className="my-3">
            Cmder & Git
          </h3>
          <ol>
            <li>
              設定email與user name
              <CodeChunk code='git config --global user.email "misting401@gmail.com"' />
              <CodeChunk code='git config --global user.name "Astalsi401"' />
            </li>
            <li>
              設定ssh key
              <CodeChunk code='ssh-keygen -t rsa -C "misting401@gmail.com"' />
              ssh key會被儲存於<code>C:\Users\user\.ssh\id_rsa.pub</code>
            </li>
            <li>
              將<code>id_rsa.pub</code>中的內容全選並直接複製到<a href="https://github.com/settings/ssh/new">Key欄位</a>。
            </li>
            <li>
              確認是否成功
              <CodeChunk code="ssh -T git@github.com" />
            </li>
          </ol>
          <ul>
            <li>
              更改github密碼後，遠端倉庫網址會變更為https，並在每次進行<code>push</code>、<code>pull</code>等指令時要求輸入user.name、password，然而在今年（2021）git已經取消使用密碼進行推送的途徑，在密碼欄位須改為使用<a href="https://github.com/settings/tokens">Personal access token</a>作為密碼。此時使用以下指令即可改回SSH網址，不需再輸入用戶名與密碼。
              <CodeChunk code="git remote set-url origin git@github.com:username/repository.git" />
              確認遠端倉庫網址
              <CodeChunk code="git remote -v" />
            </li>
          </ul>
        </section>
        <section className="my-4">
          <h3 id="cmder_sublime" className="my-3">
            Cmder & Sublime Text 3
          </h3>
          <ol>
            <li>
              將<a href="">Sublime Text 3</a>安裝於<code>cmder安裝路徑\bin\Sublime_Text_3\</code>
            </li>
            <li>
              在<code>cmder安裝路徑\config\user_aliases.cmd</code>中加入：
              <CodeChunk code='subl="cmder安裝路徑\bin\Sublime_Text_3\sublime_text.exe" $* -new_console:s50H' />
              <code>subl</code>是用以叫出Sublime的代號，可替換為你習慣的稱呼。<code>-new_console</code>在新分頁開啟。<code>s50</code>占比50%。<code>H</code>橫向排列。縱向排列則為<code>V</code>。
            </li>
          </ol>
        </section>
        <section className="my-4">
          <h3 id="cmder_hotkey" className="my-3">
            Cmder快捷鍵
          </h3>
          <table>
            {this.data.table.map((d) => (
              <tr>
                <td>{d.shortCut}</td>
                <td>{d.des}</td>
              </tr>
            ))}
          </table>
        </section>
        <section className="my-4">
          <h3 id="cmder_cmd" className="my-3">
            其他指令
          </h3>
          <ul>
            <li>
              運行bat：
              <CodeChunk code='cmder /x "/cmd test.bat"' />
            </li>
            <li>
              scss to css：
              <CodeChunk code="sass --watch main.scss main.css" />
            </li>
          </ul>
        </section>
      </div>
    );
  }
}