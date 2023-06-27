class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "網絡資料的格式",
        content: (
          <>
            <p>
              <b>無方向性（Undirected, Binary）</b>
            </p>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/r003_1.png" />
            <table className="mx-auto">
              <caption>Adjacency List</caption>
              <thead>
                <tr>
                  <th>ego</th>
                  <th>alter1</th>
                  <th>alter2</th>
                  <th>alter3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a</td>
                  <td>b</td>
                  <td>.</td>
                  <td>.</td>
                </tr>
                <tr>
                  <td>b</td>
                  <td>a</td>
                  <td>c</td>
                  <td>.</td>
                </tr>
                <tr>
                  <td>c</td>
                  <td>b</td>
                  <td>d</td>
                  <td>e</td>
                </tr>
                <tr>
                  <td>d</td>
                  <td>c</td>
                  <td>e</td>
                  <td>.</td>
                </tr>
                <tr>
                  <td>e</td>
                  <td>c</td>
                  <td>d</td>
                  <td>.</td>
                </tr>
              </tbody>
            </table>
            <table className="mx-auto">
              <caption>Matrices</caption>
              <tr>
                <th>.</th>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
                <th>e</th>
              </tr>
              <tr>
                <th>a</th>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>b</th>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>c</th>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th>d</th>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
              </tr>
              <tr>
                <th>e</th>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
                <td>0</td>
              </tr>
            </table>
            <table className="mx-auto">
              <caption>Arc List</caption>
              <tr>
                <th>vertex</th>
                <th>vertex</th>
              </tr>
              <tr>
                <td>a</td>
                <td>b</td>
              </tr>
              <tr>
                <td>b</td>
                <td>a</td>
              </tr>
              <tr>
                <td>b</td>
                <td>c</td>
              </tr>
              <tr>
                <td>c</td>
                <td>b</td>
              </tr>
              <tr>
                <td>c</td>
                <td>d</td>
              </tr>
              <tr>
                <td>c</td>
                <td>e</td>
              </tr>
              <tr>
                <td>d</td>
                <td>c</td>
              </tr>
              <tr>
                <td>d</td>
                <td>e</td>
              </tr>
              <tr>
                <td>e</td>
                <td>c</td>
              </tr>
              <tr>
                <td>e</td>
                <td>d</td>
              </tr>
            </table>
            <p>
              <b>有方向性（Directed, Binary）</b>
            </p>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/r003_2.png" />
            <table className="mx-auto">
              <caption>Matrices</caption>
              <tr>
                <th>.</th>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
                <th>e</th>
              </tr>
              <tr>
                <th>a</th>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>b</th>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>c</th>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th>d</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>e</th>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
                <td>0</td>
              </tr>
            </table>
            <p>
              <b>無方向性，有強弱差異（Undirected, Valued）</b>
            </p>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/r003_3.png" />
            <table className="mx-auto">
              <caption>Edgelist</caption>
              <tr>
                <th>ego</th>
                <th>alter</th>
                <th>relation</th>
              </tr>
              <tr>
                <td>a</td>
                <td>b</td>
                <td>1</td>
              </tr>
              <tr>
                <td>b</td>
                <td>a</td>
                <td>1</td>
              </tr>
              <tr>
                <td>b</td>
                <td>c</td>
                <td>3</td>
              </tr>
              <tr>
                <td>c</td>
                <td>b</td>
                <td>3</td>
              </tr>
              <tr>
                <td>c</td>
                <td>d</td>
                <td>1</td>
              </tr>
              <tr>
                <td>c</td>
                <td>e</td>
                <td>4</td>
              </tr>
              <tr>
                <td>d</td>
                <td>c</td>
                <td>1</td>
              </tr>
              <tr>
                <td>d</td>
                <td>e</td>
                <td>2</td>
              </tr>
              <tr>
                <td>e</td>
                <td>c</td>
                <td>4</td>
              </tr>
              <tr>
                <td>e</td>
                <td>d</td>
                <td>2</td>
              </tr>
            </table>
            <p>
              <b>有方向性，有強弱差異（Directed, Valued）</b>
            </p>
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/r003_4.png" />
            <table className="mx-auto">
              <caption>Edgelist</caption>
              <tr>
                <th>ego</th>
                <th>alter</th>
                <th>relation</th>
              </tr>
              <tr>
                <td>a</td>
                <td>b</td>
                <td>2</td>
              </tr>
              <tr>
                <td>b</td>
                <td>a</td>
                <td>1</td>
              </tr>
              <tr>
                <td>c</td>
                <td>b</td>
                <td>1</td>
              </tr>
              <tr>
                <td>c</td>
                <td>d</td>
                <td>1</td>
              </tr>
              <tr>
                <td>c</td>
                <td>e</td>
                <td>3</td>
              </tr>
              <tr>
                <td>e</td>
                <td>d</td>
                <td>3</td>
              </tr>
              <tr>
                <td>e</td>
                <td>c</td>
                <td>2</td>
              </tr>
            </table>
          </>
        ),
      },
      {
        title: "網絡分析基本概念",
        content: (
          <>
            <ul>
              <li>
                相通性（Reachability）：
                <ZoomImage class="w-lg-25 w-sm-50 mx-auto" src="https://astalsi401.github.io/assets/images/r003_5.png" />
                <p>
                  X<sup>n</sup>=在n步之內，有多少條路徑可連回actors
                  <br />
                  可利用矩陣次方進行計算
                  <br />
                </p>
                <CodeChunk code={`X <- matrix(c(0,1,0,0,0,1,\n  1,0,1,0,0,0,\n  0,1,0,1,1,1,\n  0,0,1,0,1,0,\n  0,0,1,1,0,0,\n  1,0,1,0,0,0), 6, byrow = T)\nX`} lang="r" />
                <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6]\n## [1,]    0    1    0    0    0    1\n## [2,]    1    0    1    0    0    0\n## [3,]    0    1    0    1    1    1\n## [4,]    0    0    1    0    1    0\n## [5,]    0    0    1    1    0    0\n## [6,]    1    0    1    0    0    0`} lang="output" />
                <CodeChunk code={`X2 <- X %^% 2\n# 例：在兩步之內能連結到a的有\n# a-b-a\n# a-f-a\n# c-b-a\n# c-f-a\n# 因此[a,a]=2 [a,c]=2\nX2`} lang="r" />
                <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6]\n## [1,]    2    0    2    0    0    0\n## [2,]    0    2    0    1    1    2\n## [3,]    2    0    4    1    1    0\n## [4,]    0    1    1    2    1    1\n## [5,]    0    1    1    1    2    1\n## [6,]    0    2    0    1    1    2`} lang="output" />
              </li>
              <li>Degree：與其他actors的直接連結數目</li>
              <li>In-degree：從其他actors接收的連結</li>
              <li>
                Out-degree：發送給其他actors的連結
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/r003_6.png" />
                <table className="mx-auto">
                  <tr>
                    <th>.</th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>d</th>
                    <th>e</th>
                  </tr>
                  <tr>
                    <th>a</th>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>0</td>
                  </tr>
                </table>
                <table className="mx-auto">
                  <tr>
                    <th>Node</th>
                    <th>In-Degree</th>
                    <th>Out-Degree</th>
                  </tr>
                  <tr>
                    <td>a</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>b</td>
                    <td>2</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>c</td>
                    <td>1</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>d</td>
                    <td>2</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>e</td>
                    <td>1</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Mean</td>
                    <td>7/5</td>
                    <td>7/5</td>
                  </tr>
                </table>
              </li>
              <li>
                度中心性（Degree Centrality）：能連結到的數量 / 總數-1
                <img className="d-block mx-auto" width="88px" src="https://astalsi401.github.io/assets/images/degree_centrality.png" alt="degree_centrality" />
                <p>
                  <i>
                    A<sub>ij</sub>
                  </i>{" "}
                  = socio-matrix
                </p>
              </li>
              <li>
                接近中心性（Closeness Centrality）：與其他actors的鄰近程度
                <img className="d-block mx-auto" width="90px" src="https://astalsi401.github.io/assets/images/closeness_centrality.png" alt="closeness_centrality" />
                <p>
                  <i>
                    d<sub>ij</sub>
                  </i>{" "}
                  = 到每個actors的距離
                </p>
              </li>
              <li>
                界數中心性（Betweenness Centrality）：兩actors經過第三actor的最短路徑數
                <img className="d-block mx-auto" width="151px" src="https://astalsi401.github.io/assets/images/betweenness_centrality.png" alt="betweenness_centrality" />
                <p>
                  <i>
                    G<sub>jk</sub>
                  </i>{" "}
                  = jk之間的最短路徑
                  <br />
                  <i>
                    G<sub>jik</sub>
                  </i>{" "}
                  = jk之間，經過i的最短路徑
                  <br />
                </p>
              </li>
              <li>
                網絡密度（Density）：
                <img className="d-block mx-auto" width="117px" src="https://astalsi401.github.io/assets/images/density.png" alt="density" />
                <p>
                  實際存在的路徑數/最多可能路徑數
                  <br />
                  <i>N</i> = actors數量
                  <br />
                </p>
              </li>
            </ul>
            <CodeChunk code={``} lang="r" />
            <CodeChunk code={``} lang="output" />
          </>
        ),
      },
      {
        title: "",
        content: (
          <>
            <CodeChunk code={``} lang="r" />
            <CodeChunk code={``} lang="output" />
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}
