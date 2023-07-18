class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bh: "", bw: "", ah: "", aw: "" };
  }
  whp = (e) => {
    this.setState({ [e.target.name]: !/^\d*$/.test(e.target.value) ? this.state[e.target.name] : e.target.value });
  };
  render() {
    let before = (Number(this.state.bw) / Number(this.state.bh)).toFixed(2),
      after = (Number(this.state.aw) / Number(this.state.ah)).toFixed(2);
    before = isNaN(before) || !isFinite(before) ? "__" : before;
    after = isNaN(after) || !isFinite(after) ? "__" : after;
    return (
      <form className="row my-3 mx-auto calculator" onChange={this.whp}>
        <div className="col-2 p-1 d-flex align-items-center"></div>
        <div className="col-5 p-1 d-flex align-items-center text-bold justify-content-center">改裝前</div>
        <div className="col-5 p-1 d-flex align-items-center text-bold justify-content-center">改裝後</div>
        <div className="col-2 p-1 d-flex align-items-center text-bold">重量</div>
        <div className="col-5 p-1 d-flex align-items-center">
          <Label name="bw" placeholder="kg" value={this.state.bw} />
        </div>
        <div className="col-5 p-1 d-flex align-items-center">
          <Label name="aw" placeholder="kg" value={this.state.aw} />
        </div>
        <div className="col-2 p-1 d-flex align-items-center text-bold">馬力</div>
        <div className="col-5 p-1 d-flex align-items-center">
          <Label name="bh" placeholder="hp" value={this.state.bh} />
        </div>
        <div className="col-5 p-1 d-flex align-items-center">
          <Label name="ah" placeholder="hp" value={this.state.ah} />
        </div>
        <div className="col-2 p-1 d-flex align-items-center text-bold">馬力重量比</div>
        <div className="col-5 p-1 d-flex align-items-center text-bold justify-content-center">
          <output name="before" className={before > after ? "text-warn" : before < after ? "text-success" : ""}>
            {before}
          </output>
          kg/hp
        </div>
        <div className="col-5 p-1 d-flex align-items-center text-bold justify-content-center">
          <output name="after" className={before > after ? "text-success" : before < after ? "text-warn" : ""}>
            {after}
          </output>
          kg/hp
        </div>
      </form>
    );
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <>
            <p>
              本頁面為
              <a target="_blank" href="https://www.youtube.com/channel/UCGK33hhvffYv5hUNqB0wVnQ">
                Johnson Racing
              </a>
              影片升級部分的簡易中文摘要。
            </p>
            <p>
              車輛升級主要考量四個方面：<b>重量</b>、<b>動力</b>、<b>操控</b>、<b>分數</b>
            </p>
            <p>
              建議依據以下順序來升級車輛：
              <br />
              改造 &gt; 空力套件與外觀 &gt; 輪胎與輪圈 &gt; 傳動系統 &gt; 底盤與操控性 &gt; 引擎
            </p>
          </>
        ),
      },
      {
        id: "conversion",
        title: "改造",
        content: (
          <>
            <ol type="i">
              <h4>
                <li>置換引擎</li>
              </h4>
              <p>不同的引擎會影響之後的升級，因此優先處理。在FH4中V10引擎通常有最佳的數值，不過還是建議自己計算。</p>
              <h4>
                <li>傳動系統置換</li>
              </h4>
              <p>RWD通常在單圈速度上會有更佳的表現，因為在同樣的分數下能擁有更高的馬力，但起步速度慢，駕駛難度高。AWD起步快，駕駛難度較低，遭遇碰撞推擠時更穩定，但馬力較低。</p>
              <h4>
                <li>進氣</li>
              </h4>
              <p>離心式機械增壓&gt;渦輪增壓&gt;正壓排氣式增壓</p>
              <h4>
                <li>寬體</li>
              </h4>
              <p>允許更寬的輪距，能增加操控，但也會增加重量。</p>
            </ol>
          </>
        ),
      },
      {
        title: "空力套件與外觀",
        content: (
          <>
            <p>S1以上建議先解鎖前後空力，其餘選項在最後用來調整分數。</p>
          </>
        ),
      },
      {
        title: "輪胎與輪圈",
        content: (
          <>
            <ol type="i">
              <h4>
                <li>輪胎踏面膠料</li>
              </h4>
              <p>依據車輛分數選擇，分數超過S1後建議將操控升至8以上，因此大多會安裝賽車胎。</p>
              <h4>
                <li>胎寬</li>
              </h4>
              <ul>
                <li>AWD：前輪不必要、後輪最寬</li>
                <p>大多數車將後輪改到最寬並不會增加分數，甚至還可能讓分數減少，增加引擎的改裝空間，同時又能增加抓地力。</p>
              </ul>
              <h4>
                <li>輪圈尺寸</li>
              </h4>
              <ul>
                <li>AWD：加大後輪尺寸會減少分數，可用來調整分數。</li>
              </ul>
              <p>其餘選項在最後用來調整分數</p>
            </ol>
          </>
        ),
      },
      {
        title: "傳動系統",
        content: (
          <>
            <ol type="i">
              <h4>
                <li>離合器</li>
              </h4>
              <p>不需要，換檔時間可以手排（含離合器）改善。</p>
              <h4>
                <li>變速箱</li>
              </h4>
              <p>一般跑車變速箱已經夠用，但賽車變速箱若不增加分數則建議裝上，可以更細緻的調整車輛。</p>
              <h4>
                <li>傳動軸</li>
              </h4>
              <p>減少些許重量，可最後再決定是否升級。</p>
              <h4>
                <li>差速器</li>
              </h4>
              <p>務必升滿，對車輛調教非常重要。</p>
            </ol>
          </>
        ),
      },
      {
        title: "底盤與操控性",
        content: (
          <>
            <ol type="i">
              <h4>
                <li>剎車</li>
              </h4>
              <p>不需要。</p>
              <h4>
                <li>彈簧及阻尼</li>
              </h4>
              <p>依據需求選擇賽車或拉力。</p>
              <h4>
                <li>前後防傾桿</li>
              </h4>
              <p>必需。</p>
              <h4>
                <li>底盤強化/防滾籠</li>
              </h4>
              <p>不需要。</p>
              <h4>
                <li>車重減輕</li>
              </h4>
              <p>必須，建議升滿。</p>
            </ol>
          </>
        ),
      },
      {
        title: "引擎",
        content: (
          <>
            <h4>優先順序：</h4>
            <ol type="a">
              <li>增壓（ex:渦輪）</li>
              <li>排氣系統</li>
              <li>凸輪軸</li>
              <li>氣閥</li>
              <li>進氣系統</li>
              <li>活塞/壓縮比</li>
              <li>飛輪</li>
            </ol>
            <p>中間冷卻器、機油/冷卻系統的升級有時會降低分數，可以用來調整。</p>
          </>
        ),
      },
      {
        id: "calculator",
        title: "馬力重量比計算",
        content: (
          <>
            <p>每匹馬力需負擔的重量。</p>
            <Calculator />
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((s) => (
          <Block title={s.title} content={s.content} />
        ))}
      </>
    );
  }
}
