const Content = () => {
  const keys = {
    ctrl: "Ctrl",
    alt: "Alt",
    shift: "Shift",
    enter: "Enter",
  };
  const sections = [
    {
      h3: "一般",
      shortcut: [
        {
          name: "搜尋",
          keys: [[keys.ctrl, "F"]],
        },
        {
          name: "取代",
          keys: [[keys.ctrl, "H"]],
        },
        {
          name: "添加註解(行)",
          keys: [[keys.ctrl, "/"]],
        },
        {
          name: "添加註解(區)",
          keys: [[keys.shift, keys.alt, "A"]],
        },
        {
          name: "隱藏終端機面板",
          keys: [
            [keys.ctrl, "J"],
            [keys.ctrl, "S"],
          ],
        },
        {
          name: "問題",
          keys: [[keys.ctrl, keys.shift, "M"]],
        },
        {
          name: "輸出",
          keys: [[keys.ctrl, keys.shift, "'"]],
        },
        {
          name: "偵錯主控台",
          keys: [[keys.ctrl, keys.shift, "Y"]],
        },
        {
          name: "output自動滾動",
          keys: [[keys.ctrl, keys.shift, "R"]],
        },
        {
          name: "代碼摺疊",
          keys: [
            [keys.ctrl, "J"],
            [keys.ctrl, "H"],
          ],
        },
        {
          name: "代碼展開",
          keys: [
            [keys.ctrl, "J"],
            [keys.ctrl, "J"],
          ],
        },
        {
          name: "markdown、python preview",
          keys: [[keys.ctrl, "K"], ["V"]],
        },
        {
          name: "向右分割編輯器",
          keys: [[keys.ctrl, "\\"]],
        },
        {
          name: "切換分割區域",
          keys: [[keys.ctrl, 1], [2], [3]],
        },
        {
          name: "變更視窗分割方向",
          keys: [[keys.shift, keys.alt, 0]],
        },
        {
          name: "多重選取",
          keys: [[keys.shift, keys.alt, "N"]],
        },
        {
          name: "啟用/停用自動換行",
          keys: [[keys.alt, "Z"]],
        },
        {
          name: "複製使用中檔案的路徑",
          keys: [[keys.shift, keys.alt, "C"]],
        },
        {
          name: "跳至工作區",
          keys: [[keys.ctrl, keys.shift, "E"]],
        },
        {
          name: "將資料夾自工作區移除",
          keys: [[keys.shift, keys.alt, "Del"]],
        },
        {
          name: "選取所有已定義的物件",
          keys: [[keys.ctrl, keys.shift, "O"]],
        },
      ],
    },
    {
      h3: "Run code",
      shortcut: [
        {
          name: "run code",
          keys: [[keys.ctrl, keys.alt, "N"]],
        },
        {
          name: "stop code run",
          keys: [[keys.ctrl, keys.alt, "M"]],
        },
        {
          name: "run sql code",
          keys: [[keys.ctrl, keys.enter]],
        },
      ],
    },
    {
      h3: "Quokka",
      shortcut: [
        {
          name: "start quokka",
          keys: [[keys.ctrl, "K"], ["Q"]],
        },
        {
          name: "stop quokka",
          keys: [[keys.ctrl, "K"], ["E"]],
        },
      ],
    },
    {
      h3: "Live Sass",
      shortcut: [
        {
          name: "compile current sass file",
          keys: [
            [keys.alt, "L"],
            [keys.alt, "S"],
          ],
        },
      ],
    },
    {
      h3: "Live Server",
      shortcut: [
        {
          name: "change live server workspace",
          keys: [
            [keys.alt, "L"],
            [keys.alt, "H"],
          ],
        },
        {
          name: "open live server",
          keys: [
            [keys.alt, "L"],
            [keys.alt, "Q"],
          ],
        },
        {
          name: "stop live server",
          keys: [
            [keys.alt, "L"],
            [keys.alt, "C"],
          ],
        },
      ],
    },
    {
      h3: "",
      shortcut: [
        {
          name: "open codeium",
          keys: [
            [keys.ctrl, "C"],
            [keys.ctrl, "A"],
          ],
        },
      ],
    },
  ];
  return (
    <>
      <h2>快捷鍵(個人用)</h2>
      {sections.map((section) => (
        <Block
          title={section.h3}
          content={
            <ul>
              {section.shortcut.map((li) => (
                <li key={li.name}>
                  {li.name}：{li.keys.map((keys) => keys.map((kbd) => <kbd>{kbd}</kbd>).reduce((prev, curr) => [prev, "+", curr]))}
                </li>
              ))}
            </ul>
          }
        />
      ))}
    </>
  );
};
