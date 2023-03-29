class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ratio: "", max: "", min: "", type: 0 };
    this.tuneformula = this.tuneformula.bind(this);
  }
  tuneformula(e) {
    let val = !/^\d*$/.test(e.target.value) ? this.state[e.target.name] : e.target.value;
    this.setState(() => {
      switch (e.target.name) {
        case "ratio":
          val = val > 1 ? 1 : val < 0 ? 0 : val;
      }
      return { [e.target.name]: val };
    });
  }
  render() {
    let front,
      rear,
      category,
      ratio = Number(this.state.ratio),
      max = Number(this.state.max),
      min = Number(this.state.min),
      type = Number(this.state.type);
    if (max > 65) {
      category = "彈簧";
      front = (max - min) * ratio;
      rear = (max - min) * (1 - ratio);
    } else if (max < 21) {
      category = "阻尼";
      front = (max - min) * ratio + min;
      rear = (max - min) * (1 - ratio) + min;
    } else {
      category = "防傾桿";
      front = (max - min) * (ratio + type) + min;
      rear = (max - min) * (1 - ratio) + min;
    }
    return (
      <form className="my-3 mx-auto calculator" onChange={this.tuneformula}>
        <fieldset className="border-0">
          <Label label="重量比" name="ratio" step="0.01" placeholder="0~1間的小數" value={this.state.ratio} />
          <Label label="最大值" name="max" value={this.state.max} />
          <Label label="最小值" name="min" value={this.state.min} />
          <label className="my-2 w-100">
            <div>驅動方式：</div>
            <select name="type" value={this.state.type}>
              <option value={0}>前置四驅</option>
              <option value={0.02}>中置四驅</option>
              <option value={0.06}>後驅</option>
              <option value={-0.08}>前驅</option>
            </select>
          </label>
        </fieldset>
        <fieldset className="border-0">
          {[
            { k: "前", v: front },
            { k: "後", v: rear },
          ].map((d) => (
            <label className="my-2 w-100">
              <output>
                {d.k}
                {category}：{d.v.toFixed(2)}
              </output>
            </label>
          ))}
        </fieldset>
      </form>
    );
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      videos: [
        {
          creator: "HokiHoshi",
          channel: "https://www.youtube.com/c/HokiHoshi",
          links: [
            {
              title: "Forza Horizon 4 Tuning Guide",
              href: "https://youtu.be/WM7_3NGGUoQ",
            },
            {
              title: "Gear Tuning",
              href: "https://youtu.be/D6qthLir2iI",
            },
            {
              title: "Drift Guide",
              href: "https://youtu.be/BfZHOWwR5Gw",
            },
            {
              title: "Drift Gearing",
              href: "https://youtu.be/rAuvIlPi2KE",
            },
          ],
        },
        {
          creator: "Johnson Racing",
          channel: "https://www.youtube.com/channel/UCGK33hhvffYv5hUNqB0wVnQ",
          links: [
            {
              title: "https://youtu.be/W4s1VP1nUoM",
              href: "HOW TO TUNE in Forza Horizon 4 | OP Car Tutorial (Upgrades & Tuning)",
            },
          ],
        },
      ],
      summarize: [
        { title: "轉向不足", list: ["降低差速器百分比", "增加後輪出力（AWD）", "調低前防傾桿", "增加前空力", "調軟前彈簧", "增加前阻尼壓縮硬度", "降低前阻尼回彈硬度"] },
        { title: "轉向過度", list: ["增加差速器百分比", "將中央差速器調向50%（AWD）", "調低後防傾桿", "增加後空力", "降低後阻尼回彈硬度", "增加後束角"] },
        { title: "穩定度過低", list: ["確認車身高度是否過低", "調整空力", "調整阻尼回彈硬度百分比", "條軟前彈簧", "減少束角"] },
        { title: "過彎抓地力不足", list: ["確認輪胎溫度、降低胎壓", "降低差速器百分比", "將中央差速器調向50%（AWD）", "調整阻尼回彈硬度百分比", "將齒輪比調整為更重視極速（調低齒比）", "增加空力", "調軟彈簧", "檢查車輪定位"] },
      ],
    };
    this.section = [
      {
        title: "",
        content: (
          <div>
            本頁面為Youtube上FH4車輛調教影片的簡易中文摘要。
            <br />
            影片清單：
            <ul>
              {this.data.videos.map((creator) => (
                <li>
                  <a href={creator.channel} target="_blank">
                    {creator.creator}
                  </a>
                  <ul>
                    {creator.links.map((link) => (
                      <li>
                        <a href={link.href} target="_blank">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        title: "差速器",
        content: (
          <div>
            <p>
              影片位置：<a href="https://youtu.be/WM7_3NGGUoQ?t=152">2:32</a>
            </p>
            <p>
              感謝補充：<a href="https://forum.gamer.com.tw/Co.php?bsn=7697&sn=18681&subbsn=7&bPage=0">暗行者(halcyon1211)</a>
            </p>
            <p>差速器控制左右輪轉速的同步率，0%代表各自獨立，100%則完全同步。同步率越高，車輛就能傳送越多馬力到輪上，有越快的加速。差速器對轉向過度、轉向不足，出灣加速有相當大的影響，建議每次5%做增減。</p>
            <ol type="i" className="my-3">
              <h4>
                <li>AWD</li>
              </h4>
              <ul>
                <li>
                  前差速器加速（25%）：<p>不宜調到太高，雖然使出彎速度較慢，但也會減少過度轉向。</p>
                </li>
                <li>
                  後差速器加速（40~50%）：<p>減少後差速，出彎速度低，但增加抓地；增加後差速，抓地力降低，出彎速度提高。</p>
                </li>
                <li>
                  差速器減速（0%）：<p>屬於個人偏好，不過0%更有利出彎加速。</p>
                </li>
                <li>
                  中央差速器（70%~90%）：<p>決定前後輪分配的馬力，讓車更偏向前驅或後驅。增加後輪馬力，增加轉向過度；但後輪出力過高時將導致加速降低。</p>
                </li>
              </ul>
              <h4>
                <li>RWD</li>
              </h4>
              <ul>
                <li>
                  後驅車差速器加速（45%~80%）：<p>根據車輛馬力來調整，越大馬力需要越高的值，越高的值代表轉向過度。判斷的依據為看後側輪胎狀況，過低內側會打滑，過高則是外側打滑。宗旨是在輪胎不打滑的情況下找到自己最習慣的手感。</p>
                </li>
                <li>後驅車差速器減速（5%~50%）</li>
              </ul>
            </ol>
          </div>
        ),
      },
      {
        title: "剎車",
        content: (
          <div>
            <p>
              影片位置：<a href="https://youtu.be/WM7_3NGGUoQ?t=298">4:58</a>
            </p>
            <p>當啟用abs時，將剎車力度調到100%以上將對剎車速度有負面影響。</p>
          </div>
        ),
      },
      {
        title: "空力",
        content: (
          <div>
            <p>
              影片位置：<a href="https://youtu.be/WM7_3NGGUoQ?t=340">5:40</a>
            </p>
            <p>減少空力，過彎性能降低，但增加極速。增加空力，犧牲少許極速換取更佳的彎道性能。</p>
            <ol type="i">
              <h4>
                <li>前空力：</li>
              </h4>
              <p>有時候前空力並不適合調到最高（保持在約80%的位置），不然在高速時反而會導致失去抓地力。</p>
              <h4>
                <li>後空力</li>
              </h4>
              <p>調到最高，若轉向不足再調低</p>
            </ol>
          </div>
        ),
      },
      {
        title: "阻尼",
        content: (
          <div>
            <ol type="i">
              <h4>
                <li>
                  回彈硬度<a href="#formula">（公式決定）</a>
                </li>
              </h4>
              <h4>
                <li>壓縮硬度（建議為60%）：</li>
              </h4>
              <p>影響避震器面對彈跳時的表現，一般在回彈硬度的50%~70%。</p>
            </ol>
          </div>
        ),
      },
      {
        title: "彈簧",
        content: (
          <div>
            <p>
              感謝補充：<a href="https://forum.gamer.com.tw/Co.php?bsn=7697&sn=18681&subbsn=7&bPage=0">雪飄夏日(gi516811)</a>
            </p>
            <ol type="i">
              <h4>
                <li>彈簧</li>
              </h4>
              <p>
                使用公式：<code>(最大值-最小值)×重量比</code>
              </p>
              <p>注意彈簧公式並未加上最小值。</p>
              <h4>
                <li>車身高度：</li>
              </h4>
              <p>降到最低再視情況調高。</p>
            </ol>
          </div>
        ),
      },
      {
        title: "防傾桿",
        content: (
          <div>
            <ol type="i">
              <li>
                <h4>防傾桿（公路）：</h4>
              </li>
              <p>
                感謝補充：<a href="https://forum.gamer.com.tw/Co.php?bsn=7697&sn=18681&subbsn=7&bPage=0">暗行者(halcyon1211)</a>
              </p>
              <ul>
                <li>
                  前置四驅<a href="#formula">（公式決定）</a>
                </li>
                <li>中置四驅：</li>
                <p>同樣使用公式，不過前防傾桿比例可增加2%，例：原重量比48%，改以50%進行計算。</p>
                <li>後驅：</li>
                <p>同樣使用公式，因容易轉向過度，所以前防傾桿要比較硬，建議增加6%。</p>
                <li>前驅：</li>
                <p>同樣使用公式，因容易轉向不足，所以要比較軟，建議減少8%。</p>
              </ul>
              <li>
                <h4>防傾桿（甩尾）：</h4>
              </li>
              <ul>
                <li>
                  前：<a href="#formula">公式</a>為基礎，視情況調低。
                </li>
                <li>後：可直接調到最低，再視情況調高。</li>
              </ul>
              <li>
                <h4>防傾桿（拉力）：</h4>
              </li>
              <ul>
                <li>
                  前：依<a href="#formula">公式</a>決定，視情況調低。
                </li>
                <li>後：約20%的位置</li>
              </ul>
            </ol>
          </div>
        ),
      },
      {
        title: "輪胎定位",
        content: (
          <div>
            <p>
              影片位置：<a href="https://youtu.be/WM7_3NGGUoQ?t=650">10:50</a>、<a href="https://youtu.be/WM7_3NGGUoQ?t=920">15:20</a>
            </p>
            <ol type="i">
              <h4>
                <li>外傾角：</li>
              </h4>
              <p>決定過彎抓地力，調整至踩著油門過彎時外側車輪時接近0°。</p>
              <p>也可以從車輪溫度調整，內側過高，增加外傾角；外側過高，減少外傾角。調整至車輪溫度內側&gt;中間&gt;外側，但差異不要太大（個位數，最好5°C內）</p>
              <ZoomImage class="my-2 mx-auto image-normal" scr="https://astalsi401.github.io/assets/images/camber.png" />
              <h4>
                <li>束角：</li>
              </h4>
              <p>影響轉向能力，束角越大，轉向角度越大，直線時越不穩定。下圖為前+後-。拉力賽容許更大的前束角。調整束角時建議以0.1為單位慢慢調整。</p>
              <ZoomImage class="my-2 mx-auto image-normal" scr="https://astalsi401.github.io/assets/images/toe.png" />
              <h4>
                <li>前後傾角（4°~6°）：</li>
              </h4>
              <p>越高，直線時外傾角越穩定，但過彎時將增加負外傾角。在某些情況下，調到太高有可能使車輛重心過度自行回正，導致難以預測的移動。</p>
              <ZoomImage class="my-2 mx-auto image-normal" scr="https://astalsi401.github.io/assets/images/caster.png" />
            </ol>
          </div>
        ),
      },
      {
        title: "輪胎定位（甩尾）",
        content: (
          <div>
            <ol type="i">
              <li>前外傾角：-5°</li>
              <li>後外傾角：0°</li>
              <li>前束角：5°</li>
              <li>後束角：1.5°</li>
              <li>前後傾角：7°</li>
            </ol>
          </div>
        ),
      },
      {
        title: "齒輪裝置",
        content: (
          <div>
            <ol>
              <li>
                <a href="https://youtu.be/D6qthLir2iI?t=350">Hokihoshi</a>的調法：
              </li>
              <p>調整尺比時需要先理解Power Band（功率帶）的觀念，即車輛產生最大動力的區間。如果在遊戲內使用英制單位，進入引擎升級，從性能圖表中可發現馬力與扭力約在5200轉時交叉，這個點即是功率帶。不過在競速中，維持高轉速非常重要，因此功率帶還要再往上升一些，大至落在6500轉左右，會隨不同車輛與改裝而有所不同。只能實際駕駛後依手感確認。</p>
              <p>調整至1檔起跑只會碰到紅區1~2次，第3次時就應該上2檔，2檔轉速與功率帶銜接。影片中正是在約6500轉時上2檔，之後每次升檔轉速都比前一檔稍微高2~300轉。</p>
              <ZoomImage class="my-2 mx-auto image-normal" scr="https://astalsi401.github.io/assets/images/powerBand.png" />
              <li>
                <a href="https://forum.gamer.com.tw/Co.php?bsn=7697&sn=18681&subbsn=7&bPage=0">halcyon1211</a>的調法：
              </li>
              <ol type="i">
                <li>最終傳動比</li>
                <p>調整終傳比讓極速出現時轉速到紅區。極速無法跑進紅區時，往加速的地方調整，直到左邊的極速發生1～2km/h的下降（這邊指的不是累積而是拉一次要下降1～2）。若轉速過早抵達紅區則相反，往極速拉，直到極速上升幅度低於1km。</p>
                <li>最後一檔</li>
                <p>調整方式同最終傳動比。</p>
                <li>1檔</li>
                <p>
                  同<a href="https://youtu.be/D6qthLir2iI?t=350">Hokihoshi</a>
                </p>
                <li>其餘檔位</li>
                <p>
                  同<a href="https://youtu.be/D6qthLir2iI?t=350">Hokihoshi</a>
                </p>
              </ol>
            </ol>
            <h3 className="mt-3">齒輪裝置（甩尾）</h3>
            <ol type="i">
              <li>
                <p>
                  <b>方法1：</b>首先找到適合甩尾的動力區間，然後把3檔及之後的檔位都調整至接近這個區間。最後齒比看起來會類似下圖：
                </p>
              </li>
              <ZoomImage class="my-2 mx-auto image-normal" scr="https://astalsi401.github.io/assets/images/driftGear.png" />
              <li>
                <p>
                  <b>方法2：</b>將前四檔調整為Formula Drift系列的齒比，其餘檔位隨意，最後再視駕駛手感調整最終傳動比。
                </p>
              </li>
              <ul>
                <li>1檔：1.80</li>
                <li>2檔：1.45</li>
                <li>3檔：1.16</li>
                <li>4檔：1.00</li>
              </ul>
            </ol>
          </div>
        ),
      },
      {
        title: "胎壓",
        content: (
          <div>
            <ol>
              <li>
                <a href="https://www.youtube.com/c/HokiHoshi">HokiHoshi</a>的調法
              </li>
              <p>
                影片位置：<a href="https://youtu.be/WM7_3NGGUoQ?t=1115">18:35</a>
              </p>
              <p>越高，轉向越靈敏。越低，起步加速越快。</p>
              <p>以暖胎後達33psi為目標，觀察輪胎溫度變化，盡量保持正常狀態以維持峰值抓地力（輪胎溫度保持保持在即將變黃之前）。</p>
              <li>
                <a href="https://www.youtube.com/channel/UCGK33hhvffYv5hUNqB0wVnQ">Johnson Racing</a>的調法
              </li>
              <p>
                影片位置：<a href="https://youtu.be/W4s1VP1nUoM?t=910">15:10</a>
              </p>
              <p>在fh4中，胎壓應盡可能低，因為fh4無視了低胎壓導致的各種負面影響，如耗損、溫度過高、失去抓地力。</p>
              <p>建議胎壓為15psi~23.2psi</p>
            </ol>
          </div>
        ),
      },
      {
        title: "總結",
        content: (
          <div className="row">
            {this.data.summarize.map((d) => (
              <div className="col-sm-6 p-2">
                <div className="shadow-sm w-100 h-100 p-3 rounded-2">
                  <h4>{d.title}：</h4>
                  <ul>
                    {d.list.map((li) => (
                      <li>{li}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "formula",
        title: "公式",
        content: (
          <div>
            <ol>
              <h4>
                <li>防傾桿、阻尼：</li>
              </h4>
              <p>
                <code>(最大值-最小值)×重量比+最小值</code>
              </p>
              <p>以防傾桿為例，賽車防傾桿最大值為65，最小值為1，若車輛前端重量比為45%，則：</p>
              <p>
                前防傾桿：<code>(65-1)*0.45+1=29.8</code>
              </p>
              <p>
                後防傾桿：<code>(65-1)*(1-0.45)+1=36.2</code>
              </p>
              <h4>
                <li>彈簧：</li>
              </h4>
              <p>
                <code>(最大值-最小值)×重量比</code>
              </p>
            </ol>
          </div>
        ),
      },
      {
        id: "calculator",
        title: "計算器",
        content: (
          <div>
            <p className="text-center text-bold text-warn">
              注意最大值：
              <br />
              輸入大於65將計算彈簧
              <br />
              輸入小於21將計算阻尼
              <br />
              其他數值將計算防傾桿
            </p>
            <Calculator />
          </div>
        ),
      },
    ];
  }
  render() {
    return (
      <div>
        {this.section.map((section) => (
          <Block id={section.id && section.id} class={section.class && section.class} title={section.title} content={section.content} />
        ))}
      </div>
    );
  }
}
