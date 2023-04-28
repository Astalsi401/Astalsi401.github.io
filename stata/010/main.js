class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <ol>
              <li>
                參數顯著性檢驗：
                <ol type="i">
                  <li>母體的分佈是常態分配（或樣本數夠大，使其平均數的分佈也呈現常態分配）</li>
                  <li>測量的尺度是區間（interval）尺度</li>
                </ol>
              </li>
              <li>
                非參數顯著性檢驗：
                <ol type="i">
                  <li>不需要對總體分佈做事先的假定。例如，不需要假定母體分佈呈常態分配。</li>
                  <li>當變項的測量尺度是名目（nominal）或等距（ordinal）尺度。</li>
                  <li>
                    非參數顯著性檢驗並不是在檢驗平均數是否相等的虛無假設，而是：
                    <ul>
                      <li>當變項只有一個時：檢驗變項的分配是否符合某種分配</li>
                      <li>當有兩個變項時：探討變項是否獨立或是否有關聯。</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li>
                非參數顯著性檢驗採用的是卡方分配（Chi Square distribution）
                <ZoomImage class="mx-auto w-sm-75" src="https://astalsi401.github.io/assets/images/chi-square01.png" />
                <ol type="i">
                  <li>是右偏的分配。</li>
                  <li>
                    最小檢定值
                    <i>
                      &Chi;<sup>2</sup>
                    </i>
                    =0，因此統計量不會是負數。
                  </li>
                  <li>
                    卡方分配的平均值<i>&mu;</i>及標準差都被自由度（Degree of Freedom, df）所決定。自由度增加時，其分配就愈趨於常態曲線。
                  </li>
                  <li>
                    <i>
                      &Chi;<sup>2</sup>
                    </i>
                    值愈大，拒絕虛無假設的可能性就愈大。
                  </li>
                  <li>
                    以STATA找出分配數值的指令：
                    <ul>
                      <li>
                        若自由度為2，
                        <i>
                          &Chi;<sup>2</sup>
                        </i>
                        =5時，找出右邊分配的機率值
                        <CodeChunk code={`di chi2tail(2, 5)`} language="stata" />
                        <CodeChunk code={`. di chi2tail(2, 5)\n.082085`} language="output" />
                      </li>
                      <li>
                        若自由度為2，右邊機率值為0.082085時，找出
                        <i>
                          &Chi;<sup>2</sup>
                        </i>
                        值<CodeChunk code={`di invchi2tail(2, .082085)`} language="stata" />
                        <CodeChunk code={`. di invchi2tail(2, .082085)\n5`} language="output" />
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li>
                One-way Chi-square test：檢驗變項的分配是否符合某種分配
                <ol type="i">
                  <li>
                    目的就是用於檢驗樣本的分佈是否符合某種理論分佈或某種假設的分佈。
                    <ul>
                      <li>
                        <i>
                          H<sub>1</sub>
                        </i>
                        ：母體不為某種比例分配
                      </li>
                      <li>
                        <i>
                          H<sub>0</sub>
                        </i>
                        ：母體在某性質上呈現某種比例分配
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li>
                計算方式
                <ul>
                  <li>
                    <i>
                      f<sub>o</sub>
                    </i>
                    =被觀察到的數值
                  </li>
                  <li>
                    <i>
                      f<sub>e</sub>
                    </i>
                    =被期望到的數值
                  </li>
                  <li>
                    公式為：
                    <img
                      src="data:image/png;base64,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"
                      widyh="111"
                      heigh="48"
                    />
                  </li>
                </ul>
              </li>
            </ol>
            <div className="my-2">
              <div className="text-bold text-large">範例1：</div>
              <p>在選擇題測驗中，有50個選擇題，每題的答案範圍由A至E，但其中只有一個是標準答案。在考完試後，老師公佈標準答案，其分配如下：</p>
              <table className="mx-auto my-2">
                <tr>
                  <th>標準答案</th>
                  <th>數量</th>
                </tr>
                <tr>
                  <td>A</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>E</td>
                  <td>10</td>
                </tr>
              </table>
              <p>此處的虛無假設是樣本符合母體中各類別之分佈符合平均分配（Pr&gt;0.05）</p>
              <CodeChunk code={`chitesti 12 14 5 9 10 \ 10 10 10 10 10 `} language="stata" />
              <CodeChunk code={`. chitesti 12 14 5 9 10 \ 10 10 10 10 10 \n\nobserved frequencies from keyboard; expected frequencies from keyboard\n\n         Pearson chi2(4) =   4.6000   Pr =  0.331\nlikelihood-ratio chi2(4) =   4.9690   Pr =  0.290\n\n  +-------------------------------------------+\n  | observed   expected   obs - exp   Pearson |\n  |-------------------------------------------|\n  |       12     10.000       2.000     0.632 |\n  |       14     10.000       4.000     1.265 |\n  |        5     10.000      -5.000    -1.581 |\n  |        9     10.000      -1.000    -0.316 |\n  |       10     10.000       0.000     0.000 |\n  +-------------------------------------------+`} language="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">範例2：</div>
              <p>輸入資料</p>
              <CodeChunk code={`clear\ninput x y freq\n0 0 15\n1 0 10\n0 1 5\n1 1 10\nend\n\nlab variable x "political orientation"\nlab var y "government preference"\nlab define xlabel 0 "Liberal" 1 "Conservative"\nlab define y      0 "Large  " 1 "Small"\nlab value x xlabel\nlab val   y y\n\nexpand freq`} language="stata" />
              <CodeChunk code={`. clear\n\n. input x y freq\n\n             x          y       freq\n  1. 0 0 15\n  2. 1 0 10\n  3. 0 1 5\n  4. 1 1 10\n  5. end\n\n. \n. lab variable x "political orientation"\n\n. lab var y "government preference"\n\n. lab define xlabel 0 "Liberal" 1 "Conservative"\n\n. lab define y      0 "Large  " 1 "Small"\n\n. lab value x xlabel\n\n. lab val   y y\n\n. expand freq\n(36 observations created)\n.`} language="output" />
              <p>自由主義與保守主義對政府的偏好沒有顯著區別（Pr&gt;0.05）。</p>
              <CodeChunk code={`clear\ntab x y, chi exp`} language="stata" />
              <CodeChunk code={`. clear\n. tab x y, chi exp\n\n+--------------------+\n| Key                |\n|--------------------|\n|     frequency      |\n| expected frequency |\n+--------------------+\n\n   political | government preference\n orientation |   Large        Small |     Total\n-------------+----------------------+----------\n     Liberal |        15          5 |        20 \n             |      12.5        7.5 |      20.0 \n-------------+----------------------+----------\nConservative |        10         10 |        20 \n             |      12.5        7.5 |      20.0 \n-------------+----------------------+----------\n       Total |        25         15 |        40 \n             |      25.0       15.0 |      40.0 \n\n          Pearson chi2(1) =   2.6667   Pr = 0.102`} language="output" />
              <p>也能直接用這種方法</p>
              <CodeChunk code={`tabi 15 5 \\ 10 10, chi exp`} language="stata" />
              <CodeChunk code={`. tabi 15 5 \\ 10 10, chi exp\n\n+--------------------+\n| Key                |\n|--------------------|\n|     frequency      |\n| expected frequency |\n+--------------------+\n\n           |          col\n       row |         1          2 |     Total\n-----------+----------------------+----------\n         1 |        15          5 |        20 \n           |      12.5        7.5 |      20.0 \n-----------+----------------------+----------\n         2 |        10         10 |        20 \n           |      12.5        7.5 |      20.0 \n-----------+----------------------+----------\n     Total |        25         15 |        40 \n           |      25.0       15.0 |      40.0 \n\n          Pearson chi2(1) =   2.6667   Pr = 0.102`} language="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">範例3：</div>
              <p>某校男女生比例相同。現隨機抽取50名學生，其中男生27人，而女生23人。問此一抽樣比例是否符合該校男女生比例？</p>
              <p>Pr&gt;0.05，符合</p>
              <CodeChunk code={`prtesti 50 .54 .46`} language="stata" />
              <CodeChunk code={`. prtesti 50 .54 .46\n\nOne-sample test of proportion                      x: Number of obs =       50\n------------------------------------------------------------------------------\n             |       Mean   Std. Err.                     [95% Conf. Interval]\n-------------+----------------------------------------------------------------\n           x |        .54    .070484                      .4018538    .6781462\n------------------------------------------------------------------------------\n    p = proportion(x)                                             z =   1.1350\nHo: p = 0.46\n\n    Ha: p < 0.46                 Ha: p != 0.46                 Ha: p > 0.46\n Pr(Z < z) = 0.8718         Pr(|Z| > |z|) = 0.2564          Pr(Z > z) = 0.1282`} language="output" />
            </div>
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
