class Content extends React.Component {
  constructor(props) {
    super(props);
    this.ctrl = "Ctrl";
    this.alt = "Alt";
    this.shift = "Shift";
    this.enter = "Enter";
    this.state = {
      data: [
        {
          h3: "一般",
          shortcut: [
            {
              name: "搜尋",
              keys: [[this.ctrl, "F"]],
            },
            {
              name: "取代",
              keys: [[this.ctrl, "H"]],
            },
            {
              name: "添加註解(行)",
              keys: [[this.ctrl, "/"]],
            },
            {
              name: "添加註解(區)",
              keys: [[this.shift, this.alt, "A"]],
            },
            {
              name: "隱藏終端機面板",
              keys: [
                [this.ctrl, "J"],
                [this.ctrl, "S"],
              ],
            },
            {
              name: "問題",
              keys: [[this.ctrl, this.shift, "M"]],
            },
            {
              name: "輸出",
              keys: [[this.ctrl, this.shift, "'"]],
            },
            {
              name: "偵錯主控台",
              keys: [[this.ctrl, this.shift, "Y"]],
            },
            {
              name: "output自動滾動",
              keys: [[this.ctrl, this.shift, "R"]],
            },
            {
              name: "代碼摺疊",
              keys: [
                [this.ctrl, "J"],
                [this.ctrl, "H"],
              ],
            },
            {
              name: "代碼展開",
              keys: [
                [this.ctrl, "J"],
                [this.ctrl, "J"],
              ],
            },
            {
              name: "markdown、python preview",
              keys: [[this.ctrl, "K"], ["V"]],
            },
            {
              name: "向右分割編輯器",
              keys: [[this.ctrl, "\\"]],
            },
            {
              name: "切換分割區域",
              keys: [[this.ctrl, 1], [2], [3]],
            },
            {
              name: "變更視窗分割方向",
              keys: [[this.shift, this.alt, 0]],
            },
            {
              name: "多重選取",
              keys: [[this.shift, this.alt, "N"]],
            },
            {
              name: "啟用/停用自動換行",
              keys: [[this.alt, "Z"]],
            },
          ],
        },
        {
          h3: "Run code",
          shortcut: [
            {
              name: "run code",
              keys: [[this.ctrl, this.alt, "N"]],
            },
            {
              name: "stop code run",
              keys: [[this.ctrl, this.alt, "M"]],
            },
            {
              name: "run sql code",
              keys: [[this.ctrl, this.enter]],
            },
          ],
        },
        {
          h3: "Quokka",
          shortcut: [
            {
              name: "start quokka",
              keys: [[this.ctrl, "K"], ["Q"]],
            },
            {
              name: "stop quokka",
              keys: [[this.ctrl, "K"], ["E"]],
            },
          ],
        },
        {
          h3: "Live Sass",
          shortcut: [
            {
              name: "compile current sass file",
              keys: [
                [this.alt, "L"],
                [this.alt, "S"],
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
                [this.alt, "L"],
                [this.alt, "H"],
              ],
            },
            {
              name: "open live server",
              keys: [
                [this.alt, "L"],
                [this.alt, "Q"],
              ],
            },
            {
              name: "stop live server",
              keys: [
                [this.alt, "L"],
                [this.alt, "C"],
              ],
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <h2>快捷鍵(個人用)</h2>
        {this.state.data.map((section) => (
          <Block
            title={section.h3}
            content={
              <ul>
                {section.shortcut.map((li) => (
                  <li>
                    {li.name}：{li.keys.map((keys) => keys.map((kbd) => <kbd>{kbd}</kbd>).reduce((prev, curr) => [prev, "+", curr]))}
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </div>
    );
  }
}
