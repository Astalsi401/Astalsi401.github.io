const Content = () => {
  const sections = [
    {
      title: "參考文章",
      content: (
        <>
          <ul>
            <li>
              安裝流程：
              <a href="https://iter01.com/532365.html" target="_blank">
                PHP安裝配置(Windows和Linux)-一篇就夠了
              </a>
            </li>
            <li>
              apache安裝：
              <a href="https://blog.csdn.net/Jack_windows/article/details/72683237?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=2" target="_blank">
                Apache Http 服務器安裝教程
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "容易踩到的坑",
      content: (
        <>
          <ol>
            <li>php與apache必須為相同位元，如X64。</li>
            <li>
              php8以上，<code>php8apache2_4.dll</code>已經自帶在安裝包中，無須額外下載。
            </li>
            <li>
              php8以上，<code>httpd.conf</code>載入php的代碼須改為
              <CodeChunkFromFile path="./php/httpd.conf" />
            </li>
            <li>
              <a href="http://localhost/test.php" target="_blank">
                http://localhost/test.php
              </a>
              存取被拒時請重新開機。
            </li>
            <li>
              連接mysql出現<code>Call to undefined function mysqli_connect()</code>，請參考
              <a href="https://blog.csdn.net/www121104115/article/details/75006164" target="_blank">
                PHP中出现Call to undefined function mysqli_connect()
              </a>
            </li>
          </ol>
        </>
      ),
    },
  ];
  return sections.map((s) => <Block title={s.title} content={s.content} />);
};
